import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "@/assets/bgimage.png";
import { requestOtp, verifyOtp } from "@/lib/api";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-['Space_Grotesk',sans-serif] text-base transition-all duration-300 focus:outline-none focus:border-purple-500 focus:bg-purple-500/5 focus:ring-4 focus:ring-purple-500/10 placeholder:text-zinc-500";

function Login() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const msgBoxRef = useRef(null);
  const navigate = useNavigate();

  const setMessageAndShow = (text, type) => {
    setMessage({ text, type });
    if (msgBoxRef.current) msgBoxRef.current.style.display = "block";
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    if (msgBoxRef.current) msgBoxRef.current.style.display = "none";
    const cleanEmail = email.trim();
    if (!cleanEmail) return;
    setLoading(true);
    try {
      await requestOtp(cleanEmail);
      setMessageAndShow(`OTP sent to ${cleanEmail}. Check your inbox.`, "success");
      setStep(2);
    } catch (err) {
      setMessageAndShow(err.message || "Failed to send OTP.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    if (msgBoxRef.current) msgBoxRef.current.style.display = "none";
    const cleanOtp = otp.replace(/\D/g, "");
    if (cleanOtp.length !== 6) {
      setMessageAndShow("Please enter the 6-digit OTP.", "error");
      return;
    }
    setLoading(true);
    try {
      const payload = await verifyOtp(email.trim(), cleanOtp);
      const user = payload.user || payload;
      if (user && user.onboardingCompletedAt == null) {
        navigate("/onboarding", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setMessageAndShow(err.message || "Invalid or expired OTP.", "error");
    } finally {
      setLoading(false);
    }
  };

  const msgBoxClass =
    "mt-4 py-3 px-4 rounded-md text-sm text-center font-medium hidden " +
    (message.type === "error"
      ? "!block bg-red-500/10 text-red-400 border border-red-500/20"
      : message.type === "success"
        ? "!block bg-green-500/10 text-emerald-400 border border-green-500/20"
        : "");

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center relative overflow-x-hidden overflow-y-auto py-12 font-['Space_Grotesk',sans-serif] bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bgImage})`,
      }}
    >
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] text-center z-[1] pointer-events-none">
        <h1
          className="font-['Syne',sans-serif] font-extrabold text-[15vw] leading-none whitespace-nowrap text-white/[0.02] [-webkit-text-stroke:2px_rgba(168,85,247,0.1)] [text-shadow:0_0_80px_rgba(168,85,247,0.4)] blur-[0.5px] md:text-[20vw] md:whitespace-normal md:w-full md:leading-snug"
          aria-hidden
        >
          LOGIN
        </h1>
      </div>

      <div className="fixed w-fit h-fit rounded-full blur-[100px] opacity-50 bg-violet-900 z-0 md:w-[300px] md:h-[300px] md:opacity-40" aria-hidden />
      <div className="fixed w-fit h-fit rounded-full blur-[100px] opacity-50 bg-purple-700 z-0 md:w-[300px] md:h-[300px] md:opacity-40" aria-hidden />

      <div className="relative z-10 w-full flex justify-center px-5 py-10 md:px-4">
        <div
          className="w-fit min-w-[420px] max-w-[520px] py-12 px-10 md:py-8 md:px-6 bg-[rgba(10,10,10,0.6)] backdrop-blur-[20px] border border-white/[0.08] border-t-white/15 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fadeSlideUp"
          style={{ opacity: 1 }}
        >
          <div className="text-center mb-8">
            <Link to="/" className="no-underline">
              <h2 className="font-['Syne',sans-serif] text-3xl text-white mb-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02] md:text-[1.75rem]">
                E-SUMMIT<span className="text-purple-500">.</span>
              </h2>
            </Link>
            <p className="text-zinc-400 text-sm">Access your dashboard.</p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOtp}>
              <div className="mb-5 relative">
                <label htmlFor="email" className="block text-zinc-300 text-[0.85rem] mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={inputClass}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-4 rounded-xl border-0 bg-gradient-to-br from-violet-400 to-purple-600 text-white font-['Syne',sans-serif] font-bold text-base uppercase tracking-wide flex justify-center items-center gap-2.5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(147,51,234,0.4)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading}
              >
                {loading ? "Sending…" : "Send OTP"}
                {!loading && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                )}
              </button>
              <div ref={msgBoxRef} className={msgBoxClass}>
                {message.text}
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-5">
                <p className="text-zinc-400 text-sm mb-3">Enter the 6-digit code sent to {email}</p>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    containerClassName="gap-1"
                  >
                    <InputOTPGroup
                      className={cn(
                        "gap-1",
                        "border border-white/10 rounded-xl bg-white/5 p-2"
                      )}
                    >
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className={cn(
                            "h-12 w-11 rounded-lg border-white/20 bg-white/5 text-white text-lg font-['Space_Grotesk',sans-serif]",
                            "first:rounded-l-lg last:rounded-r-lg"
                          )}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-4 rounded-xl border-0 bg-gradient-to-br from-violet-400 to-purple-600 text-white font-['Syne',sans-serif] font-bold text-base uppercase tracking-wide flex justify-center items-center gap-2.5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(147,51,234,0.4)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading || otp.replace(/\D/g, "").length !== 6}
              >
                {loading ? "Verifying…" : "Verify & sign in"}
              </button>
              <button
                type="button"
                onClick={() => { setStep(1); setOtp(""); setMessage({ text: "", type: "" }); }}
                className="w-full mt-3 py-2 text-zinc-400 text-sm hover:text-white transition-colors"
              >
                Use a different email
              </button>
              <div ref={msgBoxRef} className={msgBoxClass}>
                {message.text}
              </div>
            </form>
          )}

          <div className="mt-6 text-center text-[0.85rem] text-zinc-500">
            <p>
              Not registered yet?{" "}
              <Link to="/register" className="text-white no-underline border-b border-white/20 hover:border-purple-500 transition-colors">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
