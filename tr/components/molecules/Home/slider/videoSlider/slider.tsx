/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Style from "./index.module.scss";
import { API_CONSTANTS } from "../../../../../services/constants";

// Define base URL for video links
const baseLink = `${API_CONSTANTS.BASE_URL_S3}/homepage/videos`;

interface SliderProps {
  title: string;
  desc: string;
  videoId: string;
  duration: string;
  isMobile: boolean;
}

const Slider = ({ title, desc, isMobile, videoId, duration }: SliderProps) => {
  // State to track video playback
  const [showPlayButton, setShowPlayButton] = useState(true);

  const iFrameRef = useRef(null);

  // Reference to video element
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <div className="flex flex-col gap-4 sm:gap-4 2xl:gap-5 items-start h-full sm:h-full min-w-[90%] sm:min-w-[52%]  cards">
      <div className="relative  rounded-[1px] w-[95%] sm:w-[95%] h-[50%] max-h-[50%] sm:h-[70%] sm:max-h-[90%]">
        {/* Video Player */}
        <iframe
          ref={iFrameRef}
          title={title}
          width="100%"
          height="100%"
          className="rounded-[2px] shadow-md"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&fs=0&amp&controls=1&modestbranding=1&autohide=1&mute=1&loop=0&playlist=${videoId} `}
          allowFullScreen
        ></iframe>
      </div>
      {/* Slide Description */}
      <div className="flex flex-col gap-2  2xl:gap-2 sm:h-fit w-[100%] sm:w-[100%] h-[30%] mt-0 sm:mt-4 ">
        <h1 className={Style.videoTitle}>{desc}</h1>
        <h1 className={Style.videoTime}>{duration}</h1>
      </div>
    </div>
  );
};

export default Slider;
