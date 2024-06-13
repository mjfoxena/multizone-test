import React, { useState } from "react";
// import { MapCss } from "../../../utils/utils";
// import Styles from "./payment-input-field.module.scss";
import Select  from "react-select";
// import { defaultProps } from "react-select/dist/declarations/src/Select";
const color = "#000";
const borderColor = "#F98080";


export const CountryCodeInput= ({
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
    // const colourStyles: StylesConfig = {
    //   container: (styles) => ({
    //     ...styles,
    //   }),
    //   // @ts-ignore
    //   control: (styles) => {
    //     return {
    //       ...styles,
    //       backgroundColor: color,
    //       border: "none",
    //       minHeight: "15px !important",
    //       maxHeight: "66px",
    //       paddingLeft: "10px",
    //     };
    //   },
    //   // @ts-ignore
    //   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    //     return {
    //       ...styles,
    //       backgroundColor: "white",
    //       color: "black",
    //       cursor: "pointer",
  
    //       ":active": {
    //         ...styles[":active"],
    //         backgroundColor: color,
    //       },
    //     };
    //   },
    //   input: (styles) => ({ ...styles }),
    //   // @ts-ignore
    //   placeholder: (styles) => ({
    //     ...styles,
    //     color: "rgb(156 163 175)",
    //     fontWeight: 400,
    //     fontSize: "14px",
    //   }),
    //   singleValue: (styles, { data }) => ({ ...styles }),
    // };
  
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
                `h-14 sm:h-12 w-24 dropdown_Selector ${isError && errorMessage.length !== 0 ? "" : ""}`,
            }}
            placeholder={placeholder}
            options={options}
            // styles={colourStyles}
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