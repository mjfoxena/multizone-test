import React from "react";
import Style from "./leftsidebar.module.scss";
import ThanksPanel from "../RightSidePanel/thanksPanel";

const ThanksBar = ({ children }) => {
  return (
    <div className={Style.root}>
      <div className={Style.subroot}>{children}</div>
      <div className="w-full sm:w-1/2 sm:h-full">
        <ThanksPanel />
      </div>
    </div>
  );
};

export default ThanksBar;
