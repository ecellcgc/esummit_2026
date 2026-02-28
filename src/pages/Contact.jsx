import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the form data to a backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050005] text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-[#050005] to-[#050005] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white mb-4">
          Contact Us
        </h1>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Have questions about E-Summit 2026? We'd love to hear from you. Send
          us a message and we'll respond as soon as possible.
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left column: extra info + form */}
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="font-semibold text-white mb-2">Why reach out?</h3>
              <p className="text-gray-400 text-sm">
                Registration help, competition queries, sponsorship inquiries, or technical support — we’re here to help. <br /> Drop a message and our team will get back within 24–48 hours <br />Drop a message and our team will get back within 24–48 hours.
                .
                </p>
            </div>
            {/* Contact Form */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Message Sent!</h3>
                <p className="text-gray-400 mb-6">
                  Thank you for reaching out. Our team will get back to you
                  within 24-48 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="">Select a topic</option>
                    <option value="registration">Registration Inquiry</option>
                    <option value="competition">Competition/Event Query</option>
                    <option value="sponsorship">
                      Sponsorship & Partnership
                    </option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
          </div>

          {/* Right column: contact info - uniform spacing */}
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1.5">Email Us</h3>
                <a
                  href="mailto:esummit@cgc.edu.in"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  esummit@cgc.edu.in
                </a>
                <p className="text-sm text-gray-500 mt-1.5">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-purple-400" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-white mb-1.5">Call Us</h3>
                <div className="space-y-1.5 text-sm">
                <p className="text-white/60 flex justify-between gap-3"><span className="text-white/80">Sarang</span> <a href="tel:+919389723192" className="hover:text-purple-400 transition-colors shrink-0">+91 93897 23192</a></p>

                  <p className="text-white/60 flex justify-between gap-3"><span className="text-white/80">Aashi</span> <a href="tel:+918817614784" className="hover:text-purple-400 transition-colors shrink-0">+91 88176 14784</a></p>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Mon-Sat, 10 AM - 6 PM IST
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1.5">Visit Us</h3>
                <p className="text-gray-400 text-sm">
                  CGC Landran
                  <br />
                  NH-05, Landran
                  <br />
                  Mohali, Punjab 140307
                  <br />
                  India
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="font-semibold text-white mb-1.5">Follow Us</h3>
              <p className="text-gray-400 text-sm mb-4">
                Stay updated with the latest news and announcements
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/esummit_cgc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-purple-600/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/ecellcgc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-purple-600/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/esummit_cgc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-purple-600/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <iframe
                title="CGC Landran Location - Chandigarh Group of Colleges"
                src="https://www.google.com/maps?q=Chandigarh+Group+of+Colleges+Landran+NH+05+Landran+Mohali+Punjab+140307&z=16&output=embed"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
