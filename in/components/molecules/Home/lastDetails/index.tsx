/* eslint-disable @next/next/no-img-element */
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import wheenLoading from "../../../../public/loader/Loading_dots_(White).json";
import LottiePlayer from "../../lottiePlayer/lottie_player";
import Style from "../index.module.scss";

const LastDetails = ({ isMobile, imageUrl, videoUrl, mobileVideoUrl }) => {
  const [refBrakes, inViewBrakes] = useInView();
  const [refAbs, inViewAbs] = useInView();
  const [refSwing, inViewSwing] = useInView();
  const [refDetails, inViewDetails] = useInView();
  const [refAbsMobile, inViewAbsMobile] = useInView();
  const controlDetails = useAnimation();
  const controlBrakes = useAnimation();
  const controlAbs = useAnimation();
  const controlAbsMobile = useAnimation();
  const controlSwing = useAnimation();
  const absVideoRef = useRef(null);
  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: 40 },
  };
  useEffect(() => {
    if (inViewAbsMobile) {
      controlAbsMobile.start("visible");
    } else {
      controlAbsMobile.start("hidden");
    }
  }, [controlAbsMobile, inViewAbsMobile]);
  useEffect(() => {
    if (inViewBrakes) {
      controlBrakes.start("visible");
    } else {
      controlBrakes.start("hidden");
    }
  }, [controlBrakes, inViewBrakes]);
  useEffect(() => {
    if (inViewAbs) {
      controlAbs.start("visible");
    } else {
      controlAbs.start("hidden");
    }
  }, [controlAbs, inViewAbs]);
  useEffect(() => {
    if (inViewSwing) {
      controlSwing.start("visible");
    } else {
      controlSwing.start("hidden");
    }
  }, [controlSwing, inViewSwing]);
  useEffect(() => {
    if (inViewDetails) {
      controlDetails.start("visible");
    } else {
      controlDetails.start("hidden");
    }
  }, [controlDetails, inViewDetails]);
  useEffect(() => {
    const test: any = document.getElementById("absVideoRef");
    if (!test) {
      return;
    }
    test.onmouseover = function () {
      test?.play();
    };
  }, [absVideoRef]);
  return (
    <>
      <div className="pl-[32px] pr-[45px] sm:pl-[140px] sm:pr-[133px] sm:h-[1540px]">
        <motion.div
          ref={refDetails}
          // variants={boxVariant}
          initial="hidden"
          animate={controlDetails}
          className="flex flex-col sm:flex-row justify-between"
        >
          <div className="mt-[80px] sm:mt-[153px]">
            <div className="flex flex-row mb-[9px] sm:mb-[20px]">
              <div className={Style.designed}>designed to the</div>
              <div className={Style.wheelLoading}>
                <LottiePlayer autoplay loop src={wheenLoading} />
              </div>
            </div>
            <div className={Style.aviationText}>
              <p>last detail</p>
            </div>
          </div>
          <div className="w-[298px] mt-[21px] sm:mt-[176px] sm:w-[504px]">
            <div className={Style.connectSubtext}>
              With functional AUTHENTICITY at the core, we have crafted each
              component with high levels of fidelity. Industry leading
              benchmarks at work, with the twist of the throttle.
            </div>
          </div>
        </motion.div>
        <div className="w-full mt-[27px] mb-[24px] sm:mb-[64px] border-b-[2px] border-[#2D2D2D]"></div>
        <div className="flex flex-col sm:flex-row sm:mt-[70px] gap-8">
          <div className="flex flex-col">
            <motion.div
              ref={refBrakes}
              // variants={boxVariant}
              initial="hidden"
              animate={controlBrakes}
              className="flex flex-col"
            >
              <div className={Style.brakeNameText}>brakes</div>
              <div className="w-[60px] sm:w-[76px] h-[1px] sm:h-[2px] bg-[#EFEFF0] my-[12px] "></div>
              <div className={`${Style.brakeSubtext}`}>
                Enhanced calipers to give you that extra braking power, whether
                on the streets or on a racetrack. Sharp and precise - designed
                to inspire a heightened level of confidence!
              </div>
            </motion.div>
            <div className="mt-6 mb-[28px] h-[448px] w-[100%] relative">
              <Image
                fill={true}
                alt="arrow"
                // src={`${imageUrl}${
                //   isMobile ? "mobile/brakes.jpg" : "brakes.png"
                // }`}
                src="/images/home/brakes.svg"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between flex-[1_0_0%]">
            <motion.div
              ref={refAbsMobile}
              // variants={boxVariant}
              initial="hidden"
              animate={controlAbsMobile}
              className="flex flex-col  sm:hidden"
            >
              <div className={Style.brakeNameText}>Dual Channel Abs</div>
              <div className="w-[40vw] sm:w-[76px] h-[1px] sm:h-[2px] bg-[#EFEFF0] my-[12px]"></div>
              <div className="w-[216px]">
                <div className={Style.brakeSubtext}>
                  First in its class - Talk about inspiring confidence while you
                  go ballistic with the thrust of the F77.
                </div>
              </div>
            </motion.div>
            <motion.div
              ref={refAbs}
              // variants={{
              //   visible: { opacity: 1, y: 0, transition: { duration: 1 } },
              //   hidden: { opacity: 0, y: 130 },
              // }}
              // initial="hidden"
              // animate={controlAbs}
              className="hidden sm:flex sm:flex-col "
            >
              <div className={Style.brakeNameText}>Dual Channel Abs</div>
              <div className="w-[76px] h-[2px] bg-[#EFEFF0] my-[12px]"></div>
              <div className="w-[216px]">
                <div className={Style.brakeSubtext}>
                  First in its class - Talk about inspiring confidence while you
                  go ballistic <br />
                  with the thrust of the F77.
                </div>
              </div>
            </motion.div>
            <div className="mt-6 mb-[28px] h-[448px]">
              {isMobile && (
                <video
                  id="absVideoRef"
                  ref={absVideoRef}
                  autoPlay={true}
                  loop
                  playsInline
                  muted
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                >
                  <source src={`${mobileVideoUrl}abs.mp4`} />
                </video>
              )}
              {!isMobile && (
                <video
                  id="absVideoRef"
                  ref={absVideoRef}
                  autoPlay={true}
                  loop
                  playsInline
                  muted
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                >
                  <source src={`${videoUrl}abs.mp4`} />
                </video>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-col-reverse sm:block">
          <div className="flex sm:block mt-7 sm:mt-0 mb-[22px] sm:mb-[36px]">
            <Image
              alt="Swingarm"
              src={`${imageUrl}${
                isMobile ? "mobile/swingarm.jpg" : "swingarm.png"
              }`}
              width={1000}
              height={400}
              style={{ height: "400px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <motion.div
            ref={refSwing}
            className="relative mt-[35px] sm:mt-0 sm:top-[-180px] flex flex-col sm:items-end sm:mr-[32px]"
          >
            <div>
              <div className={Style.brakeNameText}>swingarm</div>
              <div className="w-[21vw] sm:w-[76px] h-[1px] sm:h-[2px] bg-[#EFEFF0] my-[12px]"></div>
              <div className={Style.brakeSubtext}>
                One of a kind engineering marvel, the swingarm carves the
                perfect stance with the right balance of strength and stiffness.
                Vehicle dynamics done right for handling with pin-point
                accuracy.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LastDetails;
