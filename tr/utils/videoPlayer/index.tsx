import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Image from "next/image";

const VideoWrapper: React.FC<{
  src: string;
  hasplayButton?: boolean;
  vheight?: string;
  vwidth?: string;
  loop?: boolean;
  muted?: boolean;
  autoplay?: boolean;
  onEndVideo?: () => void;
  className: string;
  videoRef: React.RefObject<HTMLVideoElement>;
}> = ({
  src,
  hasplayButton,
  videoRef,
  vheight,
  autoplay,
  loop,
  vwidth,
  className,
  muted,
  onEndVideo,
}) => {
  if (hasplayButton) {
    return (
      <VideoWithPlayButton
        src={src}
        forwardedRef={videoRef}
        vHeight={vheight}
        className={className}
        vWidth={vwidth}
        muted={muted}
      />
    );
  } else {
    return (
      <VideoPlayer
        autoPlay={autoplay}
        loop={loop}
        src={src}
        forwardedRef={videoRef}
        onEndVideo={onEndVideo}
        className={className}
      />
    );
  }
};

const VideoWithPlayButton: React.FC<{
  src: string;
  vHeight?: string;
  vWidth?: string;
  className: string;
  muted?: boolean;
  forwardedRef: React.RefObject<HTMLVideoElement>;
}> = ({ src, forwardedRef, vHeight, vWidth, className, muted }) => {
  const videoRef = forwardedRef;
  // State to track video playback
  const [showPlayButton, setShowPlayButton] = useState(true);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      });
    } else if (videoRef.current) {
      videoRef.current.src = src;
      // No need to call pause here as autoPlay is set to false
    }
  }, [src, videoRef]);

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

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <video
        ref={videoRef}
        muted={muted}
        playsInline
        autoPlay={false}
        preload="auto"
        onClick={pauseVideo}
        onEnded={handleEnd}
        className={className}
      />
      {showPlayButton && (
        <Image
          onClick={playVideo}
          width={50}
          height={50}
          src="/images/smarttech/icons/play_button.svg"
          alt="Play Button"
          className="absolute inset-0 m-auto w-[110px] h-[110px] cursor-pointer z-20"
        />
      )}
    </div>
  );
};

const VideoPlayer: React.FC<{
  src: string;
  forwardedRef: React.RefObject<HTMLVideoElement>;
  autoPlay?: boolean;
  loop?: boolean;
  className: string;
  onEndVideo?: () => void;
}> = ({ src, forwardedRef, autoPlay, loop, className, onEndVideo }) => {
  const videoRef = forwardedRef;

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          const handleFirstInteraction = () => {
            videoRef.current?.play();
            // Remove the event listener after the video starts playing
            document.removeEventListener("hoverstart", handleFirstInteraction);
          };
          document.addEventListener("hoverstart", handleFirstInteraction);
        });
      }
    };

    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, playVideo);
    } else if (videoRef.current) {
      videoRef.current.src = src;
      videoRef.current.addEventListener("loadeddata", playVideo);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadeddata", playVideo);
      }
    };
  }, [src, videoRef, onEndVideo]);

  return (
    <video
      playsInline
      autoPlay={autoPlay}
      ref={videoRef}
      loop={loop}
      muted
      onEnded={onEndVideo}
      preload="metadata"
      className={className}
    />
  );
};

export default VideoWrapper;
