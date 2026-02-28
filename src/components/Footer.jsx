import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="w-full pt-8 pb-6 border-t border-white/10 relative z-[100] backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.3)] pointer-events-auto"
      style={{ background: "rgba(168, 85, 247, 0.45)" }}
    >
      <div className="mx-auto px-6 w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1: Logo */}
          <div className="space-y-6 flex flex-col justify-center logo">
            <a
              href="#"
              className="!flex-row !items-end gap-2 !text-2xl no-underline text-white font-sans"
            >
              E-CELL{" "}
              <span className="text-[0.5em] opacity-70 tracking-[2px] mb-1">
                CGC
              </span>
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-sans text-white">
              Quick Links
            </h3>
            <ul className="space-y-4 font-sans">
              {[
                { label: "Passes", to: "/passes" },
                { label: "Competition", to: "/events?category=competition" },
                { label: "Events", to: "/events" },
                { label: "Team", to: "/team" },
                { label: "Expo", to: "/expo" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-white  hover:text-purple-400 transition-colors duration-300 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-sans text-white">
              Resources
            </h3>
            <ul className="space-y-4 font-sans">
              <li>
                <Link
                  to="/terms"
                  className="text-white  hover:text-purple-400 transition-colors duration-300 text-sm"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-white hover:text-purple-400 transition-colors duration-300 text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-white  hover:text-purple-400 transition-colors duration-300 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white  hover:text-purple-400 transition-colors duration-300 text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-sans text-white">
              Contact Us
            </h3>
            <p className="text-white  text-sm font-sans">
              Have queries or want to collaborate? Reach out to us anytime.
            </p>
              <div className="flex flex-col gap-2">
              <a
              href="tel:+918817614784"
              className="inline-flex items-center gap-2 btn-gradient text-white px-6 py-3 rounded-lg font-bold font-sans hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Phone size={18} />
              +91 93897 23192
            </a><a
              href="tel:+918817614784"
              className="inline-flex items-center gap-2 btn-gradient text-white px-6 py-3 rounded-lg font-bold font-sans hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Phone size={18} />
              +91 88176 14784
            </a>
           </div>
            
          </div>

          {/* Column 5: Reach Out & Socials */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-sans text-white">
              Reach Out
            </h3>
            <div className="space-y-4 font-sans text-sm text-white ">
              <a
                href="https://maps.app.goo.gl/DavwByr3tG3bNzb6A"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white  hover:text-purple-400 transition-colors"
              >
             Block 10, CGC, Landran – 140307
              </a>
            </div>

            <div className="flex gap-4 pt-4">
              {[
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/esummit_cgc",
                  label: "Instagram",
                },
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/company/ecellcgc/",
                  label: "LinkedIn",
                },
                {
                  Icon: Mail,
                  href: "mailto:esummit@ecellcgccoe.com",
                  label: "Email",
                },
              ].map(({ Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  {...(href.startsWith("mailto:")
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-purple-600 hover:scale-110 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
      </div>
    </footer>
  );
};

export default Footer;
