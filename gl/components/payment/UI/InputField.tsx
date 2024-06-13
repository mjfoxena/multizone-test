import React, { useState } from "react";
import { MapCss } from "../../../utils/utils";
import Styles from "./payment-input-field.module.scss";
import Select, { StylesConfig } from "react-select";
import { defaultProps } from "react-select/dist/declarations/src/Select";
const color = "#eaeaea";
const borderColor = "#F98080";

export const PhoneNumberInput = ({
  onChanged,
  value,
  readOnly = false,
  label,
  isError = false,
  placeholder = "",
  isINRFormat = false,

  onBlur = (v) => { },
  showCountryCode = false,
  getOTP = false,
  onGetOTPClicked = () => { },
  disable = false,
  isSuccess = false,
  errorMessage = "",
  id = "",
  bg = "bg-[#eaeaea]",
}) => {
  const convertToNumber = () => {
    if (value === 0 || value.toString() == "0" || !isINRFormat) {
      return value;
    }
    const formatted = value.replaceAll(",", "");
    const converted = parseInt(formatted);
    return converted;
  };

  return (
    <div id={id}>
      {label && (
        <label
          className={`block mb-2 text-sm font-regular brutal ${isError ? "dark:text-gray-400" : "dark:text-gray-400"
            }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {/* <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
          +91
        </div> */}
        {getOTP && !isSuccess && (
          <div
            onClick={(e) => !disable && onGetOTPClicked()}
            className={`${disable
                ? "text-gray-400 cursor-not-allowed pt-5"
                : isError
                  ? "pt-5"
                  : "items-center"
              } absolute cursor-pointer inset-y-0 right-0 flex  pr-5 underline brutal `}
          >
            GET OTP
          </div>
        )}
        {getOTP && isSuccess && (
          <div
            className={`absolute inset-y-0 right-0 flex items-center pr-5 brutal text-green-600`}
          >
            VERIFIED
          </div>
        )}
        <input
          type="tel"
          id={"phone-text"}
          value={
            isINRFormat
              ? !Number.isNaN(convertToNumber())
                ? convertToNumber().toLocaleString("en-IN")
                : 0
              : value
          }
          readOnly={readOnly}
          onChange={(e) =>
            isINRFormat
              ? // @ts-ignore
              onChanged(e.target.value.replaceAll(",", ""))
              : onChanged(e.target.value)
          }
          placeholder={placeholder}
          onBlur={(e) => {
            onBlur(e.target.value);
          }}
          className={MapCss(
            Styles,
            "inputbox",
            `${isError ? "  border-2" : "dark:border-gray-200"} text-sm ${readOnly ? "opacity-70" : ""
            } ${bg}`
          )}
        />
        {isError && errorMessage.length !== 0 && (
          <p className="mt-2 text-xs text-red-400 dark:text-red-400">
            <span className="font-normal">{errorMessage}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export const CheckBoxField = ({
  selectedValue,
  onBlur = () => { },
  value,
  label,
  isError = false,
  errorMessage = "",
  id = "",
  onChanged,
  isMultiSelect = false
}) => {
  const handleChange = () => {
    onBlur();
    onChanged(value === selectedValue ? "" : value);
  };

  return (
    <div className="">
      {isMultiSelect ? (
        <input
          type="checkbox"
          name="switch"
          className="check"
          onChange={handleChange}
        />
      ) : (
        <input
          type="checkbox"
          name="switch"
          className="check -mb-[2px]"
          checked={value === selectedValue}
          onChange={handleChange}
        />
      )}
      <label className="mr-2 ml-2 brutal text-[14px] text-[#000]" htmlFor={id}>
        {label}
      </label>
      {isError && errorMessage.length !== 0 && (
        <p className="mt-2 text-xs text-red-400 dark:text-red-400">
          <span className="font-normal">{errorMessage}</span>
        </p>
      )}
      <style jsx>{`
        .check {
          -webkit-appearance: none;
          height: 15px;
          width: 15px;
          top: 20px;
          left: 20px;
          transition: 0.1s;
          border: 1.4px solid #000;
        }
        .check:checked {
          background-color: ${isError ? "#FE0006" : "#DA4F46"};
          border: 1.4px solid #da4f46;
        }
        .check:checked:before {
          content: "";
        }
        .check:hover {
          cursor: pointer;
          opacity: 0.8;
        }
        @media screen and (max-width: 768px) {

        }
      `}</style>
    </div>
  );
};

export const TextFieldInput = ({
  onChanged,
  onBlur = (v) => { },
  value,
  readOnly = false,
  label,
  isError = false,
  placeholder = "",
  isMultiline = false,
  errorMessage = "",
  id = "",
  bg = "bg-[#eaeaea]",
  autoFocus = false,
  onKeyDown = (event) => { },
}) => {
  return (
    <div>
      {label && (
        <label
          className={`block mb-2 text-sm font-regular brutal ${isError ? "dark:text-gray-400" : "dark:text-gray-400"
            }`}
        >
          {label}
        </label>
      )}
      <input
        type="text"
        id={id}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChanged(e.target.value)}
        placeholder={placeholder}
        onBlur={(e) => onBlur(e.target.value)}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
        className={MapCss(
          Styles,
          "inputbox",
          `${isError ? "  border-2" : "dark:border-gray-200"} text-sm ${readOnly ? "opacity-70" : ""
          } ${bg}`
        )}
      />
      {isError && errorMessage.length !== 0 && (
        <p className="mt-2 text-xs text-red-400 dark:text-red-400">
          <span className="font-normal">{errorMessage}</span>
        </p>
      )}
    </div>
  );
};

export const AmountInputField = ({
  onChanged,
  value,
  readOnly = false,
  label,
  isError = false,
}) => {
  return (
    <>
      {label && (
        <label
          className={`${isError ? "dark:text-red-400" : "dark:text-gray-400"
            } brutal`}
        >
          {label}
        </label>
      )}
      <input
        type="tel"
        id="amount-input"
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChanged(e.target.value)}
        placeholder={"Enter Amount"}
        // onBlur={(e) => {
        //   onChanged(e.target.value);
        // }}
        className={` w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-100 sm:text-md focus:ring-black-500 focus:border-gray-500 dark:bg-gray-200 ${isError ? "dark:border-red-400" : "dark:border-gray-200"
          } dark:placeholder-gray-400 dark:text-gray dark:focus:ring-gray-500 dark:focus:border-gray-500`}
      />
    </>
  );
};

export const VariantBox = ({ onClicked, title, isSelected = false, item }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        borderColor: isSelected ? borderColor : "transparent",
      }}
      className={`col-span-1 text-ellipsis text-center py-3 sm:py-5 rounded cursor-pointer border`}
      onClick={onClicked}
    >
      <label
        className={`${isSelected ? "font-bold " : "font-normal  "
          } w-full py-3 text-sm text-black brutal`}
      >
        {title}
      </label>
    </div>
  );
};

export const UserGenderInput = ({
  onChanged,
  value,
  readOnly = false,
  label,
  isError = false,
  errorMessage = "",
  placeholder = "",
  genders = ["Male", "Female", "Other"],
  id = "",
}) => {
  return (
    <div id={id}>
      {label && (
        <label
          className={`block mb-2 text-sm font-regular ${isError ? "dark:text-red-400" : "dark:text-gray-400"
            }`}
        >
          {label}
        </label>
      )}
      {/* Gender BOX Shape */}
      <div className={`grid grid-cols-3 gap-2 place-content-stretch `}>
        {genders.map((gender, index) => (
          <VariantBox
            key={gender}
            title={gender}
            item={gender}
            isSelected={gender == value}
            onClicked={() => {
              if (gender !== value) {
                onChanged(gender);
              }
            }}
          ></VariantBox>
        ))}
      </div>
      {isError && errorMessage.length !== 0 && (
        <p className="mt-2 text-xs text-red-400 dark:text-red-400">
          <span className="font-normal">{errorMessage}</span>
        </p>
      )}
    </div>
  );
};

export const RadioButtonField = ({
  onChanged,
  onBlur = () => { },
  value,
  label,
  checked,
  isError = false,
  errorMessage = "",
  id = "",
  className = "",
}) => {
  const inputClassName = `w-4 h-4 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 ${checked && value === "No" ? "checked:bg-blue-500 checked:border-blue-500" : ""
    }`;

  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={(e) => onChanged(e.target.value)}
        onBlur={onBlur}
        className={`${inputClassName} ${className}`}
      />
      <label className="ml-2" htmlFor={id}>
        {label}
      </label>
      {isError && errorMessage.length !== 0 && (
        <p className="mt-2 text-xs text-red-400 dark:text-red-400">
          <span className="font-normal">{errorMessage}</span>
        </p>
      )}
    </div>
  );
};

export const DropDownTextField = ({
  onChanged,
  onBlur = (v) => { },
  value,
  readOnly = false,
  label,
  isError = false,
  placeholder = "",
  items,
  itemText = "",
  valueText = "",
  type = "dropdown",
  isMobile = false,
  errorMessage = "",
  id = "",
}) => {
  let options = items.map((item) => ({
    ...item,
    label: item.text,
  }));

  if (typeof value === "object" && Object.keys(value).length === 0) {
    value = undefined; // to display placeholder
  }
  const colourStyles: StylesConfig = {
    container: (styles) => ({
      ...styles,
    }),
    // @ts-ignore
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: color,
        border: "none",
        minHeight: "15px !important",
        maxHeight: "66px",
        paddingLeft: "10px",
      };
    },
    // @ts-ignore
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: "white",
        color: "black",
        cursor: "pointer",

        ":active": {
          ...styles[":active"],
          backgroundColor: color,
        },
      };
    },
    input: (styles) => ({ ...styles }),
    // @ts-ignore
    placeholder: (styles) => ({
      ...styles,
      color: "rgb(156 163 175)",
      fontWeight: 400,
      fontSize: "14px",
    }),
    singleValue: (styles, { data }) => ({ ...styles }),
  };

  return (
    <>
      {label && (
        <label
          className={`block mb-3.5 text-sm font-regular brutal ${isError ? "dark:text-gray-400" : "dark:text-gray-400"
            }`}
        >
          {label}
        </label>
      )}
      <div className="" id="dropdown_filed">
        <Select
          id="dropdown_inputField"
          classNames={{
            control: (state) =>
              `h-14 sm:h-16 dropdown_Selector ${isError && errorMessage.length !== 0 ? "" : ""}`,
          }}
          placeholder={placeholder}
          options={options}
          styles={colourStyles}
          value={value}
          defaultValue={value}
          onBlur={(e) => onBlur(e.target.value)}
          onChange={(v) => {
            onChanged(v);
          }}
        />

        {isError && errorMessage.length !== 0 && (
          <p className="mt-2 text-xs text-red-400 dark:text-red-400">
            <span className="font-normal">{errorMessage}</span>
          </p>
        )}
      </div>
    </>
  );
};

export const DropDownTestRideField = ({
  onChanged,
  onBlur = (v) => { },
  value,
  readOnly = false,
  label,
  isError = false,
  placeholder = "",
  items,
  itemText = "",
  valueText = "",
  type = "dropdown",
  isMobile = false,
  errorMessage = "",
  id = "",
}) => {
  let options = items.map((item, index) => ({
    ...item,
    label: item.text,
    isDisabled: index !== 0,
  }));

  if (typeof value === "object" && Object.keys(value).length === 0) {
    value = undefined;
  }
  const colourStyles: StylesConfig = {
    container: (styles) => ({
      ...styles,
    }),
    // @ts-ignore
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: color,
        border: "none",
        minHeight: "15px !important",
        maxHeight: "66px",
        paddingLeft: "10px",
      };
    },
    // @ts-ignore
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: "white",
        color: isDisabled ? "#BDBDBD" : "black",
        cursor: isDisabled ? "not-allowed" : "pointer",
        position: "relative",
        "::after": {
          content: isDisabled ? '"Coming Soon"' : '""',
          position: "absolute",
          top: "50%",
          right: "15px",
          transform: "translateY(-50%)",
          color: isDisabled ? "#BDBDBD" : "#BDBDBD",
          fontSize: "12px",
        },
        ":active": {
          ...styles[":active"],
          backgroundColor: color,
        },
      };
    },

    input: (styles) => ({ ...styles }),
    // @ts-ignore
    placeholder: (styles) => ({
      ...styles,
      color: "rgb(156 163 175)",
      fontWeight: 400,
      fontSize: "14px",
    }),
    singleValue: (styles, { data }) => ({ ...styles }),
  };

  return (
    <>
      {label && (
        <label
          className={`block mb-3.5 text-sm font-regular brutal ${isError ? "dark:text-gray-400" : "dark:text-gray-400"
            }`}
        >
          {label}
        </label>
      )}
      <div className="">
        <Select
          id={id}
          classNames={{
            control: (state) =>
              `h-14 sm:h-16 ${isError && errorMessage.length !== 0 ? "" : ""}`,
          }}
          placeholder={placeholder}
          options={options}
          styles={colourStyles}
          value={value}
          defaultValue={value}
          onBlur={(e) => onBlur(e.target.value)}
          onChange={(v) => {
            onChanged(v);
          }}
        />

        {isError && errorMessage.length !== 0 && (
          <p className="mt-2 text-xs text-red-400 dark:text-red-400">
            <span className="font-normal">{errorMessage}</span>
          </p>
        )}
      </div>
    </>
  );
};