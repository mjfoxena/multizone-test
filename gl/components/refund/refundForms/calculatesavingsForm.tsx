import React, { useState } from "react";
import { refundRawData } from "../../../constants/raw_data";
import { CheckBoxField } from "../../payment/UI/InputField";
import PotentitalSavings from "../../../containers/variants/sections/PotentialSavings";
import SidePanel from "../../molecules/SidePanel";
import styled from "styled-components";

const CustomWidthDiv = styled.div`
  .ClosableGridPanel_gridPanel__3LVJ5 {
    width: 50vw !important;
  }
  @media screen and (max-width: 768px) {
    .ClosableGridPanel_gridPanel__3LVJ5 {
      width: 100vw !important;
    }
  }
`;

const CalculatesavingsForm = ({ className = "", onCheckboxChange, selectedOption }) => {
  const [showModal, setShowModal] = useState(false);
  const [sidebarTab, setSidebarTab] = useState(false);

  const checkBoxList = [
    {
      label: "Yes",
      value: "Yes",
    },
    {
      label: "No, I want to cancel",
      value: "No, I want to cancel",
    },
  ];

  const handleOptionChange = (value) => {
    onCheckboxChange(value);

    if (value === "Yes") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  // const modelHandle  = () => {
  //   setShowModal(false)
  // }

  return (
    <div>
      <div className={`${className} pb-20`}>
        <div className=" ">
          <div className="mx-8 sm:mx-16" style={{ marginTop: "26px" }}>
            {/* Description */}
            <p className=" text-sm brutal">
              {refundRawData.calculatesavingsFormDescription}
            </p>

            {/* checkbox filed */}
            <div>
              <div className=" mt-7">
                <label className="block mb-2 text-sm font-regular brutal text-[#9F9F9F]">
                  Select one *
                </label>
                {checkBoxList.map((item, i) => (
                  <div key={i} className="col-span-1 mt-2">
                    <CheckBoxField
                      id="yes"
                      onBlur={() => {}}
                      label={item.label}
                      value={item.value}
                      selectedValue={selectedOption}
                      onChanged={handleOptionChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div>
          <CustomWidthDiv>
            <SidePanel isLimited={false}>
              <PotentitalSavings
                finalModal={true}
                setSidebarTab={setShowModal}
                isConfigurator={false}
                country={"IN"}
              />
            </SidePanel>
          </CustomWidthDiv>
        </div>
      )}
    </div>
  );
};

export default CalculatesavingsForm;