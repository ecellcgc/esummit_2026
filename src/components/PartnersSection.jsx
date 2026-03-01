import React from 'react'

const partners = [
  { id: 1, name: 'cgc', logo: '/assets/cgc.png', url: '#' },
  { id: 2, name: 'coe', logo: '/assets/coe.png', url: '#' },
  { id: 3, name: 'E-Cell CGC', logo: '/assets/ecl_logo.png', url: '#' },
  { id: 4, name: 'rise', logo: '/assets/RISE.png', url: '#' },
]

function PartnersSection() {
  return (
    <section
      id="partners"
      className="relative w-full max-w-[100vw] min-h-0 h-auto m-0 p-0 flex flex-col items-center justify-center overflow-x-hidden overflow-y-visible bg-black py-10 md:py-14"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="font-sans text-[clamp(28px,4vw,44px)] text-white font-bold uppercase tracking-[2px] m-0">
            PARTNERS
          </h2>
          <p className="font-sans text-xs sm:text-sm text-white/50 tracking-widest uppercase mt-2 m-0">Our proud collaborators</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-center mt-6">
          {partners.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-[rgba(255,255,255,0.02)] border border-white/8 rounded-lg hover:scale-[1.03] transition-transform duration-200"
            >
              <img src={p.logo} alt={p.name} className="max-h-16 object-contain" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersSection
