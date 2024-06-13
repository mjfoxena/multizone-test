import React from "react";
import Image from "next/image";

export default function VioletteHeading() {
  return (
    <div className="  max-md:items-center  w-full relative">
      <h1 className="text-white disketMono text-center text-[14px] max-md:text-[0.750rem] font-normal tracking-[3px] uppercase opacity-80 max-md:mb-[0.900rem] mb-[0.0rem] ">
        Introducing
      </h1>
      {/* headding for desktop */}
      <div className="hidden xl:flex  justify-center items-start">
        <h1
          style={{
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            textShadow: "0px 0px 150px rgba(189, 0, 255, 0.40)",
          }}
          className="text-center max-md:leading-[4.000rem] leading-[146px] text-[#6840DA]  eurostile text-[156px] max-md:text-[54px] font-normal tracking-[31.2px] max-md:tracking-[8.1px] uppercase opacity-80 md:mt-[1rem] xl:mt-[0.9rem]"
        >
          VI
        </h1>

        <div className="flex">
          <div className="relative">
            <h1
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textShadow: "0px 0px 150px rgba(189, 0, 255, 0.40)",
              }}
              className="text-center max-md:leading-[4.000rem] leading-[146px] text-[#6840DA]  eurostile text-[156px] max-md:text-[54px] font-normal tracking-[31.2px] max-md:tracking-[8.1px] uppercase opacity-80 md:mt-[1rem] xl:mt-[0.9rem]"
            >
              O
            </h1>
            <div className="absolute inset-0 h-[1.563rem] w-[1.563rem] top-[4.699rem] left-[3.925rem]">
              <Image
                src="/images/smarttech/introducingViolette/blue_plus_icon.png"
                alt="Blue Plus Icon"
                width={25}
                priority
                height={25}
                className="rotate-45 object-cover"
              />
            </div>
          </div>
        </div>

        <h1
          style={{
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            textShadow: "0px 0px 150px rgba(189, 0, 255, 0.40)",
          }}
          className="text-center max-md:leading-[4.000rem] leading-[146px] text-[#6840DA]  eurostile text-[156px] max-md:text-[54px] font-normal tracking-[31.2px] max-md:tracking-[8.1px] uppercase opacity-80 md:mt-[1rem] xl:mt-[0.9rem]"
        >
          LETTE
        </h1>
      </div>
      {/* headding for tablet */}
      <div className="xl:hidden max-sm:hidden flex   justify-center items-center">
        <h1
          style={{
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            textShadow: "0px 0px 150px rgba(189, 0, 255, 0.40)",
          }}
          className="text-center   text-[#6840DA]  eurostile text-[65px] font-normal tracking-[2.1rem] uppercase opacity-80 md:mt-[1rem] "
        >
          VI
        </h1>

        <div className="flex">
          <div className="relative">
            <h1
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textShadow: "0px 0px 150px rgba(189, 0, 255, 0.40)",
              }}
              className="text-center   text-[#6840DA]  eurostile text-[65px] font-normal tracking-[2.1rem] uppercase opacity-80 md:mt-[1rem] "
            >
              O
            </h1>
            <div className="absolute inset-0 h-[1rem] w-[1rem] top-[3.5rem] left-[1.5rem]">
              <Image
                src="/images/smarttech/introducingViolette/blue_plus_icon.png"
                alt="Blue Plus Icon"
                width={25}
                priority
                height={25}
                className="rotate-45 object-cover"
              />
            </div>
          </div>
        </div>

        <h1
          style={{
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            textShadow: "0px 0px 150px rgba(189, 0, 255, 0.40)",
          }}
          className="text-center   text-[#6840DA]  eurostile text-[65px] font-normal tracking-[2.1rem] uppercase opacity-80 md:mt-[1rem] "
        >
          LETTE
        </h1>
      </div>
      {/* heading for mobile */}
      <div className="hidden max-sm:flex justify-center items-start">
        <h1
          style={{
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            textShadow: "0px 0px 150px rgba(189, 0, 255, 0.40)",
          }}
          className="text-center max-md:leading-[4.000rem] leading-[146px] text-[#6840DA]  eurostile text-[156px] max-md:text-[54px] font-normal tracking-[31.2px] max-md:tracking-[2.1px] uppercase opacity-80 md:mt-[1rem] xl:mt-[0.9rem]"
        >
          VI
        </h1>

        <div className="flex">
          <div className="relative">
            <h1
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textShadow: "0px 0px 150px rgba(189, 0, 255, 0.40)",
              }}
              className="text-center max-md:leading-[4.000rem] leading-[146px] text-[#6840DA]  eurostile text-[156px] max-md:text-[54px] font-normal tracking-[31.2px] max-md:tracking-[2.1px] uppercase opacity-80 md:mt-[1rem] xl:mt-[0.9rem]"
            >
              O
            </h1>
            <div className="absolute inset-0 h-[0.563rem] w-[0.563rem] top-[1.713rem] left-[1.425rem]">
              <Image
                src="/images/smarttech/introducingViolette/blue_plus_icon.png"
                alt="Blue Plus Icon"
                width={25}
                priority
                height={25}
                className="rotate-45 object-cover"
              />
            </div>
          </div>
        </div>

        <h1
          style={{
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            textShadow: "0px 0px 150px rgba(189, 0, 255, 0.40)",
          }}
          className="text-center max-md:leading-[4.000rem] leading-[146px] text-[#6840DA]  eurostile text-[156px] max-md:text-[54px] font-normal tracking-[31.2px] max-md:tracking-[4.1px] uppercase opacity-80 md:mt-[1rem] xl:mt-[0.9rem]"
        >
          LETTE
        </h1>
      </div>
    </div>
  );
}
