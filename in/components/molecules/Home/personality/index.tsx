import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Style from "./personality.module.scss";
import { motion } from "framer-motion";
import { API_CONSTANTS } from "../../../../services/constants";
const imageUrl = `${API_CONSTANTS.HOMEPAGE_BASE2_URL}/personalities`;
import Hls from "hls.js";

const personalityTypes = [
  {
    type: "airstrike",
    videoSrc:
      "https://player.vimeo.com/external/941526745.m3u8?s=7e6c113205e343a5fc429729c899caf76b650060&logging=false",

    imageSrc: `${imageUrl}/Airstrike-image.png`,
    vectors: [
      "/images/home/newhome/Vector1.png",
      "/images/home/newhome/Vector2.png",
    ],
    tag: "SHARP & CHARISMATIC",
  },
  {
    type: "laser",

    videoSrc:
      "https://player.vimeo.com/external/941526756.m3u8?s=bb5ec4d8e0eac318f3787054ad58833c9cd1b9b5&logging=false",
    imageSrc: `${imageUrl}/Laser-image-11.webp`,

    vectors: [
      "/images/home/newhome/Vector3.png",
      "/images/home/newhome/Vector4.png",
    ],
    tag: "PASSION & ADRENALINE",
  },
  {
    type: "shadow",
    videoSrc:
      "https://player.vimeo.com/external/941526962.m3u8?s=cb35eefe8afe45171ea1949ffea2b8674e771012&logging=false",
    imageSrc: `${imageUrl}/Shadow-image.png`,
    vectors: [
      "/images/home/newhome/Vector5.png",
      "/images/home/newhome/Vector6.png",
    ],
    tag: "COVERT & ENIGMATIC",
  },
];

const Personality = ({ isMobile }) => {
  const [selectedType, setSelectedType] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [src, setSrc] = useState("");

  useEffect(() => {
    const selectedPersonality = personalityTypes.find(
      (value) => value.type === selectedType
    );

    if (Hls.isSupported() && videoRef.current) {
      const selectedPersonality = personalityTypes.find(
        (value) => value.type === selectedType
      );
      console.log(selectedPersonality, "selectedPersonality");
      if (selectedPersonality) {
        const hls = new Hls();

        hls.loadSource(selectedPersonality.videoSrc);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoRef.current?.play();
        });
      }
    } else if (videoRef.current) {
      videoRef.current.src = selectedPersonality!.videoSrc;
    }
  }, [src, selectedType]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      setSelectedType("airstrike");
    }
  }, []);

  useEffect(() => {
    setIsMuted(true);
  }, [selectedType]);

  const setType = (type: string) => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      setSelectedType(type);
    } else {
      setSelectedType(selectedType === type ? "" : type);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current as HTMLVideoElement | null;
    if (video) {
      const currentTime = video.currentTime;
      const duration = video.duration;
      const calculatedProgress = (currentTime / duration) * 100;
      setProgress(calculatedProgress);
    }
  };

  const itemVariants = {
    open: {
      width: "80%",
      height: "100%",
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    closed: {
      width: "33.333%",
      height: "100%",
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    middle: {
      width: "10%",
      height: "100%",
      rotateX: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.6,
      },
    },
  };

  const itemVariantsH = {
    open: {
      height: "70%",
      width: "100%",
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    closed: {
      height: "33.333%",
      width: "100%",
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    middle: {
      height: "20%",
      width: "100%",
      rotateY: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.6,
      },
    },
  };

  const getVariants = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1025) {
      return itemVariants;
    } else {
      return itemVariantsH;
    }
  };

  const itemVariantsToUse = getVariants();

  return (
    <div className="w-full h-fit">
      <div className="w-full h-[100px]  flex justify-center items-center">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          viewport={{ once: true }}
          className={Style.heading}
        >
          THE F77 MACH 2{" "}
          <span className="text-[#ED1C24] font-extrabold">PERSONALITIES</span>
        </motion.p>
      </div>

      <div className={Style.personality}>
        {personalityTypes.map((personality) => (
          <motion.div
            key={personality.type}
            className={`${Style[personality.type]} `}
            onClick={() => setType(personality.type)}
            // onClick={() => setType(personality.type)}
            variants={itemVariantsToUse}
            animate={
              selectedType === personality.type
                ? "open"
                : !selectedType
                ? "closed"
                : "middle"
            }
          >
            {selectedType === personality.type ? (
              <motion.video
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
                whileInView={{ opacity: 1 }}
                ref={videoRef}
                autoPlay={true}
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                className="object-cover "
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 1)",
                }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
                whileInView={{ opacity: 1 }}
                className="w-full h-full overflow-hidden "
              >
                <motion.img
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.4, ease: "linear" }}
                  width={2000}
                  height={2000}
                  alt={personality.type}
                  src={personality.imageSrc}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
            )}
            <div
              className={`${Style.tag} ${
                personality.type === "airstrike" ? "text-[#fff]" : "text-[#fff]"
              } ${
                selectedType === personality.type
                  ? "flex justify-around items-center gap-4 "
                  : "hidden xl:flex justify-around items-center  gap-4"
              }`}
            >
              {personality.tag}
            </div>
            <div className={Style.title}>
              {selectedType === personality.type && (
                <div className="w-8 xl:w-[30px] h-full  flex justify-center items-center"></div>
              )}
              <div className={`${Style.titlename} w-[135px]`}>
                <div
                  className={`hidden xl:flex   items-center w-full  ${
                    selectedType === personality.type || selectedType === ""
                      ? "justify-between"
                      : "justify-center"
                  }`}
                >
                  {(selectedType === personality.type ||
                    selectedType === "") && (
                    <Image
                      alt="vector-image"
                      width={8}
                      height={10}
                      src={personality.vectors[0]}
                    />
                  )}
                  <p>{personality.type}</p>
                  {(selectedType === personality.type ||
                    selectedType === "") && (
                    <Image
                      alt="vector-image"
                      width={8}
                      height={10}
                      src={personality.vectors[1]}
                    />
                  )}
                </div>
                <div
                  className={`xl:hidden flex absolute  justify-between items-center w-[140px]  ${
                    selectedType === personality.type
                      ? "bottom-[0%]"
                      : "bottom-[300%] max-sm:bottom-[150%]"
                  }`}
                >
                  <Image
                    alt="vector-image"
                    width={8}
                    height={10}
                    src={personality.vectors[0]}
                  />
                  <p>{personality.type}</p>
                  <Image
                    alt="vector-image"
                    width={8}
                    height={10}
                    src={personality.vectors[1]}
                  />
                </div>
              </div>
              {selectedType === personality.type && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className={Style.audio}
                >
                  {isMuted ? (
                    <div className=" w-8 xl:w-[30px]">
                      <Image
                        alt="vector-image"
                        width={2000}
                        height={2000}
                        src={"/images/home/newhome/personality/A21.svg"}
                      />
                    </div>
                  ) : (
                    <div className=" w-8 xl:w-[30px]">
                      <Image
                        alt="vector-image"
                        width={2000}
                        height={2000}
                        // style={{width:'50%', height:'50%'}}
                        src={"/images/home/newhome/personality/A2.svg"}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Personality;
