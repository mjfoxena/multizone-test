import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, delay, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Hls from "hls.js";
import { AlertItem } from "../violetteenabledtech/alertItem";

interface IVioletTecht {
  title: string;
  videoLink: string;
}

const smartTechAlertOnMobile: IVioletTecht[] = [
  {
    title: "Vehicle Diagnostics",
    videoLink: `https://player.vimeo.com/external/938086296.m3u8?s=9a95eb83b2db57f5eab4a2fc205e8f16252d7bf7&logging=false`,
  },
  {
    title: "Ride Analytics",
    videoLink: `https://player.vimeo.com/external/938086323.m3u8?s=8f1f8c6ba5eabf6752e7054bd77347b97df6ac6f&logging=false`,
  },
  {
    title: "Charge Limit",
    videoLink: `https://player.vimeo.com/external/938086340.m3u8?s=4308b6829b0c65e2cdd599533b690270cd8dcc14&logging=false`,
  },
  {
    title: "FindMyF77",
    videoLink: `https://player.vimeo.com/external/938086352.m3u8?s=cc63243e087ce0e3b332176cde7700e99516ab75&logging=false`,
  },
  {
    title: "Controls In Your Palm",
    videoLink: `https://player.vimeo.com/external/938086365.m3u8?s=442b288ce56af90fe960ea9e4253d586e4534869&logging=false`,
  },
];

export default function MobileVideo() {
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
      videoRef.current.src = smartTechAlertOnMobile[selectedAlert].videoLink;
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
        prevIndex === smartTechAlertOnMobile.length - 1 ? 0 : prevIndex + 1;

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
        hls.loadSource(smartTechAlertOnMobile[selectedAlert].videoLink);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // For Safari
        video.src = smartTechAlertOnMobile[selectedAlert].videoLink;
        video.addEventListener("loadedmetadata", function () {
          video.play();
        });
      }
    }
  }, [selectedAlert]);

  return (
    <div
      ref={animationRef}
      className="w-full h-full flex flex-col items-center bg-[#000] relative md:hidden"
      style={{ backgroundColor: "#000" }}
    >
      <div className="w-full md:max-w-[70rem] max-md:max-w-full xl:max-w-[71.00rem]">
        {/* bg image */}
        <div className="md:hidden">
          <Image
            src={"/images/smarttech/beingConnected/beingConnectedMobileBg.svg"}
            alt="bg.image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>

        {/* mobile */}

        <div
          className="
           text-[#F2EAFF] text-center font-normal eurostile text-[1.625rem] leading-[2.000rem] tracking-[2px] uppercase mt-[7.938rem]"
        >
          <motion.div
            ref={animationRef}
            initial="hidden"
            animate={firstAnimationControls}
            variants={firstAppear}
            className="md:hidden"
          >
            <span className="block">being </span>
            <span className="block">connected</span>
          </motion.div>
          <motion.div
            ref={animationRef}
            initial="hidden"
            animate={secondAnimationControls}
            variants={secondAppear}
          >
            <span className="block text-[#6840DA]">Always</span>
          </motion.div>
        </div>

        <div className="flex w-full max-md:flex-col h-full  justify-between  mt-[5%]">
          {/* mobile  */}
          <motion.div
            ref={animationRef}
            initial="hidden"
            animate={thiredAnimationControls}
            variants={thiredAppear}
            className="md:hidden"
          >
            <div className=" mt-[5.688rem]">
              <h1 className="text-[#F2EAFF] brutal text-[1.000rem] font-normal text-center leading-[1.500rem] uppercase">
                UV App available for all F77 pilots
              </h1>
              <h2 className="mt-[0.875] text-[#666666] brutal text-center text-[0.875rem] font-normal leading-normal">
                Android | iOS
              </h2>
            </div>
          </motion.div>

          <div
            ref={containerRef}
            className="z-10 md:hidden flex max-md:overflow-x-auto mt-[4.063rem] overflow-hidden gap-5 pl-[8.688rem] pr-[5.688rem]  hide-scroll-bar"
          >
            {smartTechAlertOnMobile.map((alert, index) => (
              <AlertItem
                key={index}
                iconSrc={
                  selectedAlert === index
                    ? "/images/smarttech/icons/blu_plu.png"
                    : "/images/smarttech/icons/the_pls.png"
                }
                rotate={selectedAlert === index ? "rotate-0" : "rotate-0"}
                title={alert.title}
                fontWeight="font-normal"
                color={
                  selectedAlert === index ? "text-[#9557F6]" : "text-[#FFFFFF]"
                }
                opacity=""
                onClick={() => handleAlertClick(index)}
              />
            ))}
          </div>

          {
            <div className="w-full h-[100vh] flex-shrink-0 mb-[10.688rem]   ">
              <video
                autoPlay
                muted
                playsInline
                loop={false}
                onEnded={handleVideoEnd}
                ref={videoRef}
                preload="metadata"
                className="w-full h-full object-cover"
              ></video>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
