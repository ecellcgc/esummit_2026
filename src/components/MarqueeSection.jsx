import React from "react";

const sliderImages = [
  "/assets/slider-photos/1c4e8918b36ea9a6e54eab713f630689.jpg",
  "/assets/slider-photos/3d274874c5c48d20a22f77596d7cf479.jpg",
  "/assets/slider-photos/495488b2f79bd52c7e64acf9d2fedb27.jpg",
  "/assets/slider-photos/515f2ccf17b137afca18d802b60c9eb6.jpg",
  "/assets/slider-photos/7f56b82d4a30dbbe671442218a2d6fce.jpg",
  "/assets/slider-photos/af8cc5b2113c05d07c7b8612dd2a6742.jpg",
  "/assets/slider-photos/baa886435f4d5a558ec35265699ce8c6.jpg",
  "/assets/slider-photos/d624038752d42991404a8dff31c22dec.jpg",
];

const buildImage = (src, alt) => ({ type: "image", src, alt });
const buildText = (text) => ({ type: "text", text });

const row1 = [
  buildImage(sliderImages[0], "E-Summit slider image 1"),
  buildImage(sliderImages[1], "E-Summit slider image 2"),
  buildImage(sliderImages[2], "E-Summit slider image 3"),
  buildText("What"),
  buildImage(sliderImages[3], "E-Summit slider image 4"),
  buildImage(sliderImages[4], "E-Summit slider image 5"),
  buildImage(sliderImages[5], "E-Summit slider image 6"),
];

const row2 = [
  buildImage(sliderImages[6], "E-Summit slider image 7"),
  buildImage(sliderImages[7], "E-Summit slider image 8"),
  buildImage(sliderImages[0], "E-Summit slider image 1"),
  buildText("Makes"),
  buildImage(sliderImages[1], "E-Summit slider image 2"),
  buildImage(sliderImages[2], "E-Summit slider image 3"),
  buildImage(sliderImages[3], "E-Summit slider image 4"),
];

const row3 = [
  buildImage(sliderImages[4], "E-Summit slider image 5"),
  buildImage(sliderImages[5], "E-Summit slider image 6"),
  buildImage(sliderImages[6], "E-Summit slider image 7"),
  buildText("E-Summit"),
  buildImage(sliderImages[7], "E-Summit slider image 8"),
  buildImage(sliderImages[0], "E-Summit slider image 1"),
  buildImage(sliderImages[1], "E-Summit slider image 2"),
];

const row4 = [
  buildImage(sliderImages[2], "E-Summit slider image 3"),
  buildImage(sliderImages[3], "E-Summit slider image 4"),
  buildImage(sliderImages[4], "E-Summit slider image 5"),
  buildText("Special?"),
  buildImage(sliderImages[5], "E-Summit slider image 6"),
  buildImage(sliderImages[6], "E-Summit slider image 7"),
  buildImage(sliderImages[7], "E-Summit slider image 8"),
];

const renderRow = (items) => {
  const loopItems = [...items, ...items];
  return loopItems.map((item, index) => {
    const isDuplicate = index >= items.length;
    if (item.type === "text") {
      return (
        <div
          className="item with-text flex-shrink-0 flex justify-center items-center w-auto px-8 py-4 h-full max-[900px]:flex-1 max-[900px]:px-8 max-[900px]:py-6 max-[480px]:px-4 max-[480px]:py-4"
          key={`text-${index}`}
          aria-hidden={isDuplicate}
        >
          <h1 className="uppercase text-[60px] font-sans text-[#d984fa] font-black tracking-[4px] whitespace-nowrap m-0 p-0 max-[600px]:text-[2rem] max-[600px]:tracking-[2px] max-[480px]:text-[1.5rem] max-[900px]:text-[60px]">
            {item.text}
          </h1>
        </div>
      );
    }

    return (
      <div
        className="item flex-shrink-0 flex justify-center items-center w-[220px] h-full rounded-[10px] overflow-hidden max-[900px]:w-[140px] max-[900px]:h-[140px] max-[600px]:w-[110px] max-[600px]:h-[110px] max-[480px]:w-[90px] max-[480px]:h-[90px]"
        key={`image-${index}`}
        aria-hidden={isDuplicate}
      >
        <img src={item.src} alt={isDuplicate ? "" : item.alt} className="w-full h-full object-cover block" />
      </div>
    );
  });
};

function MarqueeSection() {
  return (
    <section
      id="page7"
      className="relative w-full max-w-[100vw] min-h-0 h-auto m-0 p-0 overflow-x-hidden overflow-y-visible bg-black py-4 md:py-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative w-full flex flex-col">
        <section
          className="marquees w-full min-h-0 flex flex-col justify-center items-center py-4 overflow-hidden scroll-smooth max-[900px]:py-3"
        >
          <div
            className="marquee-container relative w-full h-[200px] flex gap-0 mb-4 overflow-x-auto overflow-y-hidden p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              max-[900px]:h-[150px] max-[600px]:h-[120px] max-[480px]:h-[100px]"
            id="marquee-1"
          >
            <div className="marquee w-max h-full relative flex gap-6 items-center left-0">{renderRow(row1)}</div>
          </div>
          <div
            className="marquee-container relative w-full h-[200px] flex gap-0 mb-4 overflow-x-auto overflow-y-hidden p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              max-[900px]:h-[150px] max-[600px]:h-[120px] max-[480px]:h-[100px]"
            id="marquee-2"
          >
            <div className="marquee w-max h-full relative flex gap-6 items-center left-0">{renderRow(row2)}</div>
          </div>
          <div
            className="marquee-container relative w-full h-[200px] flex gap-0 mb-4 overflow-x-auto overflow-y-hidden p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              max-[900px]:h-[150px] max-[600px]:h-[120px] max-[480px]:h-[100px]"
            id="marquee-3"
          >
            <div className="marquee w-max h-full relative flex gap-6 items-center left-0">{renderRow(row3)}</div>
          </div>
          <div
            className="marquee-container relative w-full h-[200px] flex gap-0 mb-4 overflow-x-auto overflow-y-hidden p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              max-[900px]:h-[150px] max-[600px]:h-[120px] max-[480px]:h-[100px]"
            id="marquee-4"
          >
            <div className="marquee w-max h-full relative flex gap-6 items-center left-0">{renderRow(row4)}</div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default MarqueeSection;
