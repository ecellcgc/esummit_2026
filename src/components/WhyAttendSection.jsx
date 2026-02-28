import React from "react";

function WhyAttendSection() {
  return (
    <section
      id="page8"
      className="relative w-full max-w-[100vw] min-h-0 h-auto m-0 p-0 overflow-x-hidden overflow-y-visible flex items-center justify-center bg-black py-8 md:py-10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-[1400px] py-8 px-8 max-[900px]:py-6 max-[900px]:px-6">
        <div className="text-center mb-8 max-[900px]:mb-6">
          <h2 className="font-sans text-[clamp(32px,5vw,64px)] text-white font-bold uppercase tracking-[2px] m-0">
            Why Attend?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div className="group bg-[rgba(10,10,10,0.6)] backdrop-blur-[20px] border border-white/10 border-t-white/15 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col hover:shadow-[0_25px_60px_rgba(168,85,247,0.2)] hover:-translate-y-1 hover:border-purple-500/30 max-[900px]:p-0">
            <div className="w-full h-[220px] overflow-hidden max-[600px]:h-[180px]">
              <img
                src="/assets/speakers/WhatsApp Image 2026-02-12 at 19.17.47.jpeg"
                alt="Learn from Experts"
                className="w-full h-full object-cover transition-transform duration-[0.4s] ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-8 pt-8 pb-12 max-[900px]:px-6 max-[900px]:pt-6 max-[600px]:px-6 max-[600px]:pt-6 max-[600px]:pb-8">
              <h3 className="font-sans text-[clamp(20px,2.5vw,28px)] text-white font-bold m-0 mb-6 uppercase tracking-[1px]">
                Learn from Experts
              </h3>
              <p className="font-sans text-[clamp(14px,1.5vw,16px)] text-[#d4d4d8] leading-[1.7] m-0 max-[600px]:px-0 max-[600px]:pb-0">
                Gain insights from successful entrepreneurs, investors, and
                industry leaders who share their real-world experiences and
                strategies.
              </p>
            </div>
          </div>

          <div className="bg-[rgba(10,10,10,0.6)] backdrop-blur-[20px] border border-white/10 border-t-white/15 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col hover:shadow-[0_25px_60px_rgba(168,85,247,0.2)] hover:-translate-y-1 hover:border-purple-500/30 max-[900px]:p-0 group">
            <div className="w-full h-[220px] overflow-hidden max-[600px]:h-[180px]">
              <img
                src="/assets/speakers/WhatsApp Image 2026-02-12 at 19.17.49 (1).jpeg"
                alt="Network & Connect"
                className="w-full h-full object-cover transition-transform duration-[0.4s] ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-8 pt-8 pb-12 max-[900px]:px-6 max-[900px]:pt-6 max-[600px]:px-6 max-[600px]:pt-6 max-[600px]:pb-8">
              <h3 className="font-sans text-[clamp(20px,2.5vw,28px)] text-white font-bold m-0 mb-6 uppercase tracking-[1px]">
                Network & Connect
              </h3>
              <p className="font-sans text-[clamp(14px,1.5vw,16px)] text-[#d4d4d8] leading-[1.7] m-0 max-[600px]:px-0 max-[600px]:pb-0">
                Meet like-minded individuals, potential co-founders, and build
                connections with 500+ participants from diverse backgrounds.
              </p>
            </div>
          </div>

          <div className="bg-[rgba(10,10,10,0.6)] backdrop-blur-[20px] border border-white/10 border-t-white/15 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col hover:shadow-[0_25px_60px_rgba(168,85,247,0.2)] hover:-translate-y-1 hover:border-purple-500/30 max-[900px]:p-0 group">
            <div className="w-full h-[220px] overflow-hidden max-[600px]:h-[180px]">
              <img
                src="/assets/speakers/WhatsApp Image 2026-02-12 at 19.17.49.jpeg"
                alt="Launch Your Ideas"
                className="w-full h-full object-cover transition-transform duration-[0.4s] ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-8 pt-8 pb-12 max-[900px]:px-6 max-[900px]:pt-6 max-[600px]:px-6 max-[600px]:pt-6 max-[600px]:pb-8">
              <h3 className="font-sans text-[clamp(20px,2.5vw,28px)] text-white font-bold m-0 mb-6 uppercase tracking-[1px]">
                Launch Your Ideas
              </h3>
              <p className="font-sans text-[clamp(14px,1.5vw,16px)] text-[#d4d4d8] leading-[1.7] m-0 max-[600px]:px-0 max-[600px]:pb-0">
                Pitch your startup, compete for prizes worth ₹50K+, and get the
                opportunity to connect with investors and mentors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyAttendSection;
