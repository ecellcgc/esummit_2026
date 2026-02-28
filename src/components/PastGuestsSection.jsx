import React from "react";

function PastGuestsSection() {
  const guests = [
    {
      id: 1,
      name: "Ashneer Grover",
      post: "Entrepreneur & Investor",
      designation: "Ex-BharatPe · Shark Tank India",
      description: "Co-founder of BharatPe & Shark Tank fame. An IITD & IIMA alumnus known for his blunt insights on startups and bestselling book, Doglapan.",
      image: "/assets/ashneer grover.png",
    },
    {
      id: 2,
      name: "Rohit Negi",
      post: "Software Engineer",
      designation: "Educator & YouTuber",
      description: "Creator of 'Coder Army', a top coding mentor sharing his inspiring journey of landing a top-tier role at Uber and mastering DSA.",
      image: "/assets/Rohit Negi.png",
    },
    {
      id: 3,
      name: "Nileshh Kataria",
      post: "Entrepreneur",
      designation: "Personal Branding Expert",
      description: "Founder of 'Speak To Uplift' and a top voice on LinkedIn specializing in digital marketing and helping professionals build digital authority.",
      image: "/assets/Nileshh Kataria.png",
    },
    {
      id: 4,
      name: "Varun Singla",
      post: "Educator & Entrepreneur",
      designation: "Founder, Gate Smashers",
      description: "Founder of 'Gate Smashers', one of India's top engineering education channels, guiding millions to success in competitive tests like GATE.",
      image: "/assets/varun singla.png",
    },
  ];

  return (
    <section
      id="page9"
      className="relative w-full max-w-[100vw] min-h-0 h-auto m-0 p-0 flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto bg-black py-8 md:py-10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex-grow relative z-10 flex flex-col justify-center items-center w-full py-8 max-[600px]:py-6">
        <div className="text-center mb-8 w-full max-[600px]:mb-6">
          <h2 className="font-sans text-[clamp(32px,5vw,64px)] text-white font-bold uppercase tracking-[2px] m-0">
            PAST GUESTS
          </h2>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {guests.map((guest) => (
              <div
                key={guest.id}
                className="min-w-0 w-full rounded-2xl overflow-hidden bg-[rgba(10,10,10,0.6)] backdrop-blur-[20px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-[0_25px_60px_rgba(168,85,247,0.3)] hover:border-purple-500/40 z-50 flex flex-col"
              >
                {/* Top: large image (~60% of card) */}
                <div className="w-full aspect-[3/4] flex-shrink-0 overflow-hidden rounded-t-2xl">
                  <img
                    src={guest.image}
                    alt={guest.name}
                    className="w-full h-full object-cover block"
                  />
                </div>
                {/* Divider */}
                <div className="border-t border-white/20" />
                {/* Bottom: title, subtitle, description */}
                <div className="p-4 sm:p-4 md:p-4 flex flex-col gap-2 text-left flex-grow min-h-0 max-[600px]:p-5">
                  <h3 className="font-sans text-white text-xl max-[600px]:text-2xl sm:text-xl font-bold m-0 leading-tight">
                    {guest.name}
                  </h3>
                  <p className="font-sans text-purple-300 text-sm max-[600px]:text-base sm:text-sm font-medium m-0 leading-snug">
                    {guest.post}
                    {guest.designation && ` · ${guest.designation}`}
                  </p>
                  <p className="font-sans text-white/70 text-sm max-[600px]:text-base sm:text-sm m-0 leading-relaxed line-clamp-4">
                    {guest.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PastGuestsSection;
