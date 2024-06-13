import React from "react";
import Style from "../../../pages/squadron/squadron.module.scss";
import Link from "next/link";
import { originURL } from "../../../services/constants";

const SquadronLeaderBoard = (isMobile) => {
  return (
    <>
      <div className={Style.squadron_leaderboar}>
        <div className="flex flex-col justify-between">
          <p className="brutal text-[16px] sm:text-[28px] font-normal text-[#807F7F] Brutal">
            UV SQUADRON
          </p>
          <p className="text-[24px] sm:text-[48px] sm:-mt-1 -ml-1 font-normal text-[#ffffff] eurostile">
            LEADERBOARD
          </p>
          <p className="text-[#E2E1E1] text-[14px] sm:text-[16px] mt-4 sm:mr-32 mr-4">
            Highlighting the competitive triumphs and milestones of our Squadron
            pilots, from record-breaking distances to achieving high altitudes,
            witness the spirit of performance electric motorcycling.
          </p>
        </div>
        <div className="pt-2 sm:pt-6 ml-0 mt-8">
          <Link href={`${originURL}/squadron/leaderboard`}>
            <div className={Style.button_section}>
              <button id="go_to_leaderboard" className="bg-[#ECECEC] black text-center text-[9.8px] sm:text-[16px] w-[186.247px] h-[34.302px] sm:w-[304px] sm:h-[56px] brutal hover:bg-[#FF1744] hover:text-white">
                GO TO LEADERBOARD
              </button>
            </div>
          </Link>
        </div>
        {/* <div className="pt-56 relative">
          <Image
            width={110}
            height={50}
            src={"/images/payments/group.png"}
            alt="Group"
            style={{ float: "right" }}
            className="-mt-8 opacity-20 absolute left-0"
          />
        </div> */}
      </div>
    </>
  );
};

export default SquadronLeaderBoard;