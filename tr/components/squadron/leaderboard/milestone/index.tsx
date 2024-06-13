import Image from "next/image";
import { leaderboardRawData } from "../../../../constants/raw_data";
import Style from "../../../../pages/squadron/leaderboard/leaderboard.module.scss";
import { useEffect, useRef, useState } from "react";
import CommonDivider from "../../../molecules/commondivider";
import LeaderBoardCssCard from "../../../../containers/leaderboard/cssContainers";

const MileStoneBoard = ({ isMobile, folderImage, breakpoint }) => {
  const { pilotMilestone } = leaderboardRawData;
  const nameref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nameref.current) {
      nameref.current.innerHTML = pilotMilestone.name.replace(/ /g, "<br>");
    }
  }, [pilotMilestone]);

  const pilotStats = (title, value, spanText = "") => (
    <div className="flex flex-col disketMono text-white mb-8">
      <div className="font-normal text-[9px] lg:text-xs  opacity-50 uppercase">
        {title}
      </div>
      <div>
        <div className="pt-3 text-xl lg:text-[36px]  lg:leading-10 font-normal inline">
          {value}
        </div>
        {spanText.length !== 0 && (
          <div className="pt-3 text-xl font-normal inline">{spanText}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="mt-6 lg:mt-12 2xl:mt-10 ">
      <div className="text-sm sm:text-2xl font-medium text-white brutal pl-7 -mb-8">
        Pilot Achievements
      </div>
      <LeaderBoardCssCard
        classNames={Style.pilot_milestones}
      >
        <div className={Style.milestone}>
          <div className="p-6 sm:pb-2 pr-9 lg:p-0 flex flex-col md:flex-row lg:flex-row items-center xl:h-[75%] 2xl:h-[80%] xl:ml-14 2xl:ml-[68px] gap-8 lg:gap-16 2xl:gap-30 ">
            <div className="flex flex-row w-auto sm:ml-[-26px] mt-8 sm:mt-0 sm:mb-0 mb-[-70px]">
              <Image
                alt="Ultraviolette EV Review"
                width={550}
                height={450}
                src={pilotMilestone.image}
                className={Style.pilotImage}
                // className="mt-[10%]"
              />
            </div>
            <div className="w-[100%] lg:w-[55%] 2xl:h-[490px] mt-12 sm:mt-14">
              {/* asia and india book image */}
              <div className="flex absolute top-0 right-0 sm:mr-[7%] mr-[10%]">
                <div className="mr-4">
                  <Image
                    alt="Ultraviolette Automotive"
                    width={isMobile ? 36 : 60}
                    height={isMobile ? 40 : 60}
                    src={"/images/leaderboard/Asia.svg"}
                  />
                </div>
                <div>
                  <Image
                    alt="Ultraviolette Automotive"
                    width={isMobile ? 36 : 60}
                    height={isMobile ? 40 : 60}
                    src={"/images/leaderboard/India.svg"}
                  />
                </div>
              </div>

              {/* Pilot Name */}
              <div className="flex flex-row items-center gap-3 lg:gap-10 lg:-mt-10 xl:mt-0">
                <Image
                  alt="Ultraviolette Automotive"
                  width={isMobile ? 50 : 65}
                  height={64}
                  src={"/images/leaderboard/uv-triangle-red.svg"}
                  className=""
                />

                <div
                  ref={nameref}
                  className="text-white text-xl lg:text-[36px] lg:leading-10 font-normal disketMono"
                ></div>
              </div>
              <div className="lg:w-[70%] opacity-10 -mt-3 sm:mt-0">
                <CommonDivider />
              </div>
              {/* Pilot Stats */}
              <div className="flex flex-row gap-4 lg:gap-[96px] 2xl:gap-40 sm:-mb-12 -mb-10 -mt-2">
                <div className="sm:pb-2">
                  {pilotStats("KMS TRAVELLED", pilotMilestone.km_tarvelled)}
                  {/* {pilotStats("STATES DRIVEN IN", pilotMilestone.states_driven)} */}
                  {pilotStats("TOTAL ENERGY RECOVERED", pilotMilestone.total_energy_recovered)}
                  {pilotStats("MAX TEMPRATURE", pilotMilestone.max_temprature)}
                  {/* {pilotStats("TOTAL ENERGY CONSUMED", pilotMilestone.total_energy_consumed)} */}
                </div>
                <div className="sm:pb-2">
                  {pilotStats("BIKE", pilotMilestone.variant)}
                  {pilotStats("CHARGE CYCLES", pilotMilestone.charge_cycles)}
                  {pilotStats("MIN TEMPRATURE", pilotMilestone.min_temprature)}
                </div>
              </div>

              <div className="lg:w-[70%] opacity-10 xl:pt-2 lg:-mt-2 lg:pb-6 xl:pb-0 xl:mt-0">
                <CommonDivider />
              </div>

              {/* Member */}
              <div className="flex flex-row bottom-0 2xl:mt-8 lg:-mt-6 xl:mt-2">
                <Image
                  alt="menu"
                  width={22}
                  height={22}
                  src={"/images/leaderboard/arrow-corner-up.svg"}
                  className=""
                />
                <span className="ml-5 font-normal text-xs disketMono uppercase opacity-50 text-white -mt-3 sm:mt-0">
                  BAALA IS A PART OF UV SQUADRON SINCE 2023.
                </span>
              </div>
            </div>
          </div>
        </div>
      </LeaderBoardCssCard>
    </div>
  );
};

export default MileStoneBoard;
