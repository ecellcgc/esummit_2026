import React from 'react'
import ParticlesCanvas from './ParticlesCanvas'

function AboutESummitSection() {
  return (
    <section
      id="page2"
      className="relative w-full max-w-[100vw] min-h-0 h-auto m-0 p-0 overflow-x-hidden overflow-y-visible bg-black"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        backgroundAttachment: 'fixed',
      }}
    >
      <main className="min-h-auto w-full h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 py-8 md:py-12 px-[6vw] lg:px-[6vw] font-sans relative z-[3] pointer-events-auto scroll-smooth">
        <div className="w-full lg:w-1/2 flex flex-col justify-center order-1 pr-0 lg:pr-12">
          <section className="max-w-[980px] relative z-[4] mt-[5%] pointer-events-auto">
            <h1 className="text-[clamp(24px,4vw,48px)] text-[#e2dee3] font-bold tracking-[-0.02em] mb-8">
              What is E-Summit?
            </h1>
            <p className="fill-text js-fill m-0 text-[clamp(12px,1.5vw,20px)] font-semibold leading-relaxed tracking-normal text-wrap relative z-[4] pointer-events-auto">
              <span className="fill-text-span">
                E-Summit 2026 is CGC's flagship entrepreneurship event bringing together students, founders, investors,
                and innovators. Experience two days of inspiring keynotes, competitive challenges, startup exhibitions,
                and networking that transforms ideas into reality.
              </span>
            </p>
          </section>

          <p className="mt-8 text-[#a1a1aa] text-sm uppercase tracking-[1px]">
            made for entrepreneurs.
          </p>
        </div>
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center order-2">
          {/* <div className="w-[90%] h-[400px] max-[600px]:h-[250px] rounded-[20px] border-2 border-dashed border-white/20 bg-[rgba(20,20,20,0.6)] flex items-center justify-center text-white/50 font-sans uppercase tracking-[1px]">
            <span>Image Container</span>
          </div> */}
          <div className="relative w-[90%] h-[400px] max-[600px]:h-[250px] rounded-[20px] overflow-hidden bg-[rgba(20,20,20,0.6)] border border-white/10 shadow-lg">
            <ParticlesCanvas />
          </div>
        </div>
      </main>
    </section>
  )
}

export default AboutESummitSection
