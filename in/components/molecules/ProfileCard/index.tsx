import React from "react";
import Style from "./profilecard.module.scss";
import { MapCss } from "../../../utils/utils";
import Image from "next/image";
import { TextElement } from "../../atoms/Texts/index";
interface profileProps {
  name: string;
  id: string;
  vip: boolean;
  model: string;
  booking: boolean;
}
export const ProfileCard = ({
  name,
  id,
  vip,
  model,
  booking,
}: profileProps) => {
  return (
    <div className="w-full pl-5 sm:pl-10 mr-5 sm:w-[374px] ">
      {/* vip card top */}
      <div
        className={MapCss(
          Style,
          `${vip ? `bg-yellow` : `bg-red`}`,
          "w-full sm:h-44  sm:mt-8"
        )}
      >
        <div className="flex flex-row justify-between">
          <div className="m-5">
            <Image
              src={`/images/profile/${
                vip ? "limited-edision.png" : "limited-edision-red.png"
              }`}
              width={125}
              height={95}
              alt="Niraj Rajmohan"
            />
          </div>
          <div>
            <Image
              src={`/images/profile/${vip ? "vip-yellow.png" : "vip-red.png"}`}
              width={60}
              height={89}
              alt="Niraj Rajmohan"
            />
          </div>
        </div>
      </div>
      {/* vip card bottom */}
      <div className={MapCss(Style, "bg-grey", "w-full  ")}>
        <div className="flex flex-row ml-6">
          <div className={MapCss(Style, "brutal", "w-2/3 ")}>
            <div className="font-normal uppercase mt-4 text-xs sm:text-2xl sm:mt-8">
              {name}
            </div>

            <div
              className={MapCss(Style, " brutal font-1xl", "mt-4  font-normal")}
            >
              ORDER ID
              <div
                className={MapCss(
                  Style,
                  "brutal font-1xl",
                  "uppercase font-medium"
                )}
              >
                {id}
              </div>
            </div>

            <div
              className={MapCss(Style, "brutal font-1xl", "mt-1 font-normal")}
            >
              F77 VARIANT
              <div
                className={MapCss(
                  Style,
                  "brutal font-1xl",
                  "font-medium uppercase"
                )}
              >
                {/* LIMITED EDISION */}
                {booking ? model : "TO-BE CONFIGURED"}
              </div>
            </div>
          </div>
          <div className="w-1/3 mt-4 sm:mt-8">
            <div className="ml-2 sm:ml-4">
              <Image
                src={`/images/profile/${
                  vip ? "arrow-yellow.png" : "arrow-red.png"
                }`}
                width={40}
                height={40}
                alt="arrow"
              />
            </div>
          </div>
        </div>
        {/* vip-card-bottom */}
        <div className="ml-6 mt-4 pb-4 sm:mt-8">
          <Image
            src={"/images/profile/uv-logo.png"}
            width={90}
            height={14}
            alt="arrow"
          />
        </div>
      </div>
    </div>
  );
};
