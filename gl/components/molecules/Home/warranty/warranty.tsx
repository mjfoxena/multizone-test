import React, { useEffect, useRef, useState } from "react";
import Style from "./warrantystyle.module.css";
import { motion, useAnimation, useInView } from "framer-motion";
import VideoPlayer from "../video/video";

const Warranty8 = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoMob, setPlayVideoMob] = useState(false);
  const [textAnimated, setTextAnimated] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(-500);

  const controlText = useAnimation();
  const controlTextMob = useAnimation();

  const videoOneRef = useRef<HTMLVideoElement | null>(null);
  const videoOneRefMob = useRef<HTMLVideoElement | null>(null);
  const warrantyRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const updateScrollPosition = () => {
      if (warrantyRef.current) {
        const currentPosition =
          window.scrollY || document.documentElement.scrollTop;
        const offsetTop = warrantyRef.current.offsetTop-250;
        const activePosition = currentPosition - offsetTop;
        setScrollPosition(currentPosition - offsetTop);
      }
    };

    window.addEventListener("scroll", updateScrollPosition);

    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, [scrollPosition]);


  useEffect(() => {
    if (!playVideo && warrantyRef.current && scrollPosition > -200) {
      controlText.start("visible");
      const videoTimeoutId = setTimeout(() => {
        setPlayVideo(true);
      }, 0);

      return () => {
        clearTimeout(videoTimeoutId);
      };
    }

    if (!playVideoMob && warrantyRef.current && scrollPosition > -10) {
      controlTextMob.start("visible");
      const videoTimeoutId = setTimeout(() => {
        setPlayVideoMob(true);
      }, 0);

      return () => {
        clearTimeout(videoTimeoutId);
      };
    }
  }, [controlText, controlTextMob, playVideo, playVideoMob, scrollPosition]);


  const textVariants = {
    visible: {
      opacity: 1,
      z: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    hidden: {
      opacity: 0,
      z: 100,
    },
    up: {
      opacity: 1,
      y: -300,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const textVariantsMob = {
    visible: {
      opacity: 1,
      z: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    hidden: {
      opacity: 0,
      z: 100,
    },
    up: {
      opacity: 1,
      y: -120,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    if (playVideo) {
      const textTimeoutId = setTimeout(() => {
        controlText.start("up");
      }, 1500);

      return () => {
        clearTimeout(textTimeoutId);
      };
    }
  }, [controlText, playVideo]);

  useEffect(() => {
    if (playVideoMob) {
      const textTimeout = setTimeout(() => {
        controlTextMob.start("up");
      }, 1500);

      return () => {
        clearTimeout(textTimeout);
      };
    }
  }, [controlTextMob, playVideoMob]);

  return (
    <div className={Style.warrantySec} ref={warrantyRef}>
      <div className="relative flex justify-center w-full h-full ">
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={controlText}
          className=" absolute top-[50%]  sm:top-[45%]  z-50 hidden sm:flex flex-col gap-4"
        >
          <p className={Style.unlimitedText}>8,00,000 Km*</p>
          <p className={Style.warrantyText}>warranty</p>
        </motion.div>
        <div className=" w-full h-full hidden sm:flex ">
          {playVideo && (
              <VideoPlayer play={true} loop={false} src={'https://player.vimeo.com/external/936957321.m3u8?s=aa13a13796a12707001cec46c37b78e80d356af4&logging=false'} />
         
           )}
        </div>

        <motion.div
          variants={textVariantsMob}
          initial="hidden"
          animate={controlTextMob}
          className=" absolute top-[45%] sm:hidden mt-12 "
        >
          <p className={Style.unlimitedText}>8,00,000 Km*</p>
          <p className={Style.warrantyText}>warranty</p>
        </motion.div>
        <div className="sm:hidden flex  w-full h-full mt-12">
          {playVideoMob && (
            <VideoPlayer play={true} loop={false} src={'https://player.vimeo.com/external/936957281.m3u8?s=bfcf960340a1156774cf73401f8a48303ef7624b&logging=false'} />
         
          )}
        </div>
      </div>
    </div>
  );
};

export default Warranty8;