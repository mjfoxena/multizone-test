import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Style from "../index.module.scss";
import { MapCss } from "../../../../utils/utils";
import { useRouter } from "next/router";
import LastDetails from "../lastDetails";
import { NavbarContext } from "../../../../contexts/NavbarContext";
import { ReferrerFlow } from "../../../../utils/CookieManagement";
import { useLimitedAvailableStatus } from "../../../../queries/config";
import { originURL } from "../../../../services/constants";

const Sustain = ({ isMobile, imageUrl, videoUrl, mobileVideoUrl }) => {
  const router = useRouter();
  const [refSustain, inViewSustain] = useInView();
  const [refLimited, inViewLimited] = useInView();
  const [refSustainSubText, inViewSustainSubText] = useInView();
  const [refSustainSubTextTwo, inViewSustainSubTextTwo] = useInView();
  const [refSustainSubTextThree, inViewSustainSubTextThree] = useInView();
  const controlSustain = useAnimation();
  const controlLimited = useAnimation();
  const controlSustainSubText = useAnimation();
  const controlSustainSubTextTwo = useAnimation();
  const controlSustainSubTextThree = useAnimation();
  const sustainVideo = useRef(null);
  const limitedVideo = useRef(null);
  const overflowSustain = useRef(null);
  const [isSoldOut, setIsSoldOut] = useState(true);
  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: 40 },
  };
  const { data: availableStatus, error } = useLimitedAvailableStatus(() => {});
  useEffect(() => {
    setIsSoldOut(!availableStatus);
  }, [availableStatus]);

  useEffect(() => {
    if (inViewSustainSubTextThree) {
      controlSustainSubTextThree.start("visible");
    } else {
      controlSustainSubTextThree.start("hidden");
    }
  }, [controlSustainSubTextThree, inViewSustainSubTextThree]);
  useEffect(() => {
    if (inViewSustainSubTextTwo) {
      controlSustainSubTextTwo.start("visible");
    } else {
      controlSustainSubTextTwo.start("hidden");
    }
  }, [controlSustainSubTextTwo, inViewSustainSubTextTwo]);
  useEffect(() => {
    if (inViewSustainSubText) {
      controlSustainSubText.start("visible");
    } else {
      controlSustainSubText.start("hidden");
    }
  }, [controlSustainSubText, inViewSustainSubText]);
  useEffect(() => {
    if (inViewSustain) {
      controlSustain.start("visible");
    } else {
      controlSustain.start("hidden");
    }
  }, [controlSustain, inViewSustain]);
  useEffect(() => {
    if (inViewLimited) {
      controlLimited.start("visible");
    } else {
      controlLimited.start("hidden");
    }
  }, [controlLimited, inViewLimited]);
  useEffect(() => {
    const test: any = document.getElementById("sustainVideo");
    test.onmouseover = function () {
      test.play();
    };
  }, [sustainVideo]);
  useEffect(() => {
    const test: any = document.getElementById("limitedVideo");
    test.onmouseover = function () {
      test.play();
    };
  }, [limitedVideo]);
  //   useEffect(() => {
  //   const test1: any = document.getElementById("overflowSustain1");
  //   const test2: any = document.getElementById("overflowSustain2");
  //   const reference:any=document.getElementById("overflowBase")
  //   var timeoutId;
  //   reference.onmouseenter =function (timedelay=0) {
  //     timeoutId = setTimeout(function () {
  //       test1.style.display = "flex";
  //       test2.style.display = "none";

  //     }, 5);
  //     timeoutId = setTimeout(function () {
  //       test1.style.display = "none";
  //       test2.style.display = "flex";
  //       console.log("test");
  //       clearTimeout(timeoutId);
  //     }, 2000);
  // }
  // reference.onmouseleave = function () {
  //   clearTimeout(timeoutId);
  // };
  // }, [overflowSustain]);

  const { userData } = useContext(NavbarContext);

  const redirection = async () => {
    if (userData?.email) {
      router.push(`${originURL}/configure/limited`);
    } else {
      ReferrerFlow.setCookie(`${originURL}/configure/limited`);
      router.push(`${originURL}/signin`);
    }
  };

  return (
    <div>
      <div ref={sustainVideo} className="flex w-full h-full">
        {isMobile && (
          <video
            id="sustainVideo"
            autoPlay={true}
            loop
            playsInline
            muted
            style={{ width: "100%", height: "100%" }}
          >
            <source src={`${mobileVideoUrl}sustainability.mp4`} />
          </video>
        )}
        {!isMobile && (
          <video
            id="sustainVideo"
            autoPlay={true}
            loop
            playsInline
            muted
            style={{ width: "100%", height: "100%" }}
          >
            <source src={`${videoUrl}sustain.mp4`} />
          </video>
        )}
      </div>
      <div
        className={Style.sustainFloat}
        id="overflowBase"
        ref={overflowSustain}
      >
        <div className="flex flex-col">
          <motion.div
            ref={refSustain}
            variants={boxVariant}
            initial="hidden"
            animate={controlSustain}
            className={Style.sustainabilityText}
          >
            SUSTAINABILITY
          </motion.div>

          <motion.div
            ref={refSustainSubText}
            variants={boxVariant}
            initial="hidden"
            animate={controlSustainSubText}
            className="flex flex-col sm:flex-row pl-[18px] sm:pl-[100px]  sm:pr-[150px] w-full justify-between lg:items-end sm:mb-[83px]"
          >
            <div className="flex flex-col mb-[10px] sm:mb-0">
              <div className={Style.superSubTextNumber}>1,723,295</div>
              <div className={Style.sustainTons}>
                TONS of projected CO2 savings
              </div>
            </div>
            <div className="h-[90px] sm:h-[190px] mt-48 sm:mt-[0] flex items flex-col lg:justify-end gap-[107px]">
              {/* <motion.div ref={refSustainSubTextThree}
              variants={boxVariant}
              initial="hidden"
              animate={controlSustainSubTextThree} id="overflowSustain1"  className="flex flex-col w-[216px] sm:w-[236px] sm:gap-[7px]">
                <div className={MapCss(Style, "sustainCo2saved", "")}>
                  CO2 Saved
                </div>
                <div className={Style.sustainCo2savedNumber}>
                  530,515,456 kg
                </div>
                <div className={Style.sameco2text}>
                  The same amount of CO2 as 53,051,545 trees absorb every year.
                </div>
              </motion.div> */}
              <motion.div
                id="overflowSustain2"
                ref={refSustainSubTextTwo}
                variants={boxVariant}
                initial="hidden"
                animate={controlSustainSubTextTwo}
                className="flex flex-col w-[236px] sm:w-[360px] sm:gap-[7px]"
              >
                <div className={MapCss(Style, "sustainCo2saved", "")}>
                  Ultraviolette’s vision 2027
                </div>
                <div className={Style.sameco2text}>
                  By 2027, Ultraviolette riders will displace 906,997,109 litres
                  of gasoline.
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex w-full h-full sm:h-full">
        {isMobile && (
          <video
            id="limitedVideo"
            ref={limitedVideo}
            autoPlay={true}
            playsInline
            muted
            loop
            style={{ width: "100%", height: "100%" }}
          >
            <source src={`${mobileVideoUrl}limited.mp4`} />
          </video>
        )}
        {!isMobile && (
          <video
            id="limitedVideo"
            ref={limitedVideo}
            autoPlay={true}
            playsInline
            muted
            loop
            style={{ width: "100%", height: "100%" }}
          >
            <source src={`${videoUrl}limited.mp4`} />
          </video>
        )}
      </div>
      <motion.div
        ref={refLimited}
        variants={boxVariant}
        initial="hidden"
        animate={controlLimited}
        className={Style.limitedOvertext}
      >
        <div className="flex flex-col sm:flex-row px-[31px] sm:px-[140px] sm:pb-[87px] justify-between w-full">
          <div className="flex flex-col mb-[50px] sm:mb-0">
            <div className="w-[30px] mb-[18px] sm:w-[76px] sm:mb-[48px] border-b-[2px] border-[#D9D9D9]"></div>
            <div className={Style.limitedText}>limited edition</div>
            <div className={Style.limitedSubtextOverV}>
              TIME TRAVEL INTO THE FUTURE WITH THE LIMITED EDITION F77.{" "}
            </div>
          </div>
          <div
            onClick={() => {
              router.push("/limited");
            }}
            className="flex flex-row sm:justify-center items-center sm:items-end z-50 cursor-pointer"
          >
            <div className="sm:h-[58px] flex flex-row justify-center items-center ">
              <div className={Style.accessText}>access the future</div>
              <div className="ml-[10px] sm:ml-[32px]">
                <Image
                  alt="arrowRoundedBlack"
                  width={isMobile ? 23 : 58}
                  height={isMobile ? 23 : 58}
                  src={"/images/home/arrowRoundedBlack.svg"}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sustain;
