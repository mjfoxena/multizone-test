import React, { useEffect, useRef, useState } from "react";
import { API_CONSTANTS } from "../../../../services/constants";
import { useInView } from "framer-motion";
import Hls from "hls.js";
import Image from "next/image";

const imageVideoUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/limited/`;

export default function ConsoleTheme() {
  const videoOneRef = useRef<HTMLVideoElement>(null);
  const categoryRef = useRef(null);
  const isInView = useInView(categoryRef);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const videoElement = videoOneRef.current;
    const videoUrl =
      "https://player.vimeo.com/external/937588937.m3u8?s=f398378268cd3080a17b5810c4709a570467ba21&logging=false";

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
    <div>
      <div
        ref={categoryRef}
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

        <div className="absolute bottom-0 left-0 flex w-full mb-[5.500rem] max-md:mb-0">
          <div className=" flex flex-col gap-5 ml-[4.25rem] max-md:ml-[2.125rem]   max-md:hidden">
            <h1>
              <span className="text-[#F2EAFF] brutal text-[20px] font-normal uppercase">
                CONSOLE{" "}
              </span>

              <span className="text-[#F2EAFF] brutal text-[20px] font-medium uppercase">
                THEME
              </span>
            </h1>
            <p className="text-white brutal text-base max-md:text-[0.750rem] font-normal leading-[137.5%] max-md:leading-[1.250rem] w-[40.75em] max-md:w-[21.500rem] 2xl:w-[42rem]">
              Aviation DNA across the board, even when it comes to observing
              data. We’ve designed the console to make your experience that much
              closer to a real cockpit.
            </p>
          </div>
          <button
            onClick={toggleMute}
            className="absolute bottom-0 right-[4.25rem]  max-md:right-3"
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
