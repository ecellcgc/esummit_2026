import React from "react";
import { ArrowUpRight } from "lucide-react";

const competitionsData = [
    {
        id: 1,
        title: "PITCH TANK",
        description: "Simulate real-world fundraising by pitching your startup idea directly to investors. Finalists experience an immersive boardroom-style funding discussion to validate their venture.",
        highlights: ["Investor-style live pitching", "Boardroom simulation", "Real-time Q&A", "Focus on scalability"],
        image: "/assets/pitch.jpeg",
        link: "#register-pitchtank",
        bgClass: "from-black via-purple-950/40 to-black"
    },
    {
        id: 2,
        title: "IPL AUCTION",
        description: "Experience the thrill of strategy and bidding. Compete to build the strongest cricket squad within a fixed virtual budget, blending sports excitement with business strategy.",
        highlights: ["Live player auction", "Budget management challenge", "Cricket quiz elimination", "Risk assessment"],
        image: "/assets/ipl.jpeg",
        link: "#register-ipl",
        bgClass: "from-black via-purple-900/40 to-black"
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
        image: "/assets/sell.jpeg",
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
            <h2 className="font-sans text-[clamp(32px,5vw,64px)] text-white font-bold uppercase tracking-[8px] text-center w-full pointer-events-none mb-12 md:mb-20 shrink-0 z-10 relative">
                COMPETITIONS
            </h2>

            {/* Container for Cards */}
            <div className="relative w-full flex flex-col gap-16 md:gap-32 z-10">
                {competitionsData.map((comp, index) => {
                    const isEven = index % 2 !== 0; // Toggle layout side

                    return (
                        <div key={comp.id} className="relative w-full flex justify-center py-8">
                            {/* Full-width gradient background positioned absolutely behind the card content */}
                            <div className={`absolute top-0 bottom-0 -left-[50vw] right-[50vw] w-[200vw] ml-[50%] bg-gradient-to-r ${comp.bgClass} pointer-events-none z-[-1]`}></div>

                            <div className={`relative max-w-[1200px] w-full px-4 sm:px-8 flex flex-col md:flex-row gap-8 md:gap-16 items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                {/* Image Side (Strictly Rectangular) */}
                                <div className="w-full md:w-1/2 group relative">
                                    {/* Decorative behind-glow */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-purple-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-[4/3] border border-white/10 bg-white/[0.03] overflow-hidden rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                                        <img
                                            src={comp.image}
                                            alt={comp.title}
                                            className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                                        />

                                        {/* Glassmorphism Name Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="border border-white/20 bg-black/40 backdrop-blur-sm px-6 py-2 rounded-none transform transition-transform duration-500 group-hover:scale-110">
                                                <span className="font-sans font-black text-2xl sm:text-3xl text-white tracking-[4px] uppercase">{comp.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Text Content Side */}
                                <div className="w-full md:w-1/2 flex flex-col items-start gap-4 md:gap-6 text-left">
                                    <h3 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-purple-400 tracking-[2px] uppercase">
                                        {comp.title}
                                    </h3>

                                    <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed max-w-[90%] font-light">
                                        {comp.description}
                                    </p>

                                    {comp.highlights && comp.highlights.length > 0 && (
                                        <div className="mt-2 text-sm sm:text-base text-zinc-400 font-light space-y-1">
                                            <p className="font-medium text-purple-300 mb-2 uppercase tracking-[1px] text-xs">Highlights:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-1">
                                                {comp.highlights.map((highlight, idx) => (
                                                    <li key={idx}>{highlight}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* 
                                    <a
                                        href={comp.link}
                                        className="group mt-4 inline-flex items-center gap-2 px-8 py-3 border-2 border-purple-500/50 text-white font-sans font-medium uppercase tracking-[2px] hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]"
                                    >
                                        Register
                                        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-purple-400 group-hover:text-purple-300" />
                                    </a>
                                    */}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Background glowing orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none z-0" />
        </section>
    );
}

export default CompetitionsSection;
