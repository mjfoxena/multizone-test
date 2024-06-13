/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line react/no-unescaped-entities
import React, { useEffect } from "react";
import Style from "../../pages/f99/f99.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
const F99Spoke = () => {
  const controlBoxCharged = useAnimation();
  const controlDna = useAnimation();
  const [refBoxCharged, inViewBoxCharged] = useInView();
  const [refDna, inViewDna] = useInView();
  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: 40 },
  };
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
  return (
    <div className={Style.limitedWrapper}>
      <motion.div
        ref={refBoxCharged}
        variants={boxVariant}
        initial="hidden"
        animate={controlBoxCharged}
        className={Style.aslimited}
      >
        <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:mt-5">
          <div>THE APEX PREDATOR</div>
          <Image
            alt="vector-image"
            width={442}
            className="mb-6 lg:mt-0 lg:mb-6 pr-7 mr-14"
            height={30}
            src={"/images/limited/vectorImage.svg"}
          />
        </div>
      </motion.div>
      <motion.div
        ref={refDna}
        variants={boxVariant}
        initial="hidden"
        animate={controlDna}
        className={Style.bespoke}
      >
        <div>Dynamic even when standing still, this motorcycle’s apex predator <br /> stance defines what it does on the track. It’s raw, menacing, and <br /> outrageously wild.</div>
      </motion.div>
    </div>
  );
};

export default F99Spoke;
