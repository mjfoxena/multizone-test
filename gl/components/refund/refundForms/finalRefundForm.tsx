import React, { useState } from "react";
import { refundRawData } from "../../../constants/raw_data";
import { CheckBoxField } from "../../payment/UI/InputField";

const FinalRefundForm = ({
  className = "",
  onCheckboxChange,
  selectedOption,
}) => {
  const handleOptionChange = (value) => {
    onCheckboxChange(value);
    // console.log("value ", value)
  };

  console.log("selectedOption ", selectedOption)
  const checkBoxList = [
    {
      label: "I want to speak to a UV Executive",
      value: "executive",
    },
    {
      label: "Yes, process my refund",
      value: "process_refund",
    },
    {
      label: "No, I wish to retain",
      value: "retain",
    },
  ];

  return (
    <div>
      <div className={`${className} pb-20`}>
        <div className="">
          <div className="mx-8 sm:mx-16" style={{ marginTop: "26px" }}>
            {/* Description */}
            <p className="text-sm brutal">
              {refundRawData.finalRefundFormDescription}
            </p>

            {/* Checkbox field */}
            <div>
              <div className="mt-7">
                <label className="block mb-2 text-sm font-regular brutal text-[#9F9F9F]">
                  Select one *
                </label>
                {checkBoxList.map((item, i) => (
                  <div key={i} className="col-span-1 mt-2">
                    <CheckBoxField
                      id="yes"
                      onBlur={() => {}}
                      label={item.label}
                      value={item.label}
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
    </div>
  );
};

export default FinalRefundForm;