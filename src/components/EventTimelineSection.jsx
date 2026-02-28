import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  Target,
  Users,
} from "lucide-react";

const scheduleData = {
  eventFlow: [
    {
      id: 1,
      time: "Phase 1",
      title: "Registration / Buy Passes",
      description: "Register for the event and secure your passes to be part of E-Summit 2026.",
      venue: "Online Portal",
      icon: Users,
    },
    {
      id: 2,
      time: "Phase 2",
      title: "Competition Start (Pitch Tank)",
      description:
        "Pitch Tank competition begins. Submit your ideas and get shortlisted for the pre-finale and finale rounds.",
      venue: "Online Submission",
      icon: Target,
    },
  ],
  day1: [
    {
      id: 1,
      time: "Morning",
      title: "Sessions and Talks",
      venue: "Main Auditorium",
    },
    {
      id: 2,
      time: "Morning - Afternoon",
      title: "Workshops",
      venue: "Parallel Blocks",
    },
    {
      id: 3,
      time: "All Day",
      title: "Expo",
      venue: "Expo Area",
    },
    {
      id: 4,
      time: "Afternoon",
      title: "Pitch Tank (Pre-Finale)",
      venue: "Block 10 / Central Park",
    },
    {
      id: 5,
      time: "Evening",
      title: "IPL Auction",
      venue: "Designated Venue",
    },
  ],
  day2: [
    {
      id: 1,
      time: "Morning",
      title: "Sessions and Talks",
      venue: "Main Auditorium",
    },
    {
      id: 2,
      time: "All Day",
      title: "Expo",
      venue: "Expo Area",
    },
    {
      id: 3,
      time: "Afternoon",
      title: "Carnival",
      venue: "Central Park",
    },
    {
      id: 4,
      time: "Afternoon",
      title: "Networking Zones",
      venue: "Campus",
    },
    {
      id: 5,
      time: "Afternoon - Evening",
      title: "Pitch Tank Finale",
      venue: "Main Auditorium / Board Room",
    },
    {
      id: 6,
      time: "Evening",
      title: "Closing & Prize Distribution",
      venue: "Main Auditorium",
    },
  ],
};

const TimelineCard = ({ item, index, isLeft }) => {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-center justify-between mb-12 w-full ${isLeft ? "flex-row-reverse" : ""}`}
    >
      {/* Spacer for the opposite side */}
      <div className="w-5/12 hidden md:block" />

      {/* Center Line Node */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.4, delay: index * 0.08 }}
          className="w-4 h-4 rounded-full bg-purple-600 shadow-[0_0_12px_#9333ea,0_0_24px_rgba(147,51,234,0.4)] border-2 border-white/30 ring-4 ring-purple-500/20"
        />
        <div className="w-0.5 h-full bg-gradient-to-b from-purple-500/80 via-purple-500/40 to-transparent absolute top-4 -z-10" />
      </div>

      {/* Content Card */}
      <div
        className={`w-[calc(100%-3rem)] md:w-5/12 ml-12 md:ml-0 ${isLeft ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left"}`}
      >
        <div
          className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] ${isLeft ? "border-l-2 border-l-purple-500/50 md:border-l-0 md:border-r-2 md:border-r-purple-500/50" : "border-l-2 border-l-purple-500/50"}`}
        >
          {/* Decorative glow */}
          <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-purple-600/20 blur-2xl transition-all group-hover:bg-purple-600/35" />

          <div
            className={`flex flex-col gap-2 ${isLeft ? "md:items-end" : "md:items-start"}`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-purple-300">
              {Icon ? <Icon className="h-3 w-3 shrink-0" /> : <Clock className="h-3 w-3" />}
              {item.time}
            </span>

            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
              {item.title}
            </h3>

            {item.description && (
              <p className="text-xs sm:text-sm text-gray-400 mt-1">{item.description}</p>
            )}

            {item.venue && (
              <div
                className={`mt-3 flex items-center gap-2 text-sm text-gray-500 ${isLeft ? "md:flex-row-reverse" : ""}`}
              >
                <MapPin className="h-4 w-4 text-purple-500 shrink-0" />
                <span>{item.venue}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function EventTimelineSection() {
  const [activeTab, setActiveTab] = useState("eventFlow");

  const tabs = [
    { id: "eventFlow", label: "Event Flow" },
    { id: "day1", label: "Day 1" },
    { id: "day2", label: "Day 2" },
  ];

  return (
    <section
      id="page4"
      className="relative w-full max-w-[100vw] !min-h-0 !h-auto m-0 p-0 overflow-x-hidden overflow-y-visible bg-black py-8 md:py-10"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Background Elements - top accent line; no fade overlay */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent pointer-events-none z-[1]" />
      {/* Soft gradient orbs for depth */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-violet-500/12 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 py-6 md:py-8 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-purple-400/90 mb-2">Plan your experience</p>
          <h2 className="font-sans text-[clamp(32px,5vw,64px)] text-white font-bold uppercase tracking-[2px] m-0 mb-4">
            TIMELINE SCHEDULE
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* Navigation Tabs */}
        <div className="sticky top-16 md:top-20 z-40 mb-6 md:mb-8 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg w-fit max-w-full overflow-x-auto mx-auto">
          <div className="flex items-center gap-1 sm:gap-2 justify-center px-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-purple-600 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="w-full relative">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/5 transform -translate-x-1/2"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="relative pt-2 pb-6">
                {scheduleData[activeTab].map((item, index) => (
                  <TimelineCard
                    key={item.id}
                    item={item}
                    index={index}
                    isLeft={index % 2 === 0}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
