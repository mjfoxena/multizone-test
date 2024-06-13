import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Image from "next/image";

interface CustomVideoPlayerProps {
  videoUrl: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  videoUrl,
  autoPlay = false,
  muted = false,
  loop = false,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoElement);
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = videoUrl;
      }

      videoElement.muted = isMuted;
      if (autoPlay) {
        videoElement.play();
      }
    }
  }, [videoUrl, autoPlay, isMuted]);

  const toggleMute = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const newMutedState = !videoElement.muted;
      videoElement.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        onPlay={() => setShowControls(true)}
        onEnded={() => setShowControls(false)}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {showControls && (
        <button
          onClick={toggleMute}
          className="absolute bottom-10 right-10 z-10"
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
              src="/images/smarttech/icons/sound_on.svg"
              alt="Sound On"
              width={20}
              height={20}
              className="w-10 h-10"
            />
          )}
        </button>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
