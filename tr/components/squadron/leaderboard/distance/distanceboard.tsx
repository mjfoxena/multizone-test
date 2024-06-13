import Image from "next/image";
import { leaderboardRawData } from "../../../../constants/raw_data";
import DistanceCard from "./distancecard";
import Style from "../../../../pages/squadron/leaderboard/leaderboard.module.scss";
import { useEffect, useRef, useState } from "react";
import LeaderBoardCssCard from "../../../../containers/leaderboard/cssContainers";
import { getLeaderboardData } from "../../../../services/ProfileService";

const DistanceBoard = ({ isMobile, folderImage, breakpoint }) => {
  const { distanceCovered } = leaderboardRawData;
  const nameref = useRef<HTMLDivElement>(null);

  const [leaderodoLeaders, setLeaderodoLeaders] = useState();
  const fetchData = async () => {
    try {
      const response = await getLeaderboardData();
      setLeaderodoLeaders(response.odo_leaders);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  let distanceCoveredName = [];
  let distanceCoveredData = [];
  if (leaderodoLeaders) {
    // @ts-ignore
    distanceCoveredName = leaderodoLeaders.map((item) => item.name ? item.name : "PILOT " + item.id);
    // @ts-ignore
    distanceCoveredData = leaderodoLeaders.map((item) =>
      item.odo
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

  const rennderChild = () => (
    <>
      <div className={`${Style.distanceBoard} pb-5`}>
        <div
          className={`${Style.distanceBoardTitle} text-sm sm:text-2xl font-medium text-white brutal`}
        >
          {distanceCovered.title}
        </div>
        <div className="opacity-50 font-medium text-[10px] sm:text-sm text-[#818181]">
          {preMonthName.toUpperCase()} {yearNumber}
        </div>
      </div>
      {/* Content */}
      <div className="">
        {/* Topper Name */}
        <div className="flex flex-row items-center gap-7">
          <Image
            alt="leaderboard_folder"
            width={isMobile ? 52 : breakpoint === "2xl" ? 90 : 70}
            height={64}
            src={"/images/leaderboard/uv-triangle-red.svg"}
            className=""
          />

          <div
            ref={nameref}
            className={`${isMobile ? "brutal" : "disketMono"
              }   text-[#EAEAEA] text-xl leading-5 font-normal `}
          >{distanceCoveredName[0]}</div>
        </div>
        {/* Render Pilots */}
        <div className="pt-2">
          {distanceCovered.pilots.map((pilot, index) => (
            <div key={index} className="mb-7 uppercase">
              <DistanceCard
                index={index}
                isMobile={isMobile}
                isTop={index == 0}
                kmCovered={distanceCoveredData[index]}
                name={distanceCoveredName[index]}
                slNo={pilot.sl_no}
                breakpoint={breakpoint}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div>
      <LeaderBoardCssCard classNames={Style.distance_board}>
        <div className="py-3 pt-6 pb-4 px-5 sm:px-9">{rennderChild()}</div>
      </LeaderBoardCssCard>
    </div>
  );
};

export default DistanceBoard;
