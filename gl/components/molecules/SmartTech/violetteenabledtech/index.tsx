import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { API_CONSTANTS } from "../../../../services/constants";
import { delay, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import VideoWrapper from "../../../../utils/videoPlayer";
import Hls from "hls.js";
import { AlertItem } from "./alertItem";
import MobileAlertVideo from "./mobileAlertVideo";

const baseLink = `${API_CONSTANTS.BASE_URL_S3}/homepage/videos`;

interface IVioletTecht {
  title: string;
  videoLink: string;
}

const smartTechAlert: IVioletTecht[] = [
  {
    title: "Movement & Fall Alert",
    videoLink: `https://player.vimeo.com/external/938299852.m3u8?s=ba3b240bd925b583703dcb00095ce6b1a724c86d&logging=false`,
  },

  {
    title: "Towing Alert",
    videoLink: `https://player.vimeo.com/external/938300833.m3u8?s=46bb98e361c6158b6777b2d7cf3763a1c236b0ec&logging=false`,
  },
];

export default function VioletteEnabledTech() {
  const [selectedAlert, setSelectedAlert] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: animationRef, inView } = useInView();

  const firstAnimationControls = useAnimation();
  const secondAnimationControls = useAnimation();

  const firstAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9 } },
  };

  const secondAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.2 } },
  };

  React.useEffect(() => {
    if (inView) {
      firstAnimationControls.start("visible");
      secondAnimationControls.start("visible");
    } else {
      firstAnimationControls.start("hidden");
      secondAnimationControls.start("hidden");
    }
  }, [inView, firstAnimationControls, secondAnimationControls]);
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
    // Assuming you have a state to track the selected alert
    setSelectedAlert(index);

    // Scroll to the selected item
    if (containerRef.current) {
      const container = containerRef.current;
      const selectedItem = container.children[index] as HTMLDivElement;
      const containerWidth = container.offsetWidth;
      const selectedItemWidth = selectedItem.offsetWidth;

      // Calculate the scroll position to center the selected item
      let scrollPosition =
        selectedItem.offsetLeft - containerWidth / 2 + selectedItemWidth / 2;

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

        // Calculate the scroll position to center the next item
        let scrollPosition =
          nextItem.offsetLeft - containerWidth / 2 + nextItemWidth / 2;

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
    <div className=" w-full     mt-[7.438rem] max-md:mt-[0rem] flex justify-center items-start max-md:flex-col relative">
      <div className="flex 2xl:mr-[7%] max-md:flex-col flex-row justify-end w-full md:max-w-[70rem] max-md:max-w-full xl:max-w-[71.00rem] ">
        <motion.div
          ref={animationRef}
          initial="hidden"
          animate={firstAnimationControls}
          variants={firstAppear}
        >
          <div className="flex flex-col gap-5 max-md:justify-center max-md:items-center ">
            <div>
              <h1 className="max-md:mt-[5.688rem] max-md:mb-5  text-white brutal text-[2rem] max-md:text-[1.000rem] font-normal leading-[2.25rem] max-md:leading-[1.875rem] max-w-[29.313rem] max-md:max-w-[16.813rem] max-md:text-center">
                Violette watches over your motorcycle while you’re off duty.{" "}
              </h1>

              <p className="text-[#C7C0D2] max-md:hidden   max-w-[25.000rem] max-md:mt-[1.875rem] mt-[2.000rem] max-md:mb-[6.938rem] max-md:text-center  brutal text-[1.000rem] font-normal leading-[1.375rem] max-md:leading-[1.500rem] opacity-80  ">
                Violette A.I. will always keep your F77 Mach 2 connected to our
                servers - even with the key off*
              </p>
              <p className="text-[#C7C0D2]  md:hidden max-w-[17.688rem] mt-[0.875rem]  max-md:text-center  brutal text-[0.750rem] font-normal leading-[1.375rem] max-md:leading-[1.250rem] opacity-80  ">
                Violette A.I. will always keep your F77 Mach 2 connected to our
                servers - even with the key off*
              </p>
            </div>

            {/* for desktop  for alertItem */}

            <div className=" flex flex-col gap-[2.750rem] mt-[15%] max-md:hidden">
              {smartTechAlert.map((alert, index) => (
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
                    selectedAlert === index
                      ? "text-[#6840DA]"
                      : "text-[#FFFFFF]"
                  }
                  opacity=""
                  onClick={() => handleAlertClick(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* mobile alert video */}
        <div className="mt-10">
          <MobileAlertVideo />
        </div>

        {/* desk top alert video */}
      </div>
      <motion.div
        ref={animationRef}
        initial="hidden"
        animate={secondAnimationControls}
        variants={secondAppear}
        // className="max-md:hidden"
      >
        <div className="h-[600px] w-[800px] relative max-md:hidden">
          <video
            autoPlay
            muted
            loop={false}
            onEnded={handleVideoEnd}
            ref={videoRef}
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
            preload="metadata"
          ></video>
        </div>
      </motion.div>
    </div>
  );
}
