import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { API_CONSTANTS } from "../../../../services/constants";
import Style from "../../../../pages/limited/limited.module.scss";

const baseLink = `${API_CONSTANTS.BASE_URL_S3}/homepage/videos`;

interface IVioletTecht {
  title: string;
  videoLink: string;
}

const smartTechAlert: IVioletTecht[] = [
  {
    title: "Intelligent Crash Detection",
    videoLink: `${baseLink}/chikma.mp4`,
  },
  {
    title: "SOS Alert Notification",
    videoLink: `${baseLink}/chikma.mp4`,
  },
  {
    title: "Motor Cut-Off",
    videoLink: `${baseLink}/kannur.mp4`,
  },
];
export default function VioletteIsDesigned() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.play().catch((error) => {
        console.error("Auto-play failed:", error);
      });
    }
  }, []);
  return (
    <div className="w-full  flex flex-col items-center bg-[#000] relative overflow-hidden">
      <div className="absolute top-[-12%] max-md:top-0 left-[-65%] max-md:left-0 xl:left-[-60%] w-full  ">
        <Image
          src={"/images/smarttech/violetteisdesigned_bg.png"}
          alt="bg.image"
          priority
          width={1500}
          height={1500}
          style={{
            fill: "linear-gradient(187deg, rgba(145, 78, 255, 0.20) 32.63%, rgba(0, 56, 255, 0.00) 91.83%)",
            filter: "blur(200px)",
          }}
          objectFit="cover"
          className="rounded-md z-10"
        />
      </div>
      <div className="md:max-w-[70rem] max-md:max-w-full xl:max-w-[71.00rem] w-full">
        <div className="flex flex-row max-md:flex-col w-full justify-between   mt-[10%] max-md:mt-[8.438rem]  ">
          {/* heading and sub heading , description section */}
          <div className="flex flex-col max-md:items-center gap-3">
            <h1 className="text-[#E8D9FF] disketMono text-xs font-normal leading-[140%] max-md:text-center">
              SO YOU’VE HAD AN incident, but
            </h1>

            {/* desktop */}
            <h1 className="max-md:hidden text-[#F2EAFF] brutal text-3xl max-md:text-[1.000rem] max-md:leading-[1.250rem] font-normal max-w-[25.813rem] max-md:mt-[6.688rem]">
              Violette is designed to always be by your side
            </h1>

            {/* mobile */}

            <h1 className="md:hidden max-md:mt-[5.625rem] text-center  text-[#F2EAFF] brutal text-base font-normal uppercase leading-[1.500rem] max-w-[75%] max-md:max-w-[15.688rem]">
              Violette is designed to always be by your side
            </h1>

            <p className="text-white brutal max-md:text-center text-sm max-md:text-[12px] font-normal leading-[157.143%] max-md:leading-[22px] opacity-80 max-w-[28.063rem] max-md:max-w-[15.188rem] mt-[3%]">
              Violette’s advanced algorithms can detect a crash within
              milliseconds and turns off the motor to ensure safety.
            </p>
            {/* desktop */}
            <div className=" flex flex-col gap-[1.813rem] mt-[4.688rem] max-md:mt-[3.688rem]  ">
              {smartTechAlert.map((alert, index) => (
                <AlertItem
                  key={index}
                  iconSrc={"/images/smarttech/the_pls.png"}
                  rotating={"rotate-45"}
                  title={alert.title}
                  fontWeight="font-normal"
                  color={"text-[#FFFFFF]"}
                  opacity=""
                />
              ))}
            </div>
          </div>
          {/* mobile alert*/}

          {/* grp bike image  */}
          <div className=" mb-[30.125rem] max-md:mb-[65.125rem] ">
            {
              <div className=" w-[550px] h-[33.188rem] max-md:h-[30.500rem] max-md:w-full max-md:absolute max-md:left-0 max-md:top-[600px] flex-shrink-0 items-center max-md:mt-[3.813rem]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={"h-[500px] w-[800px] object-cover"}
                >
                  <source src={`${baseLink}/chikma.mp4`} />
                </video>
              </div>
            }
          </div>
        </div>
      </div>

      <div className="absolute bottom-[-12%]  xl:left-[-20%] 2xl:left-0 max-md:left-[-73%] sm:left-[-80%] max-md:bottom-[-15%]">
        <div className="w-[2000px] h-[700px] max-md:w-[1300px] max-md:h-[600px]">
          <Image
            src={"/images/smarttech/round_balance_gr.svg"}
            alt="bg.image"
            width={608}
            priority
            height={613}
            objectFit="cover"
            className="w-full flex-shrink-0 overflow-hidden object-cover"
          />
        </div>

        <div className="absolute bottom-[-45%] max-md:bottom-0 left-[-26%]  inset-0 flex flex-col items-center justify-center z-10 ">
          <h1 className="text-white text-center gemsbuck text-[1.550rem] max-md:text-[0.875rem] leading-[1.500rem] font-normal tracking-[1px] uppercase">
            Remote
          </h1>

          <h1 className="text-[#6840DA] gemsbuck text-[2.900rem] max-md:text-[1.750rem] font-normal uppercase max-md:text-[#6840DA] ">
            Safety
          </h1>
        </div>
      </div>
    </div>
  );
}

const AlertItem = ({
  iconSrc,

  title,
  fontWeight,
  opacity,
  color,
  rotating,
}) => {
  return (
    <div className="flex w-full flex-row items-center gap-3 cursor-pointer">
      <Image
        src={iconSrc}
        alt="icon"
        width={20}
        height={20}
        priority
        objectFit="cover"
        className={`w-5 h-5 max-md:h-[0.813rem] max-md:w-[0.813rem] flex-shrink-0 ${rotating}`}
      />
      <h1
        className={`${color} text-[0.875rem] max-md:text-[0.813rem] font-normal brutal ${fontWeight} ${
          opacity ? "opacity-60" : ""
        } whitespace-nowrap brutal flex-shrink-0`}
      >
        {title}
      </h1>
      <div className="pl-5"></div>
    </div>
  );
};
