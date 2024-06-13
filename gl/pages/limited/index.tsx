import Image from "next/image";
import { Router, useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import CommonFooter from "../../components/molecules/CommonFooter";
import Style from "../limited/limited.module.scss";
import { MapCss } from "../../utils/utils";
import { NavbarContext } from "../../contexts/NavbarContext";
import Head from "next/head";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Escape from "../../components/molecules/SpaceEdition/escape";
import LimitedSpoke from "../../components/molecules/SpaceEdition/limited77";
import NewLimit from "../../components/molecules/SpaceEdition/newLimit";
import CountUpComp from "../../components/molecules/Home/countUp/index";
import ReserveSpot from "../../components/molecules/SpaceEdition/reserve";
import { API_CONSTANTS } from "../../services/constants";
import Script from "next/script";
import { LiaDownloadSolid } from 'react-icons/lia';
import { useLimitedSpaceAvailableStatus } from "../../queries/config";
import GraphTags from "../../components/GraphTags";
import { GetServerSidePropsContext } from "next";


const specSHeetDownload = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/pdf/spec_sheet_space.pdf`;
const imageVideoUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/limited/`;
const imageUrl = `${API_CONSTANTS.BASE_URL_S3}/limited/`;

const SpaceEdition = () => {
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
        <title>Ultraviolette Limited Edition Electric Vehicles | Ultraviolette F77 Space Edition</title>
        <meta name="description" content="Discover Ultraviolette's limited edition electric vehicles . Get ahead in the electric revolution with our special models." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href="https://www.ultraviolette.com/limited" />
        <GraphTags
          title="Ultraviolette Limited Edition Electric Vehicles | Ultraviolette F77 Space Edition"
          description="Discover Ultraviolette's limited edition electric vehicles . Get ahead in the electric revolution with our special models."
          image=""
          url="https://www.ultraviolette.com/limited"
        />
      </Head>
      <div className={Style.root}>
        <div className="w-full h-full ">
          <div className="w-full h-full sm:h-[100%]">
            <div className="hidden sm:block">
              <video
                ref={videoOneRef}
                id="videoFirst"
                autoPlay={true}
                loop
                muted
                style={{ width: "100%", height: "100%" }}
              >
                <source src={`${imageVideoUrl}space_edition/landing.mp4`} />
              </video>
            </div>
            {/* for mobile */}
            <div className="block sm:hidden">
              <video
                ref={videoOneRef}
                id="videoFirst"
                autoPlay={true}
                loop
                muted
                style={{ width: "100%", height: "100%" }}
              >
                <source src={`${imageVideoUrl}space_edition/landing_sq.mp4`} />
              </video>
            </div>
          </div>
          <div className={Style.headWrapper}>
            <motion.div
              ref={refBoxCharged}
              variants={boxVariant}
              initial="hidden"
              animate={controlBoxCharged}
            >
              <div className="hidden sm:flex">
                <Image
                  alt="limited"
                  width={140}
                  height={32}
                  src={"/images/limited/f77.svg"}
                />
              </div>

              <div className="flex sm:hidden mb-1 sm:mb-0">
                <Image
                  alt="limited"
                  width={75}
                  height={16}
                  src={"/images/limited/f77.svg"}
                />
              </div>
            </motion.div>
            <div>
              <motion.div
                ref={refDna}
                variants={boxVariant}
                initial="hidden"
                animate={controlDna}
                className={MapCss(Style, "limited", "wow fadeInUp")}
              >
                SPACE EDITION
              </motion.div>
            </div>
            <div >
              <motion.div
                ref={refMoon}
                variants={boxVariant}
                initial="hidden"
                animate={controlMoon}
                className={Style.timeTravel}
              >
                <div className="text-left sm:text-end mt-1 sm:mt-0">Our Tribute to the Indian Space Odyssey</div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className={Style.vectorWrapper}>
          <div className={Style.vectorBgImage}>
            <div className="flex flex-col">
              <Escape />
              <div className={Style.integratedImage}>
                {/* <Image
                  className={Style.imageContainer}
                  alt="escape"
                  width={1261}
                  height={525}
                  src={`${imageVideoUrl}space_edition/2.jpg?123`}
                /> */}
                <iframe
                  className="w-full lg:h-[100vh] sm:h-[70vh] h-[45vh]"
                  src="https://www.youtube.com/embed/QFPlwHnzHFo?autoplay=1&mute=1"
                  id="youtube-player"
                  allowFullScreen
                ></iframe>


              </div>
            </div>
            <LimitedSpoke />

            {/* booked Image */}
            {isSoldOut ? (
              <div>
                <div className={Style.fullBikeWrapperMobile}>
                  <div className="w-full h-full sm:h-[100%]">
                    <Image
                      alt="Future_space_edition"
                      src="/images/limited/bookedM.png"
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
                        src="/images/limited/booked.png"
                        width={3000}
                        height={300}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>

              </div>
            )}

            <div className={Style.fullBikeWrapper}>
              <div className="flex flex-col sm:flex-row w-full sm:px-[88px]">
                <div className="flex flex-row mr-[63px] w-[771px] h-[474px]">
                  <Image
                    className={Style.imageContainer}
                    alt="Ultraviolette F77 Special Edition"
                    width={771}
                    height={474}
                    src={`${imageVideoUrl}space_edition/3.jpg`}
                  />
                </div>
                <div className="w-[474px] h-[474px]">
                  <Image
                    className={Style.imageContainer}
                    alt="Ultraviolette F77 Special Edition"
                    width={474}
                    height={474}
                    src={`${imageVideoUrl}space_edition/4.jpg`}
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
                  src={`${imageVideoUrl}space_edition/3.jpg`}
                />
              </div>
              <div>
                <Image
                  className={Style.imageContainer}
                  alt="Ultraviolette F77 Special Edition"
                  width={724}
                  height={474}
                  src={`${imageVideoUrl}space_edition/4.jpg`}
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
              Future focused material innovation driven by aerospace grade aluminum structures, meticulously engineered to mirror the precision of space-bound mechanisms.
            </motion.div>
            <div className={Style.fullBikeWrapperMobile}>
              <div className="w-full h-full sm:h-[100%]">
                <Image
                  alt="Ultraviolette EV F77 Special Edition"
                  src={`${imageUrl}space_edition/5.jpg`}
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
                    alt="Ultraviolette EV F77 Special Edition"
                    src={`${imageUrl}space_edition/5.jpg`}
                    width={2000}
                    height={300}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row sm:justify-between sm:mt-[84px]">
              <div>
                <NewLimit />
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
                            countStart={100}
                            countEnd={152}
                            decimal={0}
                          />{" "}
                          kmph
                        </div>
                        <div className={Style.subhead2}>top speed</div>
                      </div>
                      <div className="flex flex-col">
                        <div className={Style.subhead1}>
                          <CountUpComp
                            countStart={0}
                            countEnd={2.9}
                            decimal={1}
                          />{" "}
                          sec
                        </div>
                        <div className={Style.subhead2}>0-60 km/h</div>
                      </div>
                    </div>
                    <div className="flex flex-row mt-[40px] gap-[97px] sm:mt-[54px] sm:gap-[12px]">
                      <div className="flex flex-col w-[115px] sm:w-[180px] ">
                        <div className={Style.subhead1}>Boost charger</div>
                        <div className={Style.subhead2}>included</div>
                      </div>
                      <div className="flex flex-col">
                        <div className={Style.subhead1}>307 km</div>
                        <div className={Style.subhead2}>idc Range</div>
                      </div>
                    </div>
                    <div className="flex flex-row mt-[40px] gap-[97px] sm:mt-[54px] sm:gap-[12px]">
                      <div className="flex flex-col w-[115px] sm:w-[180px] ">
                        <div className={Style.subhead1}>
                          <CountUpComp
                            countStart={70}
                            countEnd={100}
                            decimal={0}
                          />{" "}
                          nm
                        </div>
                        <div className={Style.subhead2}>torque</div>
                      </div>
                      <div className="flex flex-col">
                        <div className={Style.subhead1}>
                          <CountUpComp
                            countStart={0}
                            countEnd={7.8}
                            decimal={1}
                          />{" "}
                          sec
                        </div>
                        <div className={Style.subhead2}>0-100 km/h</div>
                      </div>
                    </div>
                    <div className="flex flex-row mt-[40px] gap-[97px] sm:mt-[54px] sm:gap-[12px]">
                      <div className="flex flex-col w-[115px] sm:w-[180px]">
                        <div className={Style.subhead1}>
                          <CountUpComp
                            countStart={0}
                            countEnd={8}
                            decimal={0}
                          />{" "}
                          years
                        </div>
                        <div className={Style.subhead2}>warranty</div>
                      </div>
                      <div className="flex flex-col sm:w-[155px]">
                        <div className={Style.subhead1}>uvcare max</div>
                        <div className={Style.subhead2}>included</div>
                      </div>
                    </div>
                    {/* doownload specsheet */}
                    <div
                      className={`mt-12 flex items-center ${Style.fullSpecs}`}
                      onClick={() =>
                        fetch(specSHeetDownload).then((response) => {
                          response.blob().then((blob) => {
                            const fileURL = window.URL.createObjectURL(blob);
                            let alink = document.createElement("a");
                            alink.href = fileURL;
                            alink.download = "Specs_Sheet.pdf";
                            alink.click();
                          });
                        })
                      }
                    >
                      DOWNLOAD FULL SPECIFICATION
                      <LiaDownloadSolid size={isMobile ? 18 : 24} />
                    </div>

                    {/* image logo */}
                    <div className="hidden sm:flex sm:mt-[43px]">
                      <Image
                        alt="vector-image"
                        width={442}
                        height={38}
                        src={"/images/limited/vectorImage.svg"}
                      />
                    </div>
                  </motion.div>
                </div>

              </div>
              <div className="hidden xl:pl-10 lg:-ml-8 pt-[20px] pr-[88px] pb-[132px] sm:flex sm:items-center">
                <div className="w-full h-[700px] ml-20 lg:ml-0 mt-6 lg:mt-0">
                  <Image
                    className={Style.imageContainer}
                    alt="halfBike"
                    width={678}
                    height={879}
                    src={`${imageVideoUrl}space_edition/6.jpg`}
                    style={{objectFit: 'cover'}}
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-[29px] mb-[35px] pl-[14px] pr-[14px] sm:hidden">
              <Image
                alt="vector-image"
                width={442}
                height={30}
                src={"/images/limited/vectorImage.svg"}
              />
            </div>
          </div>
          <ReserveSpot imageUrl={imageVideoUrl} />
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

export default SpaceEdition;