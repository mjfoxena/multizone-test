import Image from "next/image";
import Style from "../variant.module.scss";

import { sidebarSteps } from "..";
import { ClosableGridSidePanel } from "../../../components/molecules/ClosableGridPanel";
import { useContext } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { MapCss } from "../../../utils/utils";
import { TextElement } from "../../../components/atoms/Texts";
import { ConfigFlow, ReferrerFlow } from "../../../utils/CookieManagement";
import Link from "next/link";
import { useRouter } from "next/router";
import { originURL } from "../../../services/constants";

const Phases = [
  {
    phase: "PHASE 1",
    active: true,
    phases: [{ location: "BANGALORE", DATE: "Bookings Open", active: true }],
  },
  {
    phase: "PHASE 2",
    active: true,
    phases: [
      {
        location:
          "CHENNAI, MUMBAI, PUNE, COCHIN, HYDERABAD, VISHAKHAPATNAM, AHMEDABAD, CALICUT",
        DATE: "Bookings Open",
        active: true,
      },
      {
        location:
          "COIMBATORE, DELHI, GURUGRAM, KOLKATA, LUCKNOW, GUWAHATI, LUDHIANA, SURAT",
        DATE: "Q3, 2024",
        active: false,
      },
      {
        location: "TRIVANDRUM, JAIPUR, SILIGURI, MADURAI, PATNA",
        DATE: "Q4, 2024",
        active: false,
      },
    ],
  },
  {
    phase: "PHASE 3",
    phases: [
      { location: "EUROPE", DATE: "Q3, 2024", active: false },
      { location: "NORTH AMERICA", DATE: "Q4, 2024", active: false },
      { location: "SOUTH AMERICA", DATE: "Q4, 2024", active: false },
      { location: "JAPAN", DATE: "Q4, 2024", active: false },
      { location: "SE ASIA + OCEANIA", DATE: "Q1, 2025", active: false },
    ],
  },
];

const EachPhase = ({ phase }) => {
  return <div></div>;
};

const RolloutCalendar = ({
  setSidebarTab,
  finalModal,
  signinDisable = false,
  fromFooter = false,
  country,
}) => {
  const { isMobile, userData } = useContext(NavbarContext);

  const router = useRouter();

  const InitiateRolloutFlow = () => {
    ConfigFlow.setCookie("rollout");
    ReferrerFlow.setCookie(router.asPath);
  };

  const intrestText =
    country === "IN"
      ? "Don't see your city? Express interest."
      : "Don't see your county? Express interest.";
  const intrestbutton =
    country === "IN"
      ? "SIGN IN TO BRING US TO YOUR CITY"
      : "SIGN IN TO BRING US TO YOUR COUNTRY";
  const description =
    country === "IN"
      ? "Booking is currently available for India only. F77 deliveries kickstarted in Bangalore last year and now have expanded to 8 more cities in India. You can locate us here. We want to prioritise the best experience for you. This list will be expanding soon."
      : "Booking is currently available for India only. Phase 1 of the F77 deliveries has started in Bangalore, Mumbai, Chennai & Hyderabad. We will update service and delivery timelines for other regions shortly. We want to prioritise the best experience for you. This list will be expanding soon.";

  return (
    <ClosableGridSidePanel
      autoWidth={fromFooter}
      title={"ROLL-OUT CALENDAR"}
      onClose={() => {
        if (router.asPath.includes("summary")) {
          setSidebarTab(sidebarSteps.summary);
        } else if (finalModal === "limited") {
          setSidebarTab(sidebarSteps.limited);
        } else {
          setSidebarTab(sidebarSteps.sidebarStep1);
        }
      }}
    >
      <div className="flex-1 mt-6 mb-[12vh] sm:mb-0 overflow-y-scroll h-auto pr-5 sm:pr-7 -mr-5">
        <div>
          {
            TextElement({
              text: description,
              fontSize: isMobile ? 13 : 20,
            }).REGULAR.BLACK
          }
        </div>

        <div className="mt-10 lg:mt-20 mb-4 sm:h-full">
          {Phases.map((e, i) => (
            <div
              key={i}
              className={Style.eachPhase}
              style={i === Phases.length - 1 ? { borderBottom: "none" } : {}}
            >
              <div className="min-w-max -mt-1">
                {e.active
                  ? TextElement({ text: e.phase, fontSize: isMobile ? 14 : 20 })
                      .MEDUIM.REDPRIMARY
                  : TextElement({ text: e.phase, fontSize: isMobile ? 14 : 20 })
                      .MEDUIM.BLACK}
              </div>
              <div className="w-full mt-5 lg:mt-0  lg:ml-36 space-y-6">
                {e.phases.map((eachLoc, ind) => (
                  <div key={ind} className="flex justify-between w-full">
                    <div className="flex">
                      {eachLoc.active
                        ? TextElement({
                            text: eachLoc.location,
                            fontSize: isMobile ? 11 : 16,
                          }).MEDUIM.REDPRIMARY
                        : TextElement({
                            text: eachLoc.location,
                            fontSize: isMobile ? 10 : 16,
                          }).REGULAR.BLACK}
                    </div>
                    <div className="">
                      {!eachLoc.active
                        ? TextElement({
                            text: eachLoc.DATE,
                            fontSize: isMobile ? 11 : 16,
                          }).REGULAR.BLACK
                        : TextElement({
                            text: eachLoc.DATE,
                            fontSize: isMobile ? 10 : 16,
                          }).MEDUIM.REDPRIMARY}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* {!userData?.email &&
            !signinDisable &&
            (isMobile ? (
              <div className="fixed bottom-0 left-0 right-0">
                {
                  TextElement({
                    text: intrestText,
                    fontSize: 12,
                    className: "px-4 mb-2",
                  }).REGULAR.GRAY6
                }
                <div className="w-full bg-black text-white px-7 py-3 flex justify-between">
                  <div>{intrestbutton}</div>
                  <Image
                    alt="arrow-right"
                    width={12}
                    height={12}
                    src={"/images/icons/arrow-right-white.svg"}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-8 flex items-center space-x-8">
                {
                  TextElement({
                    text: intrestText,
                    fontSize: 20,
                  }).REGULAR.GRAY6
                }

                <Link href={`${originURL}/signin`}>
                  <div
                    onClick={() => InitiateRolloutFlow()}
                    className="bg-black flex items-center px-5 py-2.5 cursor-pointer space-x-2"
                  >
                    {TextElement({ text: intrestbutton }).REGULAR.GRAY1}
                    <Image
                      alt="arrow-right"
                      width={12}
                      height={12}
                      src={"/images/icons/arrow-right-white.svg"}
                    />
                  </div>
                </Link>
              </div>
            ))} */}
        </div>
      </div>
    </ClosableGridSidePanel>
  );
};

export default RolloutCalendar;
