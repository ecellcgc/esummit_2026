import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Menu, X, Home, Info, Calendar, Ticket, Sparkles, Users, Mail, Mic, Award } from "lucide-react";
import logo from "../../public/assets/ecl_logo.png";

const navTransition =
  "padding 1.4s cubic-bezier(0.33, 0, 0.67, 1), gap 1.4s cubic-bezier(0.33, 0, 0.67, 1), border-color 1.4s ease, background 1.4s ease";
const centerTransition =
  "max-width 1.4s cubic-bezier(0.33, 0, 0.67, 1), opacity 1.4s cubic-bezier(0.33, 0, 0.67, 1), padding 1.4s cubic-bezier(0.33, 0, 0.67, 1), margin 1.4s ease";

function Navbar({ scrollToPage }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isCompact, setIsCompact] = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("user_data");
      setIsLoggedIn(!!user);
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  // Scroll detection for compact mode
  React.useEffect(() => {
    const scrollContainer =
      document.querySelector(".main-scroll-container") || window;

    const handleScroll = () => {
      const currentScrollY =
        scrollContainer === window ? window.scrollY : scrollContainer.scrollTop;

      if (currentScrollY > 50) {
        if (currentScrollY > lastScrollY.current) {
          setIsCompact(true);
        } else {
          setIsCompact(false);
        }
      } else {
        setIsCompact(false);
      }

      lastScrollY.current = currentScrollY;
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, pageId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname === "/" && scrollToPage) {
      scrollToPage(pageId);
    } else {
      navigate("/");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const mobileLinks = [
    { label: "Home", pageId: "page1", icon: Home },
    { label: "Competitions", pageId: "competitions", icon: Award },
    { label: "Schedule", pageId: "page4", icon: Calendar },
    { label: "Events", to: "/events", icon: Sparkles },
    { label: "Speakers", pageId: "page9", icon: Mic },
  ];

  return (
    <>
      <nav
        className={`
          group fixed top-4 left-1/2 -translate-x-1/2 z-[1000]
          flex justify-between items-center
          w-[90%] max-w-[400px] py-3 px-5 gap-0
          max-[900px]:gap-0
          min-[901px]:w-fit min-[901px]:max-w-[98vw] min-[901px]:py-3 min-[901px]:px-8 min-[901px]:gap-8
          ${isCompact ? "!py-2 !px-3 !gap-2 min-[901px]:!py-2 min-[901px]:!px-3 min-[901px]:!gap-2 min-[901px]:group-hover:!py-3 min-[901px]:group-hover:!px-8 min-[901px]:group-hover:!gap-8 min-[901px]:group-hover:!border-white/\[0.08\]" : ""}
          ${isCompact ? "!border-white/15" : ""}
          ${isCompact ? "max-[900px]:!w-auto max-[900px]:!min-w-[300px]" : ""}
          ${isMenuOpen ? "max-[900px]:!invisible max-[900px]:!pointer-events-none" : ""}
          bg-black/30 backdrop-blur-xl border border-white/[0.08] rounded-full
        `}
        style={{ transition: navTransition }}
      >
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-4">
          <div>
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "page1")}
              className="flex flex-col leading-none no-underline text-white font-bold whitespace-nowrap text-[1.1rem] font-['Proxy_Mono_Beta',monospace]"
            >
              <img src={logo} alt="E-CELL CGC Logo" className="w-10 h-10" />
            </a>
          </div>
        </div>

        {/* CENTER: LINKS (Hidden in Compact Mode, hidden on mobile) */}
        <div
          className={`
            flex items-center overflow-hidden grow justify-center min-w-0
            max-w-[1400px] opacity-100 py-0 px-8
            max-[900px]:!hidden
            ${isCompact ? "!max-w-0 !opacity-0 !pointer-events-none !m-0 !p-0 min-[901px]:group-hover:!max-w-[1400px] min-[901px]:group-hover:!opacity-100 min-[901px]:group-hover:!pointer-events-auto min-[901px]:group-hover:!m-0 min-[901px]:group-hover:!px-8" : ""}
          `}
          style={{ transition: centerTransition }}
        >
          <div className="flex gap-8 whitespace-nowrap">
          
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "page4")}
              className="font-sans text-sm text-zinc-400 uppercase tracking-wide font-medium hover:text-white transition-colors duration-200 no-underline"
            >
              Schedule
            </a>
            <Link
              to="/events"
              className="font-sans text-sm text-zinc-400 uppercase tracking-wide font-medium hover:text-white transition-colors duration-200 no-underline"
            >
              Events
            </Link>
          </div>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="hidden min-[901px]:block">
              <Link
                to="/dashboard"
                className="group bg-white text-black py-2.5 px-6 rounded-full font-semibold no-underline flex items-center gap-2 text-[0.95rem] whitespace-nowrap transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Dashboard{" "}
                <ArrowUpRight
                  size={16}
                  className="transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          ) : (
            <div className="hidden min-[901px]:block">
              <Link
                to="/login"
                className="group bg-white text-black py-2.5 px-6 rounded-full font-semibold no-underline flex items-center gap-2 text-[0.95rem] whitespace-nowrap transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Login / Register{" "}
                <ArrowUpRight
                  size={16}
                  className="transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          )}

          <button
            type="button"
            className="flex min-[901px]:hidden bg-transparent border-none text-white cursor-pointer z-[1002] ml-4 p-0"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-[999] w-full h-screen
          flex flex-col
          bg-gradient-to-b from-zinc-950 via-zinc-900 to-black
          backdrop-blur-xl
          -translate-y-full opacity-0 invisible pointer-events-none
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isMenuOpen ? "!translate-y-0 !opacity-100 !visible !pointer-events-auto" : ""}
        `}
        style={{
          boxShadow: isMenuOpen ? "inset 0 0 80px rgba(168,85,247,0.06)" : undefined,
        }}
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Header: logo + close */}
        <div className="relative z-10 flex items-center justify-between w-full px-5 pt-6 pb-4 sm:px-8">
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "page1")}
            className="flex flex-col leading-none no-underline text-white font-bold whitespace-nowrap text-[1.1rem] font-['Proxy_Mono_Beta',monospace]"
          >
            E-CELL <span className="text-[0.4em] opacity-70 tracking-[2px] mt-0.5">CGC</span>
          </a>
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Close menu"
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links - scrollable with stagger */}
        <nav className="relative z-10 flex-1 overflow-y-auto flex flex-col items-center justify-center px-4 py-6 min-h-0">
          <div className="w-full max-w-[320px] flex flex-col gap-1">
            {mobileLinks.map((item, index) => {
              const Icon = item.icon;
              const delay = isMenuOpen ? index * 45 : 0;
              const common =
                "font-sans text-xl font-bold uppercase tracking-wide text-white no-underline flex items-center gap-4 w-full py-4 px-5 rounded-2xl transition-all duration-300 ease-out active:scale-[0.98]";
              const hover =
                "hover:bg-white/10 hover:text-purple-200 hover:border-white/20";
              const style = {
                transitionProperty: "transform, opacity, background-color, color, border-color",
                transitionDuration: "300ms",
                transitionDelay: `${delay}ms`,
                transform: isMenuOpen ? "translateY(0)" : "translateY(12px)",
                opacity: isMenuOpen ? 1 : 0,
              };

              if (item.to) {
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${common} ${hover} border border-transparent bg-white/[0.04]`}
                    style={style}
                  >
                    {Icon && <Icon className="w-5 h-5 text-purple-400/80 shrink-0" />}
                    <span>{item.label}</span>
                  </Link>
                );
              }
              return (
                <a
                  key={item.label}
                  href="#"
                  onClick={(e) => handleNavClick(e, item.pageId)}
                  className={`${common} ${hover} border border-transparent bg-white/[0.04]`}
                  style={style}
                >
                  {Icon && <Icon className="w-5 h-5 text-purple-400/80 shrink-0" />}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </nav>

        {/* CTA at bottom */}
        <div className="relative z-10 flex flex-col gap-3 w-full max-w-[320px] mx-auto px-4 pb-8 pt-4 shrink-0">
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl font-semibold uppercase tracking-wide text-white no-underline transition-all duration-300 shadow-[0_4px_20px_rgba(217,132,250,0.35)] bg-gradient-to-r from-[#d984fa] to-[#a855f7] hover:shadow-[0_6px_28px_rgba(217,132,250,0.5)] hover:-translate-y-0.5 active:scale-[0.98]"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl font-semibold uppercase tracking-wide text-white no-underline border-2 border-white/30 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/50 active:scale-[0.98]"
              onClick={() => setIsMenuOpen(false)}
            >
              Login / Register
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
