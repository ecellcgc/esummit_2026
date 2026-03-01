import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

function ContactUsSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full max-w-[100vw] min-h-0 h-auto m-0 p-0 overflow-x-hidden overflow-y-visible py-8 md:py-12 bg-black"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-violet-500/12 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 md:px-8">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-10 px-2 sm:px-0">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-purple-400/90 mb-2">
            Get in touch
          </p>
          <h2 className="font-sans text-[clamp(32px,5vw,64px)] text-white font-bold uppercase tracking-[2px] m-0 mb-4 px-1">
            Contact Us
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-transparent mx-auto rounded-full mb-4" />
          <p className="text-white/60 text-sm max-w-xl mx-auto px-1 sm:px-2">
            Have questions about E-Summit 2026? Reach out and we&apos;ll get back to you soon.
          </p>
        </div>

        <div className="grid gap-8 lg:gap-12">
          {/* Contact form - glassy panel
          <div className="rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-white/60 text-sm mb-6">
                  Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-white/90 mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-white/90 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-white/90 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div> */}

          {/* Contact info cards */}
          <div className="space-y-4">
            <a
              href="mailto:official@ecellcgc.in"
              className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/10 hover:border-purple-500/40 transition-colors group shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center shrink-0 group-hover:bg-purple-600/30 transition-colors">
                <Mail className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-0.5">Email Us</h3>
                <p className="text-white/60 text-sm">official@ecellcgc.in</p>
                <p className="text-white/40 text-xs mt-1">We typically respond within 24 hours</p>
              </div>
            </a>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Call Us</h3>
                <div className="space-y-1 text-sm">
                <p className="text-white/60 flex justify-between gap-3"><span className="text-white/80">Sarang</span> <a href="tel:+919389723192" className="hover:text-purple-400 transition-colors">+91 93897 23192</a></p>
                  <p className="text-white/60 flex justify-between gap-3"><span className="text-white/80">Aashi</span> <a href="tel:+918817614784" className="hover:text-purple-400 transition-colors">+91 88176 14784</a></p>

                </div>
                <p className="text-white/40 text-xs mt-2">Mon-Sat, 10 AM - 6 PM IST</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-0.5">Visit Us</h3>
                <p className="text-white/60 text-sm">
                  E-Cell, Block 10, CGC Landran, NH-05, Landran<br />
                  Mohali, Punjab 140307, India
                </p>
              </div>
            </div>
            {/* <Link
              to="/contact"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/10 hover:border-purple-500/40 text-purple-400 hover:bg-purple-500/10 transition-colors text-sm font-medium shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            >
              Full contact page
              <ArrowRight className="w-4 h-4" />
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUsSection;
