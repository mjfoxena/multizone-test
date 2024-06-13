import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import wheenLoading from "../../../../public/loader/Loading_dots_(White).json";
import { API_CONSTANTS } from "../../../../services/constants";
import CommonDivider from "../../commondivider";
import LottiePlayer from "../../lottiePlayer/lottie_player";
import Style from "../index.module.scss";
import { ScrollMobile } from "../ScrollMobile";
import SlickSlider from "../SlickSlider";

interface TerrainProps {
  isMobile: boolean;
  videoMaps: Array<Map<string, string>>;
}

const baseLink = `${API_CONSTANTS.BASE_URL_S3}/homepage/videos`;

const Terrains = ({ isMobile }) => {
  const controlBoxCharged = useAnimation();
  const controlChargedText = useAnimation();

  const [refBoxCharged, inViewBoxCharged] = useInView();

  const [refChargedText, inViewChargedtext] = useInView();
  const videoOneRefConnect = useRef(null);

  const chikma = useRef(null);
  const hampi = useRef(null);
  const kannur = useRef(null);

  const terrainList = [
    {
      title: "Chikmagalur",
      link: `${baseLink}/chikma.mp4`,
      id: "chikma_video",
      ref: chikma,
    },
    {
      title: "Hampi",
      link: `${baseLink}/hampi.mp4`,
      id: "hampi_video",
      ref: hampi,
    },
    {
      title: "kannur",
      link: `${baseLink}/kannur.mp4`,
      id: "kannur_video",
      ref: kannur,
    },
  ];

  const lastSlideClassName = "last-slide-video";

  const [scrollItems, setScrollItems] = useState(
    terrainList.map((terrain) => (
      <div
        key={terrain.title}
        className="sm:mr-10 flex flex-row w-[86vw] sm:w-auto"
        style={{ cursor: "url('/images/icons/drag-arrow.svg'), auto" }}
      >
        <video
          ref={terrain.ref}
          id={terrain.id}
          autoPlay={true}
          playsInline
          muted
          loop
        >
          <source src={terrain.link} />
        </video>
      </div>
    ))
  );

  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: 40 },
  };

  useEffect(() => {
    terrainList.forEach((terrain) => {
      const test: any = document.getElementById(terrain.id);
      if (test)
        test.onmouseover = function () {
          test.play();
        };
    });
  }, [chikma, hampi, kannur]);

  useEffect(() => {
    if (inViewChargedtext) {
      controlChargedText.start("visible");
    } else {
      controlChargedText.start("hidden");
    }
  }, [controlChargedText, inViewChargedtext]);

  useEffect(() => {
    if (inViewBoxCharged) {
      controlBoxCharged.start("visible");
    } else {
      controlBoxCharged.start("hidden");
    }
  }, [controlBoxCharged, inViewBoxCharged]);

  return (
    <div className="bg-[#1E1E1E]">
      <div className="pt-[62px] sm:pt-[164px] sm:pb-[60px]">
        {/* Header */}
        <div className="px-7 sm:px-[140px]  ">
          <div className="pb-10 sm:pb-0 flex flex-col sm:flex-row">
            <div className="sm:w-[50%]">
              <motion.div
                ref={refBoxCharged}
                variants={boxVariant}
                initial="hidden"
                animate={controlBoxCharged}
                className="flex flex-col"
              >
                <div className="flex flex-row">
                  <div className={Style.designed}>designed for</div>
                  <div className={Style.wheelLoading}>
                    <LottiePlayer autoplay loop src={wheenLoading} />
                  </div>
                </div>
                <div className={Style.superText}>ALL TERRAINS</div>
              </motion.div>
            </div>
            <div className="">
              <motion.div
                ref={refChargedText}
                variants={boxVariant}
                initial="hidden"
                animate={controlChargedText}
                className={Style.termsTextCharged}
              >
                <p>
                  Rigorously tested on the most unforgiving <br />
                  on and off-road terrain.
                </p>
              </motion.div>
            </div>
          </div>
          <CommonDivider className="pr-1 sm:pr-0" />
        </div>

        {/* Columns */}
        {!isMobile && (
          <div className="sm:ml-[140px] flex flex-row right-0">
            <SlickSlider
              slides={scrollItems}
              lastSlideClassName={`${lastSlideClassName} right-0`}
              variableWidth={true}
              slideToScrollCount={1}
            />
          </div>
        )}
        {isMobile && (
          <div className="ml-7">
            <ScrollMobile>{scrollItems.map((video) => video)}</ScrollMobile>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terrains;
