import React from "react";
import Image from "next/image";
import CountryDropdownOnLocationUs from "../contryDropdown/countrydropdown";

export default function HeaderOfLoactionUs({
  setSelectedCountry,
  selectedCountry,
  countries,
}) {
  const theme = "dark";
  return (
    <div className="w-full h-[27.875rem] flex justify-center  relative">
      <Image
        priority
        src={"/images/locationUs/header/locationUsHeader.svg"}
        alt="arrow"
        layout="fill"
        className="object-cover"
        style={{ opacity: 0.1 }}
      />

      <div className="absolute w-full h-full flex flex-col justify-start items-start max-w-[77.813rem] max-md:max-w-[21.188rem]">
        <div className="w-full flex justify-between items-end max-md:items-center mt-[6.063rem]">
          <h1 className="text-4xl max-md:text-[24px] font-normal eurostile leading-normal text-[#414141]">
            LOCATE US
          </h1>

          <h4 className="text-right max-md:hidden font-normal brutal text-lg text-[#414141] capitalize">
            UV Hangar & Spacestation locations
          </h4>
          <Image
            src={"/images/locationUs/header/mobileSquare.svg"}
            alt="arrow"
            width={100}
            height={100}
            className="h-[22px] w-[94.188px] md:hidden"
          ></Image>
        </div>

        <hr className="md:hidden w-full h-[1px] mx-auto mt-[0.688rem] mb-[1.750rem]   border-0 rounded md:my-10 bg-[#CECECE]" />

        <div className="mb-[1.750rem] max-sm:w-full flex justify-between items-center  p-[18px_24px]  rounded-[4px] border border-black   brutal text-[14px] font-normal leading-[28px] tracking-[0.2px] uppercase md:hidden">
          <CountryDropdownOnLocationUs
            selectedCountry={selectedCountry}
            countries={countries}
            setSelectedCountry={setSelectedCountry}
          />
        </div>

        <Image
          src={"/images/locationUs/header/theLocationLine.svg"}
          alt="arrow"
          width={500}
          height={500}
          className="object-cover w-full h-[50px] mt-[2.500rem] max-md:hidden"
        />

        <div className="absolute top-1/2 right-0 transform  -translate-y-[70%] max-md:hidden">
          <CountryDropdownOnLocationUs
            selectedCountry={selectedCountry}
            countries={countries}
            setSelectedCountry={setSelectedCountry}
          />
        </div>

        <div className="flex flex-col justify-start items-start">
          <h1 className="text-[#404040] font-normal brutal text-xl max-md:text-[18px] capitalize">
            ready to activate flight mode?
          </h1>
          <p className="text-[#404040] font-normal brutal text-base max-md:text-[14px] leading-normal w-full max-w-[33.063rem] mt-[0.538rem] max-md:mt-[1.313rem]">
            Find your nearest UV Hangar or Space Station to experience the F77
            MACH 2 in person. Once you take a test ride, you wont be able to go
            back to anything else. All our experience centres are equipped to
            handle service.
          </p>
        </div>

        <div className="md:hidden mt-[3.000rem]">
          <h4 className="text-right  font-normal brutal text-[14px] text-[#414141] capitalize">
            UV Hangar & Spacestation locations
          </h4>
        </div>
      </div>
      {/* <div className="absolute mt-[0.913rem] bottom-0 md:hidden flex flex-col justify-center items-center   w-full h-[48px] bg-[#DA4F46]">
        <div className=" w-full h-full flex flex-col justify-center items-start max-w-[21.188rem]">
          <h1 className="brutal text-white">INDIA</h1>
        </div>
      </div> */}
    </div>
  );
}