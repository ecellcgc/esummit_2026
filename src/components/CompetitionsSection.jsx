import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const competitionsData = [
    {
        id: "pitch",
        title: "Startup Pitch",
        image: "/assets/pitch.jpeg",
        description:
            "Simulate real-world fundraising by pitching your startup idea directly to investors. Finalists experience an immersive boardroom-style funding discussion to validate their venture.",
        shortSummary: "Pitch your startup to investors & win funding opportunities.",
        prize: "₹50,000",
        link: "/events#startup-pitch",
    },
    {
        id: 3,
        title: "MOCK TRADING",
        description: "Step into the stock market with this live paper trading competition. Trade using virtual capital under real market conditions to build practical trading and risk skills.",
        highlights: ["Live trading simulation", "Virtual capital", "Expert guidance", "Real-time leaderboard"],
        image: "/assets/trade.jpeg",
        link: "#register-trading",
        bgClass: "from-black via-purple-800/40 to-black"
    },
    {
        id: 4,
        title: "SELL YOUR SOUL",
        description: "Step into the role of a CMO! Given a brand brief, budget, and goals, quickly create a complete go-to-market strategy, including a one-take ad and final pitch under time pressure.",
        highlights: ["CMO-style marketing challenge", "War-room strategy sprint", "One-take ad creation", "Live pitching"],
        image: "/assets/marketing.jpeg",
        link: "#register-cmo",
        bgClass: "from-black via-purple-700/40 to-black"
    }
];

function CompetitionsSection() {
    return (
        <section
            id="competitions"
            className="relative w-full max-w-[100vw] m-0 p-0 flex flex-col items-center justify-center overflow-x-hidden overflow-y-visible bg-black py-8 md:py-16"
            style={{
                minHeight: "min(72vmin, 65vh)",
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                backgroundAttachment: "fixed",
            }}
        >
            {/* Header */}
            <div className="w-full text-center mb-8">
                <h2 className="font-sans text-[clamp(32px,5vw,64px)] text-white font-bold uppercase tracking-[8px] text-center w-full pointer-events-none mb-4 md:mb-6 shrink-0 z-10 relative">
                    COMPETITIONS
                </h2>

                {/* Promotional banner: total prizes and participant credits */}
                <div className="inline-flex items-center gap-3 mx-auto bg-gradient-to-r from-orange-700/30 to-yellow-500/20 border border-white/10 rounded-full px-4 py-2 text-sm text-white/90 shadow-sm">
                    <strong className="text-purple-200">Win cash prizes worth Thousands</strong>
                    <span className="text-white/60">•</span>
                    <span className="text-white/80">Exciting platform credits</span>
                </div>
            </div>

            {/* Container for Cards: reuse event card design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4 md:px-6">
                {competitionsData.map((comp) => (
                    <article
                        key={comp.id}
                        className="group rounded-xl overflow-hidden bg-[rgba(10,10,10,0.6)] backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-purple-500/40 hover:shadow-[0_25px_60px_rgba(168,85,247,0.2)] transition-all duration-300 flex flex-col"
                    >
                        <div className="relative aspect-[3/4] w-full overflow-hidden cursor-pointer flex-shrink-0">
                            <img
                                src={comp.image}
                                alt={comp.title}
                                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/70 border border-white/20 text-white backdrop-blur-sm z-10">Competition</span>

                            <div className="absolute inset-0 z-[5] flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-100 transition-opacity duration-300">
                                <div className="p-3 pt-8 translate-y-0 transition-transform duration-300">
                                    <h2 className="font-sans text-sm sm:text-base font-bold text-white drop-shadow-lg mb-1.5">{comp.title}</h2>
                                    <p className="text-white/95 text-xs sm:text-sm leading-relaxed line-clamp-4">{comp.shortSummary || comp.description}</p>
                                    <span className="inline-flex items-center gap-1 text-purple-300 text-xs font-medium mt-2 opacity-100">Know More <ArrowRight className="w-3 h-3" /></span>
                                </div>
                            </div>
                        </div>

                        {/* CTA / meta area (optional) */}
                        {/*
                        <div className="px-3 py-2 flex flex-wrap items-center justify-between gap-1.5 bg-black/40 border-t border-white/10">
                            <div className="flex items-center gap-1.5 text-[10px] text-white/70">
                                <div className="flex -space-x-1.5">{[1,2,3].map(i => (
                                    <div key={i} className="w-5 h-5 rounded-full border-2 border-black/80 bg-zinc-600 flex items-center justify-center text-[8px] text-white">{i}</div>
                                ))}</div>
                                <span>+{comp.participantCount || ''}</span>
                            </div>
                            <div className="flex gap-2">
                                <Link to={comp.link || '/events'} className="inline-flex items-center px-2 py-1 rounded-md border border-white/30 bg-white/5 text-white text-[10px]">Register</Link>
                            </div>
                        </div>
                        */}
                    </article>
                ))}
            </div>

            {/* Background glowing orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none z-0" />
        <div className="mt-8 flex justify-center">
                <Link
                    to="/events"
                    className="inline-flex items-center gap-2 w-max py-3 px-6 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/10 hover:border-purple-500/40 text-white hover:bg-purple-500/10 transition-colors text-sm font-medium shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
                    >
                    <b>Go To All Events</b>
                    <ArrowRight className="w-4 h-4" />
                </Link>
        </div>
        
        </section>
    );
}

export default CompetitionsSection;
