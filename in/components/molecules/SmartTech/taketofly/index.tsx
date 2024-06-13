import React from "react";
import Image from "next/image";
import Link from "next/link";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { API_CONSTANTS } from "../../../../services/constants";
const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/smarttech`;
export default function TakeToFly() {
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
    <div className="w-full h-full flex flex-col justify-end items-center bg-black relative">
      <div className="mt-[12.625rem]">
        <motion.div
          ref={animationRef}
          initial="hidden"
          animate={firstAnimationControls}
          variants={firstAppear}
        >
          <Image
            src={"/images/smarttech/takeOff/Mach 2 logo.svg"}
            alt="taketofly"
            width={500}
            height={500}
            objectFit="cover"
            className="w-[30rem] h-[5.063rem] select-none  max-md:pl-5 max-md:pr-5"
          />
        </motion.div>
      </div>

      <motion.div
        ref={animationRef}
        initial="hidden"
        animate={secondAnimationControls}
        variants={secondAppear}
      >
        <div className="flex w-full justify-center items-center ">
          <h1 className="text-[ 24px] disketMono font-normal text-white uppercase max-md:max-w-[20.750rem] text-center">
            ACTIVATE FLIGHT MODE
          </h1>
        </div>
      </motion.div>
      <div className="flex w-full justify-center items-center mt-[7.625rem]">
        <motion.div
          ref={animationRef}
          initial="hidden"
          animate={thiredAnimationControls}
          variants={thiredAppear}
        >
          <h1 className="text-2xl font-normal text-white uppercase max-md:max-w-[20.750rem] text-center">
            Do you have what it takes to fly the F77?
          </h1>
        </motion.div>
      </div>
      <motion.div
        ref={animationRef}
        initial="hidden"
        animate={fourthAnimationControls}
        variants={fourthAppear}
      >
        <Link href="/configure">
          <Image
            src={"/images/smarttech/takeOff/book_your_f77.svg"}
            alt="taketofly"
            width={500}
            height={500}
            objectFit="cover"
            className="w-[16.063rem] h-[3.813rem] cursor-pointer mt-6 mb-[6.563rem]"
          />
        </Link>
      </motion.div>
      <div>
        <Image
          src={`${imageUrl}/take_to_flight/f77_dark_silhouette.png`}
          alt="taketofly"
          width={2000}
          height={2000}
          objectFit="cover"
          className="w-[67.625rem] h-[26.438rem] hidden md:block"
        />
      </div>
      <div className="h-[10.563rem] md:hidden">
        <Image
          src={`${imageUrl}/take_to_flight/f77_dark_silhouette.png`}
          alt="taketofly"
          width={2000}
          height={2000}
          objectFit="cover"
        />
      </div>
    </div>
  );
}
