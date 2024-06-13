import Image from "next/image";

import MobileDSCVideo from "./mobileDSCVideo";
import DeskTopDSC from "./deskTopDSC";
import React, { useEffect, useRef } from "react";
import { delay, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function DynamicStabilityControl() {
  const { ref: animationRef, inView } = useInView();

  const firstAnimationControls = useAnimation();
  const secondAnimationControls = useAnimation();
  const thiredAnimationControls = useAnimation();
  const fourthAnimationControls = useAnimation();
  const fifthAnimationControls = useAnimation();
  const sixthAnimationControls = useAnimation();
  const sevenAnimationControls = useAnimation();
  const sevenonMbAnimationControls = useAnimation();

  const firstAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9 } },
  };

  const secondAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.2 } },
  };
  const thiredAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.3 } },
  };
  const fourthAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.4 } },
  };
  const fivethAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.5 } },
  };
  const sixthhAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.6 } },
  };
  const sevenAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.7 } },
  };
  const sevenonMbAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.7 } },
  };

  React.useEffect(() => {
    if (inView) {
      firstAnimationControls.start("visible");
      secondAnimationControls.start("visible");
      thiredAnimationControls.start("visible");
      fourthAnimationControls.start("visible");
      fifthAnimationControls.start("visible");
      sixthAnimationControls.start("visible");
      sevenAnimationControls.start("visible");
      sevenonMbAnimationControls.start("visible");
    } else {
      firstAnimationControls.start("hidden");
      secondAnimationControls.start("hidden");
      thiredAnimationControls.start("hidden");
      fourthAnimationControls.start("hidden");
      fifthAnimationControls.start("hidden");
      sixthAnimationControls.start("hidden");
      sevenAnimationControls.start("hidden");
      sevenonMbAnimationControls.start("hidden");
    }
  }, [
    inView,
    firstAnimationControls,
    secondAnimationControls,
    thiredAnimationControls,
    fourthAnimationControls,
    fifthAnimationControls,
    sixthAnimationControls,
    sevenAnimationControls,
    sevenonMbAnimationControls,
  ]);
  return (
    <div
      ref={animationRef}
      className="w-full h-full flex flex-col items-center bg-[#000] relative overflow-hidden"
    >
      <div className="md:hidden">
        <Image
          src={`/images/smarttech/dynamicStabilityControl/uv_dsc_mobile_bg.svg`}
          alt="bg.image"
          layout="fill"
          objectFit="cover"
          priority
          objectPosition="left"
          className="object-cover transition-opacity duration-500 opacity-0 md:hidden"
        ></Image>
      </div>

      {/* dynamic something control heading */}
      <div className="flex max-sm:flex-col md:flex-col xl:flex-row justify-between max-sm:justify-center md:justify-center  xl:justify-between max-sm:items-center md:items-center md:p-20 xl:p-0 w-full items-start xl:items-start z-10 mt-[10%] max-sm:mt-[12.625rem]   md:max-w-full max-sm:max-w-full xl:max-w-[71.00rem]">
        <div className="flex flex-col justify-start max-sm:justify-center md:justify-center xl:justify-start">
          <motion.div
            ref={animationRef}
            initial="hidden"
            animate={firstAnimationControls}
            variants={firstAppear}
          >
            <h1 className="text-[#F2EAFF] disketMono text-[10px] font-normal tracking-[2.4px] uppercase ">
              Powered by
            </h1>
          </motion.div>

          <motion.div
            ref={animationRef}
            initial="hidden"
            animate={secondAnimationControls}
            variants={secondAppear}
          >
            <h1 className="text-[#6840DA] eurostile text-[2.500rem] max-sm:text-[1.625rem] max-sm:pt-[0.163rem] font-normal uppercase pt-[1.063rem]  max-sm:pb-[2px]">
              UV D.S.C
            </h1>
          </motion.div>

          <motion.div
            ref={animationRef}
            initial="hidden"
            animate={thiredAnimationControls}
            variants={thiredAppear}
          >
            <h1 className="text-[#F2EAFF] disketMono text-sm max-sm:text-[14px] font-normal uppercase">
              DYNAMIC STABILITY CONTROL
            </h1>
          </motion.div>

          <motion.div
            ref={animationRef}
            initial="hidden"
            animate={fourthAnimationControls}
            variants={fourthAppear}
          >
            <p className="text-white brutal text-base max-sm:text-[0.750rem] font-normal leading-[22px] opacity-80 w-[20.875rem] max-sm:w-[15.188rem] md:w-full xl:w-[20.875rem]  pt-14 max-sm:pt-[3.000rem]">
              A first of it’s kind on any motorcycle, the F77 MACH 2 comes
              enabled with our patented Dynamic Stability Control. This
              remarkable innovation ensures optimal performance while enhancing
              safety. Regen levels are automatically modulated with ABS
              activation to ensure complete control and stability
            </p>
          </motion.div>
        </div>

        <motion.div
          ref={animationRef}
          initial="hidden"
          animate={fifthAnimationControls}
          variants={fivethAppear}
        >
          {/* desktop */}
          <DeskTopDSC />
        </motion.div>
      </div>

      <motion.div
        ref={animationRef}
        initial="hidden"
        animate={fifthAnimationControls}
        variants={fivethAppear}
      >
        {/* Mobile */}
        <div className="z-10 md:hidden">
          <MobileDSCVideo />
        </div>
      </motion.div>

      <div className="flex  max-sm:flex-col md:flex-col xl:flex-row  justify-between items-end max-sm:items-center md:items-center xl:items-end max-sm:justify-center md:justify-center xl:justify-between w-full mt-[8%] max-sm:mt-[7.750rem] md:max-w-[70rem] max-sm:max-w-full xl:max-w-[71.00rem]">
        <motion.div
          ref={animationRef}
          initial="hidden"
          animate={sixthAnimationControls}
          variants={sixthhAppear}
        >
          <div className="flex flex-col justify-start items-start">
            <div className=" text-[#F2EAFF] text-center eurostile text-4xl font-normal uppercase  max-sm:leading-none">
              <span className=" max-sm:text-[1.625rem]">In-flight</span>
            </div>
            <div className=" text-[#F2EAFF] text-center eurostile text-4xl font-normal uppercase  max-sm:leading-none">
              <span className="pl-[6.875rem] max-sm:pl-[4.875rem] text-[#6840DA] max-sm:text-[1.625rem]">
                Safety
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={animationRef}
          initial="hidden"
          animate={sevenAnimationControls}
          variants={sevenAppear}
          className="max-sm:hidden md:mt-[20%] xl:mt-0"
        >
          <div className="max-sm:mt-[7.500rem]  justify-center flex ">
            <div>
              <span className="text-[#C7C0D2] text-center brutal text-base font-normal uppercase">
                Go{" "}
              </span>

              <span className="text-white brutal text-base font-medium uppercase">
                Ballistic.{" "}
              </span>
            </div>

            <span className="text-[#C7C0D2] text-center brutal text-base font-normal uppercase">
              your{" "}
            </span>
            <span className="text-white brutal text-base font-medium uppercase">
              safety{" "}
            </span>
            <span className="text-[#C7C0D2] text-center brutal text-base font-normal uppercase">
              is covered
            </span>
          </div>
        </motion.div>

        {/* for mobile */}
        <motion.div
          ref={animationRef}
          initial="hidden"
          animate={sevenonMbAnimationControls}
          variants={sevenonMbAppear}
          className="md:hidden"
        >
          <div className="max-sm:mt-[7.500rem] ">
            <div className="flex i justify-center gap-1">
              <span className="text-[#C7C0D2] text-center brutal font-normal text-base  uppercase">
                Go{" "}
              </span>

              <span className="text-white brutal text-base font-medium uppercase">
                Ballistic.{" "}
              </span>
            </div>

            <span className="text-[#C7C0D2] text-center brutal text-base font-normal uppercase">
              your{" "}
            </span>
            <span className="text-white brutal text-base font-medium uppercase">
              safety{" "}
            </span>
            <span className="text-[#C7C0D2] text-center brutal text-base font-normal uppercase">
              is covered
            </span>
          </div>
        </motion.div>
      </div>

      <div className="w-full h-[100px] flex-shrink-0 bg-[#000]" />
    </div>
  );
}
