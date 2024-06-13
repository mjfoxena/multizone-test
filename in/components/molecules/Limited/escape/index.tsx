import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Style from "../../../../pages/limited/limited.module.scss";
import { MapCss } from "../../../../utils/utils";
import { useRouter } from "next/router";

const Escape = () => {
  const controlBoxCharged = useAnimation();
  const controlDna = useAnimation();
  const controlDnaMob = useAnimation();
  const controlMoon = useAnimation();
  const [refBoxCharged, inViewBoxCharged] = useInView();
  const [refDna, inViewDna] = useInView();
  const [refDnaMob, inViewDnaMob] = useInView();
  const [refMoon, inViewMoon] = useInView();
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
  useEffect(() => {
    if (inViewDnaMob) {
      controlDnaMob.start("visible");
    } else {
      controlDna.start("hidden");
    }
  }, [controlDnaMob, inViewDnaMob]);
  useEffect(() => {
    if (inViewMoon) {
      controlMoon.start("visible");
    } else {
      controlMoon.start("hidden");
    }
  }, [controlMoon, inViewMoon]);
  return (
    <div className={Style.escapeWrapper}>
      <div>
        <motion.div
          ref={refBoxCharged}
          variants={boxVariant}
          initial="hidden"
          animate={controlBoxCharged}
          className={MapCss(Style, "escape", "wow fadeInUp")}
        >
          <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:mt-5">
            <div>escape velocity attained</div>
            <Image
              alt="vector-image"
              width={442}
              className="mb-6 lg:mt-0 lg:mb-6 mr-14"
              height={30}
              src={"/images/limited/vectorImage.svg"}
            />
          </div>
        </motion.div>
        <div className="mt-[0] sm:mt-[21px]">
          <div className="hidden sm:flex sm:flex-col">
            <motion.div
              ref={refDna}
              variants={boxVariant}
              animate={controlDna}
              className={Style.motorcycle}
            >
              The limited edition F77 is not a motorcycle, it is a statement.
            </motion.div>
            <motion.div
              ref={refMoon}
              variants={boxVariant}
              initial="hidden"
              animate={controlMoon}
              className={Style.statement}
            >
              <div>A statement that takes off with the superlative.</div>
              <div>
                A statement that doesn&apos;t shy away from flying into
                uncharted airspace.
              </div>
              <div>
                A statement brimming with innovation and creative expression.
              </div>
            </motion.div>
          </div>
          <div className="flex flex-row sm:hidden">
            <motion.div
              ref={refDnaMob}
              variants={boxVariant}
              animate={controlDnaMob}
              className={Style.motorcycleMobile}
            >
              The limited edition F77 is not a motorcycle, it is a statement.A
              statement that doesn&apos;t shy away from flying into uncharted
              airspace.A statement brimming with innovation and creative
              expression.
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Escape;
