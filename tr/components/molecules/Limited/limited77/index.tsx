import React, { useEffect } from "react";
import Style from "../../../../pages/limited/limited.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
const LimitedSpoke = () => {
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
          <div>as limited as 77</div>
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
        <div>These 77 bespoke units embody the very core of what</div>
        <div>we at Ultraviolette stand for.</div>
      </motion.div>
    </div>
  );
};

export default LimitedSpoke;
