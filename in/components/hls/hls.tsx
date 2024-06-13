// HlsPlayer.tsx
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HlsPlayerProps {
  videoUrl: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  className?: string;
}

const HlsPlayer: React.FC<HlsPlayerProps> = ({
  videoUrl,
  autoPlay = true,
  controls = false,
  muted = false,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoElement);
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = videoUrl;
    }

    if (autoPlay) {
      videoElement.play();
    }

    return () => {
      if (videoElement) {
        videoElement.pause();
      }
    };
  }, [videoUrl, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      controls={controls}
      muted={muted}
      playsInline
    />
  );
};

export default HlsPlayer;
