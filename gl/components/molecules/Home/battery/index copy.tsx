import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Style from "./index.module.scss";
import { motion, useAnimation, useInView } from "framer-motion";
import Hls from "hls.js";

const Battery = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoMob, setPlayVideoMob] = useState(false);
  const [textAnimated, setTextAnimated] = useState(0);
  const [rotateVideo, setRotateVideo] = useState(false);

  const controlText = useAnimation();
  const videoOneRef = useRef<HTMLVideoElement | null>(null);
  const videoOneRefMob = useRef<HTMLVideoElement | null>(null);
  const ref = useRef(null);
  const batteryRef = useRef<HTMLDivElement>(null);

 

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (Hls.isSupported() && videoOneRefMob.current) {
      const hls = new Hls();
      hls.loadSource('https://player.vimeo.com/external/936962804.m3u8?s=620671dd50e7bc5c57565de5d35a58885f77e422&logging=false');
      hls.attachMedia(videoOneRefMob.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
         videoOneRefMob.current?.play();
      });
    } else if (videoOneRefMob.current) {
      videoOneRefMob.current.src = 'https://player.vimeo.com/external/936962804.m3u8?s=620671dd50e7bc5c57565de5d35a58885f77e422&logging=false';
    }

   
  }, []);
  

  useEffect(() => {
    const updateScrollPosition = () => {
      if (batteryRef.current) {
        const currentPosition =
          window.scrollY || document.documentElement.scrollTop;
        const offsetTop = batteryRef.current.offsetTop-30;
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

  // useEffect(() => {
  //   if (inView) {
  //     const videoTimeoutId = setTimeout(() => {
  //       if (videoOneRef.current) {
  //         setPlayVideo(true);
  //         videoOneRef.current.play();
  //       }
  //     }, 2500);

  //     return () => {
  //       clearTimeout(videoTimeoutId);
  //     };
  //   }
  // }, [inView]);

  // useEffect(()=>{
  //  console.log(sc)
  // })

  const handleTimeUpdate = () => {
    const video = videoOneRef.current as HTMLVideoElement | null;
    if (video) {
      const currentTime = video.currentTime;
      setTextAnimated(currentTime);
    }
  };

  useEffect(() => {
    if (textAnimated >= 5) {
      controlText.start("showText");
    } else {
      controlText.start("initial");
    }
  });

  useEffect(() => {
    if (textAnimated >= 20) {
      setRotateVideo(true);
      // setPlayVideo(false);
    }
  }, [textAnimated]);

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
      <motion.div  variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 1 } },
                hidden: { opacity: 0, y: 40 },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className=" text-white flex flex-col justify-end items-center w-full h-fit sm:h-[30vh] mt-2 sm:mt-0">
        <p className={Style.designText2}>INCREDIBLY MASSIVE ENERGY SOURCE </p>
        <p className={Style.designText}>RANGE ANXIETY: N.A.</p>
      </motion.div>
      <div className=" hidden sm:flex w-full h-screen  relative" ref={ref}>
        {/* {playVideo && ( */}
        <motion.video
          ref={videoOneRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "linear" }}
          id="videoFirst"
          onTimeUpdate={handleTimeUpdate}
          autoPlay={false}
          playsInline
          // loop
          muted
          className="relative  sm:ml-0"
          style={{
            width: "100%",
            height: "100%",
            // objectFit:'cover'
          }}
        >
          <source src={`/images/home/newhome/battery/Battery to Bike.mp4`} />
        </motion.video>
        {/* )}  */}

        {rotateVideo && (
          <div className="w-[50%] h-full absolute top-0 right-10 ">
            <motion.video
              // ref={videoOneRef}
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "ease" }}
              id="videoFirst"
              // onTimeUpdate={handleTimeUpdate}
              autoPlay={true}
              playsInline
              loop
              muted
              className=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source src={`/images/home/newhome/Battery Rotation.mp4`} />
            </motion.video>
          </div>
        )}

        <div className="textVideo  flex flex-col justify-center items-center  z-50 absolute top-8 left-4 w-[60%] gap-[45px] h-full ">
         
          <motion.div className="sec1 flex justify-center items-end gap-[45px] w-full h-[45%] ">
            <motion.div
              initial={{
                z: 100,
                opacity: 0,
              }}
              animate={{
                z: textAnimated >= 5 ? 0 : 100, 
                opacity: textAnimated >= 5 ? 1 : 0, 
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0,
                },
              }}
              className={`relative text-white z-50 border-[0.5px]  border-[#363636] p-8   2xl:p-12 w-[80%]  h-[80%] sm:w-[40%] sm:p-16 sm:h-[85%] sm:max-h-[280px] flex flex-col  justify-center items-center `}
            >
              <div className="flex flex-col sm:gap-5 2xl:gap-5">
                {" "}
                <p className={`${Style.videoTitle}`}>
                Largest battery 
pack in india
                </p>
                <p className={Style.videotext}>
                Designed to go above and beyond, this power module of the future takes you to new horizons.
                </p>
              </div>
              
            </motion.div>
            <motion.div
              initial={{
                z: 100,
                opacity: 0,
              }}
              animate={{
                z: textAnimated >= 5 ? 0 : 100, // Conditionally set the z value
                opacity: textAnimated >= 5 ? 1 : 0, // Conditionally set the opacity
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.25,
                },
              }}
              // className={` ${Style.title} `}
              className={`relative text-white z-50 border-[0.5px]  border-[#363636] p-8  2xl:p-12 w-[80%]  h-[80%]  sm:w-[40%] sm:p-16 sm:h-[85%] sm:max-h-[280px] flex flex-col  justify-center items-center`}
            >
              <div className="flex flex-col sm:gap-5 2xl:gap-5 ">
                <p className={`${Style.videoTitle} `}>CELL LEVEL FUSE</p>
                <p className={Style.videotext}>
                The only battery pack in India that comes armed with cell level fuse technology, to ensure rider and vehicle safety under all conditions.
                </p>
              </div>
             
            </motion.div>
          </motion.div>

          <motion.div className="sec2 flex justify-center items-start gap-[45px]  w-full h-[45%]">
            <motion.div
              initial={{
                z: 100,
                opacity: 0,
              }}
              animate={{
                z: textAnimated >= 5 ? 0 : 100, // Conditionally set the z value
                opacity: textAnimated >= 5 ? 1 : 0, // Conditionally set the opacity
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              }}
              // className={` ${Style.title} `}
              className={`relative text-white z-50 border-[0.5px]  border-[#363636] p-8  2xl:p-12 w-[80%]  h-[80%] sm:w-[40%] sm:p-16 sm:h-[85%] sm:max-h-[280px] flex flex-col  justify-center items-center`}
            >
              <div className="flex flex-col sm:gap-5 2xl:gap-5">
                {" "}
                <p className={`${Style.videoTitle} `}>8 YEARS WARRANTY</p>
                <p className={Style.videotext}>
                With a number of patents for this intricately made energy unit, longevity was one of the driving aspects in its design and development.
                </p>
              </div>
              
            </motion.div>

            <motion.div
              initial={{
                z: 100,
                opacity: 0,
              }}
              animate={{
                z: textAnimated >= 5 ? 0 : 100, // Conditionally set the z value
                opacity: textAnimated >= 5 ? 1 : 0, // Conditionally set the opacity
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.75,
                },
              }}
              //  className={` ${Style.title} `}
              className={`relative text-white z-50 border-[0.5px]  border-[#363636] p-8  2xl:p-12 w-[80%]  h-[80%]  sm:w-[40%] sm:p-16 sm:h-[85%] sm:max-h-[280px]  flex flex-col  justify-center items-center`}
            >
              <div className="flex flex-col sm:gap-5 2xl:gap-5 ">
                {" "}
                <p className={`${Style.videoTitle} `}>ip67</p>
                <p className={Style.videotext}>
                This state of the art energy unit is armed with an all aluminium IP-67 rated enclosure with ingress protection against water and dust. <span></span></p>
              </div>
              
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* mobile */}
      <div className=" flex w-[80%] h-[60vh] sm:hidden ">
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

      <div className="sm:hidden flex flex-col justify-center items-center  z-50  w-[100%]  h-fit p-12 pt-0 gap-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative border-[0.5px] border-[#242424] text-white h-[35vh] flex flex-col justify-center items-center p-2 "
        >
          <div className=" w-[80%]  h-[80%]  flex flex-col  justify-center  items-start gap-4 sm:gap-2 2xl:gap-5 ">
            <p className={`${Style.videoTitleMob}`}>
              Largest battery pack in india
            </p>
            <p className={Style.videotextMob}>
            Designed to go above and beyond, this power module of the future takes you to new horizons.
            </p>
          </div>
          <div className="absolute -top-[6px] -left-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="absolute -bottom-[6px] -left-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="absolute -top-[6px] -right-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="absolute -bottom-[6px] -right-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative border-[0.5px] border-[#242424] text-white h-[35vh] flex flex-col justify-center items-center p-2 "
        >
          <div className=" w-[80%] h-[80%]  flex flex-col  justify-center  items-start gap-4 sm:gap-2 2xl:gap-5 ">
            <p className={`${Style.videoTitleMob} `}>CELL LEVEL FUSE</p>
            <p className={Style.videotextMob}>
            The only battery pack in India that comes armed with cell level fuse technology, to ensure rider and vehicle safety under all conditions.
            </p>
          </div>
          <div className="absolute -top-[6px] -left-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="absolute -bottom-[6px] -left-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="absolute -top-[6px] -right-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="absolute -bottom-[6px] -right-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative border-[0.5px] border-[#242424] text-white h-[35vh] flex flex-col justify-center items-center p-2 "
        >
          <div className=" w-[80%] h-[80%]  flex flex-col  justify-center items-start gap-4 sm:gap-2 2xl:gap-5 ">
            <p className={`${Style.videoTitleMob} `}>8 YEARS WARRANTY</p>
            <p className={Style.videotextMob}>
            With a number of patents for this intricately made energy unit, longevity was one of the driving aspects in its design and development.
            </p>
          </div>
          <div className="absolute -top-[6px] -left-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="absolute -bottom-[6px] -left-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="absolute -top-[6px] -right-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="absolute -bottom-[6px] -right-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative border-[0.5px] border-[#242424] text-white h-[35vh] flex flex-col justify-center items-center p-2 "
        >
          <div className=" w-[80%] h-[80%]  flex flex-col  justify-center items-start gap-4 sm:gap-2 2xl:gap-5 ">
            <p className={`${Style.videoTitleMob} `}>ip67</p>
            <p className={Style.videotextMob}>
            This state of the art energy unit is armed with an all aluminium IP-67 rated enclosure with ingress protection against water and dust.
            </p>
          </div>
          <div className="absolute -top-[6px] -left-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="absolute -bottom-[6px] -left-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="absolute -top-[6px] -right-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="absolute -bottom-[6px] -right-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect x="5.09961" width="1.8" height="12" fill="#333333" />
              <rect
                y="6.90039"
                width="1.8"
                height="12"
                transform="rotate(-90 0 6.90039)"
                fill="#333333"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Battery;