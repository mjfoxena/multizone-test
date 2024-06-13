/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IPropsType {
    id: string;
    item: string;
    content: string;
    price: string;
    onClick?: () => void;
    isSelected?: boolean;
    isMultiSelect?: boolean;
    select?: boolean;
    imageUrl: boolean;
}

const InputTab: React.FC<IPropsType> = ({
    id,
    item,
    price,
    content,
    onClick,
    isSelected,
    imageUrl = false,
    isMultiSelect = false,
    select = false
}) => {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <>
            <div
                className={`p-6 bg-[#FFF] shadow-md rounded-lg cursor-pointer ${isSelected ? "border-[2px] border-[#ED1C24] border-solid" : ""
                    }`}
                onClick={handleClick}
            >
                <div className="flex justify-between">
                    <div className="flex justify-start mr-2">
                        <div className=" text-gray-900 sm:text-[19px] text-[17px] brutal font-medium">
                            {item}
                        </div>
                        {imageUrl && (
                            <div className="mt-[1px]">
                                <Image
                                    alt="Info Icon"
                                    src="/images/config/inputIcon.svg"
                                    height={18}
                                    width={18}
                                    className="ml-2 cursor-pointer mt-[2px]"
                                />
                            </div>
                        )}
                    </div>
                    <p className="font-normal text-[#252525] text-sm disketMono text-[13px] mt-1">
                    ₹ {price}
                    </p>
                </div>
                <div className='brutal text-[13px] font-normal mt-2 text-[#252525]'>
                    {content}
                </div>

                <div className="flex justify-between mt-4 sm:mt-5">
                    {isSelected ? (
                        <div className="brutal font-medium text-[#3A3A3A] text-[15px]">
                            ADDED AS UPGRADE
                        </div>
                    ) : (
                        <div className="brutal font-medium text-[#3A3A3A] text-[15px]">
                            ADD UPGRADE
                        </div>
                    )}
                    {isSelected && (
                        <div className="bg-[#ED1C24] pr-[6px] pb-[7.2px] pt-[4.5px] rounded-sm">
                            <Image
                                alt="plus Icon"
                                src={"/images/config/configArightarrow.svg"}
                                height={13}
                                width={13}
                                className="ml-2 cursor-pointer mt-[2px]"
                            />
                        </div>
                    )}
                </div>

            </div>
        </>
    );
};

export default InputTab;
