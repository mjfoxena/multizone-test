import React from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import VioletteHeading from "./violetHeadingDesk";

export default function EnabledTechHead() {
  const { ref: animationRef, inView } = useInView();

  const firstAnimationControls = useAnimation();
  const secondAnimationControls = useAnimation();

  const firstAppear = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9 } },
  };

  const secondAppear = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9 } },
  };

  React.useEffect(() => {
    if (inView) {
      firstAnimationControls.start("visible");
      secondAnimationControls.start("visible");
    } else {
      firstAnimationControls.start("hidden");
      secondAnimationControls.start("hidden");
    }
  }, [inView, firstAnimationControls, secondAnimationControls]);

  return (
    <div>
      <div className="mt-[23.313rem] max-md:mt-[11.125rem] bg-[#000] z-10 max-md:items-center max-md:justify-center">
        <h1 className="text-[#F2EAFF] text-center eurostile text-[3.375rem] leading-[54px] font-normal max-md:leading-[2.438rem] tracking-[2px] uppercase">
          <motion.div
            ref={animationRef}
            initial="hidden"
            animate={firstAnimationControls}
            variants={firstAppear}
          >
            <span className="max-md:block max-md:text-[1.625rem]">
              Violette{" "}
            </span>
            <span className="max-md:block max-md:text-[1.625rem]">ON THE</span>
          </motion.div>
          <motion.div
            ref={animationRef}
            initial="hidden"
            animate={secondAnimationControls}
            variants={secondAppear}
          >
            <span className="block text-[#6840DA] max-md:text-[1.625rem]">
              F77 MACH 2
            </span>
          </motion.div>
        </h1>
      </div>
    </div>
  );
}
