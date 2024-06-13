import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import VioletteHeading from "./violetHeadingDesk";
import Content from "./content";
import EnabledTechHead from "./enabledTechHead";
import VideoWrapper from "../../../../utils/videoPlayer";

import Hls from "hls.js";

export default function IntroducingViolette() {
  const videoOneRef = useRef<HTMLVideoElement>(null);
  const categoryRef = useRef(null);
  const isInView = useInView(categoryRef);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const videoElement = videoOneRef.current;
    const videoUrl =
      "https://player.vimeo.com/external/936964457.m3u8?s=6fe7596c9382f4a97e6ed6b714c230d32603d8cc&logging=false";

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
    <div className="w-full h-full flex flex-col items-center bg-[#000] relative max-md:mt-[6.250rem]">
      {/* Background Image */}
      <div className="absolute top-[-12%] xl:top-[-2%] 2xl:top-[1%] xl:left-[31%] 2xl:left-[35%] md:left-[20%] md:top-[-0%] max-md:left-[-20%] max-md:top-[-2%] w-full h-full">
        <div className="h-[100px] w-[600px]">
          <Image
            src={
              "/images/smarttech/introducingViolette/indroducing_violete_right_sidebg.png"
            }
            alt="bg.image"
            width={800}
            height={800}
            priority
            style={{
              fill: "linear-gradient(187deg, rgba(145, 78, 255, 0.20) 32.63%, rgba(0, 56, 255, 0.00) 91.83%)",
              filter: "blur(50px)",
            }}
            objectFit="cover"
            className="rounded-md z-10 object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:max-w-[75rem]  max-md:max-w-full xl:max-w-[71.00rem] flex flex-col justify-center items-center mt-[15.688rem] ">
        <div className="w-full flex flex-col justify-center items-center">
          <VioletteHeading />
          <h1 className="mt-5 md:mt-0 xl:mt5  max-md:left-[45%] text-center text-[#5B03EC] disketMono text-[20px] leading-normal uppercase  ">
            a.i.
          </h1>
          <div className="w-full h-full flex flex-col items-center bg-[#000] relative">
            {/* Video */}
            <div ref={categoryRef} className="relative w-full h-[650px] ">
              <video
                ref={videoOneRef}
                id="videoFirst"
                autoPlay
                muted
                playsInline
                onPlay={() => setShowControls(true)}
                onEnded={() => setShowControls(false)}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Mute/Unmute Button */}
            {showControls && (
              <button
                onClick={toggleMute}
                className="absolute bottom-10 right-16 z-10"
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
            )}
          </div>

          {/* Additional Content */}
          <Content />
        </div>

        {/* Enabled Tech */}
        <EnabledTechHead />
      </div>

      {/* Rotated Image */}
      <div className="absolute top-[30%] md:top-[40%] max-md:top-[25%] max-md:right-[-120%] xl:top-[40%] right-[-5%] 2xl:right-[-30%] xl:right-[-30%] md:right-[-60%]  rotate-[-87.825deg] ">
        <Image
          src={
            "/images/smarttech/introducingViolette/indroducing_violete_right_sidebg.png"
          }
          alt="bg.image"
          width={1000}
          height={1000}
          priority
          objectFit="cover"
          style={{ transform: "rotate(-87.825deg)" }}
          className="overflow-hidden "
        />
      </div>
    </div>
  );
}
