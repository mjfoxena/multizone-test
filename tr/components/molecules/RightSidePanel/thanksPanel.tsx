import Image from "next/image";
import React from "react";
import { MapCss } from "../../../utils/utils";
import Style from "./rightsidepanel.module.scss";

const imageLink =
  "https://s3.ap-south-1.amazonaws.com/www.ultraviolette.com/config/configurator_combination/Airstrike/Original/Airstrike_1.jpg";

const ThanksPanel = () => {
  return (
    <>
      <div className="sm:h-full w-full bg-[#E2E2E2]">
          <Image
            alt="side-bar"
            fill
            className={Style.image1}
            src={imageLink}
          />
        <Image
        
          alt="side-bar"
          fill
          className={Style.image}
          src={imageLink}
        />
      </div>
    </>
  );
};

export default ThanksPanel;
