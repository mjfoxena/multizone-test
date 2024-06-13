import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  src: string;
  setVideoEnded?: (ended: boolean) => void;
  play: boolean;
  unmuted?: boolean;
  pause?: boolean;
  loop: boolean;
  poster?:string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  setVideoEnded,
  unmuted,
  play,
  pause,
  loop,
  poster
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  // const [playVideo, setPlayVideo] = useState(true);

  // useEffect(() => {
  //   setPlayVideo(play);
  // }, [play]);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        if (play) videoRef.current?.play();
      });
    } else if (videoRef.current) {
      videoRef.current.src = src;
    }

    if (unmuted) {
      setMuted(false);
    }

    // Reset videoEnded state when src changes, if setVideoEnded is provided
    if (setVideoEnded) {
      setVideoEnded(false);
    }
  }, [src, setVideoEnded, unmuted, setMuted,  play]);

  const handleVideoEnd = () => {
    if (setVideoEnded) {
      setVideoEnded(true);
    }
  };

  return (
    <div className="w-full h-full ">
      <video
        autoPlay={play}
        ref={videoRef}
        muted={muted}
        loop={loop}
        playsInline
        onEnded={handleVideoEnd}
        preload="auto"
        poster={poster}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default VideoPlayer;
