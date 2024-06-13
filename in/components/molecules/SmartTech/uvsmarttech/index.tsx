// UvSmartTech.tsx
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import HlsPlayer from "../../../hls/hls";

export default function UvSmartTech() {
  const categoryRef = useRef(null);
  const isInView = useInView(categoryRef, { once: true });
  const videoUrl =
    "https://player.vimeo.com/external/937567085.m3u8?s=85ccefd19593c3923e53446da672a6071fd57169&logging=false";

  useEffect(() => {}, [isInView]);

  return (
    <div
      ref={categoryRef}
      className="w-full h-full flex flex-col bg-[#000] relative overflow-hidden"
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
          animation: "moveGradientOnMobile 60s infinite",
          backdropFilter: "blur(10px)",
        }}
      ></div>

      <div className="flex flex-col z-10  w-full justify-center items-center h-screen">
        <div className="flex flex-col justify-between items-center w-full max-w-[80%] md:max-w-full max-sm:max-w-full xl:max-w-[80%] h-screen max-h-[80%] xl:max-h-[70%] md:max-h-[70%] max-sm:max-h-[100%] p-10 max-sm:mb-10">
          {/* uv smart tech and subtitle */}

          <div className="w-full">
            <h1 className="text-[#FFF] text-center disketMono tracking-[3px]  text-[10px] font-normal  opacity-80">
              EXPERIENCE
            </h1>
            <h1 className="text-white text-center eurostile text-[4.000rem] font-normal leading-tight mt-2 opacity-80">
              <span className="max-md:block"> UV </span>
              <span className="text-[#6840DA]  "> SMART </span>
              <span className="text-[#6840DA]"> TECH</span>
            </h1>

            {/* description */}
            <div>
              <div className="flex items-center justify-center  md:mt-10 max-sm:mt-10 ">
                <span className=" text-white text-center max-md:text-center brutal text-[12px] max-md:text-[14px] font-normal leading-[1.375rem] max-md:max-w-[23.188rem]  opacity-80">
                  <h1 className="md:max-w-[30.188rem]">
                    <span className="md:block">
                      {" "}
                      Welcome to the new era of performance motorcycling.
                    </span>{" "}
                    Handling power, safety, security and diagnostics was never
                    this advanced.
                  </h1>
                </span>
              </div>
            </div>
          </div>

          {/* video and text */}

          <div className="w-full">
            <div className="flex flex-col  text-[rgb(242,234,255)] text-center justify-center items-center disketMono text-[10px]  max-md:text-[10px] font-normal leading-normal tracking-[3px] max-md:tracking-[2px] opacity-80 ">
              <h1>ACCESS GRANTED</h1>
              <Image
                src={"/images/smarttech/uvSmartTech/down_arrow.png"}
                alt="arrow"
                width={15}
                height={15}
                objectFit="cover"
                className="mt-5 mb-7 animate-bounce"
              />

              <HlsPlayer
                videoUrl={videoUrl}
                autoPlay
                muted
                className="w-full h-full object-cover max-w-[237.333px] max-h-[100.202px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fading effect at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>
  );
}
