import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { API_CONSTANTS } from "../../../../services/constants";
import VideoWrapper from "../../../../utils/videoPlayer";
import Hls from "hls.js";
import MobileDSCVideo from "./mobileDSCVideo";
import DeskTopDSC from "./deskTopDSC";

const baseLink = `${API_CONSTANTS.BASE_URL_S3}/homepage/videos`;

export default function DynamicStabilityControl() {
  return (
    <div className="w-full h-full flex flex-col items-center bg-[#000] relative overflow-hidden">
      <div className="md:hidden">
        <Image
          src={`/images/smarttech/dynamicStabilityControl/uv_dsc_mobile_bg.svg`}
          alt="bg.image"
          layout="fill"
          objectFit="cover"
          priority
          objectPosition="left"
          className="object-cover transition-opacity duration-500 opacity-0 md:hidden"
        ></Image>
      </div>
      <div className="absolute top-[-55%] xl:top-[-40%] xl:left-[-40%] 2xl:top-[-50%] 2xl:left-[-62%] max-md:left-[-20%] max-md:top-0 w-[90%] max-md:w-full h-full transform rotate-8.998deg flex-shrink-0 max-md:hidden">
        <Image
          src={"/images/smarttech/dynamic_something_control_bg.png"}
          alt="bg.image"
          width={2000}
          priority
          height={2000}
          objectFit="cover"
          style={{
            fill: "linear-gradient(187deg, rgba(145, 78, 255, 0.20) 32.63%, rgba(0, 56, 255, 0.00) 91.83%)",
            //  filter: "blur(200px)",
          }}
          objectPosition="left"
          className="rounded-md object-cover"
        />
      </div>

      <div className="md:hidden absolute top-[-30%] left-[-35%] max-md:left-[-20%] max-md:top-[5%] w-[90%] max-md:w-full h-full max-md:hidden">
        <Image
          src={"/images/smarttech/dynamic_something_control_bg.png"}
          alt="bg.image"
          width={2000}
          height={2000}
          priority
          objectFit="cover"
          objectPosition="left"
          className="rounded-md object-cover"
        />
      </div>
      {/* dynamic something control heading */}
      <div className="flex max-md:flex-col justify-between max-md:justify-center max-md:items-center w-full items-start z-10 mt-[10%] max-md:mt-[12.625rem]  md:max-w-[70rem] max-md:max-w-full xl:max-w-[71.00rem]">
        <div className="flex flex-col justify-start max-md:justify-center">
          <h1 className="text-[#F2EAFF] disketMono text-[10px] font-normal tracking-[2.4px] uppercase ">
            Powered by
          </h1>

          <h1 className="text-[#6840DA] eurostile text-[2.500rem] max-md:text-[1.625rem] max-md:pt-[0.163rem] font-normal uppercase pt-[1.063rem]  max-md:pb-[2px]">
            UV D.S.C
          </h1>

          <h1 className="text-[#F2EAFF] disketMono text-sm max-md:text-[14px] font-normal uppercase">
            DYNAMIC STABILITY CONTROL
          </h1>

          <p className="text-white brutal text-base max-md:text-[0.750rem] font-normal leading-[22px] opacity-80 w-[20.875rem] max-md:w-[15.188rem]  pt-14 max-md:pt-[3.000rem]">
            A first of it’s kind on any motorcycle, the F77 MACH 2 comes enabled
            with our patented Dynamic Stability Control. This remarkable
            innovation ensures optimal performance while enhancing safety. Regen
            levels are automatically modulated with ABS activation to ensure
            complete control and stability
          </p>
        </div>
        {/* desktop */}
        <DeskTopDSC />
      </div>
      {/* Mobile */}
      <div className="z-10 md:hidden">
        <MobileDSCVideo />
      </div>

      {/* <div className="absolute top-[33%] xl:top-[45%] xl:left-[-15%] 2xl:top-[45%] left-[1%] max-md:left-[-10%] max-md:top-[43%]   w-[90%] max-md:w-full max-md:h-full h-full">
        <Image
          src={"/images/smarttech/dynamic_something_control_bg_2.svg"}
          alt="bg.image"
          width={1000}
          height={1000}
          style={{
            fill: "linear-gradient(197deg, rgba(145, 78, 255, 0.50) 17.22%, rgba(0, 56, 255, 0.00) 161.44%)",
          }}
          objectFit="cover"
          priority
          objectPosition="left"
          className="object-cover"
        />
      </div> */}
      <div className="md:hidden absolute top-[33%] left-[1%] max-md:left-[-20%] max-md:top-[50%]   w-[90%] ">
        <Image
          src={
            "/images/smarttech/dynamicStabilityControl/dynamic_something_control_bg_2.svg"
          }
          alt="bg.image"
          width={1000}
          priority
          height={1000}
          objectFit="cover"
          objectPosition="left"
          className="object-cover"
        />
      </div>

      <div className="flex  max-md:flex-col  justify-between items-end max-md:items-center max-md:justify-center w-full mt-[8%] max-md:mt-[7.750rem] md:max-w-[70rem] max-md:max-w-full xl:max-w-[71.00rem]">
        <div className="flex flex-col justify-start items-start">
          <div className=" text-[#F2EAFF] text-center eurostile text-4xl font-normal uppercase  max-md:leading-none">
            <span className=" max-md:text-[1.625rem]">In-flight</span>
          </div>
          <div className=" text-[#F2EAFF] text-center eurostile text-4xl font-normal uppercase  max-md:leading-none">
            <span className="pl-[6.875rem] max-md:pl-[4.875rem] text-[#6840DA] max-md:text-[1.625rem]">
              Safety
            </span>
          </div>
        </div>

        <div className="max-md:mt-[7.500rem] max-md:hidden">
          <span className="text-[#C7C0D2] text-center brutal text-base font-normal uppercase">
            Go{" "}
          </span>

          <span className="text-white brutal text-base font-medium uppercase">
            Ballistic.{" "}
          </span>

          <span className="text-[#C7C0D2] text-center brutal text-base font-normal uppercase">
            your{" "}
          </span>
          <span className="text-white brutal text-base font-medium uppercase">
            safety{" "}
          </span>
          <span className="text-[#C7C0D2] text-center brutal text-base font-normal uppercase">
            is covered
          </span>
        </div>
        {/* for mobile */}
        <div className="max-md:mt-[7.500rem] md:hidden">
          <div className="flex i justify-center gap-1">
            <span className="text-[#C7C0D2] text-center brutal font-normal text-base  uppercase">
              Go{" "}
            </span>

            <span className="text-white brutal text-base font-medium uppercase">
              Ballistic.{" "}
            </span>
          </div>

          <span className="text-[#C7C0D2] text-center brutal text-base font-normal uppercase">
            your{" "}
          </span>
          <span className="text-white brutal text-base font-medium uppercase">
            safety{" "}
          </span>
          <span className="text-[#C7C0D2] text-center brutal text-base font-normal uppercase">
            is covered
          </span>
        </div>
      </div>

      <div className="w-full h-[100px] flex-shrink-0 bg-[#000]" />
    </div>
  );
}
