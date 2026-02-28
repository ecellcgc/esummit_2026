import React from "react";

const GALLERY_IMAGES = [
  "/assets/img1.jpg",
  "/assets/img2.jpg",
  "/assets/img3.jpg",
  "/assets/img5.jpg",
];

// One set = 4 images. We repeat the set 3x so the strip is always full and the loop has no visible jump.
const SET_SIZE = GALLERY_IMAGES.length;

function PastEventGlimpsesSection() {
  // Repeat the same set 3 times: [1,2,3,5, 1,2,3,5, 1,2,3,5]. Animation moves by exactly one set width
  // so when it loops back to 0, the next set looks identical — seamless infinite scroll, row never empty.
  const displayImages = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <section
      id="page3"
      className="relative w-full max-w-[100vw] m-0 p-0 flex flex-col items-center overflow-x-hidden overflow-y-visible bg-black py-6 md:py-10"
      style={{
        minHeight: "min(72vmin, 65vh)",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        backgroundAttachment: "fixed",
      }}
    >
      <h2 className="font-sans text-[clamp(20px,4vw,50px)] text-white font-bold uppercase tracking-[8px] text-center w-full pointer-events-none mb-6 md:mb-8 shrink-0">
        PAST EVENT GLIMPSES
      </h2>
      <div className="relative w-full flex-1 min-h-0 flex items-center overflow-hidden">
        <div
          id="image-track"
          className="flex gap-4 w-max items-center select-none animate-p3-scroll"
          style={{ "--p3-set-size": SET_SIZE }}
        >
          {displayImages.map((src, index) => (
            <img
              key={`gallery-${index}-${src}`}
              className="image w-[280px] md:w-[320px] h-[200px] md:h-[240px] object-cover object-center rounded-2xl flex-shrink-0"
              src={src}
              draggable="false"
              alt={`Past event ${(index % SET_SIZE) + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PastEventGlimpsesSection;
