import React from "react";
import Image from "next/image";

export default function RemoteSafety() {
  return (
    <div className="w-full h-[24.813rem] 2xl:h-[25rem] relative">
      <div className="2xl:h-[60%] 2xl:w-[60%]">
        <div className="max-md:hidden  ">
          <Image
            src={"/images/smarttech/remoteSafty/remoteSafty.svg"}
            alt="bg.image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
        <div className="md:hidden">
          <Image
            src={"/images/smarttech/remoteSafty/remoteSaftyMobile.svg"}
            alt="bg.image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>

        <div className="max-md:hidden absolute bottom-[8%]  left-[19.5%] 2xl:left-[19.5%]">
          <h1 className="text-white text-center eurostile text-[1.550rem] max-md:text-[16px]  leading-[1.500rem] font-normal tracking-[1px] uppercase">
            Remote
          </h1>

          <h1 className="text-[#6840DA] eurostile text-[2.900rem] max-md:text-[32px] font-normal uppercase max-md:text-[#6840DA] ">
            Safety
          </h1>
        </div>
        <div className="md:hidden absolute bottom-[30%]  left-[32%] ">
          <h1 className="text-white text-center eurostile text-[1.550rem] max-md:text-[16px]  leading-[1.500rem] font-normal tracking-[1px] uppercase">
            Remote
          </h1>

          <h1 className="text-[#6840DA] eurostile text-[2.900rem] max-md:text-[32px] font-normal uppercase max-md:text-[#6840DA] ">
            Safety
          </h1>
        </div>
        <div className=" absolute bottom-[10%]   flex flex-row justify-center md:justify-end items-center  w-full md:right-[10%]">
          <p className="brutal text-[16px] max-md:text-[12px] text-right max-md:text-center max-md:w-[17.063rem] font-normal w-[34.000rem] leading-6 max-md:leading-[18px] text-[#FFF]">
            <span className="md:block">
              {" "}
              Unauthorized usage of your F77 MACH 2? We have you covered.
            </span>
            <span>
              Lockdown mode completely immobilizes your jet till you wish to
              re-arm it.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
