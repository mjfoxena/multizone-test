import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { API_CONSTANTS } from "../../../../services/constants";
import { delay, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import VideoWrapper from "../../../../utils/videoPlayer";
import Hls from "hls.js";
import { AlertItem } from "./alertItem";

const baseLink = `${API_CONSTANTS.BASE_URL_S3}/homepage/videos`;

interface IVioletTecht {
  title: string;
  videoLink: string;
}

const smartTechAlert: IVioletTecht[] = [
  {
    title: "Movement & Fall Alert",
    videoLink: `https://player.vimeo.com/external/938288011.m3u8?s=c05ffa3272d8b754044c939283aba02c5948d0e9&logging=false`,
  },

  {
    title: "Towing Alert",
    videoLink: `https://player.vimeo.com/external/938287409.m3u8?s=0cb02c247268f69ab96b341c1cea527407dac14c&logging=false`,
  },
];

export default function MobileAlertVideo() {
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
    <div className="md:hidden flex flex-col ">
      {/* Video container */}
      <motion.div
        ref={animationRef}
        initial="hidden"
        animate={secondAnimationControls}
        variants={secondAppear}
      >
        <div className="h-[420px] w-full mt-16">
          <video
            autoPlay
            muted
            loop={false}
            onEnded={handleVideoEnd}
            ref={videoRef}
            playsInline
            className=" w-full h-full object-cover"
            preload="metadata"
          ></video>
        </div>
      </motion.div>

      {/* Scrolling alert items */}
      <div
        ref={containerRef}
        className={`
md:hidden 
absolute 
flex 
overflow-x-auto 
gap-5 
pl-[8.688rem] 
pr-[8.688rem]
mt-2
hide-scroll-bar
`}
        style={{ maxHeight: "400px", width: "100%" }}
      >
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
              selectedAlert === index ? "text-[#6840DA]" : "text-[#FFFFFF]"
            }
            opacity=""
            onClick={() => handleAlertClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
