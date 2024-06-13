import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import wheenLoading from "../../../../public/loader/Loading_dots_(White).json";
import { API_CONSTANTS } from "../../../../services/constants";
import CommonDivider from "../../commondivider";
import LottiePlayer from "../../lottiePlayer/lottie_player";
import Style from "../index.module.scss";
import AudioStyle from "./sound.module.scss";

const baseLink = `${API_CONSTANTS.BASE_URL_S3}/homepage`;
const AudioSection = ({ isMobile }) => {
  const controlBoxCharged = useAnimation();
  const controlChargedText = useAnimation();

  const [refBoxCharged, inViewBoxCharged] = useInView();

  const [refChargedText, inViewChargedtext] = useInView();
  const audioRef = useRef(null);
  const visualizerRef = useRef(null);
  const audioLink = `${baseLink}/videos/flyby.mp3`;

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    // @ts-ignore
    audioRef.current.onended = () => {
      setIsPlaying(false);
    };
  }, [audioRef]);

  const handlePlaying = () => {
    if (isPlaying) {
      // @ts-ignore
      audioRef.current.pause();
      // @ts-ignore
      visualizerRef.current.pause();
    } else {
      // @ts-ignore
      audioRef.current.play();
      // @ts-ignore
      visualizerRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: 40 },
  };
  useEffect(() => {
    if (inViewChargedtext) {
      controlChargedText.start("visible");
    } else {
      controlChargedText.start("hidden");
    }
  }, [controlChargedText, inViewChargedtext]);

  useEffect(() => {
    if (inViewBoxCharged) {
      controlBoxCharged.start("visible");
    } else {
      controlBoxCharged.start("hidden");
    }
  }, [controlBoxCharged, inViewBoxCharged]);

  return (
    <>
      <audio src={audioLink} ref={audioRef} />

      <div className={`${AudioStyle.soundSection} bg-[#111012] relative grid`}>
        <div className={AudioStyle.contentBox}>
          <div className="px-7 mt-14 sm:px-[140px]">
            {/* Header  */}
            <div className="sm:w-[50%] relative">
              {" "}
              <motion.div
                ref={refBoxCharged}
                variants={boxVariant}
                initial="hidden"
                animate={controlBoxCharged}
                className="flex flex-col"
              >
                <div className="flex flex-row">
                  <div className={Style.superText}>
                    THE SOUND OF <br />
                    THE FUTURE
                  </div>
                  <div className={AudioStyle.wheelLoading}>
                    <LottiePlayer autoplay loop src={wheenLoading} />
                  </div>
                </div>
              </motion.div>
              <CommonDivider className="pr-8 sm:pr-0" />
              {/* Sound Equilizer */}
              <video
                className={`${AudioStyle.vizualizer} ${
                  isPlaying ? "h-[120px] sm:h-[216px]" : "h-0"
                }`}
                ref={visualizerRef}
                id={"vizualizer_id"}
                muted
                style={{
                  objectFit: "cover",
                }}
              >
                <source
                  src={`${baseLink}/videos/visualizer.mp4`}
                  type="video/mp4"
                />
              </video>
              {!isPlaying && (
                <img
                  className={AudioStyle.vizualizerImage}
                  alt="uv-sound"
                  src={`/images/home/sound_vizualizer.png`}
                />
              )}
            </div>
          </div>
        </div>
        {/* <img
          className={AudioStyle.audioImage}
          alt="uv-sound"
          src={`${baseLink}/images/sound.png`}
        /> */}
        <Image
          className={AudioStyle.audioImage}
          alt="uv-sound"
          width={1440}
          height={1200}
          src={`${baseLink}/images/sound.png`}
        />
        {/* Action Buttons */}
        <div className={AudioStyle.actionButtons}>
          {isPlaying ? (
            <div className="flex flex-row items-center">
              <div className={"disketMono text-xl text-white pr-2"}>PAUSE</div>

              <div
                className={AudioStyle["pause-button"]}
                onClick={handlePlaying}
              ></div>
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <div className={"disketMono text-xl text-white pr-2"}>PLAY</div>

              <div
                className={AudioStyle["play-button"]}
                onClick={handlePlaying}
              ></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AudioSection;
