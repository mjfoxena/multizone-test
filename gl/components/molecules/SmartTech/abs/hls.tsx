// components/HLSVideo.tsx

import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HLSVideoProps {
  src: string;
  description: string;
}

const HLSVideo: React.FC<HLSVideoProps> = ({ src, description }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let hlsInstance: Hls | null = null;

    if (Hls.isSupported()) {
      hlsInstance = new Hls(); // Instantiate Hls with the correct case
      hlsInstance.loadSource(src);
      hlsInstance.attachMedia(videoRef.current!);
    } else if (videoRef.current!.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current!.src = src;
    }

    // Clean up
    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [src]);

  return (
    <div className="embla__slide__number">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        playsInline
        autoPlay
        muted
      />
      <div className="embla__slide__description">{description}</div>
    </div>
  );
};

export default HLSVideo;
