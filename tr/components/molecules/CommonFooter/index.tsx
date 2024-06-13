import Image from "next/image";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import { MapCss } from "../../../utils/utils";
import Modal from "../Modal";
import Style from "./commonfooter.module.scss";
import RolloutCalendar from "../../../containers/variants/sections/RolloutCal";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { originURL } from "../../../services/constants";
import { useRouter } from "next/router";
import SideTab from "../../configure/sidetabs";
import useOutsideClick from "../../../utils/hooks/useOutsideClick";

export const sidebarSteps = {
  sidebarStep1: "sidebarStep1",
  rolloutCal: "rolloutCal",
};

const CommonFooter = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const fullYear = new Date().getFullYear();
  const [sidebarTab, setSidebarTab] = useState(sidebarSteps.sidebarStep1);

  const { isMobile } = useContext(NavbarContext);

  const darkNavRoutes = [
    "/f77",
    "/smarttech",
    "/uvracing",
    "/f99",
    "/squadron",
    "/retail",
    "/404",
  ];

  const footerTheme =
    darkNavRoutes.find((route) => router.pathname.includes(route)) ||
    router.pathname.length === 1
      ? "black"
      : "white";

  const renderTab = (form) => {
    switch (sidebarTab) {
        case sidebarSteps.rolloutCal:
            return <RolloutCalendar setSidebarTab={setSidebarTab} finalModal="" country="IN"/>;
        default:
            return null;
    }
  };

  const sidePanelRef = useRef(null);
    useOutsideClick(sidePanelRef, () => {
        setSidebarTab((e) => {
            if (
                [sidebarSteps.rolloutCal].includes(e)
            ) {
                return sidebarSteps.sidebarStep1;
            } else {
                return e;
            }
        });
    });

  return (
    <div
      className={`w-full h-full flex justify-center items-center ${
        footerTheme === "black" ? "bg-black" : "bg-white"
      } `}
    >
      <div className="w-full h-full max-w-[1366px] ">
        <Modal state={modal} stateHandler={setModal} closeOnClickOutside>
          <div className="bg-white w-[90%] px-4">
            <RolloutCalendar
              fromFooter
              signinDisable
              finalModal={""}
              setSidebarTab={() => {
                setModal(false);
              }}
              country={"IN"}
            />
          </div>
        </Modal>

        <div className="w-full flex flex-col p-6 sm:w-[85%] sm:flex-row sm:justify-between   sm:pt-10 sm:pb-10 sm:ml-20 sm:mr-20 sm:pl-0 sm:pr-0 ">
          <div className="sm:flex-col  justify-between  ">
            <div className="col-span-1">
              {footerTheme === "white" ? (
                <Image
                  src={"/images/home/newhome/footer/uvLogo1.svg"}
                  width={isMobile ? 150 : 220}
                  height={24}
                  alt="uv-logo"
                  className="hidden sm:flex"
                />
              ) : (
                <Image
                  src={"/images/home/newhome/footer/uvLogo2.svg"}
                  width={isMobile ? 150 : 220}
                  height={24}
                  alt="uv-logo"
                  className="hidden sm:flex"
                />
              )}
            </div>
            <div
              className={MapCss(
                Style,
                "footerDesc",
                "flex justify-between items-start sm:flex-col sm:mt-12"
              )}
            >
              <div
                className={`${
                  footerTheme === "black" ? "text-[#FFFFFF]" : "text-[#000]"
                }`}
              >
                <p>The future takes off</p>
                <p>with us.</p>
              </div>
              {footerTheme === "black" ? (
                <Image
                  src={"/images/home/newhome/uvWhitelogo.svg"}
                  width={isMobile ? 150 : 265}
                  height={24}
                  alt="uv-logo"
                  className="sm:hidden "
                />
              ) : (
                <Image
                  src={"/images/home/newhome/uvBlacklogo.svg"}
                  width={isMobile ? 150 : 265}
                  height={24}
                  alt="uv-logo"
                  className="sm:hidden "
                />
              )}
            </div>
          </div>
          <div
            className={`flex h-auto border-b-2 ${
              footerTheme === "black" ? "border-[#3C3C3C]" : "border-[#CECECE]"
            }  mt-2 mb-2 sm:ml-12 sm:mr-12 sm:hidden`}
          ></div>

          <div className="flex  flex-col w-full sm:w-auto sm:flex-row  sm:gap-32 ">
            <div className="sm:flex sm:flex-col ">
              <div
                className={`${Style.brutalSubhead} ${
                  footerTheme === "black" ? "text-[#FFFFFF]" : "text-[#000]"
                } `}
              >
                F77
              </div>
              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a href={`${originURL}/faq`} hrefLang="en-in">
                  FAQ&apos;s
                </a>
              </div>

              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a href={`${originURL}/limited`} hrefLang="en-in">
                  Limited
                </a>
              </div>
              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a href={`${originURL}/location`} hrefLang="en-in">
                  Locations
                </a>
              </div>

              {/* background color when the popup model is opened */}
              {sidebarTab === sidebarSteps.rolloutCal && !isMobile && (
                  <div className="fixed top-0 right-0 left-0 bottom-0 bg-[#0000007a] z-10" />
              )}

              {/* render tab */}
              <div ref={sidePanelRef}>
                  <SideTab>{renderTab(1)}</SideTab>
              </div>

              <div
                className={`cursor-pointer ${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
                onClick={() => setSidebarTab(sidebarSteps.rolloutCal)}
              >
                  Rollout Calendar
              </div>

              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a href={`${originURL}/enquiry`} hrefLang="en-in">
                  Enquiry
                </a>
              </div>
              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a
                  href={"https://ultraviolette.typeform.com/retail"}
                  target="_blank"
                  rel="noopener noreferrer"
                  hrefLang="en-in"
                >
                  Retail Partnership
                </a>
              </div>
            </div>

            <div
              className={`flex h-auto border-b-2 ${
                footerTheme === "black"
                  ? "border-[#3C3C3C]"
                  : "border-[#CECECE]"
              }  mt-2 mb-2 sm:ml-12 sm:mr-12 sm:hidden`}
            ></div>
            <div className="sm:flex sm:flex-col ">
              <div
                className={`${Style.brutalSubhead} ${
                  footerTheme === "black" ? "text-[#FFFFFF]" : "text-[#000]"
                } `}
              >
                Ultraviolette
              </div>
              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a href={`${originURL}/about`} hrefLang="en-in">
                  About
                </a>
              </div>
              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a href={`${originURL}/press`} hrefLang="en-in">
                  Press
                </a>
              </div>
              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a href={`${originURL}/contact`} hrefLang="en-in">
                  Contact
                </a>
              </div>
              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a href={`${originURL}/careers`} hrefLang="en-in">
                  Careers
                </a>
              </div>
              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a href={`${originURL}/legal`} hrefLang="en-in">
                  Legal
                </a>
              </div>
            </div>
            <div
              className={`flex h-auto border-b-2 ${
                footerTheme === "black"
                  ? "border-[#3C3C3C]"
                  : "border-[#CECECE]"
              }  mt-2 mb-2 sm:ml-12 sm:mr-12 sm:hidden`}
            ></div>
            <div className="sm:flex sm:flex-col ">
              <div
                className={`${Style.brutalSubhead} ${
                  footerTheme === "black" ? "text-[#FFFFFF]" : "text-[#000]"
                } `}
              >
                Social
              </div>
              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a
                  href={"https://www.instagram.com/ultraviolette_automotive/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  hrefLang="en-in"
                >
                  Instagram
                </a>
              </div>
              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a
                  href={
                    "https://www.youtube.com/channel/UCWWTQuQdiYZNW2HncFFbHrg/featured"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  hrefLang="en-in"
                >
                  Youtube
                </a>
              </div>
              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a
                  href={"https://twitter.com/UltravioletteEV"}
                  target="_blank"
                  rel="noopener noreferrer"
                  hrefLang="en-in"
                >
                  Twitter
                </a>
              </div>
              <div
                className={`${Style.brutalSubtext} ${
                  footerTheme === "black"
                    ? "text-[#FFFFFF]"
                    : "text-[#000] sm:text-[#555454]"
                } `}
              >
                <a
                  href={
                    "https://www.linkedin.com/company/ultraviolette-automotive/"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  hrefLang="en-in"
                >
                  Linkedin
                </a>
              </div>
            </div>
            <div
              className={`flex h-auto border-b-2 ${
                footerTheme === "black"
                  ? "border-[#3C3C3C]"
                  : "border-[#CECECE]"
              }  mt-2 mb-2 sm:ml-12 sm:mr-12 sm:hidden`}
            ></div>
          </div>
        </div>
        {footerTheme === "white" && (
          <div className="hidden sm:flex  h-auto border-b-2 border-grey mt-2 mb-2 sm:ml-20 sm:mr-20 "></div>
        )}
        <div className="sm:hidden pl-6 pb-4  flex flex-col gap-2 ">
          <div
            className={`${Style.footerText} ${
              footerTheme === "black" ? "text-[#DBDBDB]" : "text-[#565656]"
            } `}
          >
            Ultraviolette Automotive{" "}
            <Image
              className="ml-1 mr-1"
              alt="copy"
              width={14}
              height={14}
              src={"/images/icons/copyright.svg"}
            />{" "}
            {fullYear} All rights reserved
          </div>
          <div
            className={`${Style.queriesContact} ${
              footerTheme === "black" ? "text-[#DBDBDB]" : "text-[#565656]"
            }  w-fit sm:hidden`}
          >
            <div>
              For any queries please reach out to us on{" "}
              <strong className="ml-1 mr-1">
                <a href="tel:080-694-53322">080-694-53322</a>
              </strong>
            </div>
            <div className="flex justify-start items-center">
              {" "}
              through Whatsapp
              <a className="" href="https://wa.me/+918971901116">
                <Image
                  alt="whatsapp-icon"
                  width={20}
                  height={20}
                  className="ml-1"
                  src={"/images/home/WhatsApp.svg"}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex sm:ml-20 sm:mr-20 items-center gap-6 w-fit ">
          <div
            className={`${Style.footerText} ${
              footerTheme === "black" ? "text-[#DBDBDB]" : "text-[#565656]"
            } w-fit`}
          >
            Ultraviolette Automotive{" "}
            <Image
              className="ml-1 mr-1"
              alt="copy"
              width={14}
              height={14}
              src={"/images/icons/copyright.svg"}
            />{" "}
            {fullYear} All rights reserved
          </div>
          <div
            className={`${Style.queriesContact} ${
              footerTheme === "black" ? "text-[#DBDBDB]" : "text-[#565656]"
            } w-fit hidden sm:flex justify-center items-center`}
          >
            For any queries please reach out to us on{" "}
            <strong
              className={` ${
                footerTheme === "black" ? "text-[#FFFFFF]" : "text-[#000] "
              } mr-1 ml-1`}
            >
              <a href="tel:080-694-53322">080-694-53322</a>
            </strong>
            through{" "}
            <span
              className={` ${
                footerTheme === "black" ? "text-[#FFFFFF]" : "text-[#000] "
              } ml-1 mr-1`}
            >
              Whatsapp{" "}
            </span>
            <a className="" href="https://wa.me/+918971901116">
              <Image
                alt="whatsapp-icon"
                width={20}
                height={20}
                src={"/images/home/WhatsApp.svg"}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonFooter;
