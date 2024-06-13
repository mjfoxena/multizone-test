import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import wheenLoading from "../../../../public/loader/Loading_dots_(White).json";
import LottiePlayer from "../../lottiePlayer/lottie_player";
import Style from "../index.module.scss";

// const videoUrl = "https://s3.ap-south-1.amazonaws.com/www.ultraviolette.com/img/supernova_desktop_video.mp4"
// const mobileVideoUrl = "https://s3.ap-south-1.amazonaws.com/www.ultraviolette.com/img/supernova_mobile_video.mp4"

const SuperNova = ({ isMobile }) => {
  const [refSustainSubText, inViewSustainSubText] = useInView();
  const controlSustainSubText = useAnimation();
  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: 40 },
  };

  useEffect(() => {
    if (inViewSustainSubText) {
      controlSustainSubText.start("visible");
    } else {
      controlSustainSubText.start("hidden");
    }
  }, [controlSustainSubText, inViewSustainSubText]);

  return (
    <div>
      <div className="flex w-full h-full">
        {isMobile && (
          <Image
            width={2000}
            height={2000}
            src={`/images/home/supernovaMobile.png`}
            alt="supernova image"
            style={{ width: "100%", height: "100%" }}
          />
        )}
        {!isMobile && (
          <Image
            width={2000}
            height={2000}
            src={`/images/home/supernova.png`}
            alt="supernova image"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
      <div className={`${Style.supernovaFloat}`} id="overflowBase">
        <div className="flex flex-col">
          <motion.div
            ref={refSustainSubText}
            variants={boxVariant}
            initial="hidden"
            animate={controlSustainSubText}
          >
            <div className="sm:ml-[100px] ml-[26px]">
              <div className={`flex justify-start`}>
                <div className="text-[18px] sm:text-[24px] text-[#000] brutal">
                  INTRODUCING
                </div>
                <div className={`${Style.wheelLoadingSuperNova}`}>
                  <LottiePlayer autoplay loop src={wheenLoading} />
                </div>
              </div>
              <div className="text-[29px] sm:text-[37px] lg:text-[60px] text-[#000] mt-1 eurostile">
                <span className={`font-bold`}>UV</span>SUPERNOVA
              </div>
            </div>
          </motion.div>

          <div className="bg-[#000] sm:mt-4 mt-1">
            <motion.div
              ref={refSustainSubText}
              variants={boxVariant}
              initial="hidden"
              animate={controlSustainSubText}
            >
              <div className="sm:ml-[100px] ml-[26px] sm:mt-16 mt-4 sm:flex sm:justify-start">
                <div className="text-[#FFF] text-[14px] sm:text-[16px] sm:w-[30%] xl:w-[40%] brutal mr-4">
                  Combining the industry-leading 307 km IDC range of the F77
                  with the expansion of the SUPERNOVA and SUPERNOVA PLUS
                  charging stations, you can embark on thrilling adventures
                  beyond city and state borders.
                </div>

                <div className="sm:mb-28 mb-12 sm:mt-0 mt-8">
                  <div className="flex items flex-col lg:justify-end sm:-mt-[6px] sm:ml-[20%] lg:ml-[40%]">
                    <div className="flex justify-between disketMono">
                      <div>
                        <div className="flex justify-start">
                          <div className="text-[#FFF] text-[25px] sm:text-[36px] whitespace-nowrap">
                            6
                            <span className="text-[15px] sm:text-[24px]">
                              {" "}
                              KW{" "}
                            </span>
                            <span className="brutal text-[18px] sm:text-[24px]">
                              &
                            </span>
                          </div>
                          <div className="text-[#FFF] text-[25px] sm:text-[36px] whitespace-nowrap ml-2">
                            12
                            <span className="text-[18px] sm:text-[24px]">
                              {" "}
                              KW
                            </span>
                          </div>
                        </div>
                        <div className="text-[#616569] text-[14px] sm:text-[16px]">
                          CHARGERS
                        </div>
                      </div>
                      <div className="mr-10 sm:mr-0 sm:ml-16 lg:ml-24 ">
                        <div className="text-[#FFF] text-[25px] sm:text-[36px] whitespace-nowrap">
                          60
                          <span className="text-[18px] sm:text-[24px]">
                            {" "}
                            MINS
                          </span>
                        </div>
                        <div className="text-[#616569] text-[14px] sm:text-[16px]">
                          20% to 80%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperNova;
