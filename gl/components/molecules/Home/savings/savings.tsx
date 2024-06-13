import React, { useState }  from 'react'
import Style from "./savings.module.scss";
import PotentitalSavings from './PotentialSavings';



export const sidebarSteps = {
  rolloutCal: "rolloutCal",
  sidebarStep1: "sidebarStep1",
  compareVariants: "compareVariants",
  potentialSavings: "potentialSavings",
  summary: "summary",
  limited: "limited",
};

const Savings = ({ step, country }) => {
  const [finalModal, setFinalModal] = useState()
  const [sidebarTab, setSidebarTab] = useState(
    finalModal === "limited" && step !== "summary"
      ? "limited"
      : step
      ? step
      : sidebarSteps.sidebarStep1
  );
  return (
    <div className={Style.savingsP}>
      <PotentitalSavings
            finalModal={finalModal}
            setSidebarTab={setSidebarTab}
            country={country}
          />
    </div>
  )
}



export default Savings
