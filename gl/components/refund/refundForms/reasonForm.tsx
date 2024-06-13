import React, { useState } from "react";
import { refundRawData } from "../../../constants/raw_data";
import { CheckBoxField } from "../../payment/UI/InputField";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const ResonForm = ({ className = "", onCheckboxChange, selectedOption }) => {
  const [showOthersInput, setShowOthersInput] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  const handleOptionChange = (value) => {
    // Checking value if that is already in the selectedOption array
    const isOptionSelected = selectedOption.some(
      (option) => option.value === value.value
    );

    // new array based on the current selectedOption state
    const updatedOptions = isOptionSelected
      ? selectedOption.filter((option) => option.value !== value.value)
      : (() => {
        if (!isOptionSelected) {
          if (value.value === "others") {
            setShowOthersInput(true);
          } else {
            setShowOthersInput(false);
          }
        }
        return [...selectedOption, value];
      })();

    const valuesArray = updatedOptions.map((option) => option.value);
    if (!valuesArray.includes('others')) {
      setShowOthersInput(false);
    }
    
    onCheckboxChange(updatedOptions);
  };

  const checkBoxList = [
    {
      label: "Price",
      value: "price",
    },
    {
      label: "Finance Options",
      value: "finance_options",
    },
    {
      label: "Delivery Timeline",
      value: "delivery_timeline",
    },
    {
      label: "Personal Reasons",
      value: "personal_reasons",
    },
    {
      label: "Prefer other motorcycle",
      value: "prefer_other_motorcycle",
    },
    {
      label: "Poor Customer Experience",
      value: "poor_customer_experience",
    },
    {
      label: "Product related issues",
      value: "product_related_issues",
    },
    {
      label: "Others..",
      value: "others",
    },
  ];


  // others option part
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };


  const onOtherCheckbox = () => {
    // changing the value with text area value
    const updatedOptions = selectedOption.map((item) =>
      item.value === "others" ? { ...item, value: textareaValue } : item
    );
    onCheckboxChange(updatedOptions);    // updated updatedOptions value
    setShowOthersInput(false)
  }

  return (
    <div>
      <div className={`${className} pb-20`}>
        <div className=" ">
          <div className="mx-8 sm:mx-16" style={{ marginTop: "26px" }}>
            {/* Description */}
            <p className=" text-sm brutal">{refundRawData.reasonDescription}</p>

            {/* checkbox filed */}
            <div>
              <div className=" mt-7">
                <label className="block mb-2 text-sm font-regular brutal text-[#9F9F9F]">
                  Choose reasons *
                </label>
                {checkBoxList.map((item, i) => (
                  <div key={i} className="col-span-1 mt-2">
                    <CheckBoxField
                      id="checkbox"
                      onBlur={() => { }}
                      label={item.label}
                      value={item}
                      selectedValue={selectedOption}
                      onChanged={handleOptionChange}
                      isMultiSelect={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showOthersInput && (
        <div className="flex justify-between mt-[-70px] ml-8 sm:ml-16 w-[83vw] sm:w-[38vw] bg-[#f0f1f1] pt-2 pl-5">
          <div>
            <label className="brutal text-sm text-[#595959]">Please explain the reason</label>
            <textarea
              defaultValue={textareaValue}
              className="brutal w-[75vw] sm:w-[34vw] h-[50px] block py-2 pr-2 text-sm focus:outline-none bg-[#f0f1f1]"
              onChange={handleTextareaChange}
            />
            <div className="right-0 flex justify-end text-[24px] mb-2 lg:-mr-3 xl:-mr-6">
              <button
                onClick={onOtherCheckbox}
              >
                <BsFillArrowUpCircleFill />
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ResonForm;