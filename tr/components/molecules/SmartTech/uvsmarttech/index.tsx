import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import Hls from "hls.js";

export default function UvSmartTech() {
  const videoOneRef = useRef<HTMLVideoElement>(null);
  const categoryRef = useRef(null);
  const isInView = useInView(categoryRef);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const videoElement = videoOneRef.current;
    const videoUrl =
      "https://player.vimeo.com/external/937567085.m3u8?s=85ccefd19593c3923e53446da672a6071fd57169&logging=false";

    const initializeHls = (videoElement, videoUrl) => {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoElement);
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = videoUrl;
      }
    };

    if (isInView && videoElement) {
      initializeHls(videoElement, videoUrl);
      videoElement.play();
    } else if (videoElement) {
      videoElement.pause();
    }
  }, [isInView]);
  return (
    <div
      ref={categoryRef}
      className="w-full h-screen flex flex-col bg-[#000] relative overflow-hidden"
    >
      <div
        className="absolute rounded-full overflow-hidden max-md:hidden 2xl:hidden"
        style={{
          background:
            "radial-gradient(rgba(66, 35, 156, 0.5) 0%, rgba(0,0,0,0) 70%)",
          animation: "moveGradient 60s infinite",
          backdropFilter: "blur(10px)",
          width: "60vw",
          height: "60vw",
          top: "40%",
          left: "42%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
      {/* this is for 2xl screen */}
      <div
        className="absolute rounded-full overflow-hidden hidden 2xl:block"
        style={{
          background:
            "radial-gradient(rgba(66, 35, 156, 0.5) 0%, rgba(0,0,0,0) 70%)",
          animation: "moveGradientOF2xScreen 60s infinite",
          backdropFilter: "blur(10px)",
          width: "60vw",
          height: "60vw",
          top: "40%",
          left: "42%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>

      <div
        className="absolute w-full h-full rounded-full overflow-hidden md:hidden"
        style={{
          background:
            "radial-gradient(rgba(66, 35, 156, 0.5) 0%, rgba(0,0,0,0) 70%)",
          animation: "moveGradientOnMobile 25s infinite",
          backdropFilter: "blur(10px)",

          //  transform: "translate(-50%, -50%)",
        }}
      ></div>

      <div className="flex flex-col  justify-start z-10 relative w-full h-full">
        {/* the sub heading and heading */}
        <div className="mt-[8.375rem] max-md:mt-[2.375rem]">
          <h1 className="text-[#FFF] text-center disketMono tracking-[3px]  text-[10px] font-normal  opacity-80">
            EXPERIENCE
          </h1>
          <h1 className="text-white text-center eurostile text-[4.000rem] font-normal leading-tight mt-2 opacity-80">
            <span className="max-md:block"> UV </span>
            <span className="text-[#6840DA]  "> SMART </span>
            <span className="text-[#6840DA]"> TECH</span>
          </h1>
        </div>
        {/*  the description */}

        <div className="flex items-center justify-center gap-14 max-w-[100%] mt-[5.000rem] max-md:mt-[5.625rem]">
          <span className="max-md:hidden text-white text-center max-md:text-center brutal text-[14px] max-md:text-[12px] font-normal leading-[1.375rem] md:max-w-[8.75rem] max-md:max-w-[19.188rem] 2xl:max-w-[30rem] xl:max-w-[34.063rem] opacity-80">
            <h1 className="md:block">
              {" "}
              Welcome to the new era of performance motorcycling.{" "}
            </h1>
            <h1>
              {" "}
              Handling power, safety, security and diagnostics was never this
              advanced.
            </h1>
          </span>
          <span className="md:hidden text-white text-center max-md:text-center brutal text-[12px] max-md:text-[14px] font-normal leading-[1.375rem] max-md:max-w-[23.188rem]  opacity-80">
            <h1 className="">
              Welcome to the new era of performance motorcycling. Handling
              power, safety, security and diagnostics was never this advanced.
            </h1>
          </span>
        </div>
        <div className="flex flex-col  text-[rgb(242,234,255)] text-center justify-center items-center disketMono text-[10px]  max-md:text-[10px] font-normal leading-normal tracking-[3px] max-md:tracking-[2px] opacity-80 mt-[8.625rem] max-md:mt-[8.000rem]">
          <h1>ACCESS GRANTED</h1>
          <Image
            src={"/images/smarttech/uvSmartTech/down_arrow.png"}
            alt="arrow"
            width={15}
            height={15}
            objectFit="cover"
            className="mt-5 mb-7"
          ></Image>
          <video
            ref={videoOneRef}
            id="videoFirst"
            autoPlay
            muted
            playsInline
            className="  w-full h-full object-cover max-w-[237.333px] max-h-[100.202px]"
          />
        </div>
      </div>
      {/* Fading effect at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>
  );
}
