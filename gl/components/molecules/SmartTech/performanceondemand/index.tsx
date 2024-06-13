import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Hls from "hls.js";

export default function PerformanceOnDemand() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(
          "https://player.vimeo.com/external/936965986.m3u8?s=b8ccb23cdd7de9a04845197c425d431017337d54&logging=false"
        );
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (isInView) {
            videoRef.current?.play();
          }
        });
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src =
          "https://player.vimeo.com/external/936965986.m3u8?s=b8ccb23cdd7de9a04845197c425d431017337d54&logging=false";
        videoRef.current.addEventListener("loadedmetadata", () => {
          if (isInView) {
            videoRef.current?.play();
          }
        });
      }
    }
  }, [isInView]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#000] z-10 mt-[16.688rem] max-md:mt-[4.500rem] ">
      <div className=" w-full md:max-w-[70rem] max-md:max-w-full xl:max-w-[71.00rem] max-md:items-center">
        <div className=" text-[#F2EAFF] w-full text-center eurostile leading-[1.913rem] text-[3.375rem] max-md:text-[1.625rem] font-normal uppercase max-md:max-w-[19.563] max-md:pr-[45px]">
          <span className="block  leading-normal">Performance </span>
          <span className="pl-[15%] max-md:pl-[30%]   text-[#6840DA]">
            on demand
          </span>
        </div>

        {/* ride mode for mobile */}
        <div className=" max-md:mt-[3.688rem] mt-[5.125rem] relative items-center w-full flex justify-center">
          <div className="flex items-center">
            <div className="flex flex-col">
              <h1 className="text-center eurostile max-md:text-[4.688rem] text-[6.313rem] leading-none opacity-70 bg-gradient-to-t from-[#2D2D2D] via-transparent to-transparent bg-clip-text text-transparent font-normal">
                3
              </h1>

              <h1 className="text-center eurostile max-md:text-[4.688rem] text-[6.313rem] leading-none my-[-20px] text-[#F2EAFF] font-normal">
                3
              </h1>

              <h1 className="text-center eurostile max-md:text-[4.688rem] text-[6.313rem] leading-none opacity-70 bg-gradient-to-b from-[#2D2D2D] via-transparent to-transparent bg-clip-text text-transparent font-normal">
                3
              </h1>
            </div>
            <div className="flex flex-col pl-2 max-md:mt-1 mt-4">
              <h1 className="gemsbuck max-md:text-[26px] text-[2.863rem] leading-[26px] text-[#F2EAFF] font-normal">
                RIDE
              </h1>

              <h1 className="gemsbuck max-md:text-[26px] text-[2.863rem] md:mt-3 leading-[26px] text-[#F2EAFF] font-normal">
                MODES
              </h1>
            </div>
          </div>
          <h1 className="brutal max-md:text-[18px] 2xl:text-[24px] text-[22px] leading-[30px] text-[#F2EAFF] font-normal absolute bottom-[2.025rem] max-md:bottom-[12px]">
            3 Different Personalities
          </h1>
        </div>

        <div className="flex justify-center items-center w-full h-full mb-[8.250rem]">
          <video
            ref={videoRef}
            autoPlay={true}
            playsInline
            muted
            className="w-[640px] h-[200px] object-cover"
          ></video>
        </div>
      </div>
    </div>
  );
}
