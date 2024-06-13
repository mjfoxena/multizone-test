/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Style from "./slider.module.scss";
import { API_CONSTANTS } from "../../../../services/constants";
import Image from "next/image";
import Hls from "hls.js";

// Define base URL for video links
const baseLink = `${API_CONSTANTS.BASE_URL_S3}/homepage/videos`;

interface SliderProps {
  id: number;
  src: string;
  alt: string;
  title: string;
  desc: string;
  videoUrl: string;
  isMobile: boolean;
  firstImage?: boolean;
}

const Slider = ({
  id,
  src,
  alt,
  title,
  desc,
  isMobile,
  videoUrl,
}: SliderProps) => {
  // State to track video playback
  const [showPlayButton, setShowPlayButton] = useState(true);

  // Reference to video element
  const videoRef = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        if (play) videoRef.current?.play();
      });
    } else if (videoRef.current) {
      videoRef.current.src = videoUrl;
    }
  }, [videoUrl, play]);

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

  const toggleVideo = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
    setIsPlaying(!isPlaying); // Toggle the state
  };

  return (
    <div className="flex   flex-col gap-8 xl:gap-6 2xl:gap-10 items-start h-full  xl:h-full min-w-[90%] xl:min-w-[52%]  cards">
      <div className="relative overflow-hidden border border-[#1C1C1C]  rounded-[2px] w-[95%] sm:w-[95%] h-[50%] max-h-[50%] sm:h-[70%] sm:max-h-[90%]">
        {/* Video Player */}
        {videoUrl !== "" ? (
          <video
            ref={videoRef}
            muted
            playsInline
            onClick={toggleVideo}
            onEnded={handleEnd}
            className="cursor-pointer"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 1)",
              objectFit: "cover",
            }}
          ></video>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={500}
            height={500}
            className="sm:h-[100%] h-[100%] rounded-md  w-full sm:w-full object-cover"
          />
        )}
        {/* Play Button */}
        {showPlayButton && videoUrl !== "" && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Image
              onClick={playVideo}
              width={80}
              height={80}
              src="./images/home/newhome/jet/play_button.svg"
              alt="Play Button"
              priority={true}
              className="cursor-pointer z-20"
            />
          </div>
        )}
      </div>
      {/* Slide Description */}
      <div className="flex flex-col gap-2 sm:h-fit w-[100%] sm:w-[100%] h-[30%] 2xl:gap-4">
        <div className={Style.title}>{title}</div>
        <div className={Style.desc}>
          <div>{desc}</div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
