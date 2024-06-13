import Image from "next/image";
import { LeaderDistanceCardProps } from "../../../../utils/interface/types";
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Style from "../../../../pages/squadron/leaderboard/leaderboard.module.scss";

const DistanceCard = ({
  isTop,
  isMobile,
  slNo,
  name,
  kmCovered,
  index,
  breakpoint,
}: LeaderDistanceCardProps) => {
  const controlBoxCharged = useAnimation();
  const [refBoxCharged, inViewBoxCharged] = useInView();
  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 + index * 0.3 } },
    hidden: { opacity: 0, y: 20 },
  };

  const widthPercentage = `${100 - index * (isMobile ? 2 : 5)}%`;
  const heightPercentage = `${100}px`;

  useEffect(() => {
    if (inViewBoxCharged) {
      controlBoxCharged.start("visible");
    } else {
      controlBoxCharged.start("hidden");
    }
  }, [controlBoxCharged, inViewBoxCharged]);

  return (
    <motion.div
      ref={refBoxCharged}
      variants={boxVariant}
      initial="hidden"
      animate={controlBoxCharged}
      style={{
        width: widthPercentage,
      }}
    >
      {/* For Mobile */}
      {isMobile && !isTop && (
        <div className="text-sm font-normal brutal mt-[-8px] mb-1 text-[#EAEAEA] text-left" >
          {name}
        </div>
      )}
      {/* Desktop */}
      {!isTop && !isMobile && (
        <div className="lg:mb-1 lg:mt-[-18px] md:mb-1 md:mt-[-18px] xl:mb-[-8px] xl:-mt-2 2xl:-mt-4 lg:ml-[104px] xl:ml-[97px] 2xl:ml-[120px] text-xs font-normal text-[#EAEAEA] text-left   ">
          {name}
        </div>
      )}
      <div
        className={`${Style.distanceCard} ${
          isTop ? Style.distanceRed : Style.distanceGrey
        } disketMono`}
      >
        <div
          className={`${Style.cardContent} ${
            isMobile && breakpoint === "xs" ? "h-[60px]" : ""
          } flex flex-row justify-between items-center p-2 sm:p-[10px]  sm:h-full `}
        >
          <div className="flex flex-row gap-16">
            <div className="text-white font-normal text-[20px] sm:text-2xl leading-7">
              0{slNo}
            </div>
          </div>

          <div>
            <span className="text-white font-normal text-xl sm:text-2xl leading-7">
              {kmCovered}
            </span>
            <span className="ml-[2px] text-[#EBEBEB] font-normal text-xs sm:text-sm leading-4">
              KM
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DistanceCard;