import Style from "./index.module.scss";
import { homeSlideData, homeSlideData2 } from "../../../constants/raw_data";
import Battery from "./battery";
import Jet from "./jet";
import Landing from "./landing";
import Performance from "./perfomance";
import Personality from "./personality";
import SmartTech from "./smartTech";
import { useContext, useState } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import Charger from "./charger";
import ChargingSpace from "./chargingSpace";
import Details from "./details";
import FlightMode from "./flightMode";
import SavingsPage from "./savings";
import SliderPage from "./slider/slider";
import Warranty8 from "./warranty/warranty";
import {
  PerformanceRawData,
  PerformanceRawDataSection2,
} from "../../../constants/home_data";
import FloatingButton from "./landing/floatingButton";
import VideoSlider from "./slider/videoSlider";
import Gallery from "./gallery/gallery";

const HomeCover = ({ overlay, setOverlay, country }) => {
  const { isMobile } = useContext(NavbarContext);
  const [hidePosition, setHidePosition] = useState(20000);
  const [activePosition, setActivePosition] = useState(20000);

  return (
    <>
      <div className={Style.body}>
        <div
          className={`${Style.floatingButton}  w-fit h-fit hidden  sm:flex fixed bottom-24 right-6 z-50  `}
        >
          <FloatingButton
            hidePosition={hidePosition}
            setHidePosition={setHidePosition}
            activePosition={activePosition}
            setActivePosition={setActivePosition}
          />
        </div>
        <Landing />
        <Performance
          PerformanceRawData={PerformanceRawData}
          title="SUPER SONIC PERFORMANCE"
          isMobile={isMobile}
        />
        {/* <Smart/> */}
        <SmartTech />

        <Jet isMobile={isMobile} />

        <Personality isMobile={isMobile} />

        <Battery />

        <SliderPage
          slideData={homeSlideData}
          title="ADVANCED 5 LEVELS OF SAFETY"
        />

        <Charger />

        <SliderPage slideData={homeSlideData2} title="take the charge" />

        {/* <ChargingSpace /> */}

        <Performance
          PerformanceRawData={PerformanceRawDataSection2}
          title="SMART RIDE"
          isMobile={isMobile}
        />
        <Details />
        <Gallery />

        <Warranty8 />
        <SavingsPage open={"open"} country={country} />
        <VideoSlider />
        <FlightMode
          hidePosition={hidePosition}
          setHidePosition={setHidePosition}
          activePosition={activePosition}
          setActivePosition={setActivePosition}
        />
      </div>
    </>
  );
};

export default HomeCover;
