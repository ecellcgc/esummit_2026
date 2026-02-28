import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function TermsAndConditions() {
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
          Terms and Conditions
        </h1>

        <p className="text-gray-400 mb-8">Last updated: February 13, 2026</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By registering for or attending E-Summit 2026 organized by CGC
              Landran, you agree to be bound by these Terms and Conditions. If
              you do not agree with any part of these terms, please do not
              register for or attend the event.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Event Registration
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Registration is required for participation in E-Summit 2026.
              </li>
              <li>
                All information provided during registration must be accurate
                and complete.
              </li>
              <li>
                Registration fees, if any, are non-refundable unless otherwise
                stated.
              </li>
              <li>
                The organizers reserve the right to refuse registration or deny
                entry at their discretion.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Code of Conduct
            </h2>
            <p className="mb-4">
              All participants must adhere to the following code of conduct:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Treat all attendees, speakers, sponsors, and staff with respect.
              </li>
              <li>
                Refrain from any form of harassment, discrimination, or
                inappropriate behavior.
              </li>
              <li>
                Follow all instructions given by event staff and security
                personnel.
              </li>
              <li>Respect the venue and its property.</li>
              <li>Do not engage in any illegal activities during the event.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Intellectual Property
            </h2>
            <p>
              All content presented at E-Summit 2026, including but not limited
              to presentations, workshops, and materials, is the intellectual
              property of the respective speakers or organizers. Unauthorized
              recording, reproduction, or distribution is prohibited without
              prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Photography and Recording
            </h2>
            <p>
              By attending E-Summit 2026, you consent to being photographed,
              filmed, or recorded. These materials may be used for promotional
              purposes, social media, and future event marketing without
              additional consent or compensation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Liability
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                The organizers are not responsible for any personal injury,
                loss, or damage to property during the event.
              </li>
              <li>
                Participants are responsible for their own belongings and
                personal safety.
              </li>
              <li>
                The organizers reserve the right to modify the event schedule,
                speakers, or venue as necessary.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Competition Rules
            </h2>
            <p className="mb-4">
              For participants in competitive events (Pitch Tank, IPL Auction,
              etc.):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All submissions must be original work.</li>
              <li>Decisions made by judges are final and binding.</li>
              <li>
                Prizes are non-transferable and cannot be exchanged for cash
                unless specified.
              </li>
              <li>
                The organizers reserve the right to disqualify participants for
                rule violations.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Changes to Terms
            </h2>
            <p>
              The organizers reserve the right to modify these terms at any
              time. Participants will be notified of significant changes via
              email or through the official website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Contact
            </h2>
            <p>
              For any questions regarding these Terms and Conditions, please
              contact us at{" "}
              <a
                href="mailto:esummit@cgc.edu.in"
                className="text-purple-400 hover:text-purple-300"
              >
                esummit@cgc.edu.in
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
