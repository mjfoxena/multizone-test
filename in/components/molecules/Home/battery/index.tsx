import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Style from "./index.module.scss";
import { motion, useAnimation, useInView } from "framer-motion";
import Hls from "hls.js";

const Battery = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoMob, setPlayVideoMob] = useState(false);
  const [animateText, setAnimateText] = useState(false);

  const videoOneRef = useRef<HTMLVideoElement | null>(null);
  const videoOneRefMob = useRef<HTMLVideoElement | null>(null);
  const ref = useRef(null);
  const batteryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(batteryRef);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (Hls.isSupported() && videoOneRef.current) {
      const hls = new Hls();
      hls.loadSource(
        "https://player.vimeo.com/external/938071656.m3u8?s=d25ac5220682b8aafd90378beba8b3c2527d3823&logging=false"
      );
      hls.attachMedia(videoOneRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoOneRef.current?.play();
      });
    } else if (videoOneRef.current) {
      videoOneRef.current.src =
        "https://player.vimeo.com/external/938071656.m3u8?s=d25ac5220682b8aafd90378beba8b3c2527d3823&logging=false";
    }
  }, [playVideo]);

  useEffect(() => {
    if (Hls.isSupported() && videoOneRefMob.current) {
      const hls = new Hls();
      hls.loadSource(
        "https://player.vimeo.com/external/938071656.m3u8?s=d25ac5220682b8aafd90378beba8b3c2527d3823&logging=false"
      );
      hls.attachMedia(videoOneRefMob.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoOneRefMob.current?.play();
      });
    } else if (videoOneRefMob.current) {
      videoOneRefMob.current.src =
        "https://player.vimeo.com/external/938071656.m3u8?s=d25ac5220682b8aafd90378beba8b3c2527d3823&logging=false";
    }
  }, [playVideo]);

  useEffect(() => {
    const updateScrollPosition = () => {
      if (batteryRef.current) {
        const currentPosition =
          window.scrollY || document.documentElement.scrollTop;
        const offsetTop = batteryRef.current.offsetTop - 30;
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
    if (!playVideo && scrollPosition > 100 && videoOneRef.current) {
      videoOneRef.current.play();
      setPlayVideo(true);
    }
    if (!playVideoMob && scrollPosition > 0 && videoOneRefMob.current) {
      videoOneRefMob.current.play();
      setPlayVideoMob(true);
    }
  }, [scrollPosition, playVideo, playVideoMob]);

  useEffect(() => {
    if (scrollPosition > 200) {
      setAnimateText(true);
    }
  }, [isInView, setScrollPosition, scrollPosition]);

  const textVariants = {
    initial: {
      z: 100,
      opacity: 0,
    },
    showText: {
      z: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <div className={Style.batterySection} ref={batteryRef}>
      <motion.div
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          hidden: { opacity: 0, y: 40 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className=" text-white  flex flex-col justify-end items-center w-full h-fit xl:h-fit mt-2 sm:mt-0 pl-6 pr-6 sm:pl-0 sm:pr-0 sm:gap-2"
      >
        <p className={Style.designText2}>POWER MODULE OF THE FUTURE </p>

        <div
          className={`${Style.designText} flex max-sm:flex-col md:flex-col xl:flex-row md:items-center max-sm:items-center `}
        >
          <h1>INCREDIBLE RANGE OF </h1>
          <div className="flex ">
            <h1 className="text-[#ED1C24] font-extrabold">323 KM </h1>
            <h1 className=" text-[#ED1C24] font-extrabold">(IDC est.)</h1>
          </div>
        </div>
      </motion.div>

      <div className=" w-[80%] h-fit  ">
        <div
          className=" hidden xl:flex  w-full h-[100vh] 2xl:max-h-[900px]  relative"
          ref={ref}
        >
          <div className=" w-1/2 h-full  absolute top-0 -right-28 overflow-hidden">
            <motion.video
              ref={videoOneRef}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 1 } },
                hidden: { opacity: 0, y: 40 },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              id="videoFirst"
              autoPlay={false}
              playsInline
              loop
              muted
              className="relative  sm:ml-0"
              style={{
                width: "100%",
                height: "100%",
                // objectFit:'cover'
              }}
            ></motion.video>
          </div>

          <div className="textVideo  flex flex-col justify-center items-center  z-50 absolute top-0  w-[65%] gap-[60px] h-full">
            <motion.div className="sec1 flex justify-start items-end gap-[60px] w-full h-[40%]  ">
              <motion.div
                initial={{
                  z: 100,
                  opacity: 0,
                }}
                animate={{
                  z: animateText ? 0 : 100,
                  opacity: animateText ? 1 : 0,
                  transition: {
                    duration: 1,
                    ease: "easeInOut",
                    delay: 0,
                  },
                }}
                viewport={{ once: true }}
                className={`relative text-white z-50  bg-[#090909] border-[0.5px]  border-[#363636] p-8   2xl:p-12 w-[80%]  h-[80%] sm:w-[60%] sm:p-16 sm:h-[80%]  flex flex-col  justify-center items-center `}
              >
                <div className="flex flex-col  sm:gap-5 2xl:gap-5">
                  {" "}
                  <p className={`${Style.videoTitle}`}>
                    Largest battery pack in india
                  </p>
                  <p className={Style.videotext}>
                    Designed to go above and beyond, this power module of the
                    future takes you to new horizons.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{
                  z: 100,
                  opacity: 0,
                }}
                animate={{
                  z: animateText ? 0 : 100, // Conditionally set the z value
                  opacity: animateText ? 1 : 0, // Conditionally set the opacity
                  transition: {
                    duration: 1,
                    ease: "easeInOut",
                    delay: 0.25,
                  },
                }}
                viewport={{ once: true }}
                // className={` ${Style.title} `}
                className={`relative text-white z-50 bg-[#090909] border-[0.5px]  border-[#363636] p-8  2xl:p-12 w-[80%]  h-[80%]  sm:w-[60%] sm:p-16 sm:h-[80%]  flex flex-col  justify-center items-center`}
              >
                <div className="flex flex-col sm:gap-5 2xl:gap-5 ">
                  <p className={`${Style.videoTitle} `}>CELL LEVEL FUSE</p>
                  <p className={Style.videotext}>
                    The only battery pack in India that comes equipped with cell
                    level fuse technology, to ensure rider and vehicle safety
                    under all conditions.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="sec2 flex justify-start items-start gap-[60px]  w-full h-[45%]">
              <motion.div
                initial={{
                  z: 100,
                  opacity: 0,
                }}
                animate={{
                  z: animateText ? 0 : 100, // Conditionally set the z value
                  opacity: animateText ? 1 : 0, // Conditionally set the opacity
                  transition: {
                    duration: 1,
                    ease: "easeInOut",
                    delay: 0.5,
                  },
                }}
                viewport={{ once: true }}
                // className={` ${Style.title} `}
                className={`relative text-white z-50  bg-[#090909] border-[0.5px]  border-[#363636] p-8  2xl:p-12 w-[80%]  h-[80%] sm:w-[60%] sm:p-16 sm:h-[80%]  flex flex-col  justify-center items-center`}
              >
                <div className="flex flex-col sm:gap-5 2xl:gap-5 ">
                  {" "}
                  <p className={`${Style.videoTitle} `}>
                    WARRANTY - UPTO 8,00,000KM
                  </p>
                  <p className={Style.videotext}>
                    With a number of patents for this intricately made energy
                    unit, longevity was one of the primary driving aspects in
                    its design and development.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{
                  z: 100,
                  opacity: 0,
                }}
                animate={{
                  z: animateText ? 0 : 100, // Conditionally set the z value
                  opacity: animateText ? 1 : 0, // Conditionally set the opacity
                  transition: {
                    duration: 1,
                    ease: "easeInOut",
                    delay: 0.75,
                  },
                }}
                viewport={{ once: true }}
                //  className={` ${Style.title} `}
                className={`relative text-white z-50 bg-[#090909] border-[0.5px]  border-[#363636] p-8  2xl:p-12 w-[80%]  h-[80%]  sm:w-[60%] sm:p-16 sm:h-[80%]  flex flex-col  justify-center items-center`}
              >
                <div className="flex flex-col sm:gap-5 2xl:gap-5 ">
                  {" "}
                  <p className={`${Style.videoTitle} `}>ip67</p>
                  <p className={Style.videotext}>
                    This state of the art energy unit is armed with an all
                    aluminium IP-67 rated enclosure for protection against water
                    and dust.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className=" flex w-[80%] h-[60vh] xl:hidden ">
        <video
          id="videoFirs"
          ref={videoOneRefMob}
          autoPlay={false}
          loop
          muted
          playsInline
          className=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          {/* <source src={`/images/home/newhome/battery/bikeTo BatteryMob.mp4`} /> */}
        </video>
      </div>

      <div className="sm:hidden flex flex-col justify-center items-center  z-50  w-[100%] md:max-w-[75 %]  h-fit p-12 pt-0 gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="md:w-[80%] relative border-[0.5px] border-[#242424] text-white h-[35vh] flex flex-col justify-center items-center p-2 "
        >
          <div className=" w-[80%]  h-[80%]  flex flex-col  justify-center   items-start gap-4 sm:gap-2 2xl:gap-5 ">
            <p className={`${Style.videoTitleMob}`}>
              Largest battery pack in india
            </p>
            <p className={`${Style.videotextMob} md:mt-10`}>
              Designed to go above and beyond, this power module of the future
              takes you to new horizons.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="md:w-[80%] relative border-[0.5px] border-[#242424] text-white h-[35vh] flex flex-col justify-center items-center p-2 "
        >
          <div className=" w-[80%] h-[80%]  flex flex-col  justify-center  items-start gap-4 sm:gap-2 2xl:gap-5 ">
            <p className={`${Style.videoTitleMob} `}>CELL LEVEL FUSE</p>
            <p className={`${Style.videotextMob} md:mt-10`}>
              The only battery pack in India that comes equipped with cell level
              fuse technology, to ensure rider and vehicle safety under all
              conditions.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="md:w-[80%] relative border-[0.5px] border-[#242424] text-white h-[35vh] flex flex-col justify-center items-center p-2 "
        >
          <div className=" w-[80%] h-[80%]  flex flex-col  justify-center items-start gap-4 sm:gap-2 2xl:gap-5 ">
            <p className={`${Style.videoTitleMob} `}>
              WARRANTY - UPTO 8,00,000KM
            </p>
            <p className={`${Style.videotextMob} md:mt-10`}>
              With a number of patents for this intricately made energy unit,
              longevity was one of the primary driving aspects in its design and
              development.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="md:w-[80%] relative border-[0.5px] border-[#242424] text-white h-[35vh] flex flex-col justify-center items-center p-2 "
        >
          <div className=" w-[80%]  h-[80%]  flex flex-col  justify-center items-start gap-4 sm:gap-2 2xl:gap-5 ">
            <p className={`${Style.videoTitleMob} `}>ip67</p>
            <p className={`${Style.videotextMob} md:mt-10`}>
              This state of the art energy unit is armed with an all aluminium
              IP-67 rated enclosure for protection against water and dust.
            </p>
          </div>
        </motion.div>
      </div>

      {/* for tab version */}

      <div className="xl:hidden max-sm:hidden grid grid-cols-2  z-50  w-[100%] md:max-w-[75 %]  h-fit p-12 pt-0 gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="md:w-[100%] relative border-[0.5px] border-[#242424] text-white h-[30vh] flex flex-col justify-center items-center p-2 "
        >
          <div className=" w-[80%]  h-[80%]  flex flex-col  justify-center   items-start gap-4 sm:gap-2 2xl:gap-5 ">
            <p className="text-white disketMono text-[14.672px] font-normal leading-[25.152px] tracking-[0.44px] uppercase">
              Largest battery pack in india
            </p>

            <p className={`${Style.videotextMob} md:mt-10`}>
              Designed to go above and beyond, this power module of the future
              takes you to new horizons.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="md:w-[100%] relative border-[0.5px] border-[#242424] text-white h-[35
            0vh] flex flex-col justify-center items-center p-2 "
        >
          <div className=" w-[80%] h-[80%]  flex flex-col  justify-center  items-start gap-4 sm:gap-2 2xl:gap-5 ">
            <p className="text-white disketMono text-[14.672px] font-normal leading-[25.152px] tracking-[0.44px] uppercase">
              CELL LEVEL FUSE
            </p>
            <p className={`${Style.videotextMob} md:mt-10`}>
              The only battery pack in India that comes equipped with cell level
              fuse technology, to ensure rider and vehicle safety under all
              conditions.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="md:w-[100%] relative border-[0.5px] border-[#242424] text-white h-[30vh] flex flex-col justify-center items-center p-2 "
        >
          <div className=" w-[80%] h-[80%]  flex flex-col  justify-center items-start gap-4 sm:gap-2 2xl:gap-5 ">
            <p className="text-white disketMono text-[14.672px] font-normal leading-[25.152px] tracking-[0.44px] uppercase">
              WARRANTY - UPTO 8,00,000KM
            </p>
            <p className={`${Style.videotextMob} md:mt-10`}>
              With a number of patents for this intricately made energy unit,
              longevity was one of the primary driving aspects in its design and
              development.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="md:w-[100%] relative border-[0.5px] border-[#242424] text-white h-[35
            0vh] flex flex-col justify-center items-center p-2 "
        >
          <div className=" w-[80%]  h-[80%]  flex flex-col  justify-center items-start gap-4 sm:gap-2 2xl:gap-5 ">
            <p className="text-white disketMono text-[14.672px] font-normal leading-[25.152px] tracking-[0.44px] uppercase">
              ip67
            </p>
            <p className={`${Style.videotextMob} md:mt-10`}>
              This state of the art energy unit is armed with an all aluminium
              IP-67 rated enclosure for protection against water and dust.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Battery;
