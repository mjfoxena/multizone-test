import React, { useEffect } from "react";
import Style from "../../../../pages/limited/limited.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const NewLimit = () => {
  const controlBoxCharged = useAnimation();
  const controlDna = useAnimation();
  const controlMoon = useAnimation();
  const [refMoon, inViewMoon] = useInView();
  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: 40 },
  };
  useEffect(() => {
    if (inViewMoon) {
      controlMoon.start("visible");
    } else {
      controlMoon.start("hidden");
    }
  }, [controlMoon, inViewMoon]);
  return (
    <>
      <motion.div
        ref={refMoon}
        variants={boxVariant}
        initial="hidden"
        animate={controlMoon}
        className={Style.limitedNumber}
      >
        <div>limited in number,</div>
        <div>limitless in attitude.</div>
      </motion.div>
    </>
  );
};

export default NewLimit;
