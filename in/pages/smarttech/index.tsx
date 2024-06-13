import React from "react";
import { GetServerSidePropsContext } from "next";
import UvSmartTech from "../../components/molecules/SmartTech/uvsmarttech";
import IntroducingViolette from "../../components/molecules/SmartTech/introducingviolette";
import PerformanceOnDemand from "../../components/molecules/SmartTech/performanceondemand";
import RegenRativeBraking from "../../components/molecules/SmartTech/regensection";
import DynamicStabilityControl from "../../components/molecules/SmartTech/dynamicsomethingcontrol";
import VioletteIsDesigned from "../../components/molecules/SmartTech/violetteisdesignedtoalsways";
import LockDownMode from "../../components/molecules/SmartTech/blank";
import BeingConnected from "../../components/molecules/SmartTech/beingconnected";
import RadarConsole from "../../components/molecules/SmartTech/radarconsole";
import TakeToFly from "../../components/molecules/SmartTech/taketofly";
import CommonFooter from "../../components/molecules/CommonFooter";
import ParkAssist from "../../components/molecules/SmartTech/parkassist";
import ConsoleTheme from "../../components/molecules/SmartTech/consolutheme";
import SmartTechSlider from "../../components/molecules/SmartTech/abs";
import VioletteEnabledTech from "../../components/molecules/SmartTech/violetteenabledtech";

const SmartTech = () => {
  return (
    <div>
      <div className="bg-[#000]">
        {/*UV SMART TECH  */}
        <UvSmartTech />

        {/* introducing violette */}
        <IntroducingViolette />

        <VioletteEnabledTech />

        {/* performance on demand */}
        <PerformanceOnDemand />

        {/* regen section */}
        <RegenRativeBraking />

        {/* dynamc something control */}
        <DynamicStabilityControl />

        {/* abs  */}
        <SmartTechSlider />

        {/* blank  */}
        <LockDownMode />

        {/* being connected always */}
        <BeingConnected />

        {/* console theme  */}
        <ConsoleTheme />

        {/* radar console */}
        <RadarConsole />

        {/* park assist */}
        <ParkAssist />

        {/* Take to fly */}
        <TakeToFly />
      </div>

      <CommonFooter />
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const country = context?.query?.country;

  return {
      props: {
          country: country
      },
  };
}

export default SmartTech;
