import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { API_CONSTANTS } from "../../../services/constants";
import LottiePlayer from "../lottiePlayer/lottie_player";
import Style from "./index.module.scss";

export const MainOverlayVideo = ({ overlay, setOverlay }) => {
  const [muted, setMuted] = useState(true);
  const [text, setText] = useState("");
  const [holding, setHolding] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceType, setDeviceType] = useState({ device: "desktop" });

  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef<HTMLDivElement>(null);

  function timeUpdateHandler(event) {
    const { currentTime } = event.currentTarget;
    if (currentTime >= 14 && currentTime < 17) {
      setText("2035 ultraviolette racing league");
    } else if (currentTime >= 22 && currentTime < 25) {
      setText("2030 ultraviolette global presence");
    } else if (currentTime >= 28 && currentTime < 31) {
      setText("2027 uv production goes carbon neutral");
    } else if (currentTime >= 35 && currentTime < 38) {
      setText("2025 uv introduces multiple mobility segments");
    } else if (currentTime >= 41 && currentTime < 45) {
      setText("2024 energy network expansion");
    } else {
      setText("");
    }
  }

  const { setShowNavbar } = useContext(NavbarContext);

  useEffect(() => {
    if (holding) {
      if (videoRef.current) {
        videoRef.current.style.display = "block";
        videoRef.current.autoplay = true;
        videoRef.current?.play();
      }

      setMuted(false);

      setTimeout(() => {
        setIsPlaying(true);
        holdRef.current?.remove();
        mobileRef.current?.remove();
      }, 700);
    }
  }, [holding]);

  useEffect(() => {
    if (overlay) {
      document.body.classList.add("body-overflow-hidden");
    } else {
      document.body.classList.remove("body-overflow-hidden");
    }
    if (window.innerWidth < 500) {
      setDeviceType({ device: "mobile" });
      if (holdRef.current) {
        holdRef.current.style.display = "none";
      }
      setTimeout(() => {
        if (mobileRef.current) {
          mobileRef.current.style.display = "none";
          if (holdRef.current) {
            holdRef.current.style.display = "block";
          }
        }
      }, 3000);
    } else {
      if (mobileRef.current) {
        mobileRef.current.style.display = "none";
      }
    }
    function handleResize() {
      if (holdRef.current) {
        holdRef.current.style.display = "block";
      }
      if (mobileRef.current) {
        mobileRef.current.style.display = "none";
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("body-overflow-hidden");
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className={Style.overlayMain}
      onClick={() => setHolding(true)}
    >
      {/* 1st layer for mobile only */}
      <div className={Style["mobile-gif"]} ref={mobileRef}>
        <LottiePlayer
          autoplay
          loop
          src={`${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/rotate.json`}
        />
        <p className={`${Style["mobile-gif-text"]} text-white`}>
          for best experience, please rotate your phone
        </p>
      </div>
      {/* 2nd layer for both */}
      <div
        className={`${Style["hold-screen"]}`}
        ref={holdRef}
        onMouseDown={() => deviceType.device == "desktop" && setHolding(true)}
        // onMouseUp={() => deviceType.device == "desktop" && setHolding(false)}
        onTouchStart={() => setHolding(true)}
      >
        <video autoPlay loop muted controls={false} playsInline>
          <source
            type="video/mp4"
            src={`${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/videos/future_video/main_loop.mp4`}
          />
        </video>
        <div
          className={`absolute bottom-24 text-white flex justify-center w-full ${Style["hold-screen-text"]}`}
        >
          {`${deviceType.device === "desktop" ? "CLICK" : "TAP"} TO ENTER`}
        </div>
      </div>
      {/* 3rd layer for both  */}
      <video
        playsInline
        className={Style["overlay-video"]}
        ref={videoRef}
        height={"100%"}
        width={"100%"}
        controls={false}
        muted={muted}
        onTimeUpdate={timeUpdateHandler}
        onEnded={() => {
          setShowNavbar(true);
          setOverlay(false);
        }}
      >
        <source
          type="video/mp4"
          src={`${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/videos/uv_vision.mp4`}
        />
      </video>
      <div className="absolute bottom-[70%] left-[10%] sm:bottom-[0%] sm:left-[7%] text-white">
        <div className={Style.overlayVideoYear}>{text.slice(0, 4)}</div>
        <div
          className={`${Style.overlayVideoText} ${
            text.length == 0 ? Style.fadeIn : ""
          }`}
        >
          {text.slice(5)}
        </div>
      </div>
      {isPlaying && (
        <div className={`${Style["overlay-control"]}`}>
          <div className="cursor-pointer" onClick={() => setMuted(!muted)}>
            <Image
              height={muted ? 25 : 12}
              width={muted ? 25 : 12}
              src={
                muted
                  ? "/images/home/muteButton.svg"
                  : "/images/home/unmuteButton.svg"
              }
              alt="mute button"
            />
          </div>
          <div
            className="cursor-pointer text-white underline brutal"
            onClick={() => {
              setOverlay(false);
              setShowNavbar(true);
            }}
          >
            SKIP AHEAD
          </div>
        </div>
      )}
    </div>
  );
};
