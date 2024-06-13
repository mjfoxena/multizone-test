import Image from "next/image";
import Style from "../../../../pages/squadron/leaderboard/leaderboard.module.scss";
import { API_CONSTANTS } from "../../../../services/constants";
import LeaderBoardCssCard from "../../../../containers/leaderboard/cssContainers";
import React from "react";

const imageBase = API_CONSTANTS.BASE_URL_S3 + "/homepage/images/squadron";
const TestimonialCard = ({
  isMobile,
  index,
  rider,
  image,
  comment,
  location,
  link,
}) => {
  const thumbImageSize = isMobile ? "10px" : "12px";

  const renderThumbImage = (image) => (
    <div className="flex flex-row items-center justify-center px-8 py-5 gap-[2px]">
      <Image
        alt="Ultraviolette EV Review"
        width={7}
        height={7}
        src={image}
        style={{
          height: thumbImageSize,
          width: thumbImageSize,
        }}
      />
      <Image
        alt="Ultraviolette EV Review"
        width={7}
        height={7}
        src={image}
        style={{
          height: thumbImageSize,
          width: thumbImageSize,
        }}
      />
    </div>
  );
  const folderHeight = "590px";
  return (
    <div>
      <LeaderBoardCssCard classNames={Style.testimonials}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="h-full flex flex-col justify-between cursor-pointer">
            <div>
              {/* Avatar Image className={`h-[${folderHeight}]`} */}
              <div className="relative flex justify-center">
                {/* <div className={Style.cardBar}></div> */}
                <Image
                  alt="Ultraviolette EV Review"
                  width={370}
                  height={210}
                  src={`${imageBase}${image}`}
                  className={`object-cover h-[210px] w-[470px]${Style.pilotImage}`}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Content */}
              <div>
                {renderThumbImage("/images/leaderboard/thumb-up.svg")}

                <p className="text-white text-sm font-normal nunito  text-center px-12 overflow-hidden max-h-32 text-overflow-ellipsis leading-[1.5em]">
                  {comment}
                </p>
                {renderThumbImage("/images/leaderboard/thumb-down.svg")}
              </div>
            </div>
            <div className=" pb-10">
              <div className="pt-4 flex flex-col justify-center text-center uppercase text-white ">
                <div className="text-xl disketMono  font-normal ">{rider}</div>
                <div className="text-[10px] brutal opacity-40 "> {location} </div>
              </div>
            </div>
          </div>
        </a>
      </LeaderBoardCssCard>
    </div>
  );
};

export default TestimonialCard;