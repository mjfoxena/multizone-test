import React, { useRef, useState, useEffect } from "react";
import Hls from "hls.js";
import Image from "next/image";

export default function ParkAssist() {
  // Reference to video element
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoUrl =
      "https://player.vimeo.com/external/937771850.m3u8?s=ed6c67dd83243a2df137bccd5ec4a04708603c8d&logging=false";
    const videoElement = videoRef.current;

    if (videoElement) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoElement.play();
        });
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = videoUrl;
        videoElement.addEventListener("loadedmetadata", () => {
          videoElement.play();
        });
      }
    }
  }, []);

  return (
    <div className="relative w-full h-[50.000rem] flex-shrink-0 flex flex-col items-center bg-[#0B0B0B]">
      {/* Content */}
      {/* Video Section */}
      <video
        id="videoFirst"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        // poster={`/images/smarttech/poster_vedio.png`}
      />

      <div className="absolute z-10 bottom-0 left-0 flex flex-col gap-5 ml-[4.25rem] max-md:ml-[2.125rem] mb-[4.25rem] max-md:mb-[2.125rem]  ">
        <h1>
          <span className="text-[#F2EAFF] brutal text-[20px] font-normal uppercase">
            Park{" "}
          </span>

          <span className="text-[#F2EAFF] brutal text-[20px] font-medium uppercase">
            Assist
          </span>
        </h1>
        <p className="text-white brutal text-base max-md:text-[0.750rem] font-normal leading-[137.5%] max-md:leading-[1.250rem] w-[40.75em] max-md:w-[21.500rem] 2xl:w-[45rem]">
          Gone are the days of pushing/pulling your motorcycle for parking
          duties. Ease in and out of tight areas with complete control.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}
