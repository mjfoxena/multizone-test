import React, { useEffect, useRef, useState, useContext } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import Hls from "hls.js";
import Style from "./performance.module.scss";
import NumberAnimation from "./timer";
import { LinearProgressBar } from "./progess";
import { ProgressBarContext } from "../../../../contexts/progressBar";
import { API_CONSTANTS } from "../../../../services/constants";
const specSHeetDownload = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/pdf/specs.pdf`;

interface IcurrentTab {
  id: number;
  category: string;
  stat: string;
  statUnit: String;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  videoUrl: string;
  videoRef: any;
  disclaimer:string
}

const Performance = ({ PerformanceRawData, title, isMobile }) => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<IcurrentTab>(
    PerformanceRawData[0]
  );
  const { progress, setProgress } = useContext(ProgressBarContext);
  // const [animate, setAnimate] = useState(false);
  const [duration, setDuration] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [autoPlaySonic, setAutoPlaySonic] = useState(true);

  // useEffect(() => {
  //   setAnimate(true);
  // }, [currentTab, setCurrentTab]);

  const headRef = useRef(null);
  const imageRef = useRef(null);
  const imageRefMob = useRef(null);
  const stat2Ref = useRef(null);
  const modeRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoRefMob = useRef<HTMLVideoElement | null>(null);


  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(currentTab.videoUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRef.current?.play();
      });
    } else if (videoRef.current) {
      videoRef.current.src = currentTab.videoUrl;
    }
  }, [currentTab.videoUrl, setCurrentTab, currentTab]);

  useEffect(() => {
    if (Hls.isSupported() && videoRefMob.current) {
      const hls = new Hls();
      hls.loadSource(currentTab.videoUrl);
      hls.attachMedia(videoRefMob.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRefMob.current?.play();
      });
    } else if (videoRefMob.current) {
      videoRefMob.current.src = currentTab.videoUrl;
    }
  }, [currentTab.videoUrl, setCurrentTab, currentTab]);

  const [index, setIndex] = useState(0);
  const categoryRef = useRef(null);
  const isInView = useInView(categoryRef);

  const itemVariants = {
    smoothIn: {
      opacity: 0.4,
      y: 4,
      transition: {
        duration: 0.2,
        // delay:0.25,
        ease: "easeIn",
      },
    },

    smoothOut: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        // delay:0.25,
        ease: "easeOut",
      },
    },
  };

  const setCategory = (data) => {
    setCurrentTab(data);
    setAutoPlay(false);
    setAutoPlaySonic(false);
    setIndex(0);
    setProgress(0);
  };

  useEffect(() => {
    if (videoRefMob.current) {
      const handleLoadedMetadata = () => {
        if (videoRefMob.current && videoRefMob.current.duration) {
          const videoTime = videoRefMob.current.duration * 1000;
          setDuration(videoTime);
        }
      };

      videoRefMob.current.addEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoRefMob.current?.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [currentTab, setCurrentTab]);

  // SUPER SONIC PERFOMANCE DESK TOP LOGICS

  useEffect(() => {
    if (isInView && title === "SUPER SONIC PERFORMANCE") {
      setProgress(12000);
    }
  }, [isInView, title, setProgress]);

  useEffect(() => {
    if (videoRefMob.current && title === "SUPER SONIC PERFOMANCE" && isInView) {
      if (
        currentTab.category === "TOP SPEED" ||
        currentTab.category === "TORQUE"
      ) {
        setProgress(duration);
      }
    }
  }, [currentTab, duration, isInView, setCurrentTab, setProgress, title]);

  useEffect(() => {
    if (title === "SUPER SONIC PERFORMANCE" && isInView && autoPlaySonic) {
      const imageTimer = setInterval(() => {
        if (currentTab.category === "RANGE") {
          setCurrentTab(PerformanceRawData[3]);
        } else if (currentTab.category === "POWER") {
          setCurrentTab(PerformanceRawData[1]);
        }
      }, 12000);

      return () => clearInterval(imageTimer);
    } else if (!isInView) {
      setCurrentTab(PerformanceRawData[0]);
      setProgress(0);
      setAutoPlaySonic(true);
    }
  }, [
    currentTab,
    setCurrentTab,
    title,
    isInView,
    PerformanceRawData,
    setProgress,
    setAutoPlaySonic,
    autoPlaySonic,
  ]);

  const handleVideoEnd = () => {
    if (autoPlaySonic) {
      if (currentTab.category === "TOP SPEED") {
        setCurrentTab(PerformanceRawData[0]);
        setProgress(12000);
      } else {
        setCurrentTab(PerformanceRawData[2]);
        setProgress(12000);
      }
    }
  };

  // smart ride section mobile and desktop logics

  useEffect(() => {
    if (title === "SMART RIDE" && isInView) {
      setProgress(12000);
    }
  }, []);

  useEffect(() => {
    if (progress === 0 && isInView && title === "SMART RIDE" && autoPlay) {
      setIndex((prevIndex) => (prevIndex + 1) % PerformanceRawData.length);
      setCurrentTab(PerformanceRawData[index]);
      setProgress(12000);
    } else if (!isInView) {
      setIndex(0);
      setAutoPlay(true);
    }
  }, [
    PerformanceRawData,
    index,
    isInView,
    progress,
    setProgress,
    title,
    autoPlay,
  ]);

  return (
    <div
      className={`${Style.performance} ${
        title === "SMART RIDE"
          ? "flex flex-col gap-0 h-[130vh]  pt-0 sm:pt-24 max-h-[950px] sm:h-full sm:max-h-[1300px]  sm:mb-32"
          : "flex flex-col gap-0  h-[140vh]  max-h-[900px] pt-6 sm:pt-24  sm:h-full sm:max-h-[1300px]  "
      }`}
    >
      {title === "SMART RIDE" ? (
        <div className=" w-full p-6 pb-0 sm:p-0 sm:pb-10  text-center flex flex-col gap-1 sm:gap-2">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            viewport={{ once: true }}
            className={Style.vision}
          >
            A HOST OF ALL NEW
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            viewport={{ once: true }}
            className={Style.accelerate}
          >
            {" "}
            <span className="text-[#ED1C24] font-[700]">BREAKTHROUGH </span>
            FEATURES
          </motion.p>
        </div>
      ) : (
        <div className=" w-[100%]   p-6 pb-0 sm:p-0 sm:pb-10 text-center flex flex-col gap-1 sm:gap-2">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            viewport={{ once: true }}
            className={Style.vision}
          >
            OUR VISION IS TO
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            viewport={{ once: true }}
            className={Style.accelerate}
          >
            ACCELERATE{" "}
            <span className="text-[#ED1C24] font-[700]">INNOVATION</span>
          </motion.p>
        </div>
      )}
      <div className={Style.headWrapper} ref={categoryRef}>
        <div className=" flex   flex-col sm:flex-row sm:justify-start sm:items-start gap-0  sm:gap-0  h-full w-full sm:w-[40%]  ">
          {/* mobile image section */}

          <div className="w-full sm:hidden flex relative ">
            <h1
              className={`${Style.titleMobile} sm:hidden   pl-6  pr-6  sm:pl-0 sm:pr-0`}
            >
              {title}
            </h1>
          </div>

          <div
            className={`flex flex-col sm:hidden w-full ${
              title === "SMART RIDE" ? "h-[40%] " : "h-[45%]"
            } justify-center items-center `}
          >
            <div
              className={` h-full w-full max-h-[300px] overflow-hidden pl-6 pr-6 sm:pl-0 sm:pr-0`}
            >
              <div
                className={`${Style.imageTransitionMobile} h-full relative  w-full overflow-hidden rounded-[1px] shadow-md`}
              >
                <div
                  className={`absolute  w-[100%] ${
                    title === "SMART RIDE" ? "top-0 " : "top-0"
                  }  sm:hidden flex justify-center items-center `}
                >
                  <LinearProgressBar />
                </div>
                <div className="w-full h-full relative">
                  {currentTab?.videoUrl !== "" ? (
                    <video
                      ref={videoRefMob}
                      autoPlay={true}
                      // loop
                      muted={currentTab.category === "TORQUE" ? true : true}
                      playsInline
                      poster={currentTab?.image.src}
                      onEnded={handleVideoEnd}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "rgba(0, 0, 0, 1)",
                      }}
                    ></video>
                  ) : (
                    <Image
                      ref={imageRefMob}
                      width={2000}
                      height={2000}
                      alt={currentTab?.image.alt}
                      src={currentTab?.image.src}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  {title === "SUPER SONIC PERFORMANCE" && (
                    <div className="absolute top-4 right-4 flex flex-col gap-0 justify-center items-center">
                      <div className="text-black text-[10px]">
                        {/* {currentTab?.category} */}
                        {currentTab.category === 'RANGE' ? `${currentTab.category} (WMTC EST.)` :`${currentTab.category}`}
                
                      </div>
                      <div className={Style.stat2Mobile}>
                        <div className="flex ">
                          {currentTab?.stat && (
                            <div className="w-[65px] flex  justify-end items-center">
                              {currentTab?.stat === "40.2" ? (
                                <span className="flex">
                                  <NumberAnimation number={currentTab?.stat} />
                                  .2
                                </span>
                              ) : (
                                <NumberAnimation number={currentTab?.stat} />
                              )}
                            </div>
                          )}
                          <span className="text-[18px] ml-1 mt-[6px]">
                            {currentTab?.statUnit}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <motion.div
            className={`w-full flex flex-col  justify-start gap-1 sm:gap-0  ${
              title === "SMART RIDE" ? "h-[40%]" : " h-[45%] "
            } sm:h-[82%] relative  pl-6 pr-6 sm:pl-0 sm:pr-0"`}
          >
            <div className="hidden w-full  sm:flex h-[15%] justify-between items-start">
              <motion.h1
                variants={{
                  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
                  hidden: { opacity: 0, y: 40 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                // transition={{ duration: 0.5, ease: "easeIn" }}
                className={`${Style.title}`}
              >
                {title}
              </motion.h1>
            </div>

            <div
              className={`w-full h-full  ${
                title === "SMART RIDE" ? "sm:h-[65%]  " : " sm:h-[61%]"
              } flex flex-col gap-4  sm:gap-10 2xl:gap-12 z-50`}
            >
              {PerformanceRawData.map((data, key) => (
                <div className="w-full flex flex-col  " key={key}>
                  <div
                    className={`${Style.category} ${
                      currentTab.category === data.category
                        ? "justify-between"
                        : "justify-start"
                    } `}
                  >
                    <motion.div
                      variants={itemVariants}
                      animate={
                        currentTab.category === data.category
                          ? "smoothOut"
                          : "smoothIn"
                      }
                      className={`cursor-pointer   ${
                        currentTab.category === data.category
                          ? "text-white w-full "
                          : ""
                      }`}
                      onClick={() => setCategory(data)}
                    >
                      {/* <Scramble key={key} text={data.category} /> */}
                      {data.category}
                    </motion.div>
                    {currentTab.category !== data.category ? (
                      <motion.div
                        variants={itemVariants}
                        animate={
                          currentTab.stat === data.stat
                            ? "smoothOut"
                            : "smoothIn"
                        }
                        className={`${Style.stat} cursor-pointer mt-1`}
                        onClick={() => setCategory(data)}
                      >
                        {/* {data.stat !== ""
                          ? `(${data.stat} ${data.statUnit})`
                          : ""} */}
                           {data.stat !== "" && data.category === 'RANGE' ? `(WMTC:${data.stat} ${data.statUnit})` : (data.stat !== "" ? `(${data.stat} ${data.statUnit})` : "")}

                      </motion.div>
                    ) : (
                      ""
                    )}
                  </div>
                  {currentTab.category === data.category && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.25 }}
                      className={Style.descMob}
                      ref={headRef}
                    >
                      {currentTab?.description}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* download spec or learn more section */}

            <div className="w-full h-[15%] sm:h-fit z-50  sm:absolute -bottom-[9px] left-0 ">
              {title === "SUPER SONIC PERFORMANCE" ? (
                <a
                  className={Style.downloadSpec}
                  href={specSHeetDownload}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download Full Specifications
                  <div className="bg-[#000000] rounded-full ml-2">
                    <Image
                      ref={imageRef}
                      width={25}
                      height={25}
                      alt="arrow"
                      src={`/images/home/newhome/performance/arrow.png`}
                    />
                  </div>
                </a>
              ) : (
                <a
                  className={`${Style.downloadSpec}  pt-4 sm:pt-0 `}
                  onClick={() => router.push("/smarttech")}
                >
                  LEARN MORE
                  <div className="rounded-full p-2 mt-0 sm:mt-0  ml-2 bg-[#ED1C24]">
                    <Image
                      ref={imageRef}
                      width={10}
                      height={10}
                      alt="arrowUp"
                      src={`/images/home/newhome/performance/learnmore.png`}
                    />
                  </div>
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* desktop image and desc section */}

        <div className={Style.rigthside}>
          <div className={Style.descSection}>
            <motion.div
              className={Style.desc}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 1 } },
                hidden: { opacity: 0, y: 40 },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              ref={headRef}
            >
              {currentTab?.description}
            </motion.div>
          </div>

          <div ref={modeRef} className={`${Style.imageTransition} relative `}>
            {currentTab?.videoUrl !== "" ? (
              <video
                autoPlay={true}
                ref={videoRef}
                onEnded={handleVideoEnd}
                muted={currentTab.category === "TORQUE" ? true : true}
                poster={currentTab?.image.src}
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  backgroundColor: "rgba(0, 0, 0, 1)",
                }}
              ></video>
            ) : (
              <motion.img
                width={2000}
                height={2000}
                alt={currentTab?.image.alt}
                src={currentTab?.image.src}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
            {title === "SUPER SONIC PERFORMANCE" && (
              <div className="absolute top-6 right-6 flex flex-col justify-center items-center">
                <div className="text-black text-[14px]">
                  {/* {currentTab?.category} */}
                  {currentTab.category === 'RANGE' ? `${currentTab.category} (WMTC EST.)` :`${currentTab.category}`}
                </div>

                <div className={`${Style.stat2} -mt-4 `}>
                  {currentTab?.stat !== "" ? (
                    <div
                      ref={stat2Ref}
                      className="flex items-center justify-center"
                    >
                      <div className="w-[100px] flex justify-end">
                        {currentTab?.stat === "40.2" ? (
                          <span className="flex">
                            <NumberAnimation number={currentTab?.stat} />.
                            <NumberAnimation number="2" />
                          </span>
                        ) : (
                          <NumberAnimation number={currentTab?.stat} />
                        )}
                      </div>
                      <span className="text-[18px] ml-1  h-full mt-3">
                        {currentTab?.statUnit}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
            <div className="absolute -bottom-12 left-4 z-50">
              {currentTab?.disclaimer}
            </div>
          </div>
          <div className="bg-black h-[18%] relative  ">
            <div className="bg-black h-[50%] absolute bottom-0 -left-10 z-50 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
