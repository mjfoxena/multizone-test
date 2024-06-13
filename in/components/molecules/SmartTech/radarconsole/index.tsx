import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DesktopConsole from "./desktopconsole";
import MobileAndTabletConsole from "./mobileandtabletconsole";
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
        {/* Desktop Heading */}
        <h1 className="hidden md:hidden xl:block z-10 mt-[6.000rem] mb-[2.250rem]">
          <span className="text-[#F2EAFF] text-center brutal text-lg font-normal capitalize">
            RADAR{" "}
          </span>
          <span className="text-[#F2EAFF] brutal text-lg font-medium capitalize">
            CONSOLE
          </span>
        </h1>
        {/* Mobile and Tablet Heading */}
        {displayTextForMobile === "RADAR CONSOLE" ? (
          <h1 className="md:block xl:hidden z-10 mt-[6.000rem] mb-[2.250rem]">
            <span className="text-[#F2EAFF] text-center brutal text-lg font-normal capitalize">
              RADAR{" "}
            </span>
            <span className="text-[#F2EAFF] brutal text-lg font-medium capitalize">
              CONSOLE
            </span>
          </h1>
        ) : (
          <h1 className="md:block xl:hidden z-10 mt-[6.000rem] mb-[2.250rem]">
            <span className="text-[#F2EAFF] brutal text-lg font-medium capitalize">
              {displayTextForMobile}
            </span>
          </h1>
        )}
        :{/* Console for Desktop */}
        <div className="hidden md:hidden xl:block">
          <DesktopConsole
            activeButton={activeButton}
            consoleImageRef={consoleImageRef}
            darkMode={darkMode}
            handleHoverForDesktop={handleHoverForDesktop}
            hoveredIcon={hoveredIcon}
            showHoverIcons={showHoverIcons}
          />
        </div>
        {/* Console for Mobile */}
        <div className="md:block xl:hidden">
          <MobileAndTabletConsole
            activeButton={activeButton}
            activeIcon={activeIcon}
            containerRef={containerRef}
            darkMode={darkMode}
            handleIconClick={handleIconClick}
            showHoverIcons={showHoverIcons}
          />
        </div>
        {/* desktop buttons */}
        <div className=" w-full flex  justify-between items-start z-10 max-md:hidden mt-[6.875rem] max-md:mt-[5.938rem] mb-[5.500rem] md:p-10 xl:p-0">
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
              priority
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
