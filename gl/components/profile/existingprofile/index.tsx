/* eslint-disable react/jsx-no-target-blank */

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import BaseStage from "../../../components/profile/stages/BaseStage";
import { UV_LOGO_IMAGE } from "../../../constants";
import { COUNTRIES_DATA } from "../../../constants/countryData";
import { NavbarContext } from "../../../contexts/NavbarContext";
import wheenLoading from "../../../public/loader/Wheel_loading_(White).json";
import {
  useLimitedPricingDetails,
  usePricingDetails,
} from "../../../queries/config";
import { originURL } from "../../../services/constants";
import { clearLocalStorage } from "../../../services/helper";
import { getcompleteUserProfile } from "../../../services/ProfileService";
import {
  BookingFlow,
  ConfigFlow,
  ReconfigureFlow,
  ReferrerFlow,
} from "../../../utils/CookieManagement";
import {
  covertToLocaleDateString,
  MapCss,
  toTitleCase,
} from "../../../utils/utils";
import CommonFooter from "../../molecules/CommonFooter";
import LottiePlayer from "../../molecules/lottiePlayer/lottie_player";
import Modal from "../../molecules/Modal";
import NewUser from "../../molecules/newUser";
import NewVipUser from "../../molecules/newVipUser";
import { ProfileCard } from "../../molecules/ProfileCard";
import { ProgressBar } from "../../molecules/ProgressBar";
import ViewTranscationHistoy from "../../payment/payment_gateway/transcation_history";
import Style from "./profile.module.scss";
const ExistingProfile = ({ country }) => {
  const { userData, isMobile } = useContext(NavbarContext);
  const [vip, setVip] = useState<any>({});
  const stages = [
    { step: "Stage 01", status: "F77 Configured", desc: "" },
    {
      step: "Stage 02",
      desc: "",
      status: "In-Production",
    },
    {
      step: "Stage 03",
      status: "Pre-delivery Checks",
      desc: "",
    },
    {
      step: "Stage 04",
      status: "Ready for take-off",
      desc: "",
    },
  ];
  const [profileDetails, setProfileDetails] = useState<any>();
  const [loader, setLoader] = useState(true);

  const [stage, setStage] = useState(0);
  const router = useRouter();

  const [pricingData, setPricingData] = useState([]);

  const { data: pricingDetails } = usePricingDetails(country, () => {});
  const { data: pricingDetailsLimited } = useLimitedPricingDetails(() => {});

  const [reconfigurePopup, setReconfigurePopup] = useState(false);

  const getUserCompleteProfile = async () => {
    try {
      const profileInfo = await getcompleteUserProfile({
        email: userData?.email,
      });

      setProfileDetails(profileInfo);
      setLoader(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (profileDetails) {
      if (profileDetails?.model === "limited") {
        setPricingData(pricingDetailsLimited?.items);
      } else {
        setPricingData(pricingDetails?.items);
      }
    }
  }, [profileDetails]);

  useEffect(() => {
    setLoader(true);
    if (userData?.email !== undefined) {
      getUserCompleteProfile();
    }
  }, [userData?.email]);

  useEffect(() => {
    const vipData = {
      yellow: profileDetails?.is_se && profileDetails?.is_vip,
      yellowbar: profileDetails?.is_se && !profileDetails?.is_vip,
      blank:
        (!profileDetails?.is_se && !profileDetails?.is_vip) ||
        (profileDetails?.is_se && !profileDetails?.is_vip),
    };
    setVip(vipData);
  }, [profileDetails]);

  const toggleStage = (stages): void => {
    let count = 0;
    stages?.forEach((sta, ind) => {
      if (sta) {
        count = ind;
      }
    });
    setStage(count);
  };
  useEffect(() => {
    toggleStage(profileDetails?.stage);
  }, [profileDetails]);

  useEffect(() => {
    toggleStage(profileDetails?.stage);
  }, [profileDetails]);

  const openCalander = () => {
    router.push(`configure/${profileDetails?.model}?open=rolloutCal`);
  };

  const GetAddress = () => {
    try {
      return `${
        COUNTRIES_DATA?.[userData?.country || ""]?.states?.[
          userData?.state || ""
        ]
      }, ${COUNTRIES_DATA?.[userData?.country || ""]?.name || ""} - ${
        userData.pincode
      }`;
    } catch (err) {
      return "";
    }
  };

  const GetDeltaPrice = () => {
    if (profileDetails?.items?.find((each) => each.id === 1)) {
      // @ts-ignore
      return pricingData?.find((e: any) => e.id === 9)?.price || 0;
    }

    if (profileDetails?.items?.find((each) => each.id === 2)) {
      // @ts-ignore
      return pricingData?.find((e: any) => e.id === 10)?.price || 0;
    }

    return 0;
  };

  // const deltaMapping = {
  //   'variant': 1,
  //   'uv_care':
  // }

  const signOut = () => {
    clearLocalStorage();
    ReferrerFlow.clearCookie();
    BookingFlow.clearCookie();
    ConfigFlow.clearCookie();
    router.push(`${originURL}/`);
  };

  const reconfigure = () => {
    // ReconfigureFlow.setCookie('A')
    setReconfigurePopup(true);
  };

  return (
    <>
      {loader ? (
        <div className="flex justify-center bg-[#1E1E1E] text-white relative">
          <div
            className={MapCss(
              Style,
              "color-white brutal",
              "absolute right-4 lg:right-8 top-8 lg:top-16 z-50 cursor-pointer flex text-[14px]"
            )}
            onClick={() => signOut()}
          >
            SIGN OUT
            <div className={MapCss(Style, "signout-arrow", "ml-1.5 ")}>
              <Image
                src="/images/profile/signout-arrow.png"
                width={8}
                height={8}
                alt="arrow"
              />
            </div>
          </div>
          <div className="">
            <LottiePlayer autoplay loop src={wheenLoading} />
          </div>
        </div>
      ) : (
        <div>
          {!userData?.booking_paid && !userData?.is_vip && (
            <NewUser name={profileDetails?.name} />
          )}

          {!userData?.booking_paid && userData?.is_vip && (
            <NewVipUser
              name={profileDetails?.name}
              id={profileDetails?.order_id}
              vip={vip.yellow}
              order_date={profileDetails?.order_date}
              model={profileDetails?.model}
              booking={false}
              email={profileDetails?.email}
            />
          )}

          {userData?.booking_paid && (
            <div className={MapCss(Style, "background")}>
              {/* top div */}
              <div className="w-full  h-full flex flex-row">
                {/*---------------------- Account details---------- */}
                <div className="w-full  h-full  flex-flex-col sm:ml-20 sm:mr-20 sm:w-2/3">
                  {/* account details header */}
                  <div
                    className={MapCss(
                      Style,
                      "eurostile color border",
                      "mt-5 pb-5  text-xl mx-6 font-normal sm:mt-16 sm:text-2xl sm:mx-0"
                    )}
                  >
                    ACCOUNT DETAILS
                  </div>
                  {/*hello pilot*/}
                  <div
                    className={MapCss(
                      Style,
                      "color-white brutal",
                      "mt-8 font-normal mx-6 text-sm sm:text-2xl sm:mx-0"
                    )}
                  >
                    Hello {toTitleCase(userData?.name)},
                    <div
                      className={MapCss(
                        Style,
                        "color-grey",
                        "font-normal text-xs mt-3 sm:mt-5 hidden sm:inline-block sm:text-lg"
                      )}
                    >
                      Congrats! You will be upgraded to F77 Mach 2 by default.
                      The booking amount will be adjusted against your final
                      payment. Please contact our customer support team for more
                      details.
                    </div>
                    <div className="sm:hidden mt-4 text-xs leading-[15px]">
                      Congrats! You will be upgraded to F77 Mach 2 by default.
                      The booking amount will be adjusted against your final
                      payment. Please contact our customer support team for more
                      details.
                    </div>
                  </div>
                  {/* -------------vip card for mobile only-------------------*/}
                  {!vip.blank && (
                    <div className={`w-2/3  sm:hidden mt-11`}>
                      <ProfileCard
                        name={profileDetails?.name}
                        id={profileDetails?.order_id}
                        vip={vip.yellow}
                        model={profileDetails?.model}
                        booking={true}
                      />
                    </div>
                  )}
                  {/* ----------------progress bar----------------- */}
                  <div className="mt-11 mx-6  sm:mb-16 sm:mx-0">
                    <div className="flex flex-row">
                      {/* progress bar */}
                      <div className="w-full flex flex-row sm:w-full  sm:flex-row">
                        {stages.map((ele, ind) => {
                          return (
                            <ProgressBar
                              key={ind}
                              vip={vip.yellow}
                              stage={stage}
                              ele={ele}
                              ind={ind}
                              orangebar={vip?.orangebar}
                            />
                          );
                        })}
                      </div>
                      {/* -------------vip card for mobile only-------------------*/}
                    </div>
                  </div>
                  {/* hover effect */}
                  {/* Render Components Based On Active Stage:=> By Mruytunjaya  */}

                  {
                    <BaseStage
                      index={stage}
                      stages={profileDetails?.stage}
                      vip={vip.yellow}
                      isKyc={profileDetails?.is_kyc}
                    />
                  }
                  {/*-----------------top border mobile view--------- */}
                  <div
                    className={MapCss(
                      Style,
                      "border",
                      "mt-1 ml-6 mr-6 sm:hidden sm:ml-0 sm:mr-0"
                    )}
                  ></div>
                  {/* order id */}
                  <div
                    className={MapCss(
                      Style,
                      "brutal color-white",
                      "mt-4 font-normal uppercase px-6 text-xs sm:text-2xl sm:mt-4 sm:px-0"
                    )}
                  >
                    Order ID: {profileDetails?.order_id}
                  </div>
                  {/* order date */}
                  <div className=" flex-row px-6 gap-14 mt-8 flex sm:px-0 sm:mt-4">
                    {/* date */}
                    <div
                      className={MapCss(
                        Style,
                        "color-grey brutal",
                        "font-normal text-xl hidden sm:flex"
                      )}
                    >
                      Order date:{" "}
                      {` ${covertToLocaleDateString(
                        profileDetails?.order_date
                      )}`}
                    </div>
                    {/* invoice */}
                    <div
                      className={MapCss(
                        Style,
                        "color-grey border brutal",
                        "hidden cursor-pointer font-normal text-xs sm:text-base"
                      )}
                    >
                      Download payment invoice
                    </div>
                    {/* cancel booking */}
                    {/* {profileDetails.booking_paid &&
                      !profileDetails.reconfigured && (
                        <div
                          onClick={() => {
                            reconfigure();
                          }}
                          className={MapCss(
                            Style,
                            "color-grey border brutal",
                            "cursor-pointer font-normal text-xs sm:text-base"
                          )}
                        >
                          Modify Order
                        </div>
                      )} */}
                    <div
                      className={MapCss(
                        Style,
                        "color-grey border brutal",
                        "cursor-pointer font-normal text-xs sm:text-base"
                      )}
                    >
                      {/* <a
                        href={`https://ultraviolette.typeform.com/to/wcWUxSWi#email=${profileDetails?.email}&order_id=${profileDetails?.order_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Refund Process
                      </a> */}
                      <a
                        href="/refund"
                        target="_blank"
                        rel="noopener noreferrer"
                        hrefLang="en-in"
                      >
                        Refund Process
                      </a>
                    </div>
                  </div>
                  {/* Show Transcation History */}
                  {
                    <ViewTranscationHistoy
                      // history={paymentHistories}
                      isMobile={isMobile}
                      className=""
                      isProfile
                    />
                  }

                  {/*-----------------top border--------- */}
                  <div
                    className={MapCss(
                      Style,
                      "border",
                      "mt-1 ml-6 mr-6  sm:ml-0 sm:mr-0"
                    )}
                  ></div>
                  {/* ----------------product div-------------- */}
                  <div className="mt-10 px-6 sm:mt-20 sm:px-0 ">
                    {profileDetails?.items?.map((e) => {
                      return (
                        <div
                          key={e.name}
                          className="flex flex-col gap-8 mb-5 sm:mb-16 sm:gap-16 sm:flex-row"
                        >
                          {/* image */}
                          <div className="">
                            <Image
                              src={
                                `${e.image_link.replace(
                                  "<model>",
                                  profileDetails?.model
                                )}` || UV_LOGO_IMAGE
                              }
                              width={140}
                              height={89}
                              alt="product"
                            />
                          </div>
                          {/* info */}
                          <div className="flex flex-row w-full gap-24  sm:gap-20 ">
                            {/* title */}
                            <div
                              className={MapCss(
                                Style,
                                "brutal color-white",
                                "font-medium w-1/2 text-sm sm:text-xl"
                              )}
                            >
                              {e.name}
                              <div
                                className={MapCss(
                                  Style,
                                  "brutal color-grey-2",
                                  "font-normal text-xs sm:text-base"
                                )}
                              >
                                {e.category}
                              </div>
                            </div>
                            {/* price */}
                            <div
                              className={MapCss(
                                Style,
                                "disketMono color-white",
                                "font-normal w-1/2  mr-6 text-xs sm:text-base sm:mr-0"
                              )}
                            >
                              {e.price === 0 ||
                              e.included ||
                              (profileDetails?.items?.find(
                                (ea) => ea.id === e.included_on
                              ) &&
                                e.category !== "VARIANT")
                                ? "INCLUDED"
                                : `INR ${
                                    e.category === "UV CARE" &&
                                    profileDetails?.model !== "limited"
                                      ? e.price - GetDeltaPrice()
                                      : e.price
                                  }`}
                            </div>
                          </div>
                          {/* border-bottom in mobile view */}
                          <div
                            className={MapCss(
                              Style,
                              "border",
                              "mt-1  sm:hidden"
                            )}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                  {/*-----------------bottom border--------- */}
                  <div
                    className={MapCss(Style, "border", "hidden sm:flex")}
                  ></div>
                  {/* delivery address */}
                  <div
                    className={MapCss(
                      Style,
                      "color-white brutal",
                      "mt-6 text-sm px-6 font-normal sm:text-base sm:mt-11 sm:px-0"
                    )}
                  >
                    <div className="w-full mb-6 text-base sm:mb-8 sm:text-xl">
                      TOTAL BOOKING ADVANCE : INR{" "}
                      {vip?.yellow || vip?.orangebar ? `40,000` : `25,000`}
                    </div>
                    Delivery address:
                    <br /> {GetAddress()}
                  </div>
                </div>

                {/* ----------------------vip card for desktop only----------------- */}
                {/* ----------signout blank user-------------------- */}
                {vip.blank && (
                  <div className="w-1/3 hidden sm:flex flex-col">
                    <div className="mt-[66px] hidden  sm:flex text-end justify-end  cursor-pointer">
                      <div
                        className={MapCss(
                          Style,
                          "color-white brutal",
                          "text-sm w-full"
                        )}
                        onClick={() => signOut()}
                      >
                        SIGN OUT
                      </div>
                      <div className={MapCss(Style, "signout-arrow", "ml-1 ")}>
                        <Image
                          src="/images/profile/signout-arrow.png"
                          width={8}
                          height={8}
                          alt="arrow"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {!vip.blank && (
                  <div className={`w-1/3 hidden sm:flex flex-col`}>
                    {/* ----------------vip card------- */}
                    <div className="mt-[66px] hidden  sm:flex text-end justify-end  cursor-pointer">
                      <div
                        className={MapCss(
                          Style,
                          "color-white brutal",
                          "text-sm w-full"
                        )}
                        onClick={() => signOut()}
                      >
                        SIGN OUT
                      </div>
                      <div className={MapCss(Style, "signout-arrow", "ml-1 ")}>
                        <Image
                          src="/images/profile/signout-arrow.png"
                          fill
                          className={Style.signoutImg}
                          alt="arrow"
                        />
                      </div>
                    </div>
                    <ProfileCard
                      name={profileDetails?.name}
                      id={profileDetails?.order_id}
                      vip={vip.yellow}
                      model={profileDetails?.model}
                      booking={true}
                    />
                  </div>
                )}
              </div>

              {/* bottom div */}
              <div
                className={MapCss(
                  Style,
                  "color-grey brutal",
                  "ml-0 px-6 w-full font-normal hidden sm:flex flex-col text-xs mt-10 pb-56 sm:ml-20 sm:w-5/6 sm:text-sm sm:px-0 sm:mt-20"
                )}
              >
                <div>
                  Please note that free cancellation is only applicable till
                  vehicle allotment.{" "}
                </div>
                <div>
                  For any queries regarding your booking, please contact
                  bookings@ultraviolette.com
                </div>
              </div>
              {/* bottom mobile */}
              <div
                className={MapCss(
                  Style,
                  "color-grey brutal",
                  "sm:hidden ml-0 px-6 w-full font-normal text-xs mt-10  sm:ml-20 sm:w-5/6 sm:text-sm sm:px-0 sm:mt-40"
                )}
              >
                Please note that free cancellation is only applicable till
                vehicle allotment.
                <div className="mt-5">
                  For any queries regarding your booking, please contact
                  bookings@ultraviolette.com
                </div>
              </div>
              {/* signout */}
              {/*-----------------top border--------- */}
              <div className="pb-56 pl-6 pr-6 sm:hidden">
                <div className={MapCss(Style, "border", "mt-7")}></div>
                <div className="mt-14 flex  sm:hidden   cursor-pointer">
                  <div
                    className={MapCss(Style, "color-white brutal", "text-sm")}
                    onClick={() => signOut()}
                  >
                    SIGN OUT
                  </div>
                  <div className={MapCss(Style, "signout-arrow", "ml-1 ")}>
                    <Image
                      src="/images/profile/signout-arrow.png"
                      width={8}
                      height={8}
                      alt="arrow"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {
            <Modal
              closeOnClickOutside
              state={reconfigurePopup}
              stateHandler={setReconfigurePopup}
              hasWidth={true}
            >
              <div className="bg-white px-10 py-10 rounded-md w-9/12 lg:w-[600px] relative">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setReconfigurePopup(false);
                  }}
                >
                  <Image
                    src={"/images/icons/cross.png"}
                    width={14}
                    height={14}
                    alt={"close"}
                    className="absolute top-5 right-5"
                  />
                </div>
                <div className="brutal mt-4  lg:mt-10">
                  Please note, you can only modify your order once. Any changes
                  made to your existing order may affect delivery timelines.
                </div>
                <div className="flex justify-between w-fit items-center space-x-3 mt-8">
                  <Link
                    href={`${originURL}/configure`}
                    onClick={() => {
                      ReconfigureFlow.setCookie("A");
                    }}
                    className="brutal text-sm underline"
                  >
                    Acknowledge and proceed to Reconfiguration
                  </Link>

                  <div
                    className="bg-[#373737] w-fit px-2 py-2 rounded-full "
                    onClick={() => {
                      ReconfigureFlow.setCookie("A");
                      router.push("/configure");
                    }}
                  >
                    <Image
                      src={"/images/icons/arrow-white.svg"}
                      width={12}
                      height={12}
                      alt={"close"}
                      className=" top-5 right-5"
                    />
                  </div>
                </div>
              </div>
            </Modal>
          }
        </div>
      )}
      <CommonFooter />
    </>
  );
};

export default ExistingProfile;
