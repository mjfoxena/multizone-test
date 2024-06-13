import React, { useEffect, useRef, useState } from "react";
import Style from "./jet.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import Hls from "hls.js";

const Jet = ({ isMobile }) => {
  const videoOneRef = useRef<HTMLVideoElement>(null);
  const videoOneRefmob = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);
  const [playDesk, setPlayDesk] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showPlayButton, setShowButton] = useState(true);

  const handleVideoStarted = () => {
    if (videoOneRef.current && !isMobile) {
      setPlay(true);
      videoOneRef.current.play();
      setShowButton(false);
    }
    if (videoOneRefmob.current && isMobile) {
      setPlayDesk(true);
      videoOneRefmob.current.play();
      setShowButton(false);
    }
  };

  const handleVideoEnded = () => {
    if (videoOneRef.current && !isMobile) {
      videoOneRef.current.currentTime = 1.4;
      videoOneRef.current.play();
    }
    if (videoOneRefmob.current && isMobile) {
      videoOneRefmob.current.currentTime = 1.4;
      videoOneRefmob.current.play();
    }
  };

  useEffect(() => {
    if (Hls.isSupported() && videoOneRefmob.current) {
      const hls = new Hls();
      hls.loadSource(
        "https://player.vimeo.com/external/938282276.m3u8?s=6f38600799b5648877c29be1ce07bf2104e4e083&logging=false"
      );
      hls.attachMedia(videoOneRefmob.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        if (play && isMobile) {
          videoOneRefmob.current?.play();
        }
      });
    } else if (videoOneRefmob.current && isMobile) {
      videoOneRefmob.current.src =
        "https://player.vimeo.com/external/938282276.m3u8?s=6f38600799b5648877c29be1ce07bf2104e4e083&logging=false";
    }
  }, [play, setPlay, isMobile]);

  useEffect(() => {
    if (Hls.isSupported() && videoOneRef.current) {
      const hls = new Hls();
      hls.loadSource(
        "https://player.vimeo.com/external/938282242.m3u8?s=8bfd8c8e0866aa812fac572673bfdf9dc0821bbe&logging=false"
      );
      hls.attachMedia(videoOneRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        if (playDesk && !isMobile) {
          videoOneRef.current?.play();
        }
      });
    } else if (videoOneRef.current && isMobile) {
      videoOneRef.current.src =
        "https://player.vimeo.com/external/938282242.m3u8?s=8bfd8c8e0866aa812fac572673bfdf9dc0821bbe&logging=false";
    }
  }, [playDesk, setPlayDesk, isMobile]);

  return (
    <div className={Style.jet}>
      <div className="relative w-full h-full ">
        <div className="hidden sm:flex  w-full h-full  relative overflow-hidden ">
          <video
            ref={videoOneRef}
            muted={muted}
            playsInline
            className="w-full h-full object-cover  absolute -top-24 left-0 "
          />
        </div>

        <div className="sm:hidden w-full h-full relative overflow-hidden">
          <video
            ref={videoOneRefmob}
            muted={muted}
            playsInline
            className="w-full h-full object-cover  absolute -top-20 left-0"
          />
        </div>

        {!showPlayButton && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center items-center  gap-4  absolute bottom-44 sm:bottom-[8%] w-full  "
          >
            <div
              className=" cursor-pointer   flex justify-end items-center  "
              onClick={() => setMuted(!muted)}
            >
              {!muted ? (
                <Image
                  width={2000}
                  height={2000}
                  alt={"soundIcon"}
                  src={`/images/home/newhome/jet/S2.png`}
                  className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]"
                  // style={{
                  //   width: "30%",
                  //   height: "30%",
                  //   // opacity: 1,
                  // }}
                />
              ) : (
                <Image
                  width={2000}
                  height={2000}
                  alt={"soundIcon"}
                  src={`/images/home/newhome/jet/S3.png`}
                  className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]"
                  // style={{
                  //   width: "30%",
                  //   height: "30%",
                  //   // opacity: 1,
                  // }}
                />
              )}
            </div>

            <div
              className=" cursor-pointer  flex justify-start items-center"
              onClick={handleVideoEnded}
            >
              <Image
                width={2000}
                height={2000}
                alt={"Replay"}
                src={`/images/home/newhome/jet/rePlayB.png`}
                className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]"
                // style={{
                //   width: "30%",
                //   height: "30%",
                //   // opacity: 1,
                // }}
              />
            </div>
          </motion.div>
        )}

        {showPlayButton && (
          <div
            className="  absolute top-[47%] sm:top-[54%] left-1/2 transform -translate-x-1/2 cursor-pointer w-fit  flex justify-center"
            onClick={handleVideoStarted}
          >
            <motion.img
              width={2000}
              height={2000}
              alt={"soundIcon"}
              src={`/images/home/newhome/jet/playIconn.png`}
              className="w-[35%] h-[35%] sm:w-[20%] sm:h-[20%]"
              style={{
                // width: "20%",
                // height: "20%",
                opacity: 1,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Jet;
