import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import heroLogo from "../assets/hero-logo.png";

function HeroSection({ scrollToPage }) {
  const canvasRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("user_data"));
    };
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Text settings
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 160px Arial";

    // ========== HERO: TEXT ZOOM ANIMATION ==========
    let scale = 0.1;

    function revealText() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(scale, scale);

      // Draw Text
      ctx.fillStyle = "black";
      ctx.fillText("E-SUMMIT 2K26", 0, 0);

      ctx.restore();

      if (scale < 1) {
        scale += 0.02;
        requestAnimationFrame(revealText);
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <section className="relative w-full max-w-[100vw] min-h-screen h-auto m-0 p-0 overflow-hidden" id="page1">
      {/* Blur overlay: softens the bright bg image and improves text readability */}
      <div
        className="absolute inset-0 z-0 backdrop-blur-[1px] bg-black/25 pointer-events-none"
        aria-hidden
      />
      <div className="relative z-[2] w-full h-full flex flex-col justify-between pointer-events-none">
        {/* Desktop/tablet: logo at top */}
        <div className="absolute top-[4%] left-0 right-0 w-full hidden md:flex justify-center px-4 z-[2] pointer-events-auto">
          <div className="w-full max-w-[min(1500px,100%)] flex flex-col items-center text-center">
            <img
              src={heroLogo}
              alt="E-Summit 2026 Logo"
              className="w-full max-w-[min(1500px,100%)] min-h-[280px] max-h-[92vh] mx-auto object-contain overflow-hidden clip-path-[inset(30%_0_30%_0)] drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            />
          </div>
        </div>
      </div>

      {/* Mobile only: dedicated region for E-Summit logo — centered in viewport */}
      <div className="absolute top-[28%] bottom-[clamp(6rem,22vw,9rem)] inset-x-0 w-full max-w-[100vw] md:hidden flex items-center justify-center px-4 pointer-events-none z-[10] box-border">
        <img
          src={heroLogo}
          alt="E-Summit 2026 Logo"
          className="block w-[85vw] max-w-[320px] h-auto max-h-full object-contain object-center mx-auto drop-shadow-[0_0_24px_rgba(168,85,247,0.4)]"
        />
      </div>

      {/* Bottom: CTA buttons, date/venue, scroll button, social icons */}
      <div className="w-full pointer-events-auto absolute bottom-0 left-0 z-50 flex flex-col items-center gap-3 p-[clamp(1rem,4vw,2rem)] px-[clamp(1rem,5vw,3rem)] text-white bg-transparent max-[900px]:p-4 max-[600px]:p-4 max-[600px]:px-3 max-[480px]:p-3">
        {/* Register / Login buttons — aligned with site colors (purple primary + glass secondary) */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mb-1">
          <Link
            to="/passes"
            className="group flex flex-row items-center justify-center gap-2.5 py-3 px-6 rounded-full min-w-[140px] font-sans bg-purple-600 hover:bg-purple-500 border border-purple-400/20 text-white font-semibold text-sm tracking-widest uppercase shadow-[0_4px_20px_rgba(168,85,247,0.25)] transition-all duration-300 hover:shadow-[0_6px_24px_rgba(168,85,247,0.35)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black max-[600px]:py-2.5 max-[600px]:px-5 max-[600px]:min-w-[120px] max-[600px]:text-xs"
          >
            <span>Passes</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
        {/* Date and venue — below Register/Login, above scroll button */}
        <div className="flex flex-col items-center gap-0.5 text-center pointer-events-none">

          <p className="font-sans text-xl sm:text-2xl md:text-3xl text-white/90 tracking-widest m-0 font-medium">
            March 18-19, 2026
          </p>
          <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 tracking-widest m-0">
            CGC Landran, Mohali
          </p>
        </div>
        {/* Scroll button + social icons row */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 w-full max-[600px]:grid-cols-1 max-[600px]:justify-items-center">
          <div className="min-w-0" aria-hidden="true" />
          <button
            type="button"
            className="flex flex-row items-center gap-2.5 py-2 px-5  transition-colors duration-300 font-inherit cursor-pointer appearance-none max-[600px]:py-1.5 max-[600px]:px-4"
            onClick={() => scrollToPage?.("page2")}
            aria-label="Scroll to next section"
          >
            <span className="font-sans text-[0.5rem] tracking-[2px] text-white/80 font-medium max-[600px]:text-[0.45rem]">SCROLL</span>
            <ArrowDown size={20} className="text-white/80 animate-pulse-arrow" />
          </button>
          <div className="flex justify-end gap-6 max-[900px]:gap-4 max-[600px]:justify-center">
            <a
              href="https://www.instagram.com/esummit_cgc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 text-white opacity-70 transition-all duration-300 hover:opacity-100 hover:-translate-y-0.5 [&_svg]:w-6 [&_svg]:h-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 text-white opacity-70 transition-all duration-300 hover:opacity-100 hover:-translate-y-0.5 [&_svg]:w-6 [&_svg]:h-6"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>


      <canvas id="draw" ref={canvasRef} className="absolute -top-[5px] left-0 w-full max-w-[100vw] h-[102vh] z-[1] block" />
    </section>
  );
}

export default HeroSection;
