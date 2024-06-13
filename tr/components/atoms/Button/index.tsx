import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { TextElement } from "../Texts";
import Style from "./index.module.scss";

const Button = ({
  text,
  onClick,
  width = "",
  height = "",
  bg = "#C9C9C9",
  color = "",
  fontSize = 16,
  hoverColor = "rgb(23 23 23)",
  isDark = false,
  allowHover = false,
  className = "",
  disable = true,
  isLoading = false,
  price = "", // show price right side
  trailingIcon = true,
  successfull = false,
  isConfig = false,
}) => {
  const [hover, setHover] = useState(false);

  const btnCls = `${Style.button} ${className} ${
    disable ? "cursor-not-allowed" : ""
  }`;

  return (
    <div className={` ${disable || isLoading ? "cursor-not-allowed" : ""}`}>
      <button
        onMouseEnter={() => setHover(!disable)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: width || "inherit",
          background: hover && hoverColor.length !== 0 ? hoverColor : bg,
          color: color.length == 0 ? "" : color,
          height: height,
        }}
        onClick={onClick}
        className={btnCls}
      >
        {(hover && !isDark) ||
        (allowHover && isDark) ||
        disable ||
        isLoading ? (
          <div className={`flex justify-between w-full ${isConfig ? "sm:-ml-10" : ""}`}>
            {
              TextElement({
                text: isLoading ? "LOADING" : text,
                fontName: "brutal",
                fontSize: fontSize as any,
                // className: "pt-px",
              }).MEDUIM.WHITE
            }

            {price.length !== 0 &&
              TextElement({
                text: price,
                fontName: "brutal",
                fontSize: 16,
                // className: "px-5",
              }).MEDUIM.WHITE}
          </div>
        ) : (
          TextElement({
            text: isLoading ? "LOADING" : text,
            fontName: "brutal",
            fontSize: fontSize as any,
            // className: "pt-px",
          }).MEDUIM.BLACK
        )}

        {trailingIcon && <Image
          alt="arrow-right"
          width={20}
          height={20}
          src={`/images/icons/${
            (hover && !isDark) || (allowHover && isDark) || disable || isLoading 
              ? "arrow-white.svg"
              : "arrow-right.png"
          }`}
        />}
        {successfull && <Image
          alt="arrow-right"
          width={20}
          height={20}
          src={"/images/icons/right_tick.svg"}
        />}
      </button>
    </div>
  );
};

export default Button;