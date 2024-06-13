import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { API_CONSTANTS } from "../../../../services/constants";
import Style from "../../../../pages/limited/limited.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Hls from "hls.js";
import MobileVideo from "./mobileVideo";

const baseLink = `${API_CONSTANTS.BASE_URL_S3}/homepage/videos`;

interface IVioletTecht {
  title: string;
  videoLink: string;
}

const smartTechAlert: IVioletTecht[] = [
  {
    title: "Vehicle Diagnostics",
    videoLink: `https://player.vimeo.com/external/937006667.m3u8?s=3211dc24ffd0e3db39ecc855ef32efada8dc4c6b&logging=false`,
  },
  {
    title: "Ride Analytics",
    videoLink: `https://player.vimeo.com/external/937006687.m3u8?s=a83e94ad8668d500efef6029aad77f93c0de584a&logging=false`,
  },
  {
    title: "Charge Limit",
    videoLink: `https://player.vimeo.com/external/937006722.m3u8?s=ccae031bb8482f094b69f7379c7b489f3a86014b&logging=false`,
  },
  {
    title: "FindMyF77",
    videoLink: `https://player.vimeo.com/external/937006736.m3u8?s=90284fd1d52e3d7fc5a98a5faae6bbee02877361&logging=false`,
  },
  {
    title: "Controls In Your Palm",
    videoLink: `https://player.vimeo.com/external/937006760.m3u8?s=fa2c510b3ae76af09881df816db0bae92e6891be&logging=false`,
  },
];
export default function BeingConnected() {
  const [selectedAlert, setSelectedAlert] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null); // Explicitly typing the ref
  const { ref: animationRef, inView } = useInView();

  const firstAnimationControls = useAnimation();
  const secondAnimationControls = useAnimation();
  const thiredAnimationControls = useAnimation();
  const fourthAnimationControls = useAnimation();
  const fifthAnimationControls = useAnimation();
  const sixthAnimationControls = useAnimation();
  const sevenAnimationControls = useAnimation();
  const sevenonMbAnimationControls = useAnimation();

  const firstAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9 } },
  };

  const secondAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.2 } },
  };
  const thiredAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.3 } },
  };
  const fourthAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.4 } },
  };
  const fivethAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.5 } },
  };
  const sixthhAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.6 } },
  };
  const sevenAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.7 } },
  };
  const sevenonMbAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.7 } },
  };

  React.useEffect(() => {
    if (inView) {
      firstAnimationControls.start("visible");
      secondAnimationControls.start("visible");
      thiredAnimationControls.start("visible");
      fourthAnimationControls.start("visible");
      fifthAnimationControls.start("visible");
      sixthAnimationControls.start("visible");
      sevenAnimationControls.start("visible");
      sevenonMbAnimationControls.start("visible");
    } else {
      firstAnimationControls.start("hidden");
      secondAnimationControls.start("hidden");
      thiredAnimationControls.start("hidden");
      fourthAnimationControls.start("hidden");
      fifthAnimationControls.start("hidden");
      sixthAnimationControls.start("hidden");
      sevenAnimationControls.start("hidden");
      sevenonMbAnimationControls.start("hidden");
    }
  }, [
    inView,
    firstAnimationControls,
    secondAnimationControls,
    thiredAnimationControls,
    fourthAnimationControls,
    fifthAnimationControls,
    sixthAnimationControls,
    sevenAnimationControls,
    sevenonMbAnimationControls,
  ]);

  useEffect(() => {
    if (inView) {
      setSelectedAlert(0);
    }
  }, [inView]);

  useEffect(() => {
    // When selectedAlert changes, update the video source and play it
    if (videoRef.current) {
      videoRef.current.src = smartTechAlert[selectedAlert].videoLink;
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [selectedAlert]);

  useEffect(() => {
    if (inView && containerRef.current) {
      const container = containerRef.current;
      const selectedItem = container.children[selectedAlert] as HTMLDivElement;
      const containerWidth = container.offsetWidth;
      const selectedItemWidth = selectedItem.offsetWidth;
      const selectedItemOffset =
        selectedItem.offsetLeft + selectedItemWidth / 2;
      const halfContainerWidth = containerWidth / 2;

      // Calculate the scroll position to center the selected item
      let scrollPosition = selectedItemOffset - halfContainerWidth;

      // Adjust scroll position if it's negative or beyond the maximum scroll width
      scrollPosition = Math.max(0, scrollPosition);
      scrollPosition = Math.min(
        container.scrollWidth - containerWidth,
        scrollPosition
      );

      // Smooth scroll to the selected item
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [inView, selectedAlert, containerRef]);

  const handleAlertClick = (index: number) => {
    setSelectedAlert(index);

    // Scroll to the selected item
    if (containerRef.current) {
      const container = containerRef.current;
      const selectedItem = container.children[index] as HTMLDivElement;
      const containerWidth = container.offsetWidth;
      const selectedItemWidth = selectedItem.offsetWidth;
      const selectedItemOffset =
        selectedItem.offsetLeft + selectedItemWidth / 2;
      const halfContainerWidth = containerWidth / 2;

      // Calculate the scroll position to center the selected item
      let scrollPosition = selectedItemOffset - halfContainerWidth;

      // Adjust scroll position if it's negative or beyond the maximum scroll width
      scrollPosition = Math.max(0, scrollPosition);
      scrollPosition = Math.min(
        container.scrollWidth - containerWidth,
        scrollPosition
      );

      // Smooth scroll to the selected item
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }

    setSelectedAlert((prevIndex) => {
      const nextIndex =
        prevIndex === smartTechAlert.length - 1 ? 0 : prevIndex + 1;

      // Scroll to the next alert item
      if (containerRef.current) {
        const container = containerRef.current;
        const nextItem = container.children[nextIndex] as HTMLDivElement;
        const containerWidth = container.offsetWidth;
        const nextItemWidth = nextItem.offsetWidth;
        const nextItemOffset = nextItem.offsetLeft + nextItemWidth / 2;
        const halfContainerWidth = containerWidth / 2;

        // Calculate the scroll position to center the next item
        let scrollPosition = nextItemOffset - halfContainerWidth;

        // Adjust scroll position if it's negative or beyond the maximum scroll width
        scrollPosition = Math.max(0, scrollPosition);
        scrollPosition = Math.min(
          container.scrollWidth - containerWidth,
          scrollPosition
        );

        // Smooth scroll to the next item
        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }

      return nextIndex;
    });
  };

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      // Check if HLS is supported
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(smartTechAlert[selectedAlert].videoLink);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // For Safari
        video.src = smartTechAlert[selectedAlert].videoLink;
        video.addEventListener("loadedmetadata", function () {
          video.play();
        });
      }
    }
  }, [selectedAlert]);

  return (
    <>
      {/* desktop */}
      <div
        ref={animationRef}
        className="w-full h-full flex flex-col items-center bg-[#000] relative max-sm:hidden"
        style={{ backgroundColor: "#000" }}
      >
        <div className="w-full md:max-w-[70rem] max-sm:max-w-full xl:max-w-[71.00rem]">
          {/* desktop */}
          <h1 className=" text-[#F2EAFF] text-center eurostile text-4xl leading-[2.500rem] tracking-[2px] uppercase mt-[10.438rem]">
            <motion.div
              ref={animationRef}
              initial="hidden"
              animate={firstAnimationControls}
              variants={firstAppear}
            >
              <span className="block">being connected </span>
            </motion.div>
            <motion.div
              ref={animationRef}
              initial="hidden"
              animate={secondAnimationControls}
              variants={secondAppear}
            >
              <span className="block text-[#6840DA]">Always</span>
            </motion.div>
          </h1>

          <div className="flex w-full md:flex-col xl:flex-row max-sm:flex-col h-full  justify-between md:items-center  mt-[5%]">
            {/* only for tab  */}
            <div className=" hidden xl:hidden lg:block   md:flex flex-col justify-center items-start z-10 mt-[10%]  w-full pl-20 pr-20">
              <motion.div
                ref={animationRef}
                initial="hidden"
                animate={thiredAnimationControls}
                variants={thiredAppear}
                className="max-sm:hidden"
              >
                <div className="">
                  <h1 className="text-[#F2EAFF] brutal text-2xl font-medium">
                    UV App available for all F77 pilots
                  </h1>
                  <h2 className="text-[#666666] mt-2 brutal text-base font-normal">
                    Android | iOS
                  </h2>
                </div>
              </motion.div>

              {/* only for tab  */}
              <div className="grid grid-cols-3 gap-[2.750rem] mt-[10%]  mb-[5.125rem] max-sm:items-center max-sm:hidden">
                {smartTechAlert.map((alert, index) => (
                  <motion.div
                    ref={animationRef}
                    initial="hidden"
                    animate={fourthAnimationControls}
                    variants={fourthAppear}
                    key={index} // Added key for better list handling in React
                  >
                    <AlertItem
                      iconSrc={
                        selectedAlert === index
                          ? "/images/smarttech/icons/blu_plu.png"
                          : "/images/smarttech/icons/the_pls.png"
                      }
                      rotate={selectedAlert === index ? "rotate-0" : "rotate-0"}
                      title={alert.title}
                      fontWeight="font-normal"
                      color={
                        selectedAlert === index
                          ? "text-[#9557F6]"
                          : "text-[#FFFFFF]"
                      }
                      opacity=""
                      onClick={() => handleAlertClick(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {
              <motion.div
                ref={animationRef}
                initial="hidden"
                animate={fifthAnimationControls}
                variants={fivethAppear}
              >
                <div className="w-[550px] xl:w-[550px] md:w-full h-[33.188rem] xl:h-[33.188rem] md:h-[80vh] max-sm:h-[30.500rem] flex-shrink-0 mb-[10.688rem]   max-sm:mb-[10.688rem] ">
                  <video
                    autoPlay
                    muted
                    playsInline
                    loop={false}
                    onEnded={handleVideoEnd}
                    ref={videoRef}
                    preload="metadata"
                    className={Style.videoContainer}
                  >
                    {/* <source src={smartTechAlert[selectedAlert].videoLink} /> */}
                  </video>
                </div>
              </motion.div>
            }

            <div className="hidden md:hidden xl:block  :flex flex-col z-10">
              <motion.div
                ref={animationRef}
                initial="hidden"
                animate={thiredAnimationControls}
                variants={thiredAppear}
                className="max-sm:hidden"
              >
                <div className="">
                  <h1 className="text-[#F2EAFF] brutal text-2xl font-medium">
                    UV App available for all F77 pilots
                  </h1>
                  <h2 className="text-[#666666] mt-2 brutal text-base font-normal">
                    Android | iOS
                  </h2>
                </div>
              </motion.div>

              {/*  desktop */}
              <div className=" flex-col gap-[2.750rem] mt-[15%] max-sm:items-center mb-[9.125rem] xl:flex-nowrap  max-sm:hidden">
                <div className="flex flex-col gap-[2.750rem] max-sm:flex max-sm:flex-col max-sm:justify-start max-sm:gap-10 ">
                  {smartTechAlert.map((alert, index) => (
                    <motion.div
                      ref={animationRef}
                      initial="hidden"
                      animate={fourthAnimationControls}
                      variants={fourthAppear}
                    >
                      <AlertItem
                        iconSrc={
                          selectedAlert === index
                            ? "/images/smarttech/icons/blu_plu.png"
                            : "/images/smarttech/icons/the_pls.png"
                        }
                        rotate={
                          selectedAlert === index ? "rotate-0" : "rotate-0"
                        }
                        title={alert.title}
                        fontWeight="font-normal"
                        color={
                          selectedAlert === index
                            ? "text-[#9557F6]"
                            : "text-[#FFFFFF]"
                        }
                        opacity=""
                        onClick={() => handleAlertClick(index)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile */}
      <MobileVideo />
    </>
  );
}

const AlertItem = ({
  iconSrc,
  title,
  fontWeight,
  opacity,
  color,
  rotate,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-row items-center gap-3 cursor-pointer"
    >
      <Image
        src={iconSrc}
        alt="icon"
        width={25}
        priority
        height={25}
        objectFit="cover"
        className={`w-5 h-5 flex-shrink-0 transform transition-transform duration-300 ${rotate}`}
      />
      <h1
        className={`${color} text-base font-normal whitespace-nowrap brutal leading-normal ${fontWeight} ${
          opacity ? "opacity-60" : ""
        }`}
      >
        {title}
      </h1>
      <div className="pl-5 md:hidden"> </div>
    </div>
  );
};
