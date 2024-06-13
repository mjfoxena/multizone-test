import React, { useEffect, useRef, useState } from "react";
import { API_CONSTANTS } from "../../../../services/constants";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Hls from "hls.js";
import Image from "next/image";

const imageVideoUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/limited/`;

export default function ConsoleTheme() {
  const videoOneRef = useRef<HTMLVideoElement>(null);
  const { ref: animationRef, inView } = useInView();
  const [isMuted, setIsMuted] = useState(false);

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
    const videoElement = videoOneRef.current;
    const videoUrl =
      "https://player.vimeo.com/external/946967713.m3u8?s=2c32792f49d5a1d174d4a79090d8301e6746fb0a&logging=false";

    const initializeHls = (videoElement, videoUrl) => {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoElement);
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = videoUrl;
      }
    };

    if (inView && videoElement) {
      initializeHls(videoElement, videoUrl);
      videoElement.play();
    } else if (videoElement) {
      videoElement.pause();
    }
  }, [inView]);

  useEffect(() => {
    const videoElement = videoOneRef.current;
    if (videoElement) {
      setIsMuted(videoElement.muted);
    }
  }, []);

  const toggleMute = () => {
    const videoElement = videoOneRef.current;
    if (videoElement) {
      const newMutedState = !videoElement.muted;
      videoElement.muted = newMutedState;
      setIsMuted(newMutedState); // This will trigger a re-render
    }
  };
  return (
    <div>
      <div
        ref={animationRef}
        className="relative w-full  flex flex-col items-center bg-[#0B0B0B]"
        style={{ paddingBottom: "56.25%" }}
      >
        {/* Video Section */}
        <video
          ref={videoOneRef}
          id="videoFirst"
          autoPlay={false}
          loop
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute bottom-0 left-0 flex w-full mb-[5.500rem] md:mb-5 xl:mb-[5.500rem] max-md:mb-0">
          {/* heading for desktop */}
          <div className=" hidden lg:flex flex-col gap-5 ml-[4.25rem]  max-md:ml-[2.125rem]">
            <motion.div
              ref={animationRef}
              initial="hidden"
              animate={firstAnimationControls}
              variants={firstAppear}
            >
              <h1>
                <span className="text-[#F2EAFF] brutal text-[20px] font-normal uppercase">
                  CONSOLE{" "}
                </span>

                <span className="text-[#F2EAFF] brutal text-[20px] font-medium uppercase">
                  THEME
                </span>
              </h1>
            </motion.div>
            <motion.div
              ref={animationRef}
              initial="hidden"
              animate={secondAnimationControls}
              variants={secondAppear}
            >
              <p className="text-white brutal text-base max-md:text-[0.750rem] font-normal leading-[137.5%] max-md:leading-[1.250rem] w-[40.75em] xl:w-[40.75rem] md:w-[33.75rem] max-md:w-[21.500rem] 2xl:w-[42rem]">
                Aviation DNA across the board, even when it comes to observing
                data. We’ve designed the console to make your experience that
                much closer to a real cockpit.
              </p>
            </motion.div>
          </div>
          <button
            onClick={toggleMute}
            className="absolute bottom-0 right-[4.25rem] xl:right-[4.25rem] md:right-10  max-md:right-3"
          >
            {isMuted ? (
              <Image
                src="/images/smarttech/icons/sound_off.svg"
                alt="Sound Off"
                width={20}
                height={20}
                className="w-10 h-10"
              />
            ) : (
              <Image
                width={20}
                height={20}
                src="/images/smarttech/icons/sound_on.svg"
                alt="Sound On"
                className="w-10 h-10"
              />
            )}
          </button>
        </div>
      </div>
      {/* heading for mobile */}
      <div className="hidden md:flex lg:hidden mt-5  flex-col gap-5 ml-[4.25rem] max-md:ml-[2.125rem]">
        <h1>
          <span className="text-[#F2EAFF] brutal text-[20px] font-normal uppercase">
            CONSOLE{" "}
          </span>

          <span className="text-[#F2EAFF] brutal text-[20px] font-medium uppercase">
            THEME
          </span>
        </h1>
        <p className="text-white brutal text-base max-md:text-[0.750rem] font-normal leading-[137.5%] max-md:leading-[1.250rem] w-[33.75em] max-md:w-[21.500rem] 2xl:w-[42rem]">
          Aviation DNA across the board, even when it comes to observing data.
          We’ve designed the console to make your experience that much closer to
          a real cockpit.
        </p>
      </div>
      {/* heading for tablet */}
      <div className=" mt-5 flex flex-col gap-5 ml-[4.25rem] max-md:ml-[2.125rem] md:hidden">
        <h1>
          <span className="text-[#F2EAFF] brutal text-[20px] font-normal uppercase">
            CONSOLE{" "}
          </span>

          <span className="text-[#F2EAFF] brutal text-[20px] font-medium uppercase">
            THEME
          </span>
        </h1>
        <p className="text-white brutal text-base max-md:text-[0.750rem] font-normal leading-[137.5%] max-md:leading-[1.250rem] w-[33.75em] max-md:w-[21.500rem] 2xl:w-[42rem]">
          Aviation DNA across the board, even when it comes to observing data.
          We’ve designed the console to make your experience that much closer to
          a real cockpit.
        </p>
      </div>
    </div>
  );
}
