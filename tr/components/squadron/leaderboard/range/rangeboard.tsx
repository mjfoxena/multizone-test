import Image from "next/image";
import { leaderboardRawData } from "../../../../constants/raw_data";
import Style from "../../../../pages/squadron/leaderboard/leaderboard.module.scss";
import RangeCard from "./rangecard";
import CommonDivider from "../../../molecules/commondivider";
import LeaderBoardCssCard from "../../../../containers/leaderboard/cssContainers";
import React, { useEffect, useState } from "react";

import { getLeaderboardData } from "../../../../services/ProfileService";

const RangeBoard = ({ isMobile }) => {
  const { rangeCovered } = leaderboardRawData;
  const topperPiolot = rangeCovered.pilots[0];
  const filterPilots = rangeCovered.pilots.slice(1); // Remove Topper

  const [leaderRangePer, setLeaderRangePer] = useState();
  const fetchData = async () => {
    try {
      const response = await getLeaderboardData();
      setLeaderRangePer(response.range_per_charge_leaders);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  let rangeCoveredName = [];
  let rangeCoveredData = [];
  if (leaderRangePer) {
    // @ts-ignore
    rangeCoveredName = leaderRangePer.map((item) => item.name ? item.name : "PILOT " + item.id);
    // @ts-ignore
    rangeCoveredData = leaderRangePer.map((item) =>
      item.range_per_charge
    );
  }

  // monthName and Year

  const currentDate = new Date();
  const monthNumber = currentDate.getMonth();
  const MonthName = currentDate.toLocaleString('en-US', { month: 'long' });
  let yearNumber = currentDate.getFullYear();

  if (MonthName === "January") {
    yearNumber = yearNumber - 1
  }

  const monthCorrector = monthNumber - 1;
  currentDate.setDate(1)
  currentDate.setMonth(monthCorrector);
  const preMonthName = currentDate.toLocaleString('en-US', { month: 'long', });


  const renderChild = () => (
    <div>
      {/* Title */}
      <div className="pb-5 -mt-5 sm:mt-0">
        <div className="text-sm sm:text-2xl font-medium text-white brutal">
          {rangeCovered.title}
        </div>
        <div className="opacity-50 font-medium text-[10px] sm:text-sm text-[#818181]">
          {preMonthName.toUpperCase()} {yearNumber}
        </div>
      </div>

      {/* Content */}
      <div className="">
        {/* Topper Name */}
        <div className="flex flex-col items-center">
          <RangeCard
            index={0}
            isMobile={isMobile}
            isTop={true}
            name={rangeCoveredName[0]}
            rangeCovered={rangeCoveredData[0]}
            slNo={topperPiolot.sl_no}
          />
          <div className="opacity-20 w-10 text-center -mt-6">
            <CommonDivider />
          </div>
        </div>

        {/* Render Pilots */}
        <div className="ml-[-18px] sm:mr-0 mr-[-18px] pl-10 flex flex-row justify-center overflow-x-auto">
          {filterPilots.map((pilot, index) => (
            <div key={index} className="mb-6 pl-8 sm:px-6 sm:pr-9">
              <RangeCard
                index={index}
                isMobile={isMobile}
                isTop={false}
                rangeCovered={rangeCoveredData[index + 1]}
                name={rangeCoveredName[index + 1]}
                slNo={pilot.sl_no}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return isMobile ? (
    renderChild()
  ) : (
    // css
    <LeaderBoardCssCard classNames={Style.distance_board}>
      <div className="py-8 px-9">{renderChild()}</div>
    </LeaderBoardCssCard>
  );
};

export default RangeBoard;
