import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Style from "../../pages/f99/f99.module.scss";
import { MapCss } from "../../utils/utils";
import { useRouter } from "next/router";

const TopHeader = () => {
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
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:flex lg:justify-between items-start lg:mt-5 sm:mr-20">
                <div className="">
                    <motion.div
                        ref={refMoon}
                        variants={boxVariant}
                        animate={controlMoon}
                        className={Style.statement}
                    >
                        <div className="flex flex-col">
                            <div className={`${Style.subhead1} mb-3 lg:mb-0`}>265 km/h</div>
                            <div className={Style.subhead2}>Top speed</div>
                        </div>
                    </motion.div>
                </div>

                <div className="">
                    <motion.div
                        ref={refMoon}
                        variants={boxVariant}
                        animate={controlMoon}
                        className={Style.statement}
                    >
                        <div className="flex flex-col">
                            <div className={`${Style.subhead1} mb-3 sm:mb-0`}>120hp/90Kw</div>
                            <div className={Style.subhead2}>POWER</div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-10 sm:mt-8 lg:mt-0">
                    <motion.div
                        ref={refMoon}
                        variants={boxVariant}
                        animate={controlMoon}
                        className={Style.statement}
                    >
                        <div className="flex flex-col">
                            <div className={`${Style.subhead1} mb-3 sm:mb-0`}>3 SEC</div>
                            <div className={Style.subhead2}>0-100 km/h</div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-10 sm:mt-8 xl:mt-0">
                    <motion.div
                        ref={refMoon}
                        variants={boxVariant}
                        animate={controlMoon}
                        className={Style.statement}
                    >
                        <div className="flex flex-col">
                            <div className={`${Style.subhead1} mb-3 sm:mb-0`}>178 KG</div>
                            <div className={Style.subhead2}>Weight</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TopHeader;
