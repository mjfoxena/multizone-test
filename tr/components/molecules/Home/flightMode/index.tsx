import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Style from "./flightMode.module.scss";
import { motion, useScroll, useInView } from "framer-motion";
import Image from "next/image";
import { API_CONSTANTS } from "../../../../services/constants";
const imageUrl = `${API_CONSTANTS.HOMEPAGE_BASE_URL}`;



const FlightMode = ({
  hidePosition,
  setHidePosition,
  activePosition,
  setActivePosition,
}) => {
  const router = useRouter();
  const [currentPosition, setCurrentPosition] = useState(0);
  const modeRef = useRef<HTMLDivElement>(null);
  const hideRef = useRef<HTMLDivElement>(null);
  const inView = useInView(modeRef);
  const inHideView = useInView(hideRef);

  useEffect(() => {
    if (inView) {
      console.log("in virwww", currentPosition);
      setActivePosition(currentPosition);
    }
  }, [inView]);

  useEffect(() => {
    if (inHideView) {
      console.log("in hide virwww", currentPosition);
      setHidePosition(currentPosition);
    }
  }, [inHideView]);

  useEffect(() => {
    const updateScrollPosition = () => {
      const current = window.scrollY || document.documentElement.scrollTop;

      setCurrentPosition(current);
    };

    window.addEventListener("scroll", updateScrollPosition);

    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, [activePosition, setActivePosition, hidePosition, setHidePosition]);

  return (
    <div className={Style.flightMode} ref={modeRef}>
      <div className=" hidden sm:flex w-full h-full relative">
        <Image
          width={2000}
          height={2000}
          alt={"flightMode"}
          src={`${imageUrl}/final_banner_desktop.webp`}
          className=""
          style={{
            width: "100%",
            height: "100%",
            opacity: 1,
            objectFit: "cover",
          }}
        />
      </div>
      <div className=" sm:hidden flex w-full h-full relative">
        <Image
          width={2000}
          height={2000}
          alt={"flightMode"}
          src={`${imageUrl}/final_banner_mobile.webp`}
          style={{
            width: "100%",
            height: "100%",
            opacity: 1,
            // objectFit:'cover'
          }}
        />
        <div className=" absolute flex flex-col sm:hidden justify-between gap-2 w-full items-start  p-[6%]  h-full ">
          <motion.div initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }} viewport={{ once: true }}>
            <p className={Style.flightModeActivate}>ACTIVATE </p>
            <p className={Style.flightModeText}>FLIGHT MODE</p>
          </motion.div>
          <div className=" w-full flex mb-8 justify-center items-center cursor-pointer"  onClick={() => router.push("/configure")}>
            <Image
              width={2000}
              height={2000}
              style={{ width: "80%", height: "90%" }}
              alt={"fzzButton"}
              src={`/images/home/newhome/landing/mobilefzzButton.png`}
            />
          </div>
        </div>
      </div>
      <div className=" hidden  absolute  h-fit sm:flex sm:flex-row justify-start w-full items-end  sm:gap-0 sm:p-20 ">
        <motion.div className="" initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }} viewport={{ once: true }}>
          <p className={Style.flightModeActivate}>ACTIVATE </p>
          <p className={Style.flightModeText}>FLIGHT MODE</p>
          <div className="w-full" ref={hideRef}></div>
        </motion.div>
        {currentPosition >= hidePosition && (
          <div className="absolute bottom-16 mb-5 right-6 h-fit cursor-pointer"  onClick={() => router.push("/configure")}>
            <Image
              width={200}
              height={200}
              alt={"fzzSticky"}
              className=""
              loading="eager"
              src={`/images/home/newhome/floatingButton/book.png`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightMode;