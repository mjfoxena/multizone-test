import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../contexts/NavbarContext";
import Style from "../../pages/f99/f99.module.scss";
import { originURL } from "../../services/constants";

const F99Enquiry = ({ imageUrl }) => {
    const router = useRouter();
    const { userData, isMobile } = useContext(NavbarContext);

    const onButtonHandler = async () => {
        router.push(`${originURL}/f99/enquiry`)
    };

    return (
        <div className={Style.reserve}>
            <div className="pl:[10px] sm:min-w-[300px] lg:min-w-[500px] 2xl:min-w-[600px] sm:max-w-[50%] flex items-center mb-[38px] sm:mt-[61px] sm:mb-[61px] sm:pl-[20px] lg:pl-[40px]">
                <Image
                    alt="F99 Enquiry"
                    width={2000}
                    height={2000}
                    src={`${imageUrl}card.jpg`}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
            <div className="flex flex-col sm:mt-[53px] sm:pl-[10px] lg:pl-[40px]">
                <div className={Style.spotText}>F99</div>
                <div className={Style.subReserve}>
                    <div>Express your interest in the new era of</div>
                    <div>motorcycles from our factory racing platform.</div>
                </div>
                <div className={Style.subReserveMobile}>
                    <div>
                    Express your interest in the new era of motorcycles from our factory racing platform.
                    </div>
                </div>
                <div className="">
                    <div
                        className={`${Style.accesswrapper}`}
                        onClick={() => onButtonHandler()}
                    >
                        <div className={`${Style.accessText}`}>I am Interested</div>
                    </div>

                    <div className="sm:-mt-3">
                        <div className={Style.arrowText}>
                            {">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default F99Enquiry;