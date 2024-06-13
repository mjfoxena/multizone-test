import React from "react";
import Image from "next/image";

const DesktopConsole = ({
  hoveredIcon,
  handleHoverForDesktop,
  showHoverIcons,
  darkMode,
  consoleImageRef,
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
    <div className="w-[52.375em] h-[30.4375em] flex-shrink-0 max-md:mb-[3.750rem] z-10  transition-opacity duration-500 opacity-100 relative flex justify-center items-center">
      <Image
        ref={consoleImageRef}
        src={getImagePath(darkMode, activeButton)}
        alt="being_connected"
        width={1000}
        priority
        height={1000}
        className="w-[49.375em] h-[29.4375em] select-none"
        // objectFit="cover select-none..."
      />
      {/* hover icons */}
      {showHoverIcons && (
        <>
          <div>
            <div
              className="absolute top-[17%] left-[0.5%]"
              onMouseEnter={() => handleHoverForDesktop("icon1")}
              onMouseLeave={() => handleHoverForDesktop("")}
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[90px] h-[100px] select-none cursor-pointer ${
                  hoveredIcon === "icon1" ? "scale-110" : "scale-95"
                }`}
              />
            </div>
            {hoveredIcon === "icon1" && (
              <h1 className="z-10 absolute left-[-10%] top-[24%]">
                <span className="text-[#F2EAFF] brutal text-[16px] font-medium capitalize">
                  WH/KM
                </span>
              </h1>
            )}
          </div>
          <div>
            <div
              onMouseEnter={() => handleHoverForDesktop("icon2")}
              onMouseLeave={() => handleHoverForDesktop("")}
              className="absolute top-[1%] left-[22.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={` w-[90px] h-[100px] select-none cursor-pointer ${
                  hoveredIcon === "icon2" ? "scale-110" : "scale-95"
                }`}
              />
            </div>
            {hoveredIcon === "icon2" && (
              <h1 className="z-10 absolute top-[-12%] left-[22%]">
                <span className="text-[#F2EAFF] brutal text-[16px] font-medium capitalize">
                  ODOMETER
                </span>
              </h1>
            )}
          </div>
          <div>
            <div
              onMouseEnter={() => handleHoverForDesktop("icon3")}
              onMouseLeave={() => handleHoverForDesktop("")}
              className={`absolute top-[31%] left-[44%] ${
                hoveredIcon === "icon3" ? "scale-105" : "scale-95"
              }`}
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[90px] h-[100px] select-none cursor-pointer ${
                  hoveredIcon === "icon3" ? "scale-110" : "scale-95"
                }`}
              />
            </div>

            {hoveredIcon === "icon3" && (
              <h1 className="z-10 absolute top-[25%] left-[44%]">
                <span className="text-[#F2EAFF] brutal text-[16px] font-medium capitalize">
                  <div className="w-[100px] h-[30px] opacity-80 p-2 bg-black flex justify-center items-center">
                    Speed
                  </div>
                </span>
              </h1>
            )}
          </div>

          <div>
            <div
              onMouseEnter={() => handleHoverForDesktop("icon4")}
              onMouseLeave={() => handleHoverForDesktop("")}
              className="absolute top-[-5%] left-[44%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[90px] h-[100px] select-none cursor-pointer ${
                  hoveredIcon === "icon4" ? "scale-110" : "scale-95"
                }`}
              />
            </div>
            {hoveredIcon === "icon4" && (
              <h1 className="z-10 absolute top-[-12%] left-[42.5%]">
                <span className="text-[#F2EAFF] brutal text-[16px] font-medium capitalize">
                  CONNECTIVITY
                </span>
              </h1>
            )}
          </div>

          <div>
            <div
              onMouseEnter={() => handleHoverForDesktop("icon5")}
              onMouseLeave={() => handleHoverForDesktop("")}
              className="absolute top-[1%] right-[22.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[90px] h-[100px] select-none cursor-pointer ${
                  hoveredIcon === "icon5" ? "scale-110" : "scale-95"
                }`}
              />
            </div>
            {hoveredIcon === "icon5" && (
              <h1 className="z-10 absolute top-[-12%] right-[26.9%]">
                <span className="text-[#F2EAFF] brutal text-[16px] font-medium capitalize">
                  TRIP
                </span>
              </h1>
            )}
          </div>

          <div>
            <div
              onMouseEnter={() => handleHoverForDesktop("icon6")}
              onMouseLeave={() => handleHoverForDesktop("")}
              className="absolute top-[5%] right-[3%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[90px] h-[100px] select-none cursor-pointer ${
                  hoveredIcon === "icon6" ? "scale-110" : "scale-95"
                }`}
              />
            </div>
            {hoveredIcon === "icon6" && (
              <h1 className="z-10 absolute top-[8%] right-[-8%]">
                <span className="text-[#F2EAFF] brutal text-[16px] font-medium capitalize">
                  SOC
                </span>
              </h1>
            )}
          </div>

          <div>
            <div
              onMouseEnter={() => handleHoverForDesktop("icon7")}
              onMouseLeave={() => handleHoverForDesktop("")}
              className="absolute top-[17%] right-[1%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[90px] h-[100px] select-none cursor-pointer ${
                  hoveredIcon === "icon7" ? "scale-110" : "scale-95"
                }`}
              />
            </div>
            {hoveredIcon === "icon7" && (
              <h1 className="z-10 absolute top-[23%] right-[-9.5%]">
                <span className="text-[#F2EAFF] brutal text-[16px] font-medium capitalize">
                  RANGE
                </span>
              </h1>
            )}
          </div>

          {/* bottom side */}

          <div>
            <div
              onMouseEnter={() => handleHoverForDesktop("icon8")}
              onMouseLeave={() => handleHoverForDesktop("")}
              className="absolute bottom-[10%] left-[8.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[90px] h-[100px] select-none cursor-pointer ${
                  hoveredIcon === "icon8" ? "scale-110" : "scale-95"
                }`}
              />
            </div>

            {hoveredIcon === "icon8" && (
              <h1 className="z-10 absolute bottom-[16%] left-[-10.5%]">
                <span className="text-[#F2EAFF] brutal text-[16px] font-medium capitalize">
                  EFFICIENCY BAR
                </span>
              </h1>
            )}
          </div>

          <div>
            <div
              onMouseEnter={() => handleHoverForDesktop("icon9")}
              onMouseLeave={() => handleHoverForDesktop("")}
              className="absolute bottom-[3%] left-[22.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[90px] h-[100px] select-none cursor-pointer ${
                  hoveredIcon === "icon9" ? "scale-110" : "scale-95"
                }`}
              />
            </div>
            {hoveredIcon === "icon9" && (
              <h1 className="z-10 absolute bottom-[-13%] left-[12%]">
                <span className="text-[#F2EAFF] brutal text-[16px] font-medium capitalize">
                  MOTOR (ARMED) & TRACTION LEVEL
                </span>
              </h1>
            )}
          </div>

          <div>
            <div
              onMouseEnter={() => handleHoverForDesktop("icon10")}
              onMouseLeave={() => handleHoverForDesktop("")}
              className="absolute bottom-[2%] left-[44%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[90px] h-[100px] select-none cursor-pointer ${
                  hoveredIcon === "icon10" ? "scale-110" : "scale-95"
                }`}
              />
            </div>

            {hoveredIcon === "icon10" && (
              <h1 className="z-10 absolute bottom-[-13%] left-[44%]">
                <span className="text-[#F2EAFF] brutal text-[16px] font-medium capitalize">
                  RIDING MODE
                </span>
              </h1>
            )}
          </div>
          <div>
            <div
              onMouseEnter={() => handleHoverForDesktop("icon11")}
              onMouseLeave={() => handleHoverForDesktop("")}
              className="absolute bottom-[10%] right-[8.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[90px] h-[100px] select-none cursor-pointer ${
                  hoveredIcon === "icon11" ? "scale-110" : "scale-95"
                }`}
              />
            </div>
            {hoveredIcon === "icon11" && (
              <h1 className="z-10 absolute bottom-[16%]  right-[-8.5%]">
                <span className="text-[#F2EAFF] brutal text-[16px] font-medium capitalize">
                  REGEN LEVEL
                </span>
              </h1>
            )}
          </div>

          <div>
            <div
              onMouseEnter={() => handleHoverForDesktop("icon12")}
              onMouseLeave={() => handleHoverForDesktop("")}
              className="absolute bottom-[3%] right-[22.5%]"
            >
              <Image
                src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                alt="being_connected"
                width={90}
                priority
                height={100}
                objectFit="cover"
                className={`w-[90px] h-[100px] select-none cursor-pointer ${
                  hoveredIcon === "icon12" ? "scale-110" : "scale-95"
                }`}
              />
            </div>
            {hoveredIcon === "icon12" && (
              <h1 className="z-10 absolute bottom-[-13%] right-[19.5%]">
                <span className="text-[#F2EAFF] brutal text-[16px] font-medium capitalize">
                  HILL HOLD & ABS
                </span>
              </h1>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DesktopConsole;
