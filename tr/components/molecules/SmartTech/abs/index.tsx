import React, { useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EmblaCarousel from "./custom_slider";
import RemoteSafety from "../remotesfety/indext";

const HeadingBlock = ({ mainHeading, subHeading }) => (
  <div className="flex flex-col  max-md:gap-1 max-md:flex-row items-center">
    <h1 className="text-white text-center brutal text-[16px] font-normal  max-md:text-[0.875rem]">
      {mainHeading} {subHeading}
    </h1>
  </div>
);

const OPTIONS = { loop: true };

export default function SmartTechSlider() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const headings = [
    { mainHeading: "TRACTION CONTROL", subHeading: "" },
    { mainHeading: "ANTI-COLLISSION WARNING SYSTEM", subHeading: "" },
    // { mainHeading: "MONO & DUAL CHANNEL", subHeading: "ABS" },
    { mainHeading: "HILLHOLD", subHeading: "" },
  ];

  const getIndicatorColor = (index) => {
    return index === activeSlideIndex ? "#6840DA" : "#797979";
  };

  const handleSlideSelect = (index) => {
    setActiveSlideIndex(index);
  };

  return (
    <div className="bg-[#000] ">
      <div className="flex w-full justify-center mb-[0.875rem] max-md:mb-[0.938rem] ">
        <HeadingBlock
          mainHeading={headings[activeSlideIndex].mainHeading}
          subHeading={headings[activeSlideIndex].subHeading}
        />
      </div>
      {/* slider */}
      <EmblaCarousel options={OPTIONS} onSlideSelect={handleSlideSelect} />

      <div className="w-full flex gap-2 justify-center items-center  mt-[2.000rem]">
        {headings.map((_, index) => (
          <div
            key={index}
            className="h-[2px] w-[30px]"
            style={{ backgroundColor: getIndicatorColor(index) }}
          />
        ))}
      </div>
      <RemoteSafety />
    </div>
  );
}
