import React, { useState, useEffect, useRef } from "react";
import { Crown, Check, X, Upload, ArrowUpCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  isAuthenticated,
  registerPass,
  getMyPasses,
  getPaymentConfig,
  uploadPaymentScreenshot,
  createPaymentRequest,
  getUpgradeEligibility,
  createUpgradeRequest,
} from "@/lib/api";

const PASSES = [
  {
    id: "expo",
    slug: "expo",
    name: "Expo Visitor Pass",
    subtitle: "(The Free Pass)",
    price: "FREE",
    basePrice: 0,
    theme: "purple",
    featuresIncluded: [
      "Startup Expo",
      "Brand booths",
      "Demo zones",
      "Stage activities (if public)",
    ],
    featuresExcluded: [
      "No competitions",
      "No premium workshops",
      "No priority seating",
      "No certificates",
      "No closed sessions",
    ],
  },
  {
    id: "general",
    slug: "general",
    name: "General Delegate Pass",
    subtitle: "(The Red Pass)",
    price: "₹99",
    basePrice: 99,
    theme: "red",
    featuresIncluded: [
      "Access to speaker sessions",
      "Expo area",
      "Networking zones",
      "Basic activities",
      "Entry to all closed events",
      "Participation Certificate",
    ],
    featuresExcluded: [
      "X Premium competitions",
    ],
  },
  {
    id: "competition",
    slug: "competition",
    name: "Competition Passes",
    subtitle: "(The Blue Pass)",
    price: "₹199",
    basePrice: 199,
    theme: "blue",
    featuresIncluded: [
      "Entry to any competition(s)",
      "General Summit access included",
      "Prize eligibility",
      "Entry to competitions",
      "Fast-track registration",
      "Special certificate",
      "Leaderboard eligibility",
      "Extra prizes",
    ],
    featuresExcluded: [],
  },
  {
    id: "premium",
    slug: "premium",
    name: "Premium Passes",
    subtitle: "(The Green Pass)",
    price: "₹499",
    basePrice: 499,
    theme: "green",
    featuresIncluded: [
      "All sessions",
      "Priority seating at event",
      "Goodie kit",
      "All competitions access",
      "Networking lounge",
      "Speaker meet & greet",
      "Premium certificate",
    ],
    featuresExcluded: [],
  },
];

const THEME_STYLES = {
  purple: {
    border: "hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]",
    iconBg: "from-purple-400/30 to-white/10",
    iconColor: "text-purple-300/90",
    checkBg: "bg-purple-500/20 text-purple-400",
    gradientForm: "from-violet-500 to-purple-600",
  },
  red: {
    border: "hover:border-red-500/40 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]",
    iconBg: "from-red-400/30 to-white/10",
    iconColor: "text-red-300/90",
    checkBg: "bg-red-500/20 text-red-400",
    gradientForm: "from-red-500 to-rose-600",
  },
  blue: {
    border: "hover:border-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]",
    iconBg: "from-blue-400/30 to-white/10",
    iconColor: "text-blue-300/90",
    checkBg: "bg-blue-500/20 text-blue-400",
    gradientForm: "from-blue-500 to-indigo-600",
  },
  green: {
    border: "hover:border-green-500/40 hover:shadow-[0_0_25px_rgba(34,197,94,0.15)]",
    iconBg: "from-green-400/30 to-white/10",
    iconColor: "text-green-300/90",
    checkBg: "bg-green-500/20 text-green-400",
    gradientForm: "from-green-500 to-emerald-600",
  },
};

function FeatureItem({ text, included, theme = "purple" }) {
  const styles = THEME_STYLES[theme] || THEME_STYLES.purple;
  return (
    <li className="flex items-start gap-2 text-sm text-white/90">
      <span
        className={`shrink-0 mt-0.5 rounded-full p-0.5 ${
          included ? styles.checkBg : "bg-red-500/20 text-red-500"
        }`}
      >
        {included ? (
          <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
        ) : (
          <X className="w-3.5 h-3.5" strokeWidth={2.5} />
        )}
      </span>
      <span className={included ? "" : "text-zinc-500"}>{text}</span>
    </li>
  );
}

function PassCard({ pass, onRegister, onUpgrade, isUpgrade, userPassStatus }) {
  const canRegister = !!onRegister;
  const themeName = pass.theme || "purple";
  const styles = THEME_STYLES[themeName] || THEME_STYLES.purple;

  const statusLabel =
    userPassStatus === "approved"
      ? "Purchased"
      : userPassStatus === "pending_verification"
        ? "Under Verification"
        : userPassStatus === "pending_payment"
          ? "Payment Pending"
          : null;

  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl bg-zinc-900/80 border border-white/10 shadow-xl shadow-black/40 overflow-hidden backdrop-blur-sm transition-all duration-300 ${styles.border}`}
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-7">
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col items-center text-center mb-6">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center mb-3 border border-white/10 ${styles.iconBg}`}
            >
              <Crown className={`w-5 h-5 ${styles.iconColor}`} />
            </div>
            <h3 className="text-xl font-bold text-white">{pass.name}</h3>
            <p className="text-sm text-white/70 mt-1">{pass.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-baseline justify-center gap-2 mb-5">
            <span className="text-2xl font-bold text-white">{pass.price}</span>
          </div>
          <div className="mt-auto">
            {statusLabel ? (
              <div className="block w-full py-3 rounded-xl text-center text-sm font-semibold uppercase tracking-wide text-white/60 bg-zinc-700/60 border border-white/10 mb-6">
                {statusLabel}
              </div>
            ) : isUpgrade && onUpgrade ? (
              <button
                type="button"
                onClick={() => onUpgrade(pass)}
                className={`w-full py-3 rounded-xl text-center text-sm font-semibold uppercase tracking-wide text-white bg-gradient-to-br border-0 cursor-pointer mb-6 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 ${styles.gradientForm}`}
              >
                <ArrowUpCircle className="w-4 h-4" />
                Upgrade
              </button>
            ) : canRegister ? (
              <button
                type="button"
                onClick={() => onRegister(pass)}
                className={`block w-full py-3 rounded-xl text-center text-sm font-semibold uppercase tracking-wide text-white bg-gradient-to-br border-0 cursor-pointer mb-6 hover:opacity-90 transition-opacity ${styles.gradientForm}`}
              >
                {pass.basePrice === 0 ? "Register" : "Buy Pass"}
              </button>
            ) : (
              <Link
                to="/login"
                className="block w-full py-3 rounded-xl text-center text-sm font-semibold uppercase tracking-wide text-white/80 bg-zinc-700/80 border border-white/10 mb-6"
              >
                Login to Register
              </Link>
            )}
          </div>
        </div>
        <ul className="space-y-2 mt-2">
          {pass.featuresIncluded.map((f) => (
            <FeatureItem key={f} text={f} included theme={themeName} />
          ))}
          {pass.featuresExcluded.map((f) => (
            <FeatureItem key={f} text={f} included={false} theme={themeName} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function PaymentModal({ pass, paymentQrUrl, onClose, onSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const fileRef = useRef();

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ text: "Please upload a payment screenshot", type: "error" });
      return;
    }
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const { url } = await uploadPaymentScreenshot(file);
      await createPaymentRequest({
        passTypeId: pass.backendId,
        screenshotUrl: url,
      });
      setMessage({ text: "Payment submitted! Under verification.", type: "success" });
      setTimeout(() => onSuccess(), 1500);
    } catch (err) {
      setMessage({ text: err.message || "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-xl font-bold text-white mb-1">Buy {pass.name}</h3>
        <p className="text-white/60 text-sm mb-4">
          Pay <span className="text-white font-semibold">{pass.price}</span> via
          UPI and upload the screenshot.
        </p>

        {paymentQrUrl ? (
          <div className="flex justify-center mb-4">
            <img
              src={paymentQrUrl}
              alt="UPI QR Code"
              className="w-48 h-48 rounded-xl border border-white/10 bg-white p-2"
            />
          </div>
        ) : (
          <div className="flex justify-center mb-4 p-6 rounded-xl border border-dashed border-white/20">
            <p className="text-white/40 text-sm">Payment QR not available. Contact admin.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-400 text-xs font-medium mb-2">
              Upload payment screenshot
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="cursor-pointer border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-purple-500/50 transition-colors"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-40 mx-auto rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-white/50">
                  <Upload className="w-8 h-8" />
                  <span className="text-sm">Click to select image</span>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {message.text && (
            <p
              className={
                message.type === "error"
                  ? "text-red-400 text-sm"
                  : "text-emerald-400 text-sm"
              }
            >
              {message.text}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !file}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-semibold disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Payment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function UpgradeModal({ upgradeData, paymentQrUrl, onClose, onSuccess }) {
  const preSelected = upgradeData.preSelectedTargetSlug
    ? upgradeData.upgradeOptions.find((o) => o.slug === upgradeData.preSelectedTargetSlug)
    : null;
  const [selectedTarget, setSelectedTarget] = useState(
    preSelected || upgradeData.upgradeOptions[0] || null,
  );
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const fileRef = useRef();

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedTarget) return;
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const { url } = await uploadPaymentScreenshot(file);
      await createUpgradeRequest({
        fromUserPassId: upgradeData.currentPass.id,
        toPassTypeId: selectedTarget.passTypeId,
        screenshotUrl: url,
      });
      setMessage({
        text: "Upgrade request submitted! Under review.",
        type: "success",
      });
      setTimeout(() => onSuccess(), 1500);
    } catch (err) {
      setMessage({ text: err.message || "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-xl font-bold text-white mb-1">Upgrade Pass</h3>
        <p className="text-white/60 text-sm mb-4">
          Current: <span className="text-white">{upgradeData.currentPass.passType.name}</span>
        </p>

        <div className="space-y-2 mb-4">
          {upgradeData.upgradeOptions.map((opt) => (
            <button
              key={opt.passTypeId}
              type="button"
              onClick={() => setSelectedTarget(opt)}
              className={`w-full p-3 rounded-xl border text-left text-sm transition-colors ${
                selectedTarget?.passTypeId === opt.passTypeId
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-white/10 text-white/70 hover:bg-white/5"
              }`}
            >
              <span className="font-semibold">{opt.name}</span>
              <span className="ml-2 text-purple-300">
                +₹{(opt.remainingCents / 100).toFixed(0)}
              </span>
            </button>
          ))}
        </div>

        {selectedTarget && (
          <>
            <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4 mb-4">
              <p className="text-white/60 text-xs text-center mb-1">Amount to pay</p>
              <p className="text-3xl font-bold text-center text-white">
                ₹{(selectedTarget.remainingCents / 100).toFixed(0)}
              </p>
              <p className="text-white/40 text-xs text-center mt-1">
                {upgradeData.currentPass.passType.name} (₹{(upgradeData.currentPass.passType.amountCents / 100).toFixed(0)})
                {" → "}
                {selectedTarget.name} (₹{(selectedTarget.amountCents / 100).toFixed(0)})
              </p>
            </div>

            <p className="text-white/60 text-sm mb-3 text-center">
              Scan the QR below to pay via UPI, then upload the screenshot.
            </p>

            {paymentQrUrl ? (
              <div className="flex justify-center mb-4">
                <img
                  src={paymentQrUrl}
                  alt="UPI QR Code"
                  className="w-48 h-48 rounded-xl border border-white/10 bg-white p-2"
                />
              </div>
            ) : (
              <div className="flex justify-center mb-4 p-6 rounded-xl border border-dashed border-white/20">
                <p className="text-white/40 text-sm">
                  Payment QR not available. Contact admin.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-2">
                  Upload payment screenshot
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-purple-500/50 transition-colors"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-40 mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-white/50">
                      <Upload className="w-8 h-8" />
                      <span className="text-sm">Click to select image</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {message.text && (
                <p
                  className={
                    message.type === "error"
                      ? "text-red-400 text-sm"
                      : "text-emerald-400 text-sm"
                  }
                >
                  {message.text}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !file}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-semibold disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit Upgrade"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function FreePassModal({ pass, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async () => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      await registerPass({ passTypeSlug: pass.slug });
      setMessage({ text: "Pass registered successfully!", type: "success" });
      setTimeout(() => onSuccess(), 1500);
    } catch (err) {
      setMessage({ text: err.message || "Registration failed.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-xl font-bold text-white mb-1">
          Register for {pass.name}
        </h3>
        <p className="text-white/60 text-sm mb-6">
          This pass is free. Click below to register.
        </p>

        {message.text && (
          <p
            className={
              message.type === "error"
                ? "text-red-400 text-sm mb-4"
                : "text-emerald-400 text-sm mb-4"
            }
          >
            {message.text}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-semibold disabled:opacity-70"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LongPasses() {
  const [modal, setModal] = useState(null); // { type: 'free'|'payment'|'upgrade', pass?, data? }
  const [myPasses, setMyPasses] = useState(null);
  const [paymentQrUrl, setPaymentQrUrl] = useState(null);
  const [passTypesMap, setPassTypesMap] = useState({}); // slug -> backend id
  const [upgradeData, setUpgradeData] = useState(null);
  const loggedIn = isAuthenticated();

  const refreshPasses = () => {
    getMyPasses()
      .then((data) => {
        const list = data?.payload?.passes ?? (Array.isArray(data) ? data : data?.passes ?? data?.data ?? null);
        setMyPasses(list);
      })
      .catch(() => setMyPasses(null));
  };

  useEffect(() => {
    getPaymentConfig().then((cfg) => setPaymentQrUrl(cfg.paymentQrUrl));

    // Build slug -> backendId mapping from API
    import("@/lib/api").then(({ getPassTypes }) => {
      getPassTypes().then((types) => {
        const map = {};
        for (const t of types) {
          map[t.slug] = t.id;
        }
        setPassTypesMap(map);
      });
    });
  }, []);

  useEffect(() => {
    if (loggedIn) {
      refreshPasses();
    }
  }, [loggedIn]);

  const getStatusForSlug = (slug) => {
    if (!myPasses || !Array.isArray(myPasses)) return null;
    const match = myPasses.find(
      (p) => p.passType?.slug === slug || p.pass_type === slug,
    );
    return match?.status ?? null;
  };

  const handleRegisterClick = (pass) => {
    if (pass.basePrice === 0) {
      setModal({ type: "free", pass: { ...pass, backendId: passTypesMap[pass.slug] } });
    } else {
      setModal({ type: "payment", pass: { ...pass, backendId: passTypesMap[pass.slug] } });
    }
  };

  const handleUpgradeClick = async (targetSlug) => {
    const data = await getUpgradeEligibility();
    if (data && data.upgradeOptions?.length > 0) {
      setUpgradeData({ ...data, preSelectedTargetSlug: targetSlug || null });
      setModal({ type: "upgrade" });
    }
  };

  const handleCardUpgradeClick = (pass) => {
    handleUpgradeClick(pass.slug);
  };

  const handleModalSuccess = () => {
    setModal(null);
    setUpgradeData(null);
    refreshPasses();
  };

  const handleCloseModal = () => {
    setModal(null);
    setUpgradeData(null);
  };

  const hasApprovedPass = myPasses?.some((p) => p.status === "approved");
  const highestApproved = myPasses
    ?.filter((p) => p.status === "approved")
    ?.sort((a, b) => (b.passType?.amountCents ?? 0) - (a.passType?.amountCents ?? 0))?.[0];
  const hasNonPremiumApproved =
    highestApproved && highestApproved.passType?.slug !== "premium";

  return (
    <section
      id="passes"
      className="relative w-full max-w-[100vw] min-h-0 h-auto m-0 p-0 overflow-x-hidden overflow-y-visible py-8 md:py-12 bg-[#050005]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-[#050005] to-[#050005]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-violet-500/12 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16 px-2 sm:px-0">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-purple-400/90 mb-2">
            E-Summit 2k26
          </p>
          <h2 className="font-sans text-[clamp(32px,5vw,64px)] text-white font-bold uppercase tracking-[2px] m-0 pb-4 px-1">
            Long Passes
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-transparent mx-auto rounded-full mb-4" />
          <p className="text-white/60 text-sm max-w-xl mx-auto px-1 sm:px-2">
            Choose the pass that fits your experience. All passes include access
            to keynotes, events, and more.
          </p>
        </div>

        {loggedIn && (
          <div className="mb-10 p-4 rounded-2xl bg-white/[0.06] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">My passes</h3>
              {hasNonPremiumApproved && (
                <button
                  type="button"
                  onClick={() => handleUpgradeClick()}
                  className="flex items-center gap-1.5 text-sm text-purple-300 hover:text-purple-200 transition-colors"
                >
                  <ArrowUpCircle className="w-4 h-4" />
                  Upgrade Pass
                </button>
              )}
            </div>
            {myPasses === null ? (
              <p className="text-white/60 text-sm">Loading...</p>
            ) : myPasses && myPasses.length > 0 ? (
              <ul className="space-y-2 text-sm text-white/80">
                {myPasses.map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="font-medium text-white">
                      {p.passType?.name || p.passType || "Pass"}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        p.status === "approved"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : p.status === "rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {p.status === "approved"
                        ? "Approved"
                        : p.status === "pending_verification"
                          ? "Under Verification"
                          : p.status === "rejected"
                            ? "Rejected"
                            : p.status ?? "Registered"}
                    </span>
                    {p.createdAt && (
                      <span className="text-white/40 text-xs">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/60 text-sm">
                You haven't registered for a pass yet.
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {PASSES.map((pass) => {
            const status = getStatusForSlug(pass.slug);
            const highestAmount = highestApproved?.passType?.amountCents ?? 0;
            const shouldUpgrade =
              !status && hasApprovedPass && pass.basePrice > 0 && pass.basePrice * 100 > highestAmount;

            return (
              <PassCard
                key={pass.id}
                pass={pass}
                onRegister={loggedIn ? handleRegisterClick : null}
                onUpgrade={loggedIn ? handleCardUpgradeClick : null}
                isUpgrade={shouldUpgrade}
                userPassStatus={status}
              />
            );
          })}
        </div>
      </div>

      {modal?.type === "free" && (
        <FreePassModal
          pass={modal.pass}
          onClose={handleCloseModal}
          onSuccess={handleModalSuccess}
        />
      )}

      {modal?.type === "payment" && (
        <PaymentModal
          pass={modal.pass}
          paymentQrUrl={paymentQrUrl}
          onClose={handleCloseModal}
          onSuccess={handleModalSuccess}
        />
      )}

      {modal?.type === "upgrade" && upgradeData && (
        <UpgradeModal
          upgradeData={upgradeData}
          paymentQrUrl={paymentQrUrl}
          onClose={handleCloseModal}
          onSuccess={handleModalSuccess}
        />
      )}
    </section>
  );
}
