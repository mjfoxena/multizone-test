import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import Style from "../index.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
const HeadLight = ({imageUrl,videoUrl}) => {
  const controlBox = useAnimation();
  const [refBox, inViewBox] = useInView();
  const videoOneRef = useRef(null);

  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: 100 },
  };
  useEffect(() => {
    const test: any = document.getElementById("videoOneRef");
    test.onmouseover = function () {
      test.play();
    };
  }, [videoOneRef]);
  useEffect(() => {
    if (inViewBox) {
      controlBox.start("visible");
    } else {
      controlBox.start("hidden");
    }
  }, [controlBox, inViewBox]);
  return (
    <><div className="flex flex-col sm:flex-row pt-[52px] sm:pt-[70px] justify-between">
    <div className="flex flex-col">
        <motion.div ref={refBox}
        variants={boxVariant}
        initial="hidden"
        animate={controlBox} className='flex flex-col'>

      <div className={Style.brakeNameText}>headlight</div>
      <div className="w-[78px] sm:w-[76px] h-[2px] bg-[#EFEFF0] my-[8px] sm:my-[12px]"></div>
      <div className={Style.brakeSubtextLight}>
        The futuristic identity and intent of the F77, is boldly defined
        by the headlight. The Ultra-V DRLs establishes a street presence
        like no other.
        <p className="sm:mt-[15px]">
          The entire headlight unit focuses as much attention to the
          trajectory ahead, as the attention it demands on a fly-by.
        </p>
      </div>
        </motion.div>
      <div className="mt-[25px] sm:mt-[22px] mb-[28px]">
        <Image
          alt="arrow"
          width={436}
          style={{objectFit:'cover'}}
          height={397}
          src={`${imageUrl}tail_light.png`}
        />
      </div>
    </div>
    <div className="sm:w-[697px] sm:h-[632px] sm:ml-[27px]">
      <video ref={videoOneRef}
      id="videoOneRef"
        autoPlay={true}
        loop
        style={{ width: "100%", height: "100%" }}
        playsInline
        muted
      >
        <source src={`${videoUrl}headlight.mp4`} />
      </video>
    </div>
  </div></>
  )
}

export default HeadLight
