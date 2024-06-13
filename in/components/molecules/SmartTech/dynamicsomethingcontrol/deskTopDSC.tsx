import React, { useRef, useState } from "react";
import Image from "next/image";
import Hls from "hls.js";

export default function DeskTopDSC() {
  // State to track video playback
  const [showPlayButton, setShowPlayButton] = useState(true);

  // Reference to video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // Function to initialize HLS
  const initializeHLS = (src) => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current) {
      videoRef.current.src = src;
    }
  };

  // Function to play video
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayButton(false);
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setShowPlayButton(true);
    }
  };

  const handleEnd = () => {
    setShowPlayButton(true);
  };

  // Initialize HLS on component mount
  React.useEffect(() => {
    const src =
      "https://player.vimeo.com/external/937359445.m3u8?s=634a8dbfe60b540ba63e5d702b2717f41ec7acc1&logging=false";
    initializeHLS(src);
  }, []);

  return (
    <div className="pl-[5%] md:pl-0  xl:pl-[5%]  md:mt-[5.313rem] xl:mt-0 max-md:hidden ">
      <div className="w-[695px] xl:w-[695px] md:w-full relative">
        <video
          ref={videoRef}
          playsInline
          autoPlay={false}
          preload="auto"
          onClick={pauseVideo}
          onEnded={handleEnd}
        />
        {showPlayButton && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              onClick={playVideo}
              width={80}
              height={80}
              src="/images/smarttech/icons/play_button.svg"
              alt="Play Button"
              className="cursor-pointer z-20"
            />
          </div>
        )}
      </div>
    </div>
  );
}
