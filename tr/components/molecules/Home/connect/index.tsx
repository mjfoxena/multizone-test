/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useEffect, useRef } from "react";

import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import wheenLoading from "../../../../public/loader/Loading_dots_(White).json";
import LottiePlayer from "../../lottiePlayer/lottie_player";
import Style from "../index.module.scss";
import LastDetails from "../lastDetails";
import SuperNova from "../supernova";
import Sustain from "../sustain";
import Terrains from "../terrains";
// const SuperNova = lazy(() => import('../supernova'));

const Connect = ({ isMobile, imageUrl, videoUrl, mobileVideoUrl, country }) => {
  const router = useRouter();
  const controlBoxCharged = useAnimation();
  const controlDna = useAnimation();
  const controlMoon = useAnimation();
  const controlChargedText = useAnimation();
  const controlConnectInfo = useAnimation();
  const controlModesSubtext = useAnimation();
  const controlAppVideoText = useAnimation();
  const controlAppVideoSubText = useAnimation();
  const [refBoxCharged, inViewBoxCharged] = useInView();
  const [refDna, inViewDna] = useInView();
  const [refMoon, inViewMoon] = useInView();
  const [refChargedText, inViewChargedtext] = useInView();
  const [refConnectInfo, inViewConnetInfo] = useInView();
  const [refModesSubText, inViewModesSubText] = useInView();
  const [refAppVideoText, inViewAppVideoText] = useInView();
  const [refAppVideoSubText, inViewAppVideoSubText] = useInView();
  const videoOneRefConnect = useRef(null);
  const modesVideo = useRef(null);
  const appVideo = useRef(null);
  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: 40 },
  };
  useEffect(() => {
    if (inViewAppVideoSubText) {
      controlAppVideoSubText.start("visible");
    } else {
      controlAppVideoSubText.start("hidden");
    }
  }, [controlAppVideoSubText, inViewAppVideoSubText]);
  useEffect(() => {
    if (inViewAppVideoText) {
      controlAppVideoText.start("visible");
    } else {
      controlAppVideoText.start("hidden");
    }
  }, [controlAppVideoText, inViewAppVideoText]);
  useEffect(() => {
    if (inViewModesSubText) {
      controlModesSubtext.start("visible");
    } else {
      controlModesSubtext.start("hidden");
    }
  }, [controlModesSubtext, inViewModesSubText]);
  useEffect(() => {
    if (inViewConnetInfo) {
      controlConnectInfo.start("visible");
    } else {
      controlConnectInfo.start("hidden");
    }
  }, [controlConnectInfo, inViewConnetInfo]);
  useEffect(() => {
    const test: any = document.getElementById("appVideo");
    test.onmouseover = function () {
      test.play();
    };
  }, [appVideo]);
  useEffect(() => {
    const test: any = document.getElementById("videoFirstConnect");
    test.onmouseover = function () {
      test.play();
    };
  }, [videoOneRefConnect]);
  useEffect(() => {
    const test: any = document.getElementById("modesVideo");
    test.onmouseover = function () {
      test.play();
    };
  }, [modesVideo]);
  useEffect(() => {
    if (inViewChargedtext) {
      controlChargedText.start("visible");
    } else {
      controlChargedText.start("hidden");
    }
  }, [controlChargedText, inViewChargedtext]);

  useEffect(() => {
    if (inViewBoxCharged) {
      controlBoxCharged.start("visible");
    } else {
      controlBoxCharged.start("hidden");
    }
  }, [controlBoxCharged, inViewBoxCharged]);
  useEffect(() => {
    if (inViewDna) {
      controlDna.start("visible");
    } else {
      controlDna.start("hidden");
    }
  }, [controlDna, inViewDna]);
  useEffect(() => {
    if (inViewMoon) {
      controlMoon.start("visible");
    } else {
      controlMoon.start("hidden");
    }
  }, [controlMoon, inViewMoon]);

  return (
    <div>
      <div className=" sm:pl-[140px] sm:pr-[70px] bg-[#121212]">
        <div className="flex flex-col sm:flex-row sm:items lg:items-start">
          <div className="pl-14 flex flex-col mt-[62px] w-[350px] sm:mt-[205px] sm:w-[471px] pb-10">
            {" "}
            <motion.div
              ref={refBoxCharged}
              variants={boxVariant}
              initial="hidden"
              animate={controlBoxCharged}
              className="flex flex-col"
            >
              <div className="flex flex-row">
                <div className={Style.designed}>designed to be</div>
                <div className={Style.wheelLoading}>
                  <LottiePlayer autoplay loop src={wheenLoading} />
                </div>
              </div>
              <div className={Style.superText}>
                CHARGED <br /> SEAMLESSLY
              </div>
              <div className="w-full my-[12px] sm:my-[32px] border-b-[2px] border-[#2D2D2D]"></div>
            </motion.div>
            <motion.div
              ref={refChargedText}
              variants={boxVariant}
              initial="hidden"
              animate={controlChargedText}
              className={Style.termsTextCharged}
            >
              <p>
                When it comes to <br /> motorcycles, energy <br /> availability
                on the <br /> go – is what we <br />
                believe in.
              </p>
            </motion.div>
          </div>
          <div className="w-full h-[301px] sm:w-[627px] sm:h-[600px] sm:mt-[129px]">
            <div className="flex h-[100%]">
              {country === "TR" ? (
                <Image
                  width={1500}
                  height={1500}
                  src={`${imageUrl}${isMobile ? "mobile/" : ""}charger.png`}
                  alt="Seamless Charging"
                  style={{
                    maxWidth: isMobile ? "100%" : "130%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Image
                  width={1500}
                  height={1500}
                  src={`${imageUrl}boost_charger.jpg`}
                  alt="boost Charger"
                  style={{
                    maxWidth: isMobile ? "100%" : "100%",
                    objectFit: "cover",
                  }}
                  className="sm:ml-20 px-6 sm:px-0"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Supervove section */}
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <SuperNova isMobile={isMobile} />
      {/* </Suspense> */}

      {/* Terrains Section Goes here */}
      <div className="">
        <Terrains key={"home_terrains"} isMobile={isMobile} />
      </div>

      {isMobile && (
        <div className="bg-[#000000]">
          <motion.div
            ref={refDna}
            variants={boxVariant}
            initial="hidden"
            animate={controlDna}
            className="flex flex-col sm:flex-row pl-[32px] pr-[32px] justify-between sm:pl-[140px] sm:pr-[133px] pb-[35px] sm:pb-0"
          >
            <div className="mt-[32px] sm:mt-[153px]">
              <div className="flex flex-row">
                <div className={Style.designed}>designed to</div>
                <div className={Style.wheelLoading} style={{ marginLeft: 30 }}>
                  <LottiePlayer autoplay loop src={wheenLoading} />
                </div>
              </div>
              <div className={Style.aviationText}>
                <p>Connect</p>
              </div>
            </div>
            <div className="flex sm:hidden w-full my-[14px] sm:mt-[27px] sm:mb-[64px] border-b-[2px] border-[#2D2D2D]"></div>
            <div className="sm:mt-[176px] sm:w-[504px]">
              <div className={Style.connectSubtext}>
                Welcome to the future of motorcycling. You’ve got access not
                just to the best performing motorcycle, but multiple connected
                features that enhance your entire ownership experience of the
                F77.
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <div className="w-full h-full sm:h-full bg-[#232323]">
        {isMobile && (
          <video
            ref={videoOneRefConnect}
            id="videoFirstConnect"
            autoPlay={true}
            loop
            playsInline
            muted
            style={{ width: "100%", height: "100%" }}
          >
            <source src={`${mobileVideoUrl}console.mp4`} />
          </video>
        )}
        {!isMobile && (
          <video
            ref={videoOneRefConnect}
            id="videoFirstConnect"
            autoPlay={true}
            loop
            playsInline
            muted
            style={{ width: "100%", height: "100%" }}
          >
            <source src={`${videoUrl}console.mp4`} />
          </video>
        )}
      </div>
      <div className="w-full bg-[#000000]  flex flex-col">
        <div className="flex flex-col">
          {!isMobile && (
            <motion.div
              ref={refDna}
              variants={boxVariant}
              initial="hidden"
              animate={controlDna}
              className="flex flex-col sm:flex-row pl-[32px] pr-[32px] justify-between sm:pl-[140px] sm:pr-[133px]"
            >
              <div className="mt-[32px] sm:mt-[153px]">
                <div className="flex flex-row">
                  <div className={Style.designed}>designed to</div>
                  <div
                    className={Style.wheelLoading}
                    style={{ marginLeft: 30 }}
                  >
                    <LottiePlayer autoplay loop src={wheenLoading} />
                  </div>
                </div>
                <div className={Style.aviationText}>
                  <p>Connect</p>
                </div>
              </div>
              <div className="flex sm:hidden w-full my-[14px] sm:mt-[27px] sm:mb-[64px] border-b-[2px] border-[#2D2D2D]"></div>
              <div className="sm:mt-[176px] sm:w-[504px]">
                <div className={Style.connectSubtext}>
                  Welcome to the future of motorcycling. You’ve got access not
                  just to the best performing motorcycle, but multiple connected
                  features that enhance your entire ownership experience of the
                  F77.
                </div>
              </div>
            </motion.div>
          )}
          <div className="hidden sm:ml-[140px] sm:mr-[133px] sm:flex sm:mt-[27px] sm:mb-[64px] border-b-[2px] border-[#2D2D2D]"></div>
          <motion.div
            ref={refConnectInfo}
            // variants={boxVariant}
            initial="hidden"
            animate={controlConnectInfo}
            className=""
          >
            <div className={Style.horizontalSustain}>
              <div className="flex flex-col min-w-[127px] sm:max-w-[187px]">
                <div className="w-[26px] sm:w-[59px] mt-[32px] mb-[15px] sm:mt-[32px] sm:mb-[32px] border-b-[2px] border-[#494949]"></div>
                <div className={Style.connectDownText}>
                  Advanced & Intuitive UI
                </div>
              </div>
              <div className="flex flex-col min-w-[107px] sm:max-w-[187px]">
                <div className="w-[26px] sm:w-[59px] mt-[32px] mb-[15px] sm:mt-[32px] sm:mb-[32px] border-b-[2px] border-[#494949]"></div>
                <div className={Style.connectDownText}>NAVIGATION CONTROL</div>
              </div>
              <div className="flex flex-col min-w-[107px] sm:max-w-[187px]">
                <div className="w-[26px] sm:w-[59px]  mt-[32px] mb-[15px] sm:mt-[32px] sm:mb-[32px] border-b-[2px] border-[#494949]"></div>
                <div className={Style.connectDownText}>RIDE ANALYTICS</div>
              </div>
              <div className="flex flex-col min-w-[107px] sm:max-w-[187px]">
                <div className="w-[26px] sm:w-[59px]  mt-[32px] mb-[15px] sm:mt-[32px] sm:mb-[32px] border-b-[2px] border-[#494949]"></div>
                <div className={Style.connectDownText}>MACHINE DIAGNOSTICS</div>
              </div>
              <div className="flex flex-col min-w-[107px] sm:max-w-[187px]">
                <div className="w-[26px] sm:w-[59px]  mt-[32px] mb-[15px] sm:mt-[32px] sm:mb-[32px] border-b-[2px] border-[#494949]"></div>
                <div className={Style.connectDownText}>RIDE TELEMETRY</div>
              </div>
            </div>
            {isMobile && (
              <div className="flex sm:hidden w-[80vw] mx-auto sm:w-full mt-[24px] sm:mt-[27px] sm:mb-[64px] border-b-[2px] border-[#2D2D2D]"></div>
            )}
          </motion.div>
        </div>
        {isMobile && (
          <div className="flex flex-row justify-center w-full px-[35px]">
            <div className="flex justify-between w-[738px]">
              {isMobile && (
                <video
                  ref={modesVideo}
                  id="modesVideo"
                  autoPlay={true}
                  playsInline
                  muted
                  style={{ width: "100%", height: "100%" }}
                >
                  <source src={`${mobileVideoUrl}modes.mp4`} />
                </video>
              )}
              {!isMobile && (
                <video
                  ref={modesVideo}
                  id="modesVideo"
                  autoPlay={true}
                  playsInline
                  muted
                  style={{ width: "100%", height: "100%" }}
                >
                  <source src={`${videoUrl}modes.mp4`} />
                </video>
              )}
            </div>
          </div>
        )}
        <div className="flex flex-col z-50 ">
          <motion.div
            ref={refMoon}
            // variants={boxVariant}
            initial="hidden"
            animate={controlMoon}
            className={Style.modeText}
          >
            3 MODES. TO MAX OUT YOUR F77 EXPERIENCE
          </motion.div>
          <motion.div
            ref={refModesSubText}
            // variants={boxVariant}
            initial="hidden"
            animate={controlModesSubtext}
            className={Style.modeSubtext}
          >
            And we’re just getting started.
          </motion.div>
        </div>
        {isMobile && (
          <div className="flex sm:hidden w-[80vw] mx-auto sm:w-full sm:mt-[27px] sm:mb-[64px] border-b-[2px] border-[#2D2D2D]"></div>
        )}
        {!isMobile && (
          <div className="flex flex-row justify-center w-full px-[35px] mt-[-100px]">
            <div className="flex justify-between w-[738px]">
              {isMobile && (
                <video
                  ref={modesVideo}
                  id="modesVideo"
                  autoPlay={true}
                  playsInline
                  muted
                  style={{ width: "100%", height: "100%" }}
                >
                  <source src={`${mobileVideoUrl}modes.mp4`} />
                </video>
              )}
              {!isMobile && (
                <video
                  ref={modesVideo}
                  id="modesVideo"
                  autoPlay={true}
                  playsInline
                  muted
                  style={{ width: "100%", height: "100%" }}
                >
                  <source src={`${videoUrl}modes.mp4`} />
                </video>
              )}
            </div>
          </div>
        )}
        {isMobile && (
          <div className="w-full flex justify-center ">
            <div className="w-scren h-full">
              <video
                ref={appVideo}
                id="appVideo"
                autoPlay={true}
                playsInline
                muted
                style={{ width: "100%", height: "100%" }}
              >
                <source src={`${mobileVideoUrl}app.mp4`} />
              </video>
            </div>
          </div>
        )}
        <div className="flex flex-col z-50">
          <motion.div
            ref={refAppVideoText}
            // variants={boxVariant}
            initial="hidden"
            animate={controlAppVideoText}
            className={Style.modeTextApp}
          >
            CONNECTED APP AVAILABLE FOR F77 RIDERS
          </motion.div>
          <motion.div
            ref={refAppVideoSubText}
            // variants={boxVariant}
            initial="hidden"
            animate={controlAppVideoSubText}
            className={Style.modeSubtext}
          >
            For iOS and Android
          </motion.div>
        </div>
        {!isMobile && (
          <div className="w-full flex justify-center ">
            <div className="w-scren h-full">
              <video
                ref={appVideo}
                id="appVideo"
                autoPlay={true}
                playsInline
                muted
                style={{ width: "100%", height: "100%" }}
              >
                <source src={`${videoUrl}app.mp4`} />
              </video>
            </div>
          </div>
        )}
        <Sustain
          isMobile={isMobile}
          imageUrl={imageUrl}
          videoUrl={videoUrl}
          mobileVideoUrl={mobileVideoUrl}
        />
        <LastDetails
          isMobile={isMobile}
          imageUrl={imageUrl}
          videoUrl={videoUrl}
          mobileVideoUrl={mobileVideoUrl}
        />
      </div>
    </div>
  );
};

export default Connect;
