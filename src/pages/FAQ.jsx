import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is E-Summit 2026?",
        a: "E-Summit 2026 is CGC Landran's flagship entrepreneurship event, bringing together students, founders, investors, and industry leaders for two days of inspiring keynotes, competitive challenges, startup exhibitions, and networking opportunities.",
      },
      {
        q: "When and where is E-Summit 2026 taking place?",
        a: "E-Summit 2026 is scheduled for March 18-19, 2026, at CGC Landran campus in Mohali, Punjab, India.",
      },
      {
        q: "Who can attend E-Summit 2026?",
        a: "The event is open to all students, aspiring entrepreneurs, startup founders, professionals, and anyone interested in entrepreneurship and innovation. Both college students and working professionals are welcome.",
      },
      {
        q: "Is there a registration fee?",
        a: "Registration fees vary based on the events you wish to participate in. Please check our registration page for current pricing and available passes.",
      },
    ],
  },
  {
    category: "Registration",
    questions: [
      {
        q: "How do I register for E-Summit 2026?",
        a: "You can register through our official website by clicking the 'Register' button. Fill in your details, select your preferred events, and complete the payment process.",
      },
      {
        q: "Can I register on-spot at the venue?",
        a: "On-spot registrations may be available based on capacity, but we strongly recommend registering online in advance to secure your spot and get early-bird discounts.",
      },
      {
        q: "Is group registration available?",
        a: "Yes, we offer group registration discounts for teams of 5 or more participants. Contact us at esummit@cgc.edu.in for group registration details.",
      },
      {
        q: "Can I cancel my registration and get a refund?",
        a: "Cancellations made at least 7 days before the event may be eligible for a partial refund. Please refer to our Terms and Conditions for the complete refund policy.",
      },
    ],
  },
  {
    category: "Events & Competitions",
    questions: [
      {
        q: "What events are part of E-Summit 2026?",
        a: "E-Summit 2026 features multiple events including Pitch Tank (startup pitching competition), IPL Auction (business quiz), Startup Reality Show workshops, E-Carnival, networking sessions, and keynote talks by industry leaders.",
      },
      {
        q: "How do I participate in Pitch Tank?",
        a: "Register for Pitch Tank through our website and submit your startup idea/problem statement. Top 20 teams will be shortlisted for the semi-finals held during the event.",
      },
      {
        q: "What is the IPL Auction event?",
        a: "IPL Auction is an exciting business quiz competition with a cricket-themed format. Teams compete through elimination rounds to win exciting prizes.",
      },
      {
        q: "Are there prizes for competition winners?",
        a: "Yes! All major competitions have attractive prize pools including cash prizes, incubation opportunities, mentorship, and more. Details will be announced on our social media handles.",
      },
    ],
  },
  {
    category: "Logistics",
    questions: [
      {
        q: "Is accommodation provided?",
        a: "Accommodation is not included in the registration fee. However, we can provide recommendations for nearby hotels and hostels. Limited on-campus accommodation may be available on request.",
      },
      {
        q: "Will food be provided during the event?",
        a: "Lunch and refreshments will be provided to all registered participants on both days of the event. Please inform us of any dietary restrictions during registration.",
      },
      {
        q: "Is there parking available at the venue?",
        a: "Yes, free parking is available at CGC Landran campus for all attendees.",
      },
      {
        q: "How do I reach CGC Landran?",
        a: "CGC Landran is located on NH-05, Landran, Mohali. It's approximately 12 km from Chandigarh city center. You can reach via personal vehicle, cab services, or public transport.",
      },
    ],
  },
  {
    category: "Technical & Support",
    questions: [
      {
        q: "I'm having trouble with registration. What should I do?",
        a: "If you face any issues during registration, please email us at esummit@cgc.edu.in with your details and a screenshot of the error. Our team will assist you promptly.",
      },
      {
        q: "How will I receive my event pass?",
        a: "Upon successful registration, you'll receive a confirmation email with a QR code pass. You can also download your pass from the dashboard after logging in.",
      },
      {
        q: "Can I transfer my registration to someone else?",
        a: "Registration transfers are allowed up to 3 days before the event. Contact our support team with the details of both parties to process the transfer.",
      },
      {
        q: "Who do I contact for sponsorship or partnership opportunities?",
        a: "For sponsorship and partnership inquiries, please email partnerships@cgc.edu.in or fill out the contact form on our website.",
      },
    ],
  },
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-purple-300 transition-colors"
      >
        <span className="text-lg font-medium pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

function FAQ() {
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

        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-400 mb-12">
          Find answers to common questions about E-Summit 2026. Can't find what
          you're looking for?{" "}
          <Link to="/contact" className="text-purple-400 hover:text-purple-300">
            Contact us
          </Link>
          .
        </p>

        <div className="space-y-10">
          {faqs.map((category, idx) => (
            <section key={idx}>
              <h2 className="text-2xl font-semibold text-purple-400 mb-6">
                {category.category}
              </h2>
              <div className="bg-white/5 rounded-xl border border-white/10 px-6">
                {category.questions.map((faq, qIdx) => (
                  <FAQItem key={qIdx} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-purple-900/20 to-purple-600/10 rounded-2xl border border-purple-500/20">
          <h3 className="text-2xl font-semibold mb-4">Still have questions?</h3>
          <p className="text-gray-400 mb-6">
            Our team is here to help. Reach out to us and we'll get back to you
            as soon as possible.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-full font-medium transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
