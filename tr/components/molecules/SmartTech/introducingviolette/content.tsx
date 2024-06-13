import React from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Content() {
  const { ref: animationRef, inView } = useInView();

  const firstAnimationControls = useAnimation();
  const secondAnimationControls = useAnimation();

  const firstAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9 } },
  };

  const secondAppear = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.2 } },
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
      <div className="mt-[5.563rem] items-start flex w-full max-md:flex-col flex-row justify-start max-md:justify-center max-md:items-center   ">
        {" "}
        {/* Added 'relative' to the main container */}
        <motion.div
          ref={animationRef}
          initial="hidden"
          animate={firstAnimationControls}
          variants={firstAppear}
        >
          <div className="flex flex-col justify-start max-md:items-center ">
            <h1 className="text-white brutal text-20 max-md:text-[1.000rem] leading-6 max-md:leading-[1.063rem] max-md:tracking-[1px] uppercase z-10">
              Why VIOLETTE A.I.
            </h1>
            {/* desktop */}
            <p className="max-md:hidden text-[#C7C0D2] brutal text-[14px] max-md:text-[0.750rem] max-md:text-center max-md:mt-[2.500rem] mt-[1.813rem] leading-6 z-10 w-[30.125rem] max-md:w-[19.188rem]">
              Not only have we made a really powerful and fast motorcycle, we
              have also created the perfect co-pilot to help you handle all that
              the F77 MACH 2 offers and more. The future of performance
              motorcycles takes off with us.
            </p>
            {/* mobile */}
            <p className="md:hidden text-[#C7C0D2] brutal text-base max-md:text-[0.750rem] max-md:text-center max-md:mt-[2.500rem] leading-6 max-md:leading-[1.250rem] z-10 w-[30.125rem] max-md:w-[15.188rem]">
              Not only have we made a really powerful and fast motorcycle, we
              have also created the perfect co-pilot to help you handle all that
              the F77 MACH 2 offers and more. The future of performance
              motorcycles takes off with us.
            </p>
          </div>
        </motion.div>
        <motion.div
          ref={animationRef}
          initial="hidden"
          animate={secondAnimationControls}
          variants={secondAppear}
        >
          <div className="flex flex-col justify-start items-start  max-md:mt-[8.063rem] pl-[8.000rem] max-md:pl-0">
            <h1 className="text-white brutal text-20 max-md:text-[1.000rem] leading-6 max-md:leading-[1.375rem] uppercase z-10 max-md:max-w-[16.688rem] max-md:text-center">
              Here’s what Violette handles during flight:
            </h1>
            <div className=" flex gap-[3.625rem] max-md:mt-[4.813rem] mt-[1.999rem] ">
              <AlertItem
                iconSrc={"/images/smarttech/icons/blu_plu.png"}
                rotate={"rotate-0"}
                title={"Safety"}
                fontWeight="font-normal"
                color={"text-[#6840DA]"}
                opacity=""
                onClick={undefined}
              />
              <AlertItem
                iconSrc={"/images/smarttech/icons/blu_plu.png"}
                rotate={"rotate-0"}
                title={"Performance"}
                fontWeight="font-normal"
                color={"text-[#6840DA]"}
                opacity=""
                onClick={undefined}
              />
            </div>
            <div className=" flex gap-[2.825rem] max-md:mt-[2.500rem] mt-[1.813rem]">
              <AlertItem
                iconSrc={"/images/smarttech/icons/blu_plu.png"}
                rotate={"rotate-0"}
                title={"Security"}
                fontWeight="font-normal"
                color={"text-[#6840DA]"}
                opacity=""
                onClick={undefined}
              />
              <AlertItem
                iconSrc={"/images/smarttech/icons/blu_plu.png"}
                rotate={"rotate-0"}
                title={"Utility"}
                fontWeight="font-normal"
                color={"text-[#6840DA]"}
                opacity=""
                onClick={undefined}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const AlertItem = ({
  iconSrc,
  title,
  fontWeight,
  opacity,
  color,
  rotate,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-row items-center gap-3 select-none"
    >
      <Image
        src={iconSrc}
        alt="icon"
        width={25}
        height={25}
        priority
        objectFit="cover"
        className={`w-5 h-5 flex-shrink-0 ${rotate}`}
      />
      <h1
        className={`${color} text-base font-normal brutal leading-normal  ${fontWeight} ${
          opacity ? "opacity-60" : ""
        }`}
      >
        {title}
      </h1>
    </div>
  );
};
