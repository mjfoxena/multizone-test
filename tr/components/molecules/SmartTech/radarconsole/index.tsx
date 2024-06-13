import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
export default function RadarConsole() {
  const [isChecked, setIsChecked] = useState(false);
  const [activeButton, setActiveButton] = useState("C"); // State to track active button
  const [darkMode, setDarkMode] = useState(false); // State to track dark mode

  // image transition animation

  const bgImageRef = useRef<HTMLImageElement>(null);
  const consoleImageRef = useRef<HTMLImageElement>(null);
  const [showHoverIcons, setShowHoverIcons] = useState<boolean>(false);
  const [hoveredIcon, setHoveredIcon] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHoverForDesktop = (icon) => {
    setHoveredIcon(icon);
  };

  const [displayText, setDisplayText] = useState<string>("TAP TO SEE DETAILS");
  const [activeIcon, setActiveIcon] = useState("");
  const [displayTextForMobile, setDisplayTextForMobile] =
    useState("RADAR CONSOLE");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActiveIcon("");
        setDisplayTextForMobile("RADAR CONSOLE");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleModeClick = (buttonName: string): void => {
    setActiveButton(buttonName);
  };

  const toggleHoverIcons = () => {
    setShowHoverIcons(!showHoverIcons);
    setDisplayText(showHoverIcons ? "TAP TO SEE DETAILS" : "Close");
  };

  const handleIconClick = (iconName: string) => {
    // Update displayText based on the hovered icon
    switch (iconName) {
      case "icon1":
        setActiveIcon("icon1");
        setDisplayTextForMobile(" WH/KM");
        break;
      case "icon2":
        setActiveIcon("icon2");
        setDisplayTextForMobile("ODOMETER");
        break;
      case "icon3":
        setActiveIcon("icon3");
        setDisplayTextForMobile("SPEED");
        break;
      case "icon4":
        setActiveIcon("icon4");
        setDisplayTextForMobile("CONNECTIVITY");
        break;
      case "icon5":
        setActiveIcon("icon5");
        setDisplayTextForMobile("TRIP");
        break;
      case "icon6":
        setActiveIcon("icon6");
        setDisplayTextForMobile("SOC");
        break;
      case "icon7":
        setActiveIcon("icon7");
        setDisplayTextForMobile("RANGE");
        break;
      case "icon8":
        setActiveIcon("icon8");
        setDisplayTextForMobile("EFFICIENCY BAR");
        break;
      case "icon9":
        setActiveIcon("icon9");
        setDisplayTextForMobile("MOTOR (ARMED) & TRACTION LEVEL");
        break;
      case "icon10":
        setActiveIcon("icon10");
        setDisplayTextForMobile("RIDING MODE");
        break;
      case "icon11":
        setActiveIcon("icon11");
        setDisplayTextForMobile("REGEN LEVEL");
        break;
      case "icon12":
        setActiveIcon("icon12");
        setDisplayTextForMobile("HILL HOLD & ABS");
        break;

      default:
        setActiveIcon("");
        setDisplayTextForMobile("RADAR CONSOLE");
        break;
    }
  };

  const handleToggleChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
    setDarkMode((prevMode) => !prevMode);
  };

  const getImagePath = (mode, button) => {
    if (mode) {
      switch (button) {
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
      switch (button) {
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

  const getBgPath = (mode, button) => {
    if (mode) {
      switch (button) {
        case "G":
          return "/images/smarttech/radarConsole/bg_of_console_G.svg";
        case "B":
          return "/images/smarttech/radarConsole/bg_of_console_B.svg";
        case "C":
        default:
          return "/images/smarttech/radarConsole/bg_of_console_c.svg";
        /////images/smarttech/radarConsole/consol.png
      }
    } else {
      switch (button) {
        case "G":
          return "/images/smarttech/radarConsole/bg_of_console_G.svg";
        case "B":
          return "/images/smarttech/radarConsole/bg_of_console_B.svg";
        case "C":
        default:
          return "/images/smarttech/radarConsole/bg_of_console_c.svg";
      }
    }
  };

  const getBgPathOMobile = (mode, button) => {
    if (mode) {
      switch (button) {
        case "G":
          return "/images/smarttech/radarConsole/bg_mobile_console_G.svg";
        case "B":
          return "/images/smarttech/radarConsole/bg_mobile_console_B.svg";
        case "C":
        default:
          return "/images/smarttech/radarConsole/bg_mobile_console_C.svg";
        /////images/smarttech/radarConsole/consol.png
      }
    } else {
      switch (button) {
        case "G":
          return "/images/smarttech/radarConsole/bg_mobile_console_G.svg";
        case "B":
          return "/images/smarttech/radarConsole/bg_mobile_console_B.svg";
        case "C":
        default:
          return "/images/smarttech/radarConsole/bg_mobile_console_C.svg";
      }
    }
  };

  ///src={getImagePath(darkMode, activeButton)}
  return (
    <div
      className="w-full h-full flex flex-col items-center bg-[#000] relative "
      style={{ backgroundColor: "#000" }}
    >
      <div className=" md:max-w-[70rem] max-md:max-w-full xl:max-w-[71.00rem] w-full h-full justify-center items-center flex flex-col">
        {/* bg gradient */}
        <Image
          ref={bgImageRef}
          src={getBgPath(darkMode, activeButton)}
          alt="bg.image"
          layout="fill"
          objectFit="cover"
          priority
          objectPosition="left"
          className="object-cover select-none transition-opacity duration-500 opacity-100 max-md:hidden"
        ></Image>
        <Image
          ref={bgImageRef}
          src={getBgPathOMobile(darkMode, activeButton)}
          alt="bg.image"
          layout="fill"
          objectFit="cover"
          priority
          objectPosition="left"
          className="object-cover transition-opacity duration-500 opacity-100 md:hidden"
        ></Image>
        ({/* desktop head */}
        <h1 className="max-md:hidden z-10 max-md:mt-[6.250rem] mt-[6.000rem] mb-[4.625rem] max-md:mb-[2.250rem]">
          <span className="text-[#F2EAFF] text-center brutal text-lg font-normal capitalize">
            RADAR{" "}
          </span>
          <span className="text-[#F2EAFF] brutal text-lg font-medium capitalize">
            CONSOLE
          </span>
        </h1>
        {/* mobile head */}
        {displayTextForMobile === "RADAR CONSOLE" ? (
          <h1 className="md:hidden z-10 max-md:mt-[6.250rem] mt-[6.000rem] mb-[4.625rem] max-md:mb-[2.250rem]">
            <span className="text-[#F2EAFF] text-center brutal text-lg font-normal capitalize">
              RADAR{" "}
            </span>
            <span className="text-[#F2EAFF] brutal text-lg font-medium capitalize">
              CONSOLE
            </span>
          </h1>
        ) : (
          <h1 className="md:hidden z-10 max-md:mt-[6.250rem] mt-[6.000rem] mb-[4.625rem] max-md:mb-[2.250rem]">
            <span className="text-[#F2EAFF] brutal text-lg font-medium capitalize">
              {displayTextForMobile}
            </span>
          </h1>
        )}
        ) :{/* consolu image */}
        <div className="w-[52.375em] h-[30.4375em] flex-shrink-0 max-md:mb-[3.750rem] z-10 max-md:hidden transition-opacity duration-500 opacity-100 relative flex justify-center items-center">
          <Image
            ref={consoleImageRef}
            src={getImagePath(darkMode, activeButton)}
            alt="being_connected"
            width={1000}
            priority
            height={1000}
            className="w-[49.375em] h-[29.4375em] select-none"
            // objectFit="cover select-none"
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
        <div className=" w-[22.938rem]  h-[13.750rem] flex-shrink-0   z-10 md:hidden transition-opacity duration-500 opacity-100 relative flex justify-center items-center">
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
                className="absolute top-[14.5%] left-[-3.5%]"
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
                    activeIcon === "icon1" ? "scale-[180%]" : "scale-95"
                  }`}
                />
              </div>
              <div
                onMouseEnter={() => handleIconClick("icon2")}
                className="absolute top-[-3%] left-[19.5%]"
              >
                <Image
                  src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                  alt="being_connected"
                  width={90}
                  priority
                  height={100}
                  objectFit="cover"
                  className={` w-[50px] h-[50px] select-none cursor-pointer ${
                    activeIcon === "icon2" ? "scale-[180%]" : "scale-95"
                  }`}
                />
              </div>
              <div
                onMouseEnter={() => handleIconClick("icon3")}
                className={`absolute top-[18%] left-[35%] `}
              >
                <Image
                  src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                  alt="being_connected"
                  width={90}
                  priority
                  height={100}
                  objectFit="cover"
                  className={`w-[50px] h-[50px] select-none cursor-pointer ${
                    activeIcon === "icon3" ? "scale-[180%]" : "scale-95"
                  }`}
                />
              </div>
              <div
                onMouseEnter={() => handleIconClick("icon4")}
                className="absolute top-[-7.5%] left-[43.5%]"
              >
                <Image
                  src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                  alt="being_connected"
                  width={90}
                  priority
                  height={100}
                  objectFit="cover"
                  className={`w-[50px] h-[50px] select-none cursor-pointer ${
                    activeIcon === "icon4" ? "scale-[180%]" : "scale-95"
                  }`}
                />
              </div>
              <div
                onMouseEnter={() => handleIconClick("icon5")}
                className="absolute top-[-2%] right-[19+%]"
              >
                <Image
                  src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                  alt="being_connected"
                  width={90}
                  priority
                  height={100}
                  objectFit="cover"
                  className={`w-[50px] h-[50px] select-none cursor-pointer ${
                    activeIcon === "icon5" ? "scale-[180%]" : "scale-95"
                  }`}
                />
              </div>

              <div
                onMouseEnter={() => handleIconClick("icon6")}
                className="absolute top-[2%] right-[-2%]"
              >
                <Image
                  src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                  alt="being_connected"
                  width={90}
                  priority
                  height={100}
                  objectFit="cover"
                  className={`w-[50px] h-[50px] select-none cursor-pointer ${
                    activeIcon === "icon6" ? "scale-[180%]" : "scale-95"
                  }`}
                />
              </div>
              <div
                onMouseEnter={() => handleIconClick("icon7")}
                className="absolute top-[16%] right-[-4%]"
              >
                <Image
                  src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                  alt="being_connected"
                  width={90}
                  priority
                  height={100}
                  objectFit="cover"
                  className={`w-[50px] h-[50px] select-none cursor-pointer ${
                    activeIcon === "icon7" ? "scale-[180%]" : "scale-95"
                  }`}
                />
              </div>
              <div
                onMouseEnter={() => handleIconClick("icon8")}
                className="absolute bottom-[8%] left-[1%]"
              >
                <Image
                  src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                  alt="being_connected"
                  width={90}
                  priority
                  height={100}
                  objectFit="cover"
                  className={`w-[50px] h-[50px] select-none cursor-pointer ${
                    activeIcon === "icon8" ? "scale-[180%]" : "scale-95"
                  }`}
                />
              </div>
              <div
                onMouseEnter={() => handleIconClick("icon9")}
                className="absolute bottom-[1.5%] left-[19.5%]"
              >
                <Image
                  src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                  alt="being_connected"
                  width={90}
                  priority
                  height={100}
                  objectFit="cover"
                  className={`w-[50px] h-[50px] select-none cursor-pointer ${
                    activeIcon === "icon9" ? "scale-[180%]" : "scale-95"
                  }`}
                />
              </div>

              <div
                onMouseEnter={() => handleIconClick("icon10")}
                className="absolute bottom-[-2%] left-[42.5%]"
              >
                <Image
                  src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                  alt="being_connected"
                  width={90}
                  priority
                  height={100}
                  objectFit="cover"
                  className={`w-[50px] h-[50px] select-none cursor-pointer ${
                    activeIcon === "icon10" ? "scale-[180%]" : "scale-95"
                  }`}
                />
              </div>

              <div
                onMouseEnter={() => handleIconClick("icon11")}
                className="absolute bottom-[10%] right-[0.5%]"
              >
                <Image
                  src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                  alt="being_connected"
                  width={90}
                  priority
                  height={100}
                  objectFit="cover"
                  className={`w-[50px] h-[50px] select-none cursor-pointer ${
                    activeIcon === "icon11" ? "scale-[180%]" : "scale-95"
                  }`}
                />
              </div>

              <div
                onMouseEnter={() => handleIconClick("icon12")}
                className="absolute bottom-[1%] right-[19.5%]"
              >
                <Image
                  src={`/images/smarttech/radarConsole/redar_hover_icon.svg`}
                  alt="being_connected"
                  width={90}
                  priority
                  height={100}
                  objectFit="cover"
                  className={`w-[50px] h-[50px] select-none cursor-pointer ${
                    activeIcon === "icon12" ? "scale-[180%]" : "scale-95"
                  }`}
                />
              </div>
            </div>
          )}
        </div>
        {/* desktop buttons */}
        <div className=" w-full flex  justify-between items-start z-10 max-md:hidden mt-[6.875rem] max-md:mt-[5.938rem] mb-[5.500rem]">
          <div className="relative flex w-[6.9375em] h-[2.3125em] justify-between items-center">
            <Image
              width={111}
              height={37}
              src={"/images/smarttech/radarConsole/Rectangle_rader.svg"}
              alt={"radar Rectangle_rader"}
              className="absolute inset-0 z-10 select-none"
            />

            <Button
              label="G"
              isActive={activeButton === "G"}
              onClick={() => handleModeClick("G")}
            />

            <Button
              label="C"
              isActive={activeButton === "C"}
              onClick={() => handleModeClick("C")}
            />

            <Button
              label="B"
              isActive={activeButton === "B"}
              onClick={() => handleModeClick("B")}
            />
          </div>

          <div
            className="relative z-10  max-md:mb-[3.750rem]"
            onClick={toggleHoverIcons}
          >
            <Image
              src={"/images/smarttech/icons/comon_bottonbg_console.png"}
              alt="bg.image"
              width={200}
              height={200}
              priority
              objectFit="cover"
              className="cursor-pointer"
            />
            <h1 className="absolute cursor-pointer inset-0 flex select-none items-center justify-center text-white disketMono text-[12px] leading-normal uppercase z-20">
              {displayText}
            </h1>
          </div>
          {/* custom toggle */}
          <ToggleButton isChecked={isChecked} onToggle={handleToggleChange} />
        </div>
        {/* for mobile buttons */}
        <div
          onClick={toggleHoverIcons}
          className="relative z-10 cursor-pointer mb-[5%] mt-[5.938rem] max-md:mb-[3.750rem] md:hidden"
        >
          {" "}
          {/* Added 'relative' here */}
          <Image
            src={"/images/smarttech/icons/comon_bottonbg_console.png"}
            alt="bg.image"
            width={243}
            priority
            height={200}
            objectFit="cover"
            className="cursor-pointer"
          />
          <h1 className="absolute inset-0 cursor-pointer flex items-center justify-center text-white disketMono text-[12px] leading-normal uppercase z-20">
            {displayText}
          </h1>
        </div>
        {/* for mobile only */}
        <div className=" w-full flex  max-w-[15.250rem]  justify-between z-10 md:hidden max-md:mb-[6.250rem] ">
          <div className="relative flex w-[6.9375em] h-[2.3125em] justify-between items-center">
            <Image
              width={111}
              height={37}
              src={"/images/smarttech/radarConsole/Rectangle_rader.svg"}
              alt={"radar Rectangle_rader"}
              className="absolute inset-0 z-10"
            ></Image>

            <Button
              label="G"
              isActive={activeButton === "G"}
              onClick={() => handleModeClick("G")}
            />

            <Button
              label="C"
              isActive={activeButton === "C"}
              onClick={() => handleModeClick("C")}
            />

            <Button
              label="B"
              isActive={activeButton === "B"}
              onClick={() => handleModeClick("B")}
            />
          </div>

          {/* togle button */}

          <ToggleButton isChecked={isChecked} onToggle={handleToggleChange} />
        </div>
      </div>
    </div>
  );
}

const ToggleButton = ({ isChecked, onToggle }) => {
  return (
    <div
      onClick={() => {
        onToggle();
      }}
      className="relative w-[4.925em] h-[2.063em]  border peer-focus:outline-none rounded-full bg-[#010508]"
    >
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 w-[37px] h-[37px] flex items-center justify-center `}
      >
        <Image
          width={15}
          height={15}
          priority
          src="/images/smarttech/icons/moon_black.png"
          alt="toggle-image"
          className="rounded-full select-none object-cover cursor-pointer"
        />
      </div>
      {/* Toggle button background */}
      <div
        className={`absolute top-1/2 left-1/2 transform ${
          isChecked ? "-translate-x-[-5px]" : "translate-x-[-40px]"
        } -translate-y-1/2 w-[37px] h-[37px] bg-[#FFF] rounded-full  flex items-center justify-center`}
      >
        {isChecked ? (
          <Image
            width={15}
            height={15}
            priority
            src="/images/smarttech/icons/sun_black.svg"
            alt="toggle-image"
            className={`rounded-full object-cover select-none cursor-pointer ${
              isChecked ? "" : "hidden"
            }`}
          />
        ) : (
          <Image
            width={15}
            height={15}
            priority
            src="/images/smarttech/icons/moon.svg"
            alt="toggle-image"
            className={`rounded-full select-none object-cover cursor-pointer ${
              isChecked ? "hidden" : ""
            }`}
          />
        )}
      </div>
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/9 -translate-y-1/2 w-[37px] h-[37px] flex items-center justify-center`}
      >
        <Image
          width={15}
          height={15}
          priority
          src="/images/smarttech/icons/sun.svg"
          alt="toggle-image"
          className={`rounded-full object-cover select-none cursor-pointer ${
            !isChecked ? "" : "hidden"
          }`}
        />
      </div>
    </div>
  );
};

const Button = ({ label, isActive, onClick }) => {
  let textColor;
  let borderColor;

  switch (label) {
    case "G":
      textColor = "#14C5A0";
      borderColor = "#14C5A0";
      break;
    case "B":
      textColor = "#ED1C24";
      borderColor = "#ED1C24";
      break;
    case "C":
      textColor = "#1492DE";
      borderColor = "#1492DE";
      break;
    default:
      textColor = "#000000";
      borderColor = "#000000";
  }

  const activeClasses = "border border-[0.073rem]     ";
  const inactiveClasses = `text-${textColor} border-${borderColor}`;

  return (
    <h1
      className={`text-center select-none Saira text-16 w-9 h-9 flex items-center justify-center rounded-[18.5px]  font-medium relative cursor-pointer z-20 ${
        isActive ? activeClasses : inactiveClasses
      }`}
      style={{ color: textColor, borderColor: borderColor }}
      onClick={onClick}
    >
      {label}
    </h1>
  );
};
