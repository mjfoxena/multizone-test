import Image from "next/image";
import { Router, useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import CommonFooter from "../../components/molecules/CommonFooter";
import Style from "../limited/limited.module.scss";
import { NavbarContext } from "../../contexts/NavbarContext";
import Head from "next/head";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Escape from "../../components/molecules/SpaceEdition/escape";
import CountUpComp from "../../components/molecules/Home/countUp/index";
import { API_CONSTANTS } from "../../services/constants";
import Script from "next/script";
import { LiaDownloadSolid } from 'react-icons/lia';
import { useLimitedSpaceAvailableStatus } from "../../queries/config";
import GraphTags from "../../components/GraphTags";
import F99Enquiry from "../../components/f99";
import F99Spoke from "../../components/f99/f99Spoke";
import TechSpec from "../../components/f99/techSpec";
import TopHeader from "../../components/f99/topHeader";
import AerodynamicHeader from "../../components/f99/aerodynamicHeader";
import { GetServerSidePropsContext } from "next";


const specSHeetDownload = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/pdf/spec_sheet_space.pdf`;
const imageVideoUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/limited/`;
const imageUrl = `${API_CONSTANTS.BASE_URL_S3}/f99/`;

const F99 = () => {
    const [isSoldOut, setIsSoldOut] = useState(false);

    const { data: availableStatus, error } = useLimitedSpaceAvailableStatus(() => { });
    useEffect(() => {
        setIsSoldOut(!availableStatus);
    }, [availableStatus]);


    const controlBoxCharged = useAnimation();
    const controlDna = useAnimation();
    const controlMoon = useAnimation();
    const controlSpecs = useAnimation();
    const controlExtraLine = useAnimation();
    const [refBoxCharged, inViewBoxCharged] = useInView();
    const [refDna, inViewDna] = useInView();
    const [refMoon, inViewMoon] = useInView();
    const [refSpecs, inViewSpecs] = useInView();
    const [refExtraLine, inViewExtraLine] = useInView();
    const [isMobile, setIsMobile] = useState(false);
    const hasWindow = typeof window !== "undefined";
    const width: any = hasWindow ? window.innerWidth : null;
    const videoOneRef = useRef(null);
    const videoRefTwo = useRef(null);
    useEffect(() => {
        setIsMobile(width < 800);
    }, [width]);

    const boxVariant = {
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
        hidden: { opacity: 0, y: 40 },
    };
    useEffect(() => {
        if (inViewExtraLine) {
            controlExtraLine.start("visible");
        } else {
            controlExtraLine.start("hidden");
        }
    }, [controlExtraLine, inViewExtraLine]);
    useEffect(() => {
        if (inViewSpecs) {
            controlSpecs.start("visible");
        } else {
            controlSpecs.start("hidden");
        }
    }, [controlSpecs, inViewSpecs]);
    useEffect(() => {
        if (inViewBoxCharged) {
            controlBoxCharged.start("visible");
        } else {
            controlBoxCharged.start("hidden");
        }
    }, [controlBoxCharged, inViewBoxCharged]);
    useEffect(() => {
        if (inViewDna) {
            controlDna.start("visible");
        } else {
            controlDna.start("hidden");
        }
    }, [controlDna, inViewDna]);
    useEffect(() => {
        if (inViewMoon) {
            controlMoon.start("visible");
        } else {
            controlMoon.start("hidden");
        }
    }, [controlMoon, inViewMoon]);

    return (
        <>
            <Script src="/js/hotjar.js" strategy="afterInteractive" />
            <Head>
                <title>Ultraviolette F99 Electric Vehicles | Ultraviolette F99</title>
                <meta name="description" content="Discover Ultraviolette's F99 electric vehicles . Get ahead in the electric revolution with our special models." />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="canonical" href="https://www.ultraviolette.com/f99" />
                <meta property="og:image" content={`https://s3.ap-south-1.amazonaws.com/${encodeURIComponent("www.ultraviolette.com/f99/first.jpg")}`} />
                {/* <GraphTags
                    image={`${imageUrl}first.jpg`}
                    title="Ultraviolette F99 Electric Vehicles | Ultraviolette F99"
                    description="Discover Ultraviolette's F99 electric vehicles. Get ahead in the electric revolution with our special models."
                    url="https://www.ultraviolette.com/F99"
                /> */}
            </Head>
            <div className={Style.root}>
                <div className="w-full h-full ">
                    <div className="w-full h-full sm:h-[100%]">
                        <div className="">
                            <Image
                                alt="F99"
                                width={3000}
                                height={3000}
                                src={`${imageUrl}first.jpg`}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>
                    </div>


                    <div className={Style.headWrapper}>
                        <motion.div
                            ref={refBoxCharged}
                            variants={boxVariant}
                            initial="hidden"
                            animate={controlBoxCharged}
                        >
                            <div className="">
                                <Image
                                    alt="limited"
                                    width={isMobile ? 230 : 500}
                                    height={isMobile ? 100 : 200}
                                    src={"/images/F99/logo.png"}
                                />
                            </div>
                        </motion.div>
                    </div>


                </div>

                <div className={Style.vectorWrapper}>
                    <div className={Style.vectorBgImage}>
                        <div className="flex flex-col">
                            <div className="sm:my-20">
                                <TopHeader />
                            </div>
                            <div className={Style.integratedImage}>
                                <iframe
                                    className="w-full lg:h-[100vh] sm:h-[70vh] h-[45vh]"
                                    src="https://www.youtube.com/embed/yMIhX3wNRCo?autoplay=1&mute=1"
                                    id="youtube-player"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        <F99Spoke />

                        {/* Ultraviolette Images */}
                        <div>
                            <div className={Style.fullBikeWrapperMobile}>
                                <div className="w-full h-full sm:h-[100%]">
                                    <Image
                                        alt="Future_space_edition"
                                        src={`${imageUrl}side.jpg`}
                                        width={800}
                                        height={300}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:mt-[32px]">
                                <div className="flex flex-col sm:flex-row px-[88px]">
                                    <div className="w-full h-full sm:h-[100%]">
                                        <Image
                                            alt="Future_space_edition"
                                            src={`${imageUrl}side.jpg`}
                                            width={3000}
                                            height={3000}
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={Style.fullBikeWrapper}>
                            <div className="flex flex-col sm:flex-row w-full sm:px-[88px]">
                                <div className="flex flex-row mr-[63px] w-[771px] h-[474px]">
                                    <Image
                                        className={Style.imageContainer}
                                        alt="Ultraviolette F77 Special Edition"
                                        width={771}
                                        height={474}
                                        src={`${imageUrl}side2.jpg`}
                                    />
                                </div>
                                <div className="w-[474px] h-[474px] sm:hidden xl:block">
                                    <Image
                                        className={Style.imageContainer}
                                        alt="Ultraviolette F77 Special Edition"
                                        width={474}
                                        height={474}
                                        src={`${imageUrl}side3.jpg`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={Style.fullBikeWrapperMobile}>
                            <div>
                                <Image
                                    className={Style.imageContainer}
                                    alt="Ultraviolette F77 Special Edition"
                                    width={474}
                                    height={474}
                                    src={`${imageUrl}side2.jpg`}
                                />
                            </div>
                            <div>
                                <Image
                                    className={Style.imageContainer}
                                    alt="Ultraviolette F77 Special Edition"
                                    width={724}
                                    height={474}
                                    src={`${imageUrl}side3.jpg`}
                                />
                            </div>
                        </div>
                        <motion.div
                            ref={refExtraLine}
                            variants={boxVariant}
                            initial="hidden"
                            animate={controlExtraLine}
                            className={Style.extraline}
                        >
                        </motion.div>

                        {/* AERODYNAMICS section */}
                        <AerodynamicHeader />
                        <div>
                            <div className={Style.fullBikeWrapperMobile}>
                                <div className="w-full h-full sm:h-[100%]">
                                    <Image
                                        alt="Future_space_edition"
                                        src={`${imageUrl}aerodynamics.jpg`}
                                        width={800}
                                        height={300}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:mt-[32px]">
                                <div className="flex flex-col sm:flex-row px-[88px]">
                                    <div className="w-full h-full sm:h-[100%]">
                                        <Image
                                            alt="Future_space_edition"
                                            src={`${imageUrl}aerodynamics.jpg`}
                                            width={3000}
                                            height={3000}
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* tech spec section */}
                        <div className="flex flex-row sm:justify-between sm:mt-[84px]">
                            <div>
                                <TechSpec />
                                <div className="flex flex-row sm:w-full justify-between">
                                    <motion.div
                                        ref={refSpecs}
                                        variants={boxVariant}
                                        initial="hidden"
                                        animate={controlSpecs}
                                        className="flex flex-col pl-[26px] pr-[26px] mt-[43px] sm:pl-[0px] sm:pr-[0px] sm:ml-[88px] sm:mt-[50px]"
                                    >
                                        <div className="flex flex-row gap-[97px] sm:gap-[12px]">
                                            <div className="flex flex-col w-[115px] sm:w-[180px] ">
                                                <div className={Style.subhead1}>
                                                    <CountUpComp
                                                        countStart={1000}
                                                        countEnd={1400}
                                                        decimal={0}
                                                    />{" "}
                                                    mm
                                                </div>
                                                <div className={Style.subhead2}>Wheelbase</div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className={Style.subhead1}>
                                                    <CountUpComp
                                                        countStart={0}
                                                        countEnd={1050}
                                                        decimal={""}
                                                    />{" "}
                                                    mm
                                                </div>
                                                <div className={Style.subhead2}>Height</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row mt-[40px] gap-[97px] sm:mt-[54px] sm:gap-[12px]">
                                            <div className="flex flex-col w-[115px] sm:w-[180px] ">
                                                <div className={Style.subhead1}>
                                                    <CountUpComp
                                                        countStart={100}
                                                        countEnd={178}
                                                        decimal={""}
                                                    />{" "}
                                                    kg
                                                </div>
                                                <div className={Style.subhead2}>Weight</div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className={Style.subhead1}>120/70 R17</div>
                                                <div className={Style.subhead2}>Front Wheel</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row mt-[40px] gap-[97px] sm:mt-[54px] sm:gap-[12px]">
                                            <div className="flex flex-col w-[115px] sm:w-[180px] ">
                                                <div className={Style.subhead1}>180/55 R17</div>
                                                <div className={Style.subhead2}>Rear Wheel</div>
                                            </div>
                                            <div className="flex flex-col -mr-20 sm:-mr-0 w-1/3 sm:w-1/2">
                                                <div className={Style.subhead1}>Alluminium Construction</div>
                                                <div className={Style.subhead2}>Swingarm</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row mt-[40px] gap-[97px] sm:mt-[54px] sm:gap-[12px]">
                                            <div className="flex flex-col w-[115px] sm:w-[180px] ">
                                                <div className={Style.subhead1}>Carbon Fibre</div>
                                                <div className={Style.subhead2}>Bodywork</div>
                                            </div>
                                            <div className="flex flex-col -mr-20 sm:-mr-0 w-1/3 sm:w-1/2">
                                                <div className={Style.subhead1}>Steel Hybrid Construction</div>
                                                <div className={Style.subhead2}>FRAME</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                            </div>
                            <div className="hidden lg:pl-[90px] lg:pt-0 sm:pt-[20px] pr-[88px] lg:pb-[132px] sm:flex sm:items-center">
                                <div className="w-full h-[auto]">
                                    <Image
                                        className={Style.imageContainer}
                                        alt="animated_bike"
                                        width={1500}
                                        height={1500}
                                        src={`${imageUrl}specs.png`}
                                        style={{ objectFit: "cover", width: "100%" }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex mt-[29px] mb-[35px] pl-[22px] sm:pl-[14px] pr-[22px] sm:pr-[14px] sm:hidden">
                            <Image
                                alt="vector-image"
                                width={442}
                                height={30}
                                src={"/images/limited/vectorImage.svg"}
                            />
                        </div>
                        {/* last image */}
                        <div className="pb-6 sm:pb-20">
                            <div className={Style.fullBikeWrapperMobile}>
                                <div className="w-full h-full sm:h-[100%]">
                                    <Image
                                        alt="Future_space_edition"
                                        src={`${imageUrl}last.jpg`}
                                        width={800}
                                        height={300}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:mt-[32px]">
                                <div className="flex flex-col sm:flex-row px-[88px]">
                                    <div className="w-full h-full sm:h-[100%]">
                                        <Image
                                            alt="Future_space_edition"
                                            src={`${imageUrl}last.jpg`}
                                            width={3000}
                                            height={3000}
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <F99Enquiry imageUrl={imageUrl} />
                </div>
                <CommonFooter />
            </div>
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const country = context?.query?.country;

    return {
        props: {
            country: country
        },
    };
}

export default F99;
