import Link from "next/link";
import Style from "../../../pages/squadron/squadron.module.scss";
import Button from "../../atoms/Button";
import React from "react";
import { originURL } from "../../../services/constants";

const WallpaperHeader = (isMobile) => {
  return (
    <>
      <div className={Style.squadron_child}>
        <div className="flex flex-col justify-between -ml-10 sm:ml-0 mt-10 sm:mt-0">
          <p className="brutal text-[16px] sm:text-[28px] font-normal text-[#807F7F]">
            UV SQUADRON
          </p>
          <p className="text-[20px] sm:text-[48px] sm:-mt-2 -ml-1 font-normal text-[#ffffff] eurostile">
            WALLPAPERS
          </p>
          <div className="col-span-1 flex justify-end">
            <Link href={`${originURL}/squadron/wallpaper`}>
              <div className="col-span-1 sm:-mt-16 -mt-8 sm:mb-0">
                <button id="explore_wallpaper" className="bg-[#ECECEC] black text-center text-[9.8px] sm:text-[14px] lg:text-[16px] w-[116.247px] h-[34.302px] sm:w-[230px] lg:w-[304px] sm:h-[56px] brutal hover:bg-[#FF1744] hover:text-white">
                  <span className="hidden sm:block">EXPLORE WALLPAPERS</span>
                  <span className="sm:hidden">EXPLORE</span>
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );

};

export default WallpaperHeader;