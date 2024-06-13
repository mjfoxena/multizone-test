import Image from "next/image";
import React, { useEffect, useState, useContext, useRef } from "react";
import PotentitalSavings from "../../containers/variants/sections/PotentialSavings";
import { useChoseVarient } from "../../queries/config";
import { NavbarContext } from "../../contexts/NavbarContext";
import CompareVariants from "../../containers/variants/sections/CompareVariants";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import SideTab from "./sidetabs";
import Marquee from "react-fast-marquee";
import { TextElement } from "../atoms/Texts";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import CountUpComp from "../molecules/Home/countUp";

interface IConfigContainerProps {
    onChoseVarient: () => void;
    setSelectedVariant: any;
    selectedVariant: string;
}

export const sidebarSteps = {
    sidebarStep1: "sidebarStep1",
    compareVariants: "compareVariants",
    potentialSavings: "potentialSavings",
};

const VarientSelection = ({
    onChoseVarient,
    setSelectedVariant,
    selectedVariant,
}: IConfigContainerProps) => {
    const { sidebarOpen, isMobile, userData } = useContext(NavbarContext);
    const [activeTab, setActiveTab] = useState(1);
    const [isHovered, setIsHovered] = useState({
        original: false,
        recon: false,
    });
    const [selectedVariantData, setSelectedVariantData] = useState<any>(null);
    const [sidebarTab, setSidebarTab] = useState(sidebarSteps.sidebarStep1);
    const [refSuperNumber, inViewSuperNumber] = useInView();
    const controlBoxCharged = useAnimation();

    // api call
    const {
        data: variantData,
        error,
        isLoading,
    } = useChoseVarient(
        { country: "COBH", model: "MF77", request_type: 1 },
        () => { }
    );

    useEffect(() => {
        const filteredData = variantData?.find(
            (variant) => variant.variant_name === selectedVariant
        );
        setSelectedVariantData(filteredData);
    }, [selectedVariant, variantData]);

    // mousehover for orignal
    const handleMouseEnterOriginal = () => {
        setIsHovered((prevState) => ({
            ...prevState,
            original: true,
        }));
    };
    const handleMouseLeaveOriginal = () => {
        setIsHovered((prevState) => ({
            ...prevState,
            original: false,
        }));
    };

    // mousehover for recon
    const handleMouseEnterRecon = () => {
        setIsHovered((prevState) => ({
            ...prevState,
            recon: true,
        }));
    };
    const handleMouseLeaveRecon = () => {
        setIsHovered((prevState) => ({
            ...prevState,
            recon: false,
        }));
    };

    const handleChangeVarient = () => {
        setActiveTab(activeTab === 1 ? 2 : 1);
        setSelectedVariant(activeTab === 1 ? "Recon" : "Original");
    };
    const handleOriginal = () => {
        setActiveTab(1);
        setSelectedVariant("Original");
    };
    const handleRecon = () => {
        setActiveTab(2);
        setSelectedVariant("Recon");
    };

    const renderTab = (from) => {
        switch (sidebarTab) {
            case sidebarSteps.compareVariants:
                return <CompareVariants setSidebarTab={setSidebarTab} />;
            case sidebarSteps.potentialSavings:
                return (
                    <PotentitalSavings
                        finalModal={"finalModal"}
                        setSidebarTab={setSidebarTab}
                        country={"TR"}
                    />
                );
            default:
                return null;
        }
    };

    const sidePanelRef = useRef(null);
    useOutsideClick(sidePanelRef, () => {
        setSidebarTab((e) => {
            if (
                [sidebarSteps.compareVariants, sidebarSteps.potentialSavings].includes(
                    e
                )
            ) {
                return sidebarSteps.sidebarStep1;
            } else {
                return e;
            }
        });
    });

    const [isvariantData, setIsVariantData] = useState<any>(null);
    useEffect(() => {
        setIsVariantData(variantData);
    }, [variantData]);

    const formatter = new Intl.NumberFormat("en-IN");
    const originalPrice = isvariantData && formatter.format(isvariantData[0]?.variant_properties.full_price - isvariantData[0]?.variant_properties.discount);
    const reconlPrice = isvariantData && formatter.format(isvariantData[1]?.variant_properties.full_price -isvariantData[1]?.variant_properties.discount);

    return (
        <>
            <div className="mx-0 sm:mx-[100px] lg:mx-[120px] 2xl:mx-[10%] sm:mt-[80px]">
                {/* tab */}
                <div className="flex">
                    <div
                        className={`sm:-mr-[18px] ${activeTab === 1 ? "bg-[#FFF] shadow-md" : "bg-[#EEEEEE]"
                            } w-screen h-[4.5em] sm:h-[6em] lg:h-[7.5em] mt-8 sm:mt-0 cursor-pointer`}
                        onClick={handleOriginal}
                        onMouseEnter={handleMouseEnterOriginal}
                        onMouseLeave={handleMouseLeaveOriginal}
                    >
                        <div className="flex items-center justify-center sm:ml-0">

                            <div className="sm:mt-[6%] mt-5 ml-[10%] relative" style={{ width: isMobile ? 120 : 210, height: isMobile ? 12 : 22 }}>
                                {isHovered.original ? (
                                    <Image
                                        className="absolute inset-0 w-full h-full -ml-1 sm:ml-0 lg:-ml-[10%]"
                                        src={"/images/config/chosevarient/originalRed.png"}
                                        alt="originalIcon"
                                        loading="eager"
                                        width={isMobile ? 200 : 300} 
                                        height={isMobile ? 200 : 300} 
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                ) : (
                                    <Image
                                        className="absolute inset-0 w-full h-full -ml-1 sm:ml-0 lg:-ml-[10%]"
                                        src={activeTab === 1 ? "/images/config/chosevarient/originalRed.png" : "/images/config/chosevarient/original.png"}
                                        alt="originalIcon"
                                        loading="eager"
                                        width={isMobile ? 200 : 300}
                                        height={isMobile ? 200 : 300} 
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                )}
                                <div className={`eurostile lg:text-[1em] sm:text-[12px] text-[9px] leading-[24.48px] tracking-[0.5px] 2xl:-ml-[2%] lg:-ml-[3%] sm:ml-[10%] ml-[3%] sm:mt-[35px] mt-4 ${activeTab === 1 ? "text-[#000]" : "text-[#A7A7A7]"}`}>
                                    FROM ₹ {originalPrice}*
                                </div>
                            </div>

                            {/* <div className="sm:mt-[6%] mt-5 ml-[15%]">
                                {isHovered.original ? (
                                    <Image
                                        className="lg:ml-[5%] 2xl:ml-0"
                                        src={"/images/config/chosevarient/originalRed.png"}
                                        alt="originalIcon"
                                        loading="eager"
                                        width={isMobile ? 200 : 300}
                                        height={isMobile ? 200 : 300}
                                        style={{ objectFit: "cover", width: "56%", height: "100%" }}
                                    />
                                ) : (
                                    <Image
                                        className="lg:ml-[5%] 2xl:ml-0"
                                        src={
                                            activeTab === 1
                                                ? "/images/config/chosevarient/originalRed.png"
                                                : "/images/config/chosevarient/original.png"
                                        }
                                        alt="originalIcon"
                                        loading="eager"
                                        width={isMobile ? 200 : 300}
                                        height={isMobile ? 200 : 300}
                                        style={{ objectFit: "cover", width: "56%", height: "100%" }}
                                    />
                                )}
                                <div
                                    className={`eurostile lg:text-[1em] sm:text-[12px] text-[9px] leading-[24.48px] tracking-[0.5px] lg:ml-[4%] sm:ml-[10%] ml-[3%] sm:mt-[14.19px] mt-2 ${activeTab === 1 ? "text-[#000]" : "text-[#A7A7A7]"
                                        }`}
                                >
                                    FROM ₹ {originalPrice}*
                                </div>
                            </div> */}

                        </div>
                    </div>

                    {/* changing tab icon */}
                    <div
                        className="z-10 hidden sm:block cursor-pointer mt-[45px]"
                        onClick={handleChangeVarient}
                    >
                        <Image
                            className="changeVarient"
                            src={"/images/config/chosevarient/changevarient.png"}
                            alt="originalIcon"
                            loading="eager"
                            width={100}
                            height={100}
                        />
                    </div>

                    {/* Recon Tab */}
                    <div
                        className={`sm:-ml-[18px] ${activeTab === 2 ? "bg-[#FFF] shadow-md" : "bg-[#EEEEEE]"
                            }  w-screen h-[4.5em] sm:h-[6em] lg:h-[7.5em] mt-8 sm:mt-0 cursor-pointer`}
                        onClick={handleRecon}
                        onMouseEnter={handleMouseEnterRecon}
                        onMouseLeave={handleMouseLeaveRecon}
                    >
                        <div className="flex items-center justify-center sm:ml-0">

                            <div className="sm:mt-[6%] mt-5 sm:ml-[10%] relative" style={{ width: isMobile ? 170 : 320, height: isMobile ? 12 : 22 }}>
                                {isHovered.recon ? (
                                    <Image
                                        className="absolute inset-0 w-full h-full -ml-1 sm:ml-0 lg:-ml-[10%]"
                                        src={"/images/config/chosevarient/reconRed.png"}
                                        alt="originalIcon"
                                        loading="eager"
                                        width={isMobile ? 200 : 300} 
                                        height={isMobile ? 200 : 300} 
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                ) : (
                                    <Image
                                        className="absolute inset-0 w-full h-full -ml-1 sm:ml-0 lg:-ml-[10%]"
                                        src={activeTab === 2 ? "/images/config/chosevarient/reconRed.png" : "/images/config/chosevarient/recon.png"}
                                        alt="originalIcon"
                                        loading="eager"
                                        width={isMobile ? 200 : 300}
                                        height={isMobile ? 200 : 300} 
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                )}
                                <div className={`eurostile lg:text-[1em] sm:text-[12px] text-[9px] leading-[24.48px] tracking-[0.5px] lg:ml-[12%] sm:ml-[10%] ml-[20%] sm:mt-[35px] mt-4 ${activeTab === 2 ? "text-[#000]" : "text-[#A7A7A7]"}`}>
                                    FROM ₹ {reconlPrice}*
                                </div>
                            </div>

                            {/* <div className="sm:mt-[6%] mt-5 ml-[15%]">
                                {isHovered.recon ? (
                                    <Image
                                        src={"/images/config/chosevarient/reconRed.png"}
                                        alt="reconIcon"
                                        loading="eager"
                                        width={isMobile ? 200 : 300}
                                        height={isMobile ? 200 : 300}
                                        style={{ objectFit: "cover", width: "80%", height: "100%" }}
                                    />
                                ) : (
                                    <Image
                                        src={
                                            activeTab === 2
                                                ? "/images/config/chosevarient/reconRed.png"
                                                : "/images/config/chosevarient/recon.png"
                                        }
                                        alt="reconIcon"
                                        loading="eager"
                                        width={isMobile ? 200 : 300}
                                        height={isMobile ? 200 : 300}
                                        style={{ objectFit: "cover", width: "80%", height: "100%" }}
                                    />
                                )}
                                <div
                                    className={`eurostile lg:text-[1em] sm:text-[12px] text-[9px] leading-[24.48px] tracking-[0.5px] lg:ml-[14%] sm:ml-[10%] ml-[10%] sm:mt-[14.19px] mt-2 ${activeTab === 2 ? "text-[#000]" : "text-[#A7A7A7]"
                                        }`}
                                >
                                    FROM ₹ {reconlPrice}*
                                </div>
                            </div> */}


                        </div>
                    </div>
                </div>
                <div className="text-[10px] sm:text-[12px] text-[#BEBEBE] brutal mt-2 leading-24.48 tracking-tighter mx-4 sm:ml-0">*Includes Carbon Farewell Fund reduction of ₹ 25,000 on the ex-showroom price</div>

                {/* bike data */}
                <div className="sm:flex sm:justify-between sm:mx-0 mx-4 mt-8 sm:mt-10 eurostile">
                    <div className="flex justify-center">
                        <div className="relative mr-7">
                            <div>
                                <Image
                                    src={"/images/config/chosevarient/redCard.svg"}
                                    alt="reconIcon"
                                    loading="eager"
                                    width={isMobile ? 77 : 87}
                                    height={isMobile ? 48.5 : 55}
                                    className="relative"
                                />
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-7 text-[#FFF] 2xl:text-[22px] text-[20px] font-bold">
                                    <CountUpComp
                                        countStart={selectedVariant === "Original" ? 323 : 211}
                                        countEnd={selectedVariantData?.variant_properties?.range}
                                        decimal={0}
                                    />
                                </div>
                            </div>
                            <div className="sm:text-[12px] text-[10.5px] brutal text-[#2A2A2A] font-extrabold">
                                RANGE
                                <p className="-mb-4">(IDC Est. KM)</p>
                            </div>
                        </div>
                        <div className="relative mr-7">
                            <div>
                                <Image
                                    src={"/images/config/chosevarient/redCard.svg"}
                                    alt="reconIcon"
                                    loading="eager"
                                    width={isMobile ? 77 : 87}
                                    height={isMobile ? 48.5 : 55}
                                    className="relative"
                                />

                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-7 text-[#FFF] 2xl:text-[22px] text-[20px] font-bold">
                                    <CountUpComp
                                        countStart={selectedVariant === "Original" ? 152 : 140}
                                        countEnd={selectedVariantData?.variant_properties?.top_speed}
                                        decimal={0}
                                    />
                                </div>
                            </div>
                            <div className="sm:text-[12px] text-[10.5px] brutal text-[#2A2A2A] font-extrabold">
                                TOP SPEED
                                <p className="-mb-4">(KMPH)</p>
                            </div>
                        </div>
                        <div className="relative sm:mr-7">
                            <div>
                                <Image
                                    src={"/images/config/chosevarient/redCard.svg"}
                                    alt="reconIcon"
                                    loading="eager"
                                    width={isMobile ? 77 : 87}
                                    height={isMobile ? 48.5 : 55}
                                    className="relative"
                                />
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-7 text-[#FFF] 2xl:text-[22px] text-[20px] font-bold">
                                    <CountUpComp
                                        countStart={selectedVariant === "Original" ? 100 : 90}
                                        countEnd={selectedVariantData?.variant_properties?.torque}
                                        decimal={0}
                                    />
                                </div>
                            </div>
                            <div className="sm:text-[12px] text-[10.5px] brutal text-[#2A2A2A] font-extrabold">
                                TORQUE (NM)
                            </div>
                        </div>

                        {/* desktop */}
                        <div className="sm:flex justify-center hidden">
                            <div className="2xl:mx-8 mx-4">
                                <div className="text-[#ED1C24] eurostile">yrs</div>
                                <div className="text-[#ED1C24] font-bold sm:text-[19px] text-[17px] eurostile">{selectedVariantData?.variant_properties?.warranty}</div>
                                <div className="sm:text-[12px] text-[10.5px] brutal text-[#2A2A2A] font-extrabold">
                                    WARRANTY
                                </div>
                            </div>
                            <div className="text-[#c2c2c2] font-semibold 2xl:mr-8 mr-4 mt-7 hidden sm:block">|</div>
                            <div className="eurostile w-[140px]">
                                <div className="text-[#ED1C24]">kms</div>
                                <div className="text-[#ED1C24] font-bold sm:text-[19px] text-[17px] whitespace-nowrap">{selectedVariantData?.variant_properties?.warranty_progress}</div>
                            </div>
                        </div>
                    </div>

                    
                    {/* mobile */}
                    <div className="flex justify-center sm:hidden sm:mt-8 mt-6">
                        <div className="sm:mx-8 mr-8 sm:mr-0">
                            <div className="text-[#ED1C24] eurostile">yrs</div>
                            <div className="text-[#ED1C24] font-bold text-[19px] eurostile">{selectedVariantData?.variant_properties?.warranty}</div>
                            <div className="text-[12px] brutal text-[#2A2A2A] font-extrabold">
                                WARRANTY
                            </div>
                        </div>
                        <div className="text-[#c2c2c2] font-semibold mr-8 mt-7 sm:hidden block">|</div>
                        <div className="eurostile w-[140px]">
                            <div className="text-[#ED1C24]">kms</div>
                            <div className="text-[#ED1C24] font-bold sm:text-[19px] text-[17px]">{selectedVariantData?.variant_properties?.warranty_progress}</div>
                        </div>
                    </div>

                    <div className="block sm:hidden -mx-10">
                        <Marquee
                            speed={60}
                            gradient={false}
                            delay={2}
                            className="mt-10"
                            style={{ paddingLeft: "7px" }}
                        >
                            {
                                TextElement({
                                    text: "For best experience, configure your f77 on desktop",
                                    fontName: "disketMono",
                                    fontSize: 11,
                                }).REGULAR.BLACK
                            }
                            <span
                                style={{
                                    width: "100vw",
                                }}
                            ></span>
                        </Marquee>
                    </div>

                    <div className="sm:ml-[70px] mt-6 sm:mt-0">
                        <button
                            onClick={onChoseVarient}
                            className={`rounded-md flex px-8 w-full items-center justify-between cursor-pointer border-[2px] border-[#BCBCBC] hover:border-[#ED1C24] hover:bg-[#ED1C24] hover:text-[#FFF]`}
                        >
                            <span className="flex items-center justify-start w-[100%] font-medium sm:text-[14px] 2xl:text-[16px] text-[12px] brutal mr-8 line-height-[28px] tracking-[0.2px]">
                                PROCEED TO NEXT STAGE
                            </span>
                            <div
                                className={`relative w-20 h-14 cursor-pointer flex items-center justify-center bg-[#ED1C24] -mr-8`}
                            >
                                <Image
                                    src={"/images/config/chosevarient/forwordArrow.png"}
                                    alt="Dynamic Icon"
                                    loading="eager"
                                    width={22}
                                    height={21}
                                    className="object-cover cursor-pointer"
                                />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="flex justify-center sm:justify-end sm:mt-2 mt-7">
                    <div
                        className="underline brutal text-[#585858] text-[0.7em] sm:text-[0.8em] font-medium line-height-[28px] tracking-[1.2px] cursor-pointer"
                        onClick={() => setSidebarTab(sidebarSteps.compareVariants)}
                        style={{ textAlign: "center" }}
                    >
                        COMPARE VARIANTS
                    </div>
                </div>
            </div>

            {/* background color when the popup model is opened */}
            {sidebarTab === sidebarSteps.compareVariants && !isMobile && (
                <div className="fixed top-0 right-0 left-0 bottom-0 bg-[#0000007a] z-10" />
            )}

            {/* render tab */}
            <div ref={sidePanelRef}>
                <SideTab>{renderTab(2)}</SideTab>
            </div>

            {/* bike Images for desktop */}
            <div className="w-full hidden sm:block mt-10">
                <Image
                    src={"https://d2atk76x06g5eh.cloudfront.net/config/variant_selection_intro/landing/desktop.webp"}
                    alt="reconIcon"
                    loading="eager"
                    width={2000}
                    height={2000}
                />
            </div>
            {/* bike Image for mobile */}
            <div className="w-full sm:hidden block mt-10">
                <Image
                    src={"https://d2atk76x06g5eh.cloudfront.net/config/variant_selection_intro/landing/mobile.png"}
                    alt="reconIcon"
                    loading="eager"
                    width={2000}
                    height={2000}
                />
            </div>
        </>
    );
};

export default VarientSelection;
