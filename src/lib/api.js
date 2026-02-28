/**
 * Backend API client for E-Summit.
 * Uses VITE_API_BASE_URL (e.g. http://localhost:3000). No trailing slash.
 */

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

const STORAGE_ACCESS_TOKEN = "esummit_access_token";
const STORAGE_SESSION_ID = "esummit_session_id";
const STORAGE_USER = "user_data";

export function getAccessToken() {
  return localStorage.getItem(STORAGE_ACCESS_TOKEN);
}

export function getSessionId() {
  return localStorage.getItem(STORAGE_SESSION_ID);
}

export function setAuth(sessionId, accessToken, user = null) {
  if (sessionId) localStorage.setItem(STORAGE_SESSION_ID, sessionId);
  else localStorage.removeItem(STORAGE_SESSION_ID);
  if (accessToken) localStorage.setItem(STORAGE_ACCESS_TOKEN, accessToken);
  else localStorage.removeItem(STORAGE_ACCESS_TOKEN);
  if (user) localStorage.setItem(STORAGE_USER, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_SESSION_ID);
  localStorage.removeItem(STORAGE_ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_USER);
}

export function isAuthenticated() {
  return !!(getAccessToken() || getSessionId());
}

/**
 * Authenticated fetch: adds Bearer token.
 */
async function authFetch(url, options = {}) {
  const token = getAccessToken();
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return fetch(url, { ...options, headers });
}

// ——— Auth ———

/** Request OTP for email. Throws on non-2xx with message. */
export async function requestOtp(email) {
  const res = await fetch(`${API_BASE}/v1/auth/request-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim() }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || `Request failed: ${res.status}`);
  }
  return data;
}

/** Verify OTP and login. On success stores token and user, returns payload. On 401 throws with message. */
export async function verifyOtp(email, otp) {
  const res = await fetch(`${API_BASE}/v1/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim(), otp: String(otp).trim() }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || (res.status === 401 ? "Invalid or expired OTP" : `Request failed: ${res.status}`));
  }
  const payload = data.payload || data;
  const token = payload.accessToken || payload.access_token;
  const user = payload.user;
  if (token) {
    setAuth(null, token, user || null);
  }
  return payload;
}

/** Map backend user to Dashboard-friendly shape */
function mapMeUser(user) {
  if (!user) return null;
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email?.split("@")[0] || "User";
  return {
    ...user,
    name,
    fullName: name,
    esummit_id: user.id,
    picture: user.avatar,
    image: user.avatar,
  };
}

/** Current user profile (requires auth). Returns payload.user mapped for Dashboard, or null. */
export async function getMe() {
  const res = await authFetch(`${API_BASE}/v1/auth/me`);
  if (!res.ok) return null;
  const data = await res.json();
  const user = data.payload?.user ?? data.user ?? null;
  return mapMeUser(user);
}

/** Logout (requires auth) */
export async function logout() {
  try {
    await authFetch(`${API_BASE}/v1/auth/logout`, { method: "GET" });
  } finally {
    clearAuth();
  }
}

/** Submit onboarding (requires auth). Throws on non-2xx. */
export async function submitOnboarding(body) {
  const res = await authFetch(`${API_BASE}/v1/auth/onboarding`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || `Request failed: ${res.status}`);
  }
  return data.payload ?? data;
}

// ——— Passes ———

/** List all pass types */
export async function getPassTypes() {
  const res = await fetch(`${API_BASE}/v1/passes/types`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.payload?.passTypes ?? [];
}

/** Get payment config (shared UPI QR URL) */
export async function getPaymentConfig() {
  const res = await fetch(`${API_BASE}/v1/passes/payment-config`);
  if (!res.ok) return { paymentQrUrl: null };
  const data = await res.json();
  return data.payload ?? { paymentQrUrl: null };
}

/** Register a free pass */
export async function registerPass(body) {
  const res = await authFetch(`${API_BASE}/v1/passes/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

/** Upload a payment screenshot. Returns { url } */
export async function uploadPaymentScreenshot(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await authFetch(`${API_BASE}/v1/passes/upload-screenshot`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || `Upload failed: ${res.status}`);
  }
  const data = await res.json();
  return data.payload ?? data;
}

/** Create a payment request for a pass */
export async function createPaymentRequest(payload) {
  const res = await authFetch(`${API_BASE}/v1/passes/payment-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

/** Current user's passes */
export async function getMyPasses() {
  const res = await authFetch(`${API_BASE}/v1/passes/my-passes`);
  if (!res.ok) return null;
  return res.json();
}

/** Get upgrade eligibility */
export async function getUpgradeEligibility() {
  const res = await authFetch(`${API_BASE}/v1/passes/upgrade-eligibility`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.payload ?? null;
}

/** Create an upgrade request */
export async function createUpgradeRequest(payload) {
  const res = await authFetch(`${API_BASE}/v1/passes/upgrade-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

/** All pass registrations (admin). Query: ?page=1&limit=10 */
export async function getPassRegistrations(params = {}) {
  const q = new URLSearchParams(params).toString();
  const res = await authFetch(`${API_BASE}/v1/passes/registrations${q ? `?${q}` : ""}`);
  if (!res.ok) return null;
  return res.json();
}

// ——— Users (admin) ———

/** Paginated users. Query: ?page=1&limit=10 */
export async function getUsers(params = {}) {
  const q = new URLSearchParams(params).toString();
  const res = await authFetch(`${API_BASE}/v1/users${q ? `?${q}` : ""}`);
  if (!res.ok) return null;
  return res.json();
}

export default {
  requestOtp,
  verifyOtp,
  getMe,
  logout,
  submitOnboarding,
  getPassTypes,
  getPaymentConfig,
  registerPass,
  uploadPaymentScreenshot,
  createPaymentRequest,
  getMyPasses,
  getUpgradeEligibility,
  createUpgradeRequest,
  getPassRegistrations,
  getUsers,
  getAccessToken,
  getSessionId,
  setAuth,
  clearAuth,
  isAuthenticated,
};
