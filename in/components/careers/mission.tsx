/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Button from "../atoms/Button";
import { API_CONSTANTS } from "../../services/constants";
import VideoPlayer from "../molecules/Home/video/video";
const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}`;
import Hls from "hls.js";

const MissionSection = () => {
  const onSubmitHandler = () => {
    const element = document.getElementById("scroll-target");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const modeRef = useRef(null);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (modeRef.current) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [play, setPlay]);

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoMob, setPlayVideoMob] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRefMob = useRef<HTMLVideoElement>(null);
  const [showPlay, setShowPlay] = useState(true);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(
        "https://player.vimeo.com/external/946106778.m3u8?s=b4dd424c9f7ff9cfdcbccc639e768d375681df59&logging=false"
      );
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        if (playVideo) {
          videoRef.current?.play();
        }
      });
    } else if (videoRef.current) {
      videoRef.current.src =
        "https://player.vimeo.com/external/946106778.m3u8?s=b4dd424c9f7ff9cfdcbccc639e768d375681df59&logging=false";
    }
  }, [playVideo, setPlayVideo]);

  useEffect(() => {
    if (Hls.isSupported() && videoRefMob.current) {
      const hls = new Hls();
      hls.loadSource(
        "https://player.vimeo.com/external/946106778.m3u8?s=b4dd424c9f7ff9cfdcbccc639e768d375681df59&logging=false"
      );
      hls.attachMedia(videoRefMob.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        if (playVideoMob) {
          videoRefMob.current?.play();
        }
      });
    } else if (videoRefMob.current) {
      videoRefMob.current.src =
        "https://player.vimeo.com/external/946106778.m3u8?s=b4dd424c9f7ff9cfdcbccc639e768d375681df59&logging=false";
    }
  }, [playVideoMob, setPlayVideoMob]);

  const handleVideo = () => {
    if (videoRef.current) {
      videoRef?.current.play();
      setPlayVideo(true);
      setShowPlay(false);
    }
  };

  const handleMobVideo = () => {
    if (videoRefMob.current) {
      videoRefMob?.current.play();
      setPlayVideoMob(true);
      setShowPlay(false);
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef?.current.pause();
      setShowPlay(true);
    }
  };
  const pauseVideoMob = () => {
    if (videoRefMob.current) {
      videoRefMob?.current.pause();
      setShowPlay(true);
    }
  };

  return (
    <div>
      <div className="sm:flex brutal">
        <div className="sm:w-1/2 sm:pr-24">
          <div className="text-[#404040] font-bold text-[30px] sm:text-[33px] xl:text-[2.5em]">
            Step into the future!
          </div>
          <div className="text-[#404040] font-medium text-[18px] sm:text-[22px]">
            Let’s accelerate innovation.
          </div>
        </div>
        <div className="mt-3 sm:hidden block relative">
          <video
            ref={videoRefMob}
            playsInline
            onClick={pauseVideoMob}
            className="w-full h-full object-cover "
            style={{ width: "100%", height: "100%" }}
            poster={`${imageUrl}/careers/CareersPage_VideoThumbnail.jpg`}
            onEnded={() => {
              setPlayVideoMob(false), setShowPlay(true);
            }}
          />
          {showPlay && (
            <Image
              onClick={handleMobVideo}
              width={500}
              height={500}
              alt={"soundIcon"}
              src={`/images/home/newhome/jet/playIconn.png`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                width: "44px",
                height: "44px",
                opacity: 1,
              }}
            />
          )}
        </div>
        <div className="sm:w-1/2 mt-3 sm:mt-8 xl:mt-[45px]">
          <div className="text-[14px] sm:text-[16px]">
            We are a diverse and progressive group of innovators, known for our
            boldness, relentlessness, and drive towards tomorrow's experiences and technologies.
          </div>
        </div>
      </div>
      <div className="mt-[46px] hidden sm:block relative">
        <video
          ref={videoRef}
          playsInline
          onClick={pauseVideo}
          className="w-full h-full object-cover "
          poster={`${imageUrl}/careers/CareersPage_VideoThumbnail.jpg`}
          style={{ width: "100%", height: "100%" }}
          onEnded={() => {
            setPlayVideo(false);
            setShowPlay(true);
          }}
        />
        {showPlay && (
          <Image
            onClick={handleVideo}
            width={500}
            height={500}
            alt={"soundIcon"}
            src={`/images/home/newhome/jet/playIconn.png`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              width: "104px",
              height: "104px",
              opacity: 1,
            }}
          />
        )}
      </div>
      {/* button for mobile */}
      <div className="sm:hidden block mt-4">
        <Button
          width={"100%"}
          fontSize={13}
          onClick={onSubmitHandler}
          text={"WORK WITH US"}
          bg={"#000"}
          disable={false}
          height={"54px"}
          allowHover
          isDark
        />
      </div>
    </div>
  );
};

export default MissionSection;