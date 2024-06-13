import Image from "next/image";
import { LeaderRangeCardProps } from "../../../../utils/interface/types";
import { useEffect, useRef } from "react";
import CountUpComp from "../../../molecules/Home/countUp";

const RangeCard = ({
  isTop,
  isMobile,
  slNo,
  name,
  rangeCovered,
  index,
}: LeaderRangeCardProps) => {
  const capWidthSize = isMobile ? 80 : isTop ? 108 : 50;

  const nameref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nameref.current && name) {
      nameref.current.innerHTML = name.replace(/ /g, " ");
    }
  }, [name]);

  const renderTopperChild = () => (
    <div className="">
      <div className="flex flex-row items-center -mt-4">
        <div className="w-[62.11px] sm:w-[98.84px]">
          <Image
            alt="leaderboard_folder"
            width={capWidthSize}
            height={40}
            src={"/images/leaderboard/range-arrow-left.png"}
            style={{
              width: capWidthSize,
            }}
            className="ml-4 sm:ml-0"
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-center">
          <div className="disketMono text-center border-2	border-neutral-700 rounded-[100%] w-[149.336px] h-[149.336px] sm:w-full sm:h-full">
            <div className="disketMono text-[46.5px] sm:text-[75px] text-[#ED3248] m-4 mt-9 sm:m-8 sm:py-5">
              {/* {rangeCovered} */}
              <CountUpComp
                countStart={100}
                countEnd={rangeCovered}
                decimal={0}
              />
              <div className="sm:text-[24px] text-[12.917px] text-white opacity-60 sm:-mt-8 -mt-5">KM</div>
            </div>
          </div>
        </div>

        <div className="w-[62.11px] sm:w-[98.84px]">
          <Image
            alt="leaderboard_folder"
            width={capWidthSize}
            height={40}
            src={"/images/leaderboard/range-arrow-right.png"}
            style={{
              width: capWidthSize,
            }}
            className="-ml-4 sm:ml-0"
          />
        </div>
      </div>

      {/* Name */}
      <div className="text-center brutal text-[17px] sm:text-[20px] text-white font-medium leading-9 -mt-3">
        {name}
      </div>
    </div>
  );

  const renderChild = () => (
    <div className="text-center -mt-3">
      {/* Content */}
      <div className="relative flex items-center">
        <div className="shrink w-2 h-1 -mt-8">
          <Image
            alt="leaderboard_folder"
            width={50}
            height={50}
            src={"/images/leaderboard/cap-left.svg"}
            className="cursor-pointer opacity-30"
          />
        </div>

        <div className="flex flex-col text-center font-normal pt-2">
          <div className="text-[28px] sm:text-[34px] leading-10 font-normal text-[#EAEAEA] disketMono">
            <CountUpComp countStart={100} countEnd={rangeCovered} decimal={0} />
          </div>
          <div className="text-white opacity-50 text-xs">KM</div>
        </div>

        <div className="shrink w-2 h-1 -mt-8">
          <Image
            alt="leaderboard_folder"
            width={50}
            height={50}
            src={"/images/leaderboard/cap-right.svg"}
            className="cursor-pointer opacity-30"
          />
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        <div
          ref={nameref}
          className="truncate max-w-[80px] pt-4 font-normal text-[#EAEAEA] brutal text-[10px] sm:text-xs uppercase"
        ></div>
      </div>
    </div>
  );

  return isTop ? renderTopperChild() : renderChild();
};

export default RangeCard;