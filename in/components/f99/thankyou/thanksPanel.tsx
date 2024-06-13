import Image from "next/image";
import React from "react";
import Style from "../../molecules/RightSidePanel/rightsidepanel.module.scss";

const imageLink =
  "https://s3.ap-south-1.amazonaws.com/www.ultraviolette.com/f99/interest.jpg";

const ThanksEnquiryPanel = () => {
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

export default ThanksEnquiryPanel;
