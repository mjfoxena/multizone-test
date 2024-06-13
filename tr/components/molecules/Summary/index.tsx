/* eslint-disable react/jsx-no-target-blank */
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UV_LOGO_IMAGE } from "../../../constants";
import { NavbarContext } from "../../../contexts/NavbarContext";

import { DocumentConstants } from "../../../constants/document";
import {
  useLimitedPricingDetails,
  useLimitedSpaceAvailableStatus,
  usePricingDetails,
} from "../../../queries/config";
import { getOldUserInfo } from "../../../services/auth";
import {
  confirmReconfiguration,
  CreateOrder,
} from "../../../services/configuratorService";
import { originURL } from "../../../services/constants";
import { IUser } from "../../../services/ProfileService";
import { MapCss, toTitleCase } from "../../../utils/utils";
import { TooltipInfo } from "../../atoms/Cards/VariantCard";
import Modal from "../Modal";
import Style from "./index.module.scss";

const SummarySection = ({ bookings, finalModal, country }) => {
  const [checkbox, setCheckbox] = useState(false);

  const { data: pricingDetails, error } = usePricingDetails(country, () => {});

  const { data: pricingDetailsSE } = useLimitedPricingDetails(() => {});
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const info = {
    description:
      "This is your booking amount for the F77. As we move closer to the delivery of your bike, you will be updated regarding the down payment and EMI financing options",
  };

  const { userData } = useContext(NavbarContext);

  const router = useRouter();
  const { data: availableStatus } = useLimitedSpaceAvailableStatus(() => {});

  useEffect(() => {
    if (availableStatus === false && finalModal === "limited") {
      router.push(`${originURL}/`);
    }
  }, [availableStatus, finalModal]);

  const EachCard = ({ image, name, info, id, showRemove = true, item }) => {
    return (
      <>
        <div className="flex flex-row justify-between mt-4 mb-4 sm:mt-10 sm:mb-10">
          <div className="">
            <Image
              width={156}
              height={89}
              alt={"no img found"}
              src={image.replace("<model>", finalModal) || UV_LOGO_IMAGE}
            />
          </div>
          <div className="flex flex-row justify-between w-full ml-12">
            <div className="flex flex-col">
              <div className={Style.Bikename}>{name}</div>
              <div className={Style.InfoTag}>{info}</div>
            </div>
            <hr />
          </div>
        </div>
      </>
    );
  };

  const getSubCategory = (category) =>
    (finalModal === "limited"
      ? pricingDetailsSE?.category_config
      : pricingDetails?.sub_category_config
    )?.find(
      (e) =>
        e[finalModal === "limited" ? "category_id" : "sub_category_id"] ===
        category
    );

  const ProceedCheckout = async () => {
    if (userData.booking_paid) {
      if (!userData.reconfigured) {
        await confirmReconfiguration({ email: userData.email });
        router.push(`${originURL}/profile`);
      }
    } else {
      const result: IUser = await getOldUserInfo();
      const order = await CreateOrder({
        name: result.name,
        email: result.email,
        phone: result.phone,
        is_se: finalModal === "limited",
      });

      // @ts-ignore
      if (order.payment_session_id && window.Cashfree) {
        // @ts-ignore
        const cashfree = new window.Cashfree(order.payment_session_id);
        cashfree.redirect();
      }
    }
  };

  useEffect(() => {
    if (userData?.booking_paid) {
      setCheckbox(true);
    }
  }, [userData]);

  return (
    <>
      <div className={Style.root}>
        <div>
          <div
            className={MapCss(
              Style,
              "disketMono",
              "sm:hidden mt-4 pl-8 font-normal text-xs"
            )}
            onClick={() => router.back()}
          >
            {"< "}EDIT CONFIGURATION
          </div>
          <div className="flex w-full flex-row pb-5 mt-[37px] sm:mt-6 pl-8 pr-8 justify-between">
            <div className={Style.Heading}>SUMMARY</div>

            <div onClick={() => router.push(`/configure/${finalModal}`)}>
              <Image
                alt="cross"
                width={24}
                height={24}
                className="cursor-pointer"
                src={"/images/icons/cross-black.svg"}
              />
            </div>
          </div>
          <hr />

          <div className="flex w-full flex-col mt-6 pl-7 pr-7 sm:pl-14 sm:pr-8 justify-between">
            {/* @ts-ignore */}
            {bookings?.items?.map((e, i) => {
              const item = (
                finalModal === "limited" ? pricingDetailsSE : pricingDetails
              )?.items?.find((ea) => ea.id === e.id);
              return (
                <EachCard
                  item={item}
                  showRemove={
                    finalModal === "limited"
                      ? !item?.included || item?.category !== "variant"
                      : !item?.included && item?.category !== "variant"
                  }
                  id={e.id}
                  image={e.image_link}
                  info={
                    finalModal === "limited"
                      ? ""
                      : item?.sub_category === "choose_your_variant"
                      ? e.name
                      : getSubCategory(
                          item?.[
                            finalModal === "limited"
                              ? "category"
                              : "sub_category"
                          ]
                        )?.[
                          finalModal === "limited"
                            ? "category_name"
                            : "sub_category_name"
                        ]
                  }
                  name={
                    item.sub_category === "choose_your_variant"
                      ? toTitleCase(finalModal)
                      : e.name
                  }
                  key={i}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full relative">
          <div className="flex w-full flex-col mt-6 sm:mt-5 pl-7 pr-7 sm:pl-14 sm:pr-8 justify-between ">
            <div className="flex flex-row w-full justify-between items-center mb-4 sm:mb-5">
              <div
                className={MapCss(
                  Style,
                  "brutal",
                  "w-1/3 text-[10px] sm:mt-3 mt-1 sm:text-sm font-normal"
                )}
              >
                TOTAL
              </div>
              <div
                className={MapCss(
                  Style,
                  "brutal",
                  "w-1/3 sm:w-2/3 text-right font-normal text-[10px] sm:text-sm"
                )}
              >
                {finalModal !== "limited" && (
                  <span className="font-medium">
                    INR {bookings.total_emi_mo}/MO
                  </span>
                )}{" "}
                {finalModal !== "limited" ? "OR" : ""} INR{" "}
                {bookings.total_payable}/-
              </div>
            </div>
            <hr />

            {userData?.is_vip && (
              <div className="flex flex-row w-full justify-between  mt-8 sm:mb-1">
                <div className="text-[10px] lg:text-sm">
                  VIP PRE-BOOKING PAID
                </div>
                <div
                  className={MapCss(
                    Style,
                    "disketMono",
                    "text-[10px] lg:text-sm"
                  )}
                >
                  INR 10,000
                </div>
              </div>
            )}

            {userData?.booking_paid && (
              <div className="flex flex-row w-full justify-between  mt-8 sm:mb-1">
                <div className="text-[10px] lg:text-sm brutal">
                  BOOKING ADVANCE PAID
                </div>
                <div
                  className={MapCss(
                    Style,
                    "disketMono",
                    "text-[10px] lg:text-sm"
                  )}
                >
                  INR 25,000
                </div>
              </div>
            )}

            <div className="flex flex-row w-full justify-between  mt-5 sm:mb-1">
              <div className="">
                <div className="flex flex-row items-center gap-4">
                  <div
                    className={MapCss(
                      Style,
                      "brutal",
                      "font-medium text-xs sm:text-xl"
                    )}
                  >
                    DUE TODAY
                  </div>
                  {!userData?.booking_paid && (
                    <div
                      className="hidden sm:inline-block"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTooltipOpen(true);
                      }}
                    >
                      <Image
                        width={20}
                        height={20}
                        alt="text"
                        src={"/images/deliverydetails/info.png"}
                      />
                    </div>
                  )}
                </div>
                {!userData?.booking_paid && (
                  <div
                    className={MapCss(
                      Style,
                      "brutal",
                      "leading-7 text-xs font-normal hidden sm:inline-block"
                    )}
                  >
                    THE BOOKING ADVANCE FOR YOUR F77
                  </div>
                )}
              </div>
              <div className="">
                <div
                  className={MapCss(
                    Style,
                    "disketMono",
                    "text-xs sm:text-xl font-normal"
                  )}
                >
                  INR {bookings.due_today}
                </div>
              </div>
            </div>
          </div>

          {!userData?.booking_paid && (
            <div
              className={MapCss(
                Style,
                "brutal",
                " w-full mt-5 mb-0 text-[8px] pl-7 pr-7 sm:mb-0 sm:pl-14 sm:pr-8  sm:text-xs font-normal sm:mt-0"
              )}
            >
              Your booking amount is fully refundable and adjustable against
              your final payment for the order.
            </div>
          )}
          {!userData?.booking_paid ? (
            <div>
              <div className="flex flex-row mt-[32px] pl-7 pr-7 pb-0 mb-20 mr-7  sm:mr-20  sm:mt-[16px] sm:pl-14 sm:pr-8 sm:mb-40">
                <div className={Style.check}>
                  <input
                    type="checkbox"
                    checked={checkbox}
                    onChange={() => setCheckbox((prev) => !prev)}
                  />
                  <span className={Style.checkmark}></span>
                </div>
                <div className={Style.checkboxText}>
                  I accept Ultraviolette’s{" "}
                  <a
                    href={`${DocumentConstants.uvBookingAgreement}`}
                    className="underline cursor-pointer"
                    target="_blank"
                  >
                    Booking agreement
                  </a>{" "}
                  {/* and{" "} */}
                  {/* <a
                  href={"/legal/privacy-policy"}
                  className="underline cursor-pointer"
                >
                  Privacy Policy
                </a> */}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-32" />
          )}
          <div className="absolute left-0">
            <div
              className={MapCss(
                Style,
                `${checkbox ? "proceedError" : "proceed"}`
              )}
              onClick={() => checkbox && ProceedCheckout()}
            >
              <div className={Style.proccedText}>
                {userData?.booking_paid
                  ? "CONFIRM RECONFIGURATION"
                  : `PAY INR ${bookings.due_today}`}
              </div>
              <Image
                className={Style.arrowImage}
                alt="arrow-right"
                width={20}
                height={20}
                src={"/images/icons/horizontalWhiteArrow.svg"}
              />
            </div>
          </div>
        </div>
      </div>
      {
        <Modal
          state={tooltipOpen}
          stateHandler={setTooltipOpen}
          closeOnClickOutside
        >
          <TooltipInfo onclose={() => setTooltipOpen(false)} info={info} />
        </Modal>
      }
    </>
  );
};

export default SummarySection;
