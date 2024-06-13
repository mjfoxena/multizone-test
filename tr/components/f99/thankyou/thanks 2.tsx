import React from "react";
import Style from "../../molecules/LeftSideBar/leftsidebar.module.scss";
import ThanksEnquiryPanel from "./thanksPanel";

const ThanksBarEnquiry = ({ children }) => {
  return (
    <div className={Style.root}>
      <div className={Style.subroot}>{children}</div>
      <div className="w-full sm:w-1/2 sm:h-full">
        <ThanksEnquiryPanel />
      </div>
    </div>
  );
};

export default ThanksBarEnquiry;
