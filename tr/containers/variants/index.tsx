import { useContext, useEffect, useRef, useState } from "react";
import ConfigureSteps from "./sections/configureSteps";
import SidePanel from "../../components/molecules/SidePanel";
import { NavbarContext } from "../../contexts/NavbarContext";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Style from "./variant.module.scss";
import VariantInfo from "./sections/VariantInfo";
import RolloutCalendar from "./sections/RolloutCal";
import CompareVariants from "./sections/CompareVariants";
import VariantInfoMobile from "./sections/VariantInfoMobile";
import { TextElement } from "../../components/atoms/Texts";
import { useRouter } from "next/router";
import PotentitalSavings from "./sections/PotentialSavings";
import Summary from "../../components/molecules/Summary";
import LimitedConfigureStep from "../../components/molecules/LimitedConfigure";
import { ConfigFlow } from "../../utils/CookieManagement";
import { ConfigCarousel } from "./sections/ConfigCarousel";
import {
  GetUserBooking,
  GetUserReBookingSummary,
  UpdateUserBooking,
} from "../../services/configuratorService";
import {
  useSpaceimitedPricingDetails,
  usePricingDetails,
} from "../../queries/config";
import { TooltipInfo } from "../../components/atoms/Cards/VariantCard";
import Modal from "../../components/molecules/Modal";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import { delBookingConfig, getUserIds } from "../../services/helper";
import React from "react";
import { GetServerSidePropsContext } from "next";
import SummarySection from "../../components/molecules/Summary";

export const sidebarSteps = {
  rolloutCal: "rolloutCal",
  sidebarStep1: "sidebarStep1",
  compareVariants: "compareVariants",
  potentialSavings: "potentialSavings",
  summary: "summary",
  limited: "limited",
};

const VariantContainer = ({ step, country }) => {
  const { sidebarOpen, isMobile, userData } = useContext(NavbarContext);

  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const { data: pricingDetails } = usePricingDetails(country, () => {});
  const { data: pricingDetailsLimited } = useSpaceimitedPricingDetails(() => {});

  const [finalModal, setFinalModal] = useState("");

  const [bookingItems, setBookingItems] = useState([]);
  const [bookings, setBookings] = useState<any>({});

  const [configTooltip, setConfigTooltip] = useState(null);

  const [sidebarTab, setSidebarTab] = useState(
    finalModal === "limited" && step !== "summary"
      ? "limited"
      : step
      ? step
      : sidebarSteps.sidebarStep1
  );

  const GetConf = async () => {
    if (userData?.email) {
      if (userData.booking_paid) {
        // @ts-ignore
        const booking = await GetUserReBookingSummary({
          email: userData?.email,
        });
        // console.log(booking, "booking is here");
        setBookings(booking);
        // Set Up Sidebar and Modal based on the bookings
        setModalAndSidebar(booking);
      } else {
        // @ts-ignore
        const booking = await GetUserBooking({ email: userData?.email });
        setBookings(booking);
        // Set Up Sidebar and Modal based on the bookings
        setModalAndSidebar(booking);
      }
    } else {
    }
  };

  const setModalAndSidebar = (booking = {}) => {
    setSidebarTab(
      (step === "summary"
        ? // @ts-ignore
          booking.model || userData?.model || ""
        : router?.query?.variant) === "limited" && step !== "summary"
        ? "limited"
        : step
        ? step
        : sidebarSteps.sidebarStep1
    );
    setFinalModal(
      step === "summary"
        ? // @ts-ignore
          booking.model || userData?.model || ""
        : (router?.query?.variant as string)
    );
  };

  useEffect(() => {
    setModalAndSidebar(bookings);
  }, [step, userData, router.query]);

  useEffect(() => {
    delBookingConfig();
  }, []);

  useEffect(() => {
    if (step === sidebarSteps.summary) {
      GetConf();
    }
  }, [step, userData?.email]);

  useEffect(() => {
    const details =
      finalModal == "limited" ? pricingDetailsLimited : pricingDetails;

    const temp = bookings?.items?.map((e) => {
      return details?.items?.find((ea) => ea.id === e.id) || {};
    });
    setBookingItems(temp);
  }, [bookings, pricingDetails, pricingDetailsLimited, finalModal]);

  const RemoveBooking = async (id) => {
    await UpdateUserBooking({
      email: getUserIds()?.email?.email,
      model: finalModal as string,
      booking_configuration: bookings.items
        ?.filter((e) => e.id !== id)
        .map((e) => e.id),
      pay_option: "emi",
      limited_type: "space",
      country: country,
    });
    GetConf();
  };

  const renderTab = (from) => {
    switch (sidebarTab) {
      case sidebarSteps.sidebarStep1:
        return (
          <ConfigureSteps
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            setSidebarTab={setSidebarTab}
            country={country}
          />
        );
      case sidebarSteps.rolloutCal:
        return (
          <RolloutCalendar
            finalModal={finalModal}
            setSidebarTab={setSidebarTab}
            country={country}
          />
        );
      case sidebarSteps.compareVariants:
        return <CompareVariants setSidebarTab={setSidebarTab} />;
      case sidebarSteps.potentialSavings:
        return (
          <PotentitalSavings
            finalModal={finalModal}
            setSidebarTab={setSidebarTab}
            country={country}
          />
        );
      case sidebarSteps.summary:
        return (
          <SummarySection
            finalModal={finalModal}
            bookings={bookings}
            country={country}
          />
        );
      case sidebarSteps.limited:
        return (
          <LimitedConfigureStep
            finalModal={finalModal}
            sidebarTab={sidebarTab}
            setSidebarTab={setSidebarTab}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
            country={country}
          />
        );
    }
  };

  // clear flow cookie
  useEffect(() => {
    if (step === sidebarSteps.summary && ConfigFlow.getValue() === "next") {
      ConfigFlow.clearCookie();
    }
  }, [step]);

  const sidePanelRef = useRef(null);

  useOutsideClick(sidePanelRef, () => {
    setSidebarTab((e) => {
      if (
        [
          sidebarSteps.compareVariants,
          sidebarSteps.rolloutCal,
          sidebarSteps.potentialSavings,
        ].includes(e)
      ) {
        if (router.asPath.includes("summary")) {
          return sidebarSteps.summary;
        } else if (router.asPath.includes("limited")) {
          return sidebarSteps.limited;
        } else {
          return sidebarSteps.sidebarStep1;
        }
      } else {
        return e;
      }
    });
  });

  return (
    <div className="">
      <Modal state={Boolean(configTooltip)} stateHandler={() => {}}>
        {configTooltip && (
          <TooltipInfo
            info={configTooltip as any}
            onclose={() => setConfigTooltip(null)}
          />
        )}
      </Modal>

      {[
        sidebarSteps.sidebarStep1,
        sidebarSteps.summary,
        sidebarSteps.limited,
      ].includes(sidebarTab) && !isMobile ? (
        <>
          <div className={Style.confignextstep}>
            <div className={Style.left}>
              <ConfigCarousel
                finalModal={finalModal}
                selectedItems={
                  sidebarTab === sidebarSteps.summary
                    ? bookingItems
                    : selectedItems
                }
                limited_type="space"
              />
              {!isMobile && (
                <div className={"absolute bottom-0 z-0 left-0 right-0"}>
                  <VariantInfo
                    finalModal={finalModal}
                    setConfigTooltip={setConfigTooltip}
                    width="100%"
                    sidebarTab={sidebarTab}
                    setSidebarTab={setSidebarTab}
                  />
                </div>
              )}
            </div>

            <div className="flex">{renderTab(1)}</div>

            {!isMobile && (
              <div
                className={Style.configureBack}
                onClick={() => {
                  router.back();
                }}
              >
                {
                  TextElement({
                    text: "<",
                    fontSize: 12,
                    fontName: "disketMono",
                  }).MEDUIM.BLACK
                }
                {
                  TextElement({
                    text: "BACK",
                    fontSize: 12,
                    fontName: "disketMono",
                    className: "underline",
                  }).MEDUIM.BLACK
                }
              </div>
            )}

            {/* Variant info */}
          </div>
        </>
      ) : (
        <>
          <div className="relative">
            {!isMobile && (
              <div
                className={Style.configureBack}
                onClick={() => {
                  router.back();
                }}
              >
                {
                  TextElement({
                    text: "<",
                    fontSize: 12,
                    fontName: "disketMono",
                  }).MEDUIM.BLACK
                }
                {
                  TextElement({
                    text: "BACK",
                    fontSize: 12,
                    fontName: "disketMono",
                    className: "underline",
                  }).MEDUIM.BLACK
                }
              </div>
            )}

            {!isMobile && (
              <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#0000007a] z-10" />
            )}
            <ConfigCarousel
              finalModal={finalModal}
              selectedItems={
                sidebarTab === sidebarSteps.summary
                  ? bookingItems
                  : selectedItems
              }
              limited_type="space"
            />

            {isMobile && (
              <VariantInfoMobile
                finalModal={finalModal}
                setConfigTooltip={setConfigTooltip}
                setSidebarTab={setSidebarTab}
                sidebarTab={sidebarTab}
              />
            )}
          </div>

          {/* Variant info */}
          {!isMobile && (
            <div className={"absolute bottom-0 z-0"}>
              <VariantInfo
                finalModal={finalModal}
                setConfigTooltip={setConfigTooltip}
                sidebarTab={sidebarTab}
                setSidebarTab={setSidebarTab}
              />
            </div>
          )}

          {/* sidebar: configure steps */}
          {sidebarOpen && !isMobile && (
            <div>
              <SidePanel isLimited={sidebarTab === "limited"}>
                {renderTab(2)}
              </SidePanel>
            </div>
          )}

          {/* {isMobile && sidebarTab === sidebarSteps.sidebarStep1 ? (
            renderTab(3)
          ) : (
            <div ref={sidePanelRef}>
              <SidePanel isLimited={sidebarTab === "limited"}>
                {renderTab(4)}
              </SidePanel>
            </div>
          )} */}
        </>
      )}

      {/* extra space in mobile for scroll behind footer */}
      {isMobile && <div className="h-32" />}
    </div>
  );
};

export default VariantContainer;
