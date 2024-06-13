import React from "react";
import Image from "next/image";

const MobileAndTabletConsole = ({
  activeIcon,
  handleIconClick,
  showHoverIcons,
  containerRef,
  darkMode,
  activeButton,
}) => {
  const getImagePath = (mode, activeButton) => {
    if (mode) {
      switch (activeButton) {
        case "G":
          return "/images/smarttech/radarConsole/bg_console_G_day.svg";
        case "B":
          return "/images/smarttech/radarConsole/bg_console_B_day.svg";
        case "C":
          return "/images/smarttech/radarConsole/bg_console_C_day.svg";
        default:
          return "/images/smarttech/radarConsole/bg_console_C_day.svg";
        /////images/smarttech/consol.png
      }
    } else {
      switch (activeButton) {
        case "G":
          return "/images/smarttech/radarConsole/FinalLayout- GlideB.svg";
        case "B":
          return "/images/smarttech/radarConsole/FinalLayout- Ballistic.svg";
        case "C":
          return "/images/smarttech/radarConsole/FinalLayout- Combat.svg";
        default:
          return "/images/smarttech/radarConsole/FinalLayout- Combat.svg";
      }
    }
  };

  return (
    <>
      {/* consolu image for mobile */}
      <div className="w-[22.938rem] h-[13.750rem] md:w-[42.375em] md:h-[29.4375em] flex-shrink-0 z-10  transition-opacity duration-500 opacity-100 relative flex justify-center items-center">
        <Image
          src={getImagePath(darkMode, activeButton)}
          alt="being_connected"
          width={1000}
          priority
          height={1000}
          objectFit="cover select-none"
        />
        {/* clicking icons for mobile */}
        {showHoverIcons && (
          <div ref={containerRef}>
            <div
              className="absolute top-[14.5%] md:top-[20.5%] left-[-3.5%]"
              onMouseEnter={() => handleIconClick("icon1")}
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[50px] h-[50px] select-none cursor-pointer ${
                  activeIcon === "icon1"
                    ? "scale-[180%]"
                    : "scale-95 md:scale-[120%]"
                }`}
              />
            </div>
            <div
              onMouseEnter={() => handleIconClick("icon2")}
              className="absolute top-[-3%] md:top-[5.5%] left-[19.5%] md:left-[22.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={` w-[50px] h-[50px] select-none cursor-pointer ${
                  activeIcon === "icon2"
                    ? "scale-[180%]"
                    : "scale-95 md:scale-[120%]"
                }`}
              />
            </div>
            <div
              onMouseEnter={() => handleIconClick("icon3")}
              className={`absolute top-[18%] md:top-[31%] left-[35%]  md:left-[44.5%]`}
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[50px] h-[50px] select-none cursor-pointer ${
                  activeIcon === "icon3"
                    ? "scale-[180%]"
                    : "scale-95 md:scale-[120%]"
                }`}
              />
            </div>
            <div
              onMouseEnter={() => handleIconClick("icon4")}
              className="absolute top-[-7.5%] md:top-0 left-[43.5%] md:left-[45%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[50px] h-[50px] select-none cursor-pointer ${
                  activeIcon === "icon4"
                    ? "scale-[180%]"
                    : "scale-95 md:scale-[120%]"
                }`}
              />
            </div>
            <div
              onMouseEnter={() => handleIconClick("icon5")}
              className="absolute top-[-2%] md:top-[2.5%] right-[19%]  md:right-[23.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[50px] h-[50px] select-none cursor-pointer ${
                  activeIcon === "icon5"
                    ? "scale-[180%]"
                    : "scale-95 md:scale-[120%]"
                }`}
              />
            </div>

            <div
              onMouseEnter={() => handleIconClick("icon6")}
              className="absolute top-[0%] md:top-[5.5%] right-[-2%] md:right-[2.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[50px] h-[50px] select-none cursor-pointer ${
                  activeIcon === "icon6"
                    ? "scale-[180%]"
                    : "scale-95 md:scale-[120%]"
                }`}
              />
            </div>
            <div
              onMouseEnter={() => handleIconClick("icon7")}
              className="absolute top-[23%] right-[-4%] md:right-[-2.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[50px] h-[45px] select-none cursor-pointer ${
                  activeIcon === "icon7"
                    ? "scale-[180%]"
                    : "scale-95 md:scale-[120%]"
                }`}
              />
            </div>
            <div
              onMouseEnter={() => handleIconClick("icon8")}
              className="absolute bottom-[8%] md:bottom-[15%]  left-[1%] md:left-[8.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[50px] h-[50px] select-none cursor-pointer ${
                  activeIcon === "icon8"
                    ? "scale-[180%]"
                    : "scale-95 md:scale-[120%]"
                }`}
              />
            </div>
            <div
              onMouseEnter={() => handleIconClick("icon9")}
              className="absolute bottom-[1.5%] md:bottom-[10%] left-[19.5%] md:left-[20.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[50px] h-[50px] select-none cursor-pointer ${
                  activeIcon === "icon9"
                    ? "scale-[180%]"
                    : "scale-95 md:scale-[120%]"
                }`}
              />
            </div>

            <div
              onMouseEnter={() => handleIconClick("icon10")}
              className="absolute bottom-[-2%] md:bottom-[10.5%] left-[42.5%] md:left-[46.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[50px] h-[50px] select-none cursor-pointer ${
                  activeIcon === "icon10"
                    ? "scale-[180%]"
                    : "scale-95 md:scale-[120%]"
                }`}
              />
            </div>

            <div
              onMouseEnter={() => handleIconClick("icon11")}
              className="absolute bottom-[10%] md:bottom-[15%] right-[0.5%] md:right-[5.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[50px] h-[50px] select-none cursor-pointer ${
                  activeIcon === "icon11"
                    ? "scale-[180%]"
                    : "scale-95 md:scale-[120%]"
                }`}
              />
            </div>

            <div
              onMouseEnter={() => handleIconClick("icon12")}
              className="absolute bottom-[1%] md:bottom-[10.5%] right-[19.5%] md:right-[20.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[50px] h-[50px] select-none cursor-pointer ${
                  activeIcon === "icon12"
                    ? "scale-[180%]"
                    : "scale-95 md:scale-[120%]"
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileAndTabletConsole;
