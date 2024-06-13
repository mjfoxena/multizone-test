import React, { useRef, useState, useEffect } from "react";
import { API_CONSTANTS } from "../../../../services/constants";
import Image from "next/image";
import Hls from "hls.js";

const imageVideoUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/limited/`;

export default function LockDownMode() {
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
      "https://player.vimeo.com/external/938201153.m3u8?s=3ec2b9a3e9a3f64f794e0c07f5d9fe95263ca7c2&logging=false";
    initializeHLS(src);
  }, []);

  return (
    <div className="w-full relative" style={{ paddingTop: "56.25%" }}>
      {/* Video Section */}
      <video
        id="videoFirst"
        ref={videoRef}
        playsInline
        onClick={pauseVideo}
        onEnded={handleEnd}
        className="absolute top-0 left-0 w-full h-full object-cover"
        poster={`https://d2atk76x06g5eh.cloudfront.net/smarttech/lockdown/lockdown_thumb_1.webp`}
      />

      {/* Play Button */}
      {showPlayButton && (
        <Image
          width={80}
          height={80}
          onClick={playVideo}
          src="/images/smarttech/icons/play_button.svg"
          alt="Play Button"
          className="absolute inset-0 m-auto  cursor-pointer z-20"
        />
      )}
    </div>
  );
}
