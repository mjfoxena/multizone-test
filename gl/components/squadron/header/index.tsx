import React from "react";
import Style from "../../../pages/squadron/squadron.module.scss";
import Image from "next/image";

const SquadronHeader = (isMobile) => {
  return (
    <>
      <div className={Style.squadron_child}>
        <div className="flex flex-col justify-between -ml-10 sm:ml-0">
          <p className="text-[8px] sm:text-[10px] mt-20 font-normal text-[#e2e2e2] eurostile">
            ULTRAVIOLETTE
          </p>
          <p className="text-[22px] sm:text-[48px] -mt-2 sm:-mt-5 -ml-1 font-normal text-[#ffffff] eurostile">
            SQUADRON
          </p>
          <div className="ml-[155px] sm:ml-[345px] -mt-7">
            <Image
              alt="menu"
              width={isMobile ? 26 : 50}
              height={10}
              src={"/images/leaderboard/group-red-dot.svg"}
              className="cursor-pointer -mt-4 sm:-mt-9  mb-3 sm:mb-5"
            />
          </div>
          <div className="col-span-1">
            <Image
              width={110}
              height={50}
              src={"/images/payments/group.png"}
              alt="Group"
              style={{ float: "right" }}
              className="-mt-6 opacity-20 op"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SquadronHeader;