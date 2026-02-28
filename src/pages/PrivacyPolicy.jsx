import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#050005] text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-[#050005] to-[#050005] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white mb-8">
          Privacy Policy
        </h1>

        <p className="text-gray-400 mb-8">Last updated: February 13, 2026</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Introduction
            </h2>
            <p>
              E-Summit 2026, organized by CGC Landran ("we," "our," or "us"), is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you register for or participate in our event.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-medium text-purple-300 mb-3">
              Personal Information
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Full name and contact details (email, phone number)</li>
              <li>Educational institution and course details</li>
              <li>College ID or enrollment number</li>
              <li>Profile photograph (if provided)</li>
              <li>
                Payment information (processed securely through third-party
                providers)
              </li>
            </ul>

            <h3 className="text-xl font-medium text-purple-300 mb-3">
              Automatically Collected Information
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Website usage patterns and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process your event registration and participation</li>
              <li>To communicate important event updates and announcements</li>
              <li>To provide customer support and respond to inquiries</li>
              <li>
                To send promotional materials about future events (with your
                consent)
              </li>
              <li>To improve our website and event experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Information Sharing
            </h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Event Partners & Sponsors:</strong> Limited information
                may be shared with event sponsors for networking purposes (with
                your consent).
              </li>
              <li>
                <strong>Service Providers:</strong> Third-party vendors who
                assist in event operations, payment processing, and
                communications.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights and safety.
              </li>
            </ul>
            <p className="mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Your Rights
            </h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and review your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>
                Request deletion of your data (subject to legal requirements)
              </li>
              <li>Opt-out of promotional communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Cookies
            </h2>
            <p>
              Our website uses cookies to enhance your browsing experience,
              analyze site traffic, and personalize content. You can control
              cookie preferences through your browser settings. Disabling
              cookies may affect certain website functionalities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Data Retention
            </h2>
            <p>
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this policy, unless a longer
              retention period is required by law. After the event, data may be
              retained for up to 2 years for administrative and follow-up
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Children's Privacy
            </h2>
            <p>
              Our event and services are not directed to individuals under 16
              years of age. We do not knowingly collect personal information
              from children. If we become aware that we have collected data from
              a child, we will take steps to delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated revision date. We encourage
              you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              11. Contact Us
            </h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our
              data practices, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <p>
                <strong>E-Summit 2026 - CGC Landran</strong>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:esummit@cgc.edu.in"
                  className="text-purple-400 hover:text-purple-300"
                >
                  esummit@cgc.edu.in
                </a>
              </p>
              <p>Address: CGC Landran, Mohali, Punjab, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
