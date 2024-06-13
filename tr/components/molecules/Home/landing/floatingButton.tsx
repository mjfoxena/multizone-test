import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Style from "./floatingButton.module.scss";
import Image from "next/image";

const FloatingButton = ({
  hidePosition,
  setHidePosition,
  activePosition,
  setActivePosition,
}) => {
  const router = useRouter();
  const [showButton, setShowButton] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {}, [
    setActivePosition,
    setHidePosition,
    activePosition,
    hidePosition,
  ]);

  useEffect(() => {
    const updateScrollPosition = () => {
      const currentPosition =
        window.scrollY || document.documentElement.scrollTop;
      setScrollPosition(currentPosition);
      if (currentPosition >= 70 && currentPosition <= activePosition) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    };

    window.addEventListener("scroll", updateScrollPosition);

    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, [activePosition, scrollPosition]);

  const handleMouseEnter = () => {
    if (scrollPosition >= 70 && scrollPosition <= activePosition) {
      setShowButton(true);
    }
  };

  const handleMouseLeave = () => {
    if (scrollPosition >= 70 && scrollPosition <= activePosition) {
      setShowButton(false);
    }
  };

  return (
    <div className="" onClick={() => router.push("/configure")}>
      {scrollPosition <= hidePosition && (
        <motion.div
          className={` flex w-[205px] h-[48px]    relative overflow-hidden  cursor-pointer`}
        >
          <motion.div
            variants={{
              hidden: { opacity: 1, x: 145, transition: { duration: 0.3 } },
              show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
            }}
            animate={showButton ? "show" : "hidden"}
            className={`${Style.imageSize} absolute top-0 right-0   w-fit h-fit overflow-hidden   rounded-md`}
          >
            <Image
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              width={200}
              height={200}
              alt={"fzzSticky"}
              className=""
              loading="eager"
              // style={{ width: "40px", height: "48px" }}
              src={`/images/home/newhome/floatingButton/book.png`}
            />
          </motion.div>

          <div
            className={` absolute top-0 right-0 w-fit h-fit `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              width={200}
              height={200}
              className={`mt-[1px] border-r border-[#161617]`}
              loading="eager"
              alt={"floatingButton"}
              src={`/images/home/newhome/floatingButton/f77C.png`}
              style={{ width: "41px", height: "45px" }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FloatingButton;
