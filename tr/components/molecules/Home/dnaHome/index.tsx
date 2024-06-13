import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import wheenLoading from "../../../../public/loader/Loading_dots_(White).json";
import { API_CONSTANTS } from "../../../../services/constants";
import LottiePlayer from "../../lottiePlayer/lottie_player";
import CountUpComp from "../countUp";
import Style from "../index.module.scss";
import SoundOfFuture from "../soundOfFuture";
const specSHeetDownload = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/pdf/spec_sheet_space.pdf`;

const DnaHome = ({ isMobile, imageUrl, videoUrl, mobileVideoUrl }) => {
  const controlBox = useAnimation();
  const controlDna = useAnimation();
  const controlMoon = useAnimation();
  const controlSupeMainText = useAnimation();
  const controlSuperSubText = useAnimation();
  const controlSuperSubTextLine = useAnimation();
  const controlSuperNumber = useAnimation();
  const controlDnaMainText = useAnimation();
  const controlDnaSubText = useAnimation();
  const controlReadyText = useAnimation();
  const [refBox, inViewBox] = useInView();
  const [refDna, inViewDna] = useInView();
  const [refMoon, inViewMoon] = useInView();
  const [refSuperMainText, inViewSuperMainText] = useInView();
  const [refSuperSubText, inViewSuperSubText] = useInView();
  const [refSuperSubTextLine, inViewSuperSubTextLine] = useInView();
  const [refSuperNumber, inViewSuperNumber] = useInView();
  const [refDnaMainText, inViewDnaMainText] = useInView();
  const [refDnaSubText, inViewDnaSubText] = useInView();
  const [refReadytext, inViewReadyText] = useInView();
  const videoOneRef = useRef(null);
  const controlBoxNew = useAnimation();
  const [refBoxNew, inViewBoxNew] = useInView();
  useEffect(() => {
    if (inViewBoxNew) {
      controlBoxNew.start("visible");
    } else {
      controlBoxNew.start("hidden");
    }
  }, [controlBoxNew, inViewBoxNew]);
  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: 40 },
  };
  const lineVariant = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    hidden: { opacity: 0, x: -40 },
  };
  useEffect(() => {
    const test: any = document.getElementById("videoFirst");
    if (test) {
      test.onmouseover = function () {
        test.play();
      };
    }
  }, [videoOneRef]);
  useEffect(() => {
    if (inViewReadyText) {
      controlReadyText.start("visible");
    } else {
      controlReadyText.start("hidden");
    }
  }, [controlReadyText, inViewReadyText]);
  useEffect(() => {
    if (inViewDnaSubText) {
      controlDnaSubText.start("visible");
    } else {
      controlDnaSubText.start("hidden");
    }
  }, [controlDnaSubText, inViewDnaSubText]);
  useEffect(() => {
    if (inViewDnaMainText) {
      controlDnaMainText.start("visible");
    } else {
      controlDnaMainText.start("hidden");
    }
  }, [controlDnaMainText, inViewDnaMainText]);
  useEffect(() => {
    if (inViewSuperNumber) {
      controlSuperNumber.start("visible");
    } else {
      controlSuperNumber.start("hidden");
    }
  }, [controlSuperNumber, inViewSuperNumber]);
  useEffect(() => {
    if (inViewSuperSubText) {
      controlSuperSubText.start("visible");
    } else {
      controlSuperSubText.start("hidden");
    }
  }, [controlSuperSubText, inViewSuperSubText]);
  useEffect(() => {
    if (inViewSuperSubTextLine) {
      controlSuperSubTextLine.start("visible");
    } else {
      controlSuperSubTextLine.start("hidden");
    }
  }, [controlSuperSubTextLine, inViewSuperSubTextLine]);
  useEffect(() => {
    if (inViewSuperMainText) {
      controlSupeMainText.start("visible");
    } else {
      controlSupeMainText.start("hidden");
    }
  }, [controlSupeMainText, inViewSuperMainText]);
  useEffect(() => {
    if (inViewBox) {
      controlBox.start("visible");
    } else {
      controlBox.start("hidden");
    }
  }, [controlBox, inViewBox]);
  useEffect(() => {
    if (inViewDna) {
      controlDna.start("visible");
    } else {
      controlDna.start("hidden");
    }
  }, [controlDna, inViewDna]);
  useEffect(() => {
    if (inViewMoon) {
      controlMoon.start("visible");
    } else {
      controlMoon.start("hidden");
    }
  }, [controlMoon, inViewMoon]);
  return (
    <div>
      <div className=" h-screen flex flex-col sm:flex-row justify-between pt-[50px] px-[32px] sm:py-[100px] w-full sm:px-[140px]">
        <div className="flex flex-col sm:w-[576px]">
          <motion.div
            ref={refBox}
            variants={boxVariant}
            initial="hidden"
            animate={controlBox}
            className="flex flex-col sm:w-[576px]"
          >
            <div className="flex flex-row sm:flex-row ">
              <div className={Style.designed}>designed to be</div>
              <div className={Style.wheelLoading}>
                <LottiePlayer autoplay loop src={wheenLoading} />
              </div>
            </div>
            <div className={Style.superText}>super sonic</div>
          </motion.div>
          <div className="w-full my-[20px] border-b-[1px] sm:my-[32px] sm:border-b-[2px] border-[#2D2D2D]"></div>
          <motion.div
            ref={refSuperMainText}
            variants={boxVariant}
            initial="hidden"
            animate={controlSupeMainText}
            className={Style.superSubText}
          >
            The F77 powertrain is as much a work of art, as it is advanced
            engineering. The motor, the transmission, the drive systems and the
            controllers have been put through thousands of kilometers of testing
            and fine-tuning to give you an elevated riding experience.
          </motion.div>
          <motion.div
            variants={lineVariant}
            initial="hidden"
            ref={refSuperSubTextLine}
            animate={controlSuperSubTextLine}
            className="w-[32px] my-[18px] border-b-[1px] sm:w-[59px] sm:my-[32px] sm:border-b-[2px] border-[#D9D9D9]"
          ></motion.div>
          <motion.div
            ref={refSuperSubText}
            variants={boxVariant}
            initial="hidden"
            animate={controlSuperSubText}
            className={Style.machineText}
          >
            This machine outputs 30.2kW of peak power & 100 Nm of PEAK torque at
            the motor. All of this, available on demand, with throttle mapping
            at its best.
          </motion.div>
        
          {/* <motion.div
            ref={refBoxNew}
            variants={boxVariant}
            initial="hidden"
            animate={controlBoxNew}
            className="flex flex-row cursor-pointer py-[20px] sm:py-0 sm:w-[364px] sm:mt-[90px] sm:mb-[20px]"
          >
            <div
              // className={`${Style.fullSpecs}`}
              onClick={() =>
                fetch(specSHeetDownload).then((response) => {
                  response.blob().then((blob) => {
                    const fileURL = window.URL.createObjectURL(blob);
                    let alink = document.createElement("a");
                    alink.href = fileURL;
                    alink.download = "Specs_Sheet.pdf";
                    alink.click();
                  });
                })
              }
            >
              <div className={`${Style.fullSpecs}`}>
                DOWNLOAD FULL SPECIFICATION
              </div>
              <div className="ml-[265px] sm:ml-[320px] rotate-90 -mt-5 sm:-mt-6">
                <Image
                  alt="arrow"
                  width={isMobile ? 22 : 30}
                  height={isMobile ? 22 : 30}
                  style={{ objectFit: "cover" }}
                  src={"/images/home/redRoundedArrow.png"}
                />
              </div>
            </div>
          </motion.div> */}
        </div>
        
        <motion.div
          ref={refSuperNumber}
          // variants={boxVariant}
          initial="hidden"
          animate={controlSuperNumber}
          className="flex flex-col mt-[48px] sm:mt-[0]"
        >
          <div className="flex flex-row sm:justify-between pr-[50px] sm:pr-[0] sm:flex-col">
            <div className="flex flex-col sm:mb-[48px]">
              <div className={Style.leftUp}>
                <CountUpComp countStart={295} countEnd={307} decimal={0} /> KM
              </div>
              <div className={Style.leftDown}>IDC RANGE</div>
            </div>
            <div className="flex flex-col sm:mb-[48px]">
              <div className={Style.leftUp}>
                <CountUpComp countStart={0} countEnd={2.9} decimal={1} /> sec
              </div>
              <div className={Style.leftDown}>0-60KM/H</div>
            </div>
          </div>
          <div className="flex flex-row sm:justify-between pr-[50px] sm:pr-[0] sm:flex-col mt-[39px] sm:mt-[0]">
            <div className="flex flex-col sm:mb-[48px]">
              <div className={Style.leftUp}>
                <CountUpComp countStart={80} countEnd={100} decimal={0} /> NM
              </div>
              <div className={Style.leftDown}>PEAK TORQUE</div>
            </div>
            <div className="flex flex-col">
              <div className={Style.leftUp}>
                {" "}
                <CountUpComp countStart={100} countEnd={152} decimal={0} /> KM/H
              </div>
              <div className={Style.leftDown}>top speed</div>
            </div>
          </div>
        </motion.div>
       
        <div className="flex sm:hidden w-full my-[45px] border-b-[1px] sm:my-[32px] sm:border-b-[2px] border-[#2D2D2D]"></div>
        
      </div>

      {/* prelaunch section */}

      <div className="flex  flex-col-reverse lg:flex-row justify-between px-7 sm:px-[140px]">
        <div className="flex flex-col  mt-2">
           <motion.div
            ref={refBoxNew}
            variants={boxVariant}
            initial="hidden"
            animate={controlBoxNew}
            className="flex  flex-row cursor-pointer py-[20px] sm:py-0 sm:w-[364px] sm:mt-[90px] sm:mb-[20px]"
          >
            <div
              // className={`${Style.fullSpecs}`}
              onClick={() =>
                fetch(specSHeetDownload).then((response) => {
                  response.blob().then((blob) => {
                    const fileURL = window.URL.createObjectURL(blob);
                    let alink = document.createElement("a");
                    alink.href = fileURL;
                    alink.download = "Specs_Sheet.pdf";
                    alink.click();
                  });
                })
              }
            >
              <div className={`${Style.fullSpecs}`}>
                DOWNLOAD FULL SPECIFICATION
              </div>
              <div className="ml-[265px] sm:ml-[320px] rotate-90 -mt-5 sm:-mt-6">
                <Image
                  alt="arrow"
                  width={isMobile ? 22 : 30}
                  height={isMobile ? 22 : 30}
                  style={{ objectFit: "cover" }}
                  src={"/images/home/redRoundedArrow.png"}
                />
              </div>
            </div>
          </motion.div>
          <Image
            alt="arrow"
            width={643}
            height={100}
            className=""
            style={{ objectFit: "cover" }}
            src={`${imageUrl}${isMobile ? "mobile/" : ""}aviation.png`}
          />
        </div>
        <div className="flex  flex-col sm:w-[615px] sm:ml-[42px] sm:mt-[100px] sm:pb-[30px]">
          <motion.div
            ref={refDna}
            variants={boxVariant}
            initial="hidden"
            animate={controlDna}
            className="flex flex-col"
          >
            <div className="flex flex-row mb-[8px] sm:mb-[20px]">
              <div className={Style.rootText}>in the roots of</div>
              <div className={Style.wheelLoading}>
                <LottiePlayer autoplay loop src={wheenLoading} />
              </div>
            </div>
            <div className={Style.aviationText}>aviation dna</div>

            <div className="hidden sm:flex w-full my-[32px] border-b-[2px] border-[#2D2D2D]"></div>
          </motion.div>
          <motion.div
            ref={refDnaMainText}
            variants={boxVariant}
            initial="hidden"
            animate={controlDnaMainText}
            className="mt-[42px] sm:mt-[0]"
          >
            <div className={Style.fullTextAviation}>
              From structural simulations and aerodynamics to designing multiple
              levels of safety on the F77, the processes and methodologies are
              directly derived from the machines that take to the skies. Just
              like aircrafts, we build 99.9% predictability and reliability of a
              system before it goes on to the F77. No compromises.
            </div>
          </motion.div>
          <div className="w-[47px] my-[10px] sm:w-[59px] sm:my-[60px] border-b-[2px] border-[#D9D9D9]"></div>
          {!isMobile && (
            <motion.div
              ref={refDnaSubText}
              variants={boxVariant}
              initial="hidden"
              animate={controlDnaSubText}
              className={Style.termsText}
            >
              if a particular component or feature is not serving a core
              functional need, it simply does not exist - an approach best
              defined by the aviation industry.
            </motion.div>
          )}
        </div>
      </div>

      {/* Audio Section Goes Here */}
      <SoundOfFuture isMobile={isMobile} />
      {/* Audio Section Ends Here */}
      <div className="bg-[#000000] pt-[10px]">
        <motion.div
          ref={refReadytext}
          variants={boxVariant}
          initial="hidden"
          animate={controlReadyText}
          className={Style.readyText}
        >
          get ready to take off
        </motion.div>
        <div className="h-full">
          {isMobile && (
            <video
              ref={videoOneRef}
              src={`${mobileVideoUrl}battery.mp4`}
              id="videoFirst"
              autoPlay={true}
              loop
              muted
              playsInline
              style={{ width: "100%", height: "100%" }}
            ></video>
          )}
          {!isMobile && (
            <video
              ref={videoOneRef}
              src={`${videoUrl}battery.mp4`}
              id="videoFirst"
              autoPlay={true}
              loop
              muted
              playsInline
              style={{ width: "100%", height: "100%" }}
            ></video>
          )}
        </div>
        <motion.div
          ref={refMoon}
          variants={boxVariant}
          initial="hidden"
          animate={controlMoon}
          className="flex flex-col sm:pb-[190px] mt-[42px] px-[32px] sm:flex-row sm:mt-[129px] sm:px-[140px] justify-between"
        >
          <div className="flex flex-col sm:w-[412px]">
            <div className="flex flex-row mb-[8px] sm:mb-[20px]">
              <div className={Style.designed}>designed to go</div>
              <div className={Style.wheelLoading}>
                <LottiePlayer autoplay loop src={wheenLoading} />
              </div>
            </div>
            <div className={Style.aviationText}>
              <p>to the moon</p> <p>and back</p>
            </div>
            <div></div>
          </div>
          <div className="mt-[37px] sm:mt-[0] w-[249px] mb-[47px] sm:mb-[0] sm:w-[524px]">
            <div className={Style.subText}>
              The proprietary battery technology, in sync with the highly energy
              efficient on-board systems catapults the F77 miles ahead of the
              industry, with a category leading IDC range of 307 km on a single
              charge.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DnaHome;
