import React, { useState } from "react";
import { useRouter } from "next/router";
import { refundRawData } from "../../../constants/raw_data";
import { CheckBoxField } from "../../payment/UI/InputField";
import Modal from "../../molecules/Modal";

const RetainForm = ({ className = "", onCheckboxChange, selectedOption }) => {
  const router = useRouter();

  const handleOptionChange = (value) => {
    onCheckboxChange(value);
  };

  const checkBoxList = [
    {
      label: "I understand I will lose priority of my booking, but I still want to cancel",
      value: "still_cancel",
    },
    {
      label: "I'd like to retain my booking",
      value: "retain_booking",
    },
  ];

  const onModalClosed = () => {
    router.push("/refund");
  };

  return (
    <div>
      <div className={`${className} pb-20`}>
        <div className=" ">
          <div className="mx-8 sm:mx-16" style={{ marginTop: "26px" }}>
            {/* Description */}
            <p className=" text-sm brutal">{refundRawData.retainDescription}</p>

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

export default RetainForm;