import React, { useEffect, useRef, useState } from "react";
import Style from "./warrantystyle.module.css";
import { motion, useAnimation, useInView } from "framer-motion";
// import VideoPlayer from "../../video/video";

const Warranty5 = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoMob, setPlayVideoMob] = useState(false);
  const [textAnimated, setTextAnimated] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(-500);

  const controlText = useAnimation();
  const controlTextMob = useAnimation();

  const videoOneRef = useRef<HTMLVideoElement | null>(null);
  const videoOneRefMob = useRef<HTMLVideoElement | null>(null);
  const warrantyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrollPosition = () => {
      if (warrantyRef.current) {
        const currentPosition =
          window.scrollY || document.documentElement.scrollTop;
        const offsetTop = warrantyRef.current.offsetTop - 250;
        const activePosition = currentPosition - offsetTop;
        setScrollPosition(currentPosition - offsetTop);
      }
    };

    window.addEventListener("scroll", updateScrollPosition);

    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, [scrollPosition]);

  useEffect(() => {
    if (!playVideo && warrantyRef.current && scrollPosition > -200) {
      controlText.start("visible");
      const videoTimeoutId = setTimeout(() => {
        setPlayVideo(true);
      }, 0);

      return () => {
        clearTimeout(videoTimeoutId);
      };
    }

    if (!playVideoMob && warrantyRef.current && scrollPosition > -10) {
      controlTextMob.start("visible");
      const videoTimeoutId = setTimeout(() => {
        setPlayVideoMob(true);
      }, 0);

      return () => {
        clearTimeout(videoTimeoutId);
      };
    }
  }, [controlText, controlTextMob, playVideo, playVideoMob, scrollPosition]);

  const textVariants = {
    visible: {
      opacity: 1,
      z: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    hidden: {
      opacity: 0,
      z: 100,
    },
    up: {
      opacity: 1,
      y: -400,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const textVariantsMob = {
    visible: {
      opacity: 1,
      z: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    hidden: {
      opacity: 0,
      z: 100,
    },
    up: {
      opacity: 1,
      y: -200,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    if (playVideo) {
      const textTimeoutId = setTimeout(() => {
        controlText.start("up");
      }, 1500);

      return () => {
        clearTimeout(textTimeoutId);
      };
    }
  }, [controlText, playVideo]);

  useEffect(() => {
    if (playVideoMob) {
      const textTimeout = setTimeout(() => {
        controlTextMob.start("up");
      }, 1500);

      return () => {
        clearTimeout(textTimeout);
      };
    }
  }, [controlTextMob, playVideoMob]);

  return (
    <div className={Style.warrantySec} ref={warrantyRef}>
      <div className="relative flex justify-center w-full h-full ">
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={controlText}
          className=" absolute top-[50%]  sm:top-[45%]  z-50 hidden sm:flex flex-col gap-4"
        >
          <p className={Style.unlimitedText}>5,00,000 Km*</p>
          <p className={Style.warrantyText}>warranty</p>
        </motion.div>
        <div className=" w-full h-full hidden sm:flex  justify-center items-center gap-24">
            <h1 className="text-white text-[36px] brutal">UP TO</h1>
           {/* <h1 className="text-[#ED1C24] text-[400px] disketMono font-bold">5</h1> */}
          <motion.div className="" variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          hidden: { opacity: 0, y: 40 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}><svg xmlns="http://www.w3.org/2000/svg" width="637" height="550" viewBox="0 0 637 550" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M162.895 117.516H610.645V0.515625H18.8945V326.766H162.895C168.145 302.016 186.145 290.766 211.645 290.766H387.145C463.645 290.766 483.895 297.516 483.895 359.016C483.895 411.516 475.645 432.516 399.145 432.516H243.145C166.645 432.516 153.895 419.766 153.895 374.016H0.894531V405.516C0.894531 533.016 81.1445 549.516 245.395 549.516H375.895C552.145 549.516 636.895 535.266 636.895 370.266V335.766C636.895 215.766 570.145 178.266 454.645 178.266H266.395C211.113 178.266 187.666 189.089 167.895 207.216C166.207 208.764 164.546 210.364 162.895 212.016V117.516ZM5.89453 379.016V405.516C5.89453 436.909 10.8411 460.977 20.4396 479.505C29.9849 497.93 44.3121 511.231 63.7661 520.846C103.142 540.306 163.064 544.516 245.395 544.516H375.895C419.937 544.516 458.025 543.622 490.438 539.746C522.865 535.868 549.249 529.042 570.046 517.402C610.966 494.502 631.895 451.967 631.895 370.266V335.766C631.895 276.69 615.502 239.057 585.999 215.952C556.216 192.628 512.056 183.266 454.645 183.266H266.395C236.704 183.266 216.733 186.427 201.751 191.956C186.887 197.442 176.604 205.377 166.43 215.551L157.895 224.087V112.516H605.645V5.51562H23.8945V321.766H158.974C162.178 310.287 168.235 301.457 176.787 295.403C186.214 288.73 198.197 285.766 211.645 285.766H387.145C406.288 285.766 422.168 286.184 435.16 287.82C448.126 289.453 458.683 292.348 466.905 297.619C483.915 308.522 488.895 328.133 488.895 359.016C488.895 384.992 487.025 405.492 473.771 418.96C460.555 432.39 437.369 437.516 399.145 437.516H243.145C223.924 437.516 208.477 436.718 196.137 434.746C183.82 432.778 174.217 429.584 166.969 424.521C153.089 414.825 149.416 399.467 148.949 379.016H5.89453Z" fill="#ED1C24"/>
</svg></motion.div> 
           <h1 className="text-white text-[36px] brutal">YEARS</h1>
        </div>

        <motion.div
          variants={textVariantsMob}
          initial="hidden"
          animate={controlTextMob}
          className=" absolute top-[45%] sm:hidden mt-12 "
        >
          <p className={Style.unlimitedText}>5,00,000 Km*</p>
          <p className={Style.warrantyText}>warranty</p>
        </motion.div>
        <div className=" w-full h-full sm:hidden flex  justify-center items-center">
            <h1 className="text-white text-[18px] brutal">UP TO</h1>
           {/* <h1 className="text-[#ED1C24] text-[200px] disketMono font-bold">5</h1> */}
          <div className="">
          <svg xmlns="http://www.w3.org/2000/svg" width="237" height="150" viewBox="0 0 637 550" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M162.895 117.516H610.645V0.515625H18.8945V326.766H162.895C168.145 302.016 186.145 290.766 211.645 290.766H387.145C463.645 290.766 483.895 297.516 483.895 359.016C483.895 411.516 475.645 432.516 399.145 432.516H243.145C166.645 432.516 153.895 419.766 153.895 374.016H0.894531V405.516C0.894531 533.016 81.1445 549.516 245.395 549.516H375.895C552.145 549.516 636.895 535.266 636.895 370.266V335.766C636.895 215.766 570.145 178.266 454.645 178.266H266.395C211.113 178.266 187.666 189.089 167.895 207.216C166.207 208.764 164.546 210.364 162.895 212.016V117.516ZM5.89453 379.016V405.516C5.89453 436.909 10.8411 460.977 20.4396 479.505C29.9849 497.93 44.3121 511.231 63.7661 520.846C103.142 540.306 163.064 544.516 245.395 544.516H375.895C419.937 544.516 458.025 543.622 490.438 539.746C522.865 535.868 549.249 529.042 570.046 517.402C610.966 494.502 631.895 451.967 631.895 370.266V335.766C631.895 276.69 615.502 239.057 585.999 215.952C556.216 192.628 512.056 183.266 454.645 183.266H266.395C236.704 183.266 216.733 186.427 201.751 191.956C186.887 197.442 176.604 205.377 166.43 215.551L157.895 224.087V112.516H605.645V5.51562H23.8945V321.766H158.974C162.178 310.287 168.235 301.457 176.787 295.403C186.214 288.73 198.197 285.766 211.645 285.766H387.145C406.288 285.766 422.168 286.184 435.16 287.82C448.126 289.453 458.683 292.348 466.905 297.619C483.915 308.522 488.895 328.133 488.895 359.016C488.895 384.992 487.025 405.492 473.771 418.96C460.555 432.39 437.369 437.516 399.145 437.516H243.145C223.924 437.516 208.477 436.718 196.137 434.746C183.82 432.778 174.217 429.584 166.969 424.521C153.089 414.825 149.416 399.467 148.949 379.016H5.89453Z" fill="#ED1C24"/>
</svg>
            </div> 
           <h1 className="text-white text-[18px] brutal">YEARS</h1>
        </div>

      </div>
    </div>
  );
};

export default Warranty5;
