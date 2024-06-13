import React from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function RemoteSafety() {
  const { ref: animationRef, inView } = useInView();
  const firstAnimationControls = useAnimation();
  const secondAnimationControls = useAnimation();
  const thiredAnimationControls = useAnimation();

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

  React.useEffect(() => {
    if (inView) {
      firstAnimationControls.start("visible");
      secondAnimationControls.start("visible");
      thiredAnimationControls.start("visible");
    } else {
      firstAnimationControls.start("hidden");
      secondAnimationControls.start("hidden");
      thiredAnimationControls.start("hidden");
    }
  }, [
    inView,
    firstAnimationControls,
    secondAnimationControls,
    thiredAnimationControls,
  ]);
  return (
    <div
      ref={animationRef}
      className="w-full h-[24.813rem] md:h-[40rem] xl:h-[24.813rem] 2xl:h-[25rem] relative"
    >
      <div className="2xl:h-[60%] 2xl:w-[60%]">
        {/* Desktop */}
        <div className="hidden md:hidden xl:block">
          <Image
            src="/images/smarttech/remoteSafty/remoteSafty.svg"
            alt="Desktop Image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
        {/* Tablet... */}
        <div className="hidden xl:hidden lg:block ">
          <Image
            src="/images/smarttech/remoteSafty/remoteSaftyMobile.svg"
            alt="Tablet Image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
        {/* Mobile */}
        <div className="block lg:hidden">
          <Image
            src="/images/smarttech/remoteSafty/remoteSaftyMobile.svg"
            alt="Mobile Image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>

        <>
          {/* Desktop */}
          <div className="hidden md:hidden xl:block absolute bottom-[8%] left-[18%] xl:left-[19.5%] 2xl:left-[19.5%]">
            <motion.div
              ref={animationRef}
              initial="hidden"
              animate={firstAnimationControls}
              variants={firstAppear}
            >
              <h1 className="text-white text-center eurostile text-[1.550rem] leading-[1.500rem] font-normal tracking-[1px] uppercase">
                Remote
              </h1>
            </motion.div>
            <motion.div
              ref={animationRef}
              initial="hidden"
              animate={secondAnimationControls}
              variants={secondAppear}
            >
              <h1 className="text-[#6840DA] eurostile text-[2.900rem] font-normal uppercase">
                Safety
              </h1>
            </motion.div>
          </div>

          {/* Tablet pro */}
          <div className="hidden xl:hidden lg:block absolute bottom-[30%] left-[40%] ">
            <motion.div
              ref={animationRef}
              initial="hidden"
              animate={firstAnimationControls}
              variants={firstAppear}
            >
              <h1 className="text-white text-center eurostile text-[1.550rem] leading-[1.500rem] font-normal tracking-[1px] uppercase">
                Remote
              </h1>
            </motion.div>
            <motion.div
              ref={animationRef}
              initial="hidden"
              animate={secondAnimationControls}
              variants={secondAppear}
            >
              <h1 className="text-[#6840DA] eurostile text-[2.900rem] font-normal uppercase">
                Safety
              </h1>
            </motion.div>
          </div>

          {/* Mobile  normal tablets */}
          <div className=" lg:hidden absolute bottom-[30%]  w-full flex flex-col justify-center items-center">
            <motion.div
              ref={animationRef}
              initial="hidden"
              animate={firstAnimationControls}
              variants={firstAppear}
            >
              <h1 className="text-white text-center eurostile text-[1.550rem] max-sm:text-[16px] leading-[1.500rem] font-normal tracking-[1px] uppercase">
                Remote
              </h1>
            </motion.div>
            <motion.div
              ref={animationRef}
              initial="hidden"
              animate={secondAnimationControls}
              variants={secondAppear}
            >
              <h1 className="text-[#6840DA] eurostile text-[2.900rem] max-sm:text-[32px] font-normal uppercase">
                Safety
              </h1>
            </motion.div>
          </div>
        </>

        <div className=" absolute bottom-[10%]   flex flex-row justify-center md:justify-center xl:justify-end items-center  w-full xl:right-[5%]">
          <div className="brutal text-[16px] max-sm:text-[12px] text-right max-sm:text-center md:text-center xl:text-right max-sm:w-[18.963rem] md:w-[24.813rem]  xl:w-full font-normal  leading-6 max-sm:leading-[18px] text-[#FFF]">
            <>
              {/* Mobile */}
              <motion.div
                ref={animationRef}
                initial="hidden"
                animate={secondAnimationControls}
                variants={secondAppear}
              >
                <span className="block md:hidden">
                  Unauthorized usage of your F77 MACH 2? We have you covered.
                  Lockdown mode completely immobilizes your jet till you wish to
                  re-arm it.
                </span>
              </motion.div>

              {/* Tablet */}
              <motion.div
                ref={animationRef}
                initial="hidden"
                animate={secondAnimationControls}
                variants={secondAppear}
              >
                <span className="hidden md:block lg:hidden">
                  Unauthorized usage of your F77 MACH 2? We have you covered.
                  Lockdown mode completely immobilizes your jet till you wish to
                  re-arm it.
                </span>
              </motion.div>

              {/* Desktop */}
              <motion.div
                ref={animationRef}
                initial="hidden"
                animate={thiredAnimationControls}
                variants={thiredAppear}
              >
                <span className="hidden lg:block">
                  Unauthorized usage of your F77 MACH 2? We have you covered.
                  <span className="block">
                    Lockdown mode completely immobilizes your jet till you wish
                    to re-arm it.
                  </span>
                </span>
              </motion.div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
