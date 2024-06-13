import React, { useEffect, useRef } from "react";
import { API_CONSTANTS } from "../../../../services/constants";
import { useInView } from "framer-motion";
import Hls from "hls.js";
import Image from "next/image";

const imageVideoUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/limited/`;
const baseLink = `${API_CONSTANTS.BASE_URL_S3}/homepage/videos`;

export default function RegenRativeBraking() {
  const videoOneRef = useRef<HTMLVideoElement>(null);
  const categoryRef = useRef(null);
  const isInView = useInView(categoryRef);

  useEffect(() => {
    const videoElement = videoOneRef.current;
    const videoUrl =
      "https://player.vimeo.com/external/941104087.m3u8?s=c60b2770a544b60fe86ac047220ac955aaf01a3b&logging=false";

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
      className="w-full  h-full  flex flex-row max-sm:flex-col md:flex-col xl:flex-row max-sm:justify-center max-sm:items-center relative"
    >
      <div className="md:relative h-[650px] md:h-[600px] xl:h-[650px] max-sm:h-[250px] w-[70%] max-sm:w-full md:w-full xl:w-[70%] max-sm:flex-col">
        <video
          ref={videoOneRef}
          id="videoFirst"
          autoPlay={false}
          loop
          playsInline
          muted
          className="md:absolute inset-0 h-full w-full object-fill z-0"
        />
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-center pb-[16px]">
          <h1 className="text-[18px] max-sm:text-[14px]">
            <span className="font-normal leading-normal brutal text-[#F2EAFF]">
              10 Levels
            </span>{" "}
            <span className="font-medium leading-normal brutal text-[#F2EAFF]">
              of REGENERATIVE BRAKING
            </span>
          </h1>
        </div>
      </div>

      <h1 className="md:hidden text-[24px] max-sm:text-[14px] mt-3 mb-5">
        <span className="font-normal leading-normal brutal text-[#F2EAFF]">
          10 Levels
        </span>{" "}
        <span className="font-medium leading-normal brutal text-[#F2EAFF]">
          of REGENERATIVE BRAKING
        </span>
      </h1>

      <div className="relative h-[650px] md:h-[100vh] xl:h-[650px]  w-[30%] md:w-full xl:w-[30%] max-sm:w-full">
        <Image
          src={
            "https://d2atk76x06g5eh.cloudfront.net/smarttech/lockdown/regen_desktop.svg"
          }
          alt="this is regen image"
          width={3000}
          height={700}
          objectFit="cover"
          className="absolute inset-0 h-full object-cover z-0"
        />
        <div className="absolute bottom-0 w-full flex justify-center items-center pb-[16px]">
          <h1 className="text-[18px] max-sm:text-[14px]">
            <span className="font-normal leading-normal brutal text-[#F2EAFF]">
              Control
            </span>{" "}
            <span className="font-medium leading-normal brutal text-[#F2EAFF]">
              REGEN LEVELS{" "}
            </span>
            <span className="font-normal leading-normal brutal text-[#F2EAFF]">
              in-flight
            </span>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
}
