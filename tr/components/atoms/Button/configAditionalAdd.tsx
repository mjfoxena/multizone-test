import Image from "next/image";
import React, { useEffect, useState } from "react";
import Style from "./index.module.scss";

const ConfigAdditionalButton = ({
    text,
    onClick,
    className = "",
    dynamicIconSrc = "",
    setIsClicked,
    isClicked,
    isSelected,
}) => {

    useEffect(() => {
        setIsClicked(dynamicIconSrc.includes("configArightarrow"));
    }, [dynamicIconSrc]);

    let iconWidth = 30;
    let iconHeight = 30;

    if (dynamicIconSrc === "/images/config/configArightarrow.svg") {
        iconWidth = 20;
        iconHeight = 20;
    }

    return (
        <div className={`w-full `}>
            <button
                onClick={onClick}
                className={`rounded-md w-full flex items-center justify-between cursor-pointer ${isSelected ? "border-[2px] border-[#ED1C24]" : "border-[2px] border-black"}`}
            >
                <span className="flex items-center justify-center w-full font-semibold sm:text-[16px] text-[14px] brutal">{text}</span>
                <div className={`relative w-20 h-14 cursor-pointer flex items-center justify-center ${isSelected ? "bg-[#ED1C24]" : "bg-black"}`}>
                    {dynamicIconSrc && (
                        <Image
                            src={dynamicIconSrc}
                            alt="Dynamic Icon"
                            width={iconWidth}
                            height={iconHeight}
                            className="object-cover cursor-pointer"
                        />
                    )}
                </div>
            </button>
        </div>
    );
};

export default ConfigAdditionalButton;
