import React from "react";
import Image from "next/image";
import Link from "next/link";
import { API_CONSTANTS } from "../../../../services/constants";
const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/smarttech`;

export default function TakeToFly() {
  return (
    <div className="w-full h-full flex flex-col justify-end items-center bg-black relative">
      {/* <Image
        src={"/images/smarttech/takeOff/Mach 2 logo.svg"}
        alt="taketofly"
        width={500}
        height={500}
        objectFit="cover"
        className="w-[30rem] h-[5.063rem] select-none mt-[12.625rem] max-md:pl-5 max-md:pr-5"
      /> */}
      {/* <div className="flex w-full justify-center items-center ">
        <h1 className="text-[ 24px] disketMono font-normal text-white uppercase max-md:max-w-[20.750rem] text-center">
          ACTIVATE FLIGHT MODE
        </h1>
      </div> */}
      <div className="flex w-full justify-center items-center mt-[7.625rem]">
        <h1 className="text-2xl font-normal text-white brutal uppercase max-md:max-w-[20.750rem] text-center">
          {/* Do you have what it takes to fly the F77? */}
          ARE YOU READY TO STEP INTO THE FUTURE ?
        </h1>
      </div>
      <Link href="/configure">
        <Image
          src={"/images/smarttech/takeOff/book_your_f77.svg"}
          alt="taketofly"
          width={500}
          height={500}
          objectFit="cover"
          className="w-[16.063rem] h-[3.813rem] cursor-pointer mt-6 mb-[6.563rem]"
        />
      </Link>
      <div>
        <Image
          src={`${imageUrl}/take_to_flight/f77_dark_silhouette.png`}
          alt="taketofly"
          width={2000}
          height={2000}
          objectFit="cover"
          className="w-[67.625rem] h-[26.438rem] hidden md:block"
        />
      </div>
      <div className="h-[10.563rem] md:hidden">
        <Image
           src={`${imageUrl}/take_to_flight/f77_dark_silhouette.png`}
          alt="taketofly"
          width={2000}
          height={2000}
          objectFit="cover"
        />
      </div>
    </div>
  );
}
