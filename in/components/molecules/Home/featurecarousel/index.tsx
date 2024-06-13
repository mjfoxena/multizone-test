import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

import styled from "styled-components";
import iploader from "../../../../public/loader/ip65.json";
import { MapCss } from "../../../../utils/utils";
import LottiePlayer from "../../lottiePlayer/lottie_player";
import CountUpComp from "../countUp";
import Style from "../index.module.scss";
import { ScrollMobile } from "../ScrollMobile";
import SlickSlider from "../SlickSlider";

const WhiteCard = styled.div`
  && .slick-current {
    width: auto !important;
  }
`;

interface CarouselItem {
  id: string;
  content: JSX.Element;
}

const FeatureCarousel = ({ isMobile }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [draggedItem, setDraggedItem] = useState<any>(null);

  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 1.1 } },
    hidden: { opacity: 0.1, y: 60 },
  };

  const items = [
    <motion.div
      key="show1"
      id="show1"
      className="flex flex-col sm:flex-row h-[375px] sm:h-[82vh] sm:w-[85vw] py-[6vh] sm:py-[35vh] sm:justify-around px-5 sm:px-0 each-item"
    >
      <div className={Style.overWhiteText}>
        The F77 battery pack comes equipped with the most advanced safety
        features across 5 levels.
      </div>
      <div className="flex flex-wrap mt-[86px] sm:mt-[0]  w-[330px] sm:w-[670px]">
        <div className="flex flex-col items-start w-[55px] sm:w-auto sm:mr-11">
          <div className={`${Style.whiteNumber} mb-2`}>01</div>
          <div className={Style.branchName}>mechanical</div>
        </div>
        <div className="flex flex-col items-start w-[55px] sm:w-auto sm:mr-11">
          <div className={`${Style.whiteNumber} mb-2`}>02</div>
          <div className={Style.branchName}>thermal</div>
        </div>
        <div className="flex flex-col items-start w-[55px] sm:w-auto sm:mr-11">
          <div className={`${Style.whiteNumber} mb-2`}>03</div>
          <div className={Style.branchName}>electrical</div>
        </div>
        <div className="flex flex-col items-start w-[55px] sm:w-auto sm:mr-11">
          <div className={`${Style.whiteNumber} mb-2`}>04</div>
          <div className={Style.branchName}>electronic</div>
        </div>
        <div className="flex flex-col items-start w-[55px] sm:w-auto">
          <div className={`${Style.whiteNumber} mb-2`}>05</div>
          <div className={Style.branchName}>software</div>
        </div>
      </div>
    </motion.div>,
    <motion.div
      key="show2"
      id="show2"
      className="each-item flex flex-col py-[90px] sm:flex-row sm:py-[300px] h-[400px] sm:h-[82vh] sm:w-[85vw] sm:justify-between items-center sm:px-[124px]"
      variants={boxVariant}
      initial="hidden"
      animate="visible"
    >
      <div
        className={MapCss(
          Style,
          "f77SppedText",
          "text-[16px] sm:text-[28px]  sm:py-[200px] sm:py-0 text-[#444444]"
        )}
      >
        battery warranty
      </div>
      <div
        className={MapCss(
          Style,
          "uptoEightYears",
          "text-[36px] sm:text-[49px] mt-16 sm:mt-0"
        )}
      >
        UPTO <CountUpComp countStart={0} countEnd={8} decimal={0} /> YEARS*
      </div>
    </motion.div>,
    <motion.div
      key="show3"
      id="show3"
      className="each-item flex flex-col sm:flex-row h-[375px] py-[50px] sm:py-[300px] sm:h-[82vh] sm:w-[85vw] sm:justify-between items-center px-[41px] sm:px-[124px]"
      variants={boxVariant}
      initial="hidden"
      animate="visible"
    >
      <div className={Style.subTextIp}>
        This state of the art energy unit is armed with an all aluminium IP-67
        rated enclosure with ingress protection against water and dust.
      </div>
      <div
        className={MapCss(
          Style,
          "uptoEightYears",
          "text-[30px] sm:text-[95px]"
        )}
      >
        <div style={{ width: `${isMobile && "170px"}` }}>
          <LottiePlayer autoplay loop src={iploader} />
        </div>
      </div>
    </motion.div>,
    <motion.div
      key="show4"
      id="show4"
      className="each-item flex items-center py-24 sm:py-0 gap-5 sm:gap-[160px] sm:h-[82vh] sm:w-[85vw] px-12 sm:px-[250px]"
    >
      <div className="flex flex-col">
        <div>
          <Image
            alt="arrow"
            width={isMobile ? 42 : 194}
            height={isMobile ? 9 : 43}
            src={"/images/icons/f77.svg"}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={Style.f77name}>ORIGINAL</div>
        <div
          className={MapCss(
            Style,
            "f77Spped",
            "text-[17px] sm:text-[48px] text-[#262626] sm:mt-[70px] sm:mb-[8px]"
          )}
        >
          <CountUpComp countStart={150} countEnd={206} decimal={0} /> km
        </div>
        <div
          className={MapCss(
            Style,
            "f77SppedText",
            " text-[6px] sm:text-[14px] text-[#4A4A4A] sm:mb-[25px]"
          )}
        >
          IDC range
        </div>
        <div
          className={MapCss(
            Style,
            "f77Spped",
            "text-[17px] sm:text-[48px] text-[#BFBFBF] sm:mb-[6px]"
          )}
        >
          <CountUpComp countStart={100} countEnd={176} decimal={0} /> km
        </div>
        <div
          className={MapCss(
            Style,
            "f77SppedText",
            "text-[6px] sm:text-[14px] text-[#4A4A4A]"
          )}
        >
          est. real world range
        </div>
      </div>
      <div className="w-[1px] sm:flex h-44 sm:h-[60vh] bg-[#BBBBBB]"></div>
      <div className="flex flex-col">
        <div>
          <Image
            alt="arrow"
            width={isMobile ? 42 : 194}
            height={isMobile ? 9 : 43}
            src={"/images/icons/f77.svg"}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={Style.f77name}>RECON</div>
        <div
          className={MapCss(
            Style,
            "f77Spped",
            "text-[17px] sm:text-[48px] text-[#262626] sm:mt-[70px] sm:mb-[8px]"
          )}
        >
          <CountUpComp countStart={250} countEnd={307} decimal={0} /> km
        </div>
        <div
          className={MapCss(
            Style,
            "f77SppedText",
            "text-[6px] sm:text-[14px] text-[#4A4A4A] sm:mb-[25px]"
          )}
        >
          IDC range
        </div>
        <div
          className={MapCss(
            Style,
            "f77Spped",
            "text-[17px] sm:text-[48px] text-[#BFBFBF] sm:mb-[6px]"
          )}
        >
          <CountUpComp countStart={220} countEnd={261} decimal={0} /> km
        </div>
        <div
          className={MapCss(
            Style,
            "f77SppedText",
            "text-[6px] sm:text-[14px] text-[#4A4A4A]"
          )}
        >
          est. real world range
        </div>
      </div>
    </motion.div>,
  ];

  const lastSlideClassName = "last-slide";

  const [scrollItems, setScrollItems] = useState(items);

  return (
    <>
      {!isMobile && (
        <div
          ref={rootRef}
          style={{ cursor: "url('/images/icons/drag-arrow.svg'), auto" }}
          className={` bg-[#000000] ${Style["feature-carousel"]}`}
        >
          <SlickSlider
            slides={scrollItems}
            lastSlideClassName={lastSlideClassName}
          />
        </div>
      )}
      {isMobile && (
        <div className={`homepage-slider-mobile`}>
          <ScrollMobile>{scrollItems.map((item) => item)}</ScrollMobile>
        </div>
      )}
    </>
  );
};

export default FeatureCarousel;
