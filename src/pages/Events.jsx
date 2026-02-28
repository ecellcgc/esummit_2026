import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  X,
  Calendar,
  MapPin,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Events" },
  { id: "competition", label: "Flagship Competitions" },
  { id: "main", label: "Flagship EXPO" },
  { id: "showcase", label: "Flagship Sessions and Talks" },
  { id: "workshop", label: "Networking and Career" },
];

const EVENTS_DATA = [
  // ——— Flagship Competitions ———
  {
    id: 1,
    title: "Pitch Tank – The Startup Investment Challenge",
    category: "competition",
    tag: "Competition",
    shortDescription:
      "The premier startup investment competition of E-Summit 2026. Teams pitch to investors in a boardroom-style funding simulation focused on scalability and execution.",
    image: "/assets/img1.jpg",
    date: "February 25, 2026",
    time: "10:00 AM",
    location: "Block 10 Audi / Central Park, CGC Landran",
    fullDescription:
      "Pitch Tank is the premier startup investment competition of E-Summit 2026, designed to simulate real-world fundraising. Teams pitch their startup ideas to investors, focusing on scalability, market potential, and execution readiness. Finalists experience an immersive boardroom-style funding discussion. Perfect for aspiring founders ready to validate their venture.",
    whyPoints: [
      "Investor-style live pitching",
      "Boardroom fundraising simulation",
      "Expert jury & real-time Q&A",
      "Focus on scalable startup ideas",
      "Hands-on fundraising exposure",
    ],
    participantCount: 42,
    applyLink: "/event-registration",
    registerAudienceLink: "/event-registration",
  },
  {
    id: 2,
    title: "IPL Auction",
    category: "competition",
    tag: "Competition",
    shortDescription:
      "Build the strongest squad within a fixed virtual budget through a live auction. Strategy, risk management, and team coordination—sports excitement meets business.",
    image: "/assets/img2.jpg",
    date: "February 25–26, 2026",
    time: "11:00 AM",
    location: "Block 10 / Board Room, CGC Landran",
    fullDescription:
      "Experience the thrill of strategy and bidding in the IPL Auction. Teams compete to build the strongest squad within a fixed virtual budget through a live auction. The event tests decision-making, risk management, and team coordination—a perfect blend of sports excitement and business strategy.",
    whyPoints: [
      "Live player auction",
      "Budget management challenge",
      "Cricket quiz elimination round",
      "Strategy & risk assessment",
      "High-energy competition",
    ],
    participantCount: 28,
    applyLink: "/event-registration",
    registerAudienceLink: "/event-registration",
  },
  {
    id: 3,
    title: "Mock Trading",
    category: "competition",
    tag: "Competition",
    shortDescription:
      "Live paper trading competition with virtual capital under real market conditions. Build trading and risk-management skills with a real-time leaderboard.",
    image: "/assets/img3.jpg",
    date: "February 25, 2026",
    time: "02:00 PM",
    location: "Block 10, CGC Landran",
    fullDescription:
      "Step into the world of stock markets with this live paper trading competition. Participants trade using virtual capital under real market conditions to build practical trading and risk-management skills. A real-time leaderboard keeps the competition intense.",
    whyPoints: [
      "Live trading simulation",
      "Virtual capital trading",
      "Expert guidance",
      "Real-time leaderboard",
      "Risk-free market learning",
    ],
    participantCount: 35,
    applyLink: "/event-registration",
    registerAudienceLink: "/event-registration",
  },
  {
    id: 4,
    title: "Sell Your Soul – CMO War Room Marketing Championship",
    category: "competition",
    tag: "Competition",
    shortDescription:
      "Step into the CMO role: create a full go-to-market strategy from a brief, film a one-take ad, and defend your brand before an expert jury.",
    image: "/assets/img1.jpg",
    date: "February 26, 2026",
    time: "10:00 AM",
    location: "Board Room / Central Park, CGC Landran",
    fullDescription:
      "Step into the role of a Chief Marketing Officer (CMO). Teams are given a brand or startup brief with a target audience, budget, and goals, and must quickly create a complete go-to-market strategy. From brand positioning and campaign ideas to a one-take advertisement and final pitch, the event tests creativity, strategic thinking, and performance under pressure in a fast-paced, real-world marketing simulation.",
    whyPoints: [
      "Real CMO-style marketing challenge",
      "War-room strategy sprint under time pressure",
      "One-take advertisement creation",
      "Live pitching & elimination rounds",
      "Final brand defense before expert jury",
      "Focus on creativity, branding, and execution",
    ],
    participantCount: 30,
    applyLink: "/event-registration",
    registerAudienceLink: "/event-registration",
  },
  // ——— Flagship EXPO ———
  {
    id: 5,
    title: "Startup EXPO",
    category: "main",
    tag: "EXPO",
    shortDescription:
      "Exhibition platform where innovators showcase products and solutions. Direct interaction with investors, mentors, and industry professionals.",
    image: "/assets/img5.jpg",
    date: "February 25–26, 2026",
    time: "10:00 AM – 5:00 PM",
    location: "Central Park / Exhibition Area, CGC Landran",
    fullDescription:
      "Startup Expo is a dynamic exhibition platform where innovators showcase their products and solutions. Participants interact directly with investors, mentors, and industry professionals, enabling real-time feedback, networking, and visibility.",
    whyPoints: [
      "Dedicated exhibition stalls",
      "Live product demos",
      "Direct investor interaction",
      "Real user feedback",
      "High-visibility startup showcase",
    ],
    participantCount: 120,
    applyLink: "/event-registration",
    registerAudienceLink: "/event-registration",
  },
  // ——— Flagship Sessions and Talks ———
  {
    id: 6,
    title: "India's Startup Decade: Opportunities, Challenges & What Comes Next",
    category: "showcase",
    tag: "Session",
    shortDescription:
      "An insightful session on India's startup ecosystem—opportunities, challenges for founders, and trends shaping the next decade.",
    image: "/assets/img1.jpg",
    date: "February 25, 2026",
    time: "10:30 AM",
    location: "Main Audi, CGC Landran",
    fullDescription:
      "An insightful session exploring how India has emerged as one of the world's fastest-growing startup ecosystems. The talk will highlight key opportunities, major challenges founders face, and the trends that will shape the next decade of innovation, investment, and entrepreneurship in India.",
    whyPoints: [
      "Evolution of India's startup ecosystem",
      "Emerging opportunities across sectors",
      "Real challenges faced by founders",
      "Policy, funding, and market trends",
      "What the future holds for Indian startups",
    ],
    participantCount: 500,
    applyLink: null,
    registerAudienceLink: "/event-registration",
  },
  {
    id: 7,
    title: "Fireside: AI, Quick Commerce, Finance & the Future of Business",
    category: "showcase",
    tag: "Fireside",
    shortDescription:
      "A candid conversation with industry leaders on AI, rapid delivery, and fintech reshaping businesses and consumer behavior.",
    image: "/assets/img2.jpg",
    date: "February 25, 2026",
    time: "02:00 PM",
    location: "Main Audi, CGC Landran",
    fullDescription:
      "A candid conversation with industry leaders on how AI, rapid delivery models, and financial innovation are transforming businesses. The session will explore how technology is reshaping consumer behavior, operations, and growth strategies across industries.",
    whyPoints: [
      "Impact of AI on modern businesses",
      "Rise of quick commerce & instant services",
      "Fintech innovations and digital finance trends",
      "Real-world insights from founders & experts",
      "Interactive discussion with audience Q&A",
    ],
    participantCount: 400,
    applyLink: null,
    registerAudienceLink: "/event-registration",
  },
  {
    id: 8,
    title: "Fintech & the Future of Investing",
    category: "showcase",
    tag: "Session",
    shortDescription:
      "Expert-led session by Upstox on financial markets, trading fundamentals, and wealth creation strategies.",
    image: "/assets/img3.jpg",
    date: "February 26, 2026",
    time: "10:00 AM",
    location: "Main Audi, CGC Landran",
    fullDescription:
      "An expert-led session by Upstox focusing on financial markets, trading fundamentals, and wealth creation strategies. Participants gain insights into investing, market behavior, and fintech innovations shaping modern finance.",
    whyPoints: [
      "Beginner-to-advanced trading insights",
      "Market trends & strategies",
      "Live demonstrations (if applicable)",
      "Q&A with finance experts",
      "Career insights in fintech",
    ],
    participantCount: 350,
    applyLink: null,
    registerAudienceLink: "/event-registration",
  },
  {
    id: 9,
    title: "Cracking Product–Market Fit: From Idea to Real Demand",
    category: "showcase",
    tag: "Session",
    shortDescription:
      "Interactive workshop on validating ideas, understanding customer needs, and refining products for real product–market fit.",
    image: "/assets/img1.jpg",
    date: "February 26, 2026",
    time: "11:30 AM",
    location: "Parallel Block 2, CGC Landran",
    fullDescription:
      "An interactive session and hands-on workshop focused on one of the most critical aspects of building a successful startup—product–market fit. Participants will learn how to validate ideas, understand customer needs, and refine products to solve real problems that people are willing to pay for.",
    whyPoints: [
      "Understanding product–market fit fundamentals",
      "Customer discovery & validation techniques",
      "Practical frameworks for refining ideas",
      "Real-world startup case insights",
      "Interactive activities & discussions",
    ],
    participantCount: 80,
    applyLink: "/event-registration",
    registerAudienceLink: "/event-registration",
  },
  // ——— Networking and Career ———
  {
    id: 10,
    title: "Professional – Young Innovators Networking",
    category: "workshop",
    tag: "Networking",
    shortDescription:
      "Connect young innovators and students with professionals, mentors, and entrepreneurs. Share ideas and build relationships.",
    image: "/assets/img5.jpg",
    date: "February 25, 2026",
    time: "04:00 PM",
    location: "Central Park / Networking Zone, CGC Landran",
    fullDescription:
      "A dynamic networking session designed to connect young innovators and students with experienced professionals, mentors, and entrepreneurs. Participants can share ideas, seek guidance, and build relationships that support their career and startup journeys.",
    whyPoints: [
      "Direct interaction with professionals & mentors",
      "Platform for idea exchange",
      "Career guidance opportunities",
      "Startup and innovation discussions",
      "Community building among young leaders",
    ],
    participantCount: 200,
    applyLink: null,
    registerAudienceLink: "/event-registration",
  },
  {
    id: 11,
    title: "Internship Mela",
    category: "workshop",
    tag: "Career",
    shortDescription:
      "Companies and startups offer internship opportunities. Explore roles, meet recruiters, and discover pathways to real-world experience.",
    image: "/assets/img2.jpg",
    date: "February 25–26, 2026",
    time: "11:00 AM – 3:00 PM",
    location: "Exhibition Area, CGC Landran",
    fullDescription:
      "A career-focused setup where companies, startups, and organizations offer internship opportunities to students across domains. Participants can explore roles, interact with recruiters, and discover pathways to gain real-world experience.",
    whyPoints: [
      "Internship opportunities across fields",
      "Direct interaction with recruiters & startups",
      "Career exploration and guidance",
      "Resume building exposure",
      "Gateway to real industry experience",
    ],
    participantCount: 300,
    applyLink: null,
    registerAudienceLink: "/event-registration",
  },
  {
    id: 12,
    title: "Professional Networking Supper",
    category: "workshop",
    tag: "Networking",
    shortDescription:
      "Exclusive networking dinner with founders, investors, and student leaders. Build meaningful connections in a relaxed setting.",
    image: "/assets/img3.jpg",
    date: "February 26, 2026",
    time: "07:00 PM",
    location: "Venue TBA, CGC Landran",
    fullDescription:
      "An exclusive networking dinner bringing together founders, investors, industry professionals, and student leaders in a relaxed setting. It offers a unique opportunity to build meaningful connections, exchange ideas, and explore collaborations beyond formal sessions.",
    whyPoints: [
      "Curated networking environment",
      "Access to founders & industry experts",
      "Collaboration opportunities",
      "Informal professional conversations",
      "Premium networking experience",
    ],
    participantCount: 100,
    applyLink: null,
    registerAudienceLink: "/event-registration",
  },
];

function EventDetailModal({ event, onClose }) {
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-900/95 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image header */}
        <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-2xl bg-gradient-to-br from-purple-900/40 to-zinc-900">
          <img
            src={event.image}
            alt=""
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 border border-white/20 text-white">
            {event.tag}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h2
            id="event-modal-title"
            className="font-sans text-2xl sm:text-3xl font-bold text-white mb-4"
          >
            {event.title}
          </h2>

          <div className="flex flex-col gap-2 text-sm text-white/80 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                {event.date} at {event.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{event.location}</span>
            </div>
          </div>

          <p className="text-white/90 text-sm leading-relaxed mb-6 whitespace-pre-line">
            {event.fullDescription}
          </p>

          {event.whyPoints && event.whyPoints.length > 0 && (
            <div className="mb-6">
              <h3 className="flex items-center gap-2 font-semibold text-white mb-3">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Highlights
              </h3>
              <ul className="space-y-2">
                {event.whyPoints.map((point, i) => (
                  <li
                    key={i}
                    className="text-white/80 text-sm flex items-start gap-2"
                  >
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA section */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-600 flex items-center justify-center text-xs text-white"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span>+{event.participantCount} interested</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {event.applyLink && event.category === "main" && (
                <Link
                  to={event.applyLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors"
                >
                  Apply (Startups)
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
              {event.category !== "main" && (
                <Link
                  to={event.registerAudienceLink || "/event-registration"}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/30 bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-colors"
                >
                  Register as Audience
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Events() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents =
    activeCategory === "all"
      ? EVENTS_DATA
      : EVENTS_DATA.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-black text-white overscroll-none">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 py-8 md:py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8 font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="font-sans text-[clamp(32px,5vw,64px)] text-white font-bold uppercase tracking-[2px] mb-2">
          All Events
        </h1>
        <p className="text-white/60 text-sm mb-8">
          Explore competitions, main events, workshops, and more at E-Summit 2026.
        </p>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-white text-black"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/15"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Event cards — image-first card layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredEvents.map((event) => (
            <article
              key={event.id}
              className="group rounded-xl overflow-hidden bg-[rgba(10,10,10,0.6)] backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-purple-500/40 hover:shadow-[0_25px_60px_rgba(168,85,247,0.2)] transition-all duration-300 flex flex-col"
            >
              {/* Image-first: large image with overlays */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedEvent(event)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedEvent(event);
                  }
                }}
                className="relative aspect-[3/4] w-full overflow-hidden cursor-pointer flex-shrink-0"
              >
                <img
                  src={event.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                {/* Tag badge */}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/70 border border-white/20 text-white backdrop-blur-sm z-10">
                  {event.tag}
                </span>
                {/* Hover overlay: description with animation */}
                <div className="absolute inset-0 z-[5] flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                  <div className="p-3 pt-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <h2 className="font-sans text-sm sm:text-base font-bold text-white drop-shadow-lg mb-1.5">
                      {event.title}
                    </h2>
                    <p className="text-white/95 text-xs sm:text-sm leading-relaxed line-clamp-4">
                      {event.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-purple-300 text-xs font-medium mt-2 opacity-90">
                      Know More
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
                {/* Title over image (visible when not hovering) */}
                <div className="absolute bottom-0 left-0 right-0 p-3 pt-8 pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
                  <h2 className="font-sans text-sm sm:text-base font-bold text-white line-clamp-2 drop-shadow-lg transition-colors">
                    {event.title}
                  </h2>
                  <span className="inline-flex items-center gap-1 text-purple-300 text-xs font-medium mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Know More
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* CTA bar below image */}
              <div
                className="px-3 py-2 flex flex-wrap items-center justify-between gap-1.5 bg-black/40 border-t border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-white/70">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border-2 border-black/80 bg-zinc-600 flex items-center justify-center text-[8px] text-white"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <span>+{event.participantCount}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {event.applyLink && event.category === "main" && (
                    <Link
                      to={event.applyLink}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-0.5 px-2 py-1 rounded-md bg-white text-black font-semibold text-[10px] uppercase tracking-wide hover:bg-gray-200 transition-colors border border-white/20"
                    >
                      Apply
                      <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  )}
                  {event.category !== "main" && (
                    <Link
                      to={event.registerAudienceLink || "/event-registration"}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center px-2 py-1 rounded-md border border-white/30 bg-white/5 text-white font-medium text-[10px] uppercase tracking-wide hover:bg-white/10 transition-colors"
                    >
                      Register
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p className="text-white/60 text-center py-12">
            No events in this category yet.
          </p>
        )}
      </div>

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

export default Events;
