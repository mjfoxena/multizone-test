import { ReactNode } from 'react';
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { MapCss } from "../utils/utils";
import Modal from "../components/molecules/Modal";
import Style from "./layout.module.scss";
import RolloutCalendar from "../containers/variants/sections/RolloutCal";
import { NavbarContext } from "../contexts/NavbarContext";
import { originURL } from "../services/constants";

const Layout = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState(false);
  const fullYear = new Date().getFullYear();

  const { isMobile } = useContext(NavbarContext);
  return (
    <div>
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

      <div className="w-full flex flex-col pt-4 pr-10 pb-4 pl-8 sm:w-full sm:flex-row sm:pt-12 sm:pl-0 sm:pr-12 sm:pb-5 sm:justify-around">
        <div className="sm:flex-col sm:mr-40 justify-between">
          <div
            className={MapCss(
              Style,
              "brutal-sidebar",
              "w-full flex flex-col text-[16px] sm:text-3xl"
            )}
          >
            <p className='uppercase text-[#e85050] font-semibold underline'>Sitemap</p>
          </div>
            <div className="col-span-1">
              <Image
                src={"/images/icons/uv-logo-name.svg"}
                width={isMobile ? 150 : 265}
                height={24}
                alt="uv-logo"
                style={{ float: "right" }}
                className="sm:-mt-10 -mt-[85px] -mr-6 sm:mr-0"
              />
            </div>
        </div>
        <div className=" flex h-auto border-b-2 border-grey mt-6 mb-3 sm:ml-12 sm:mr-12 sm:hidden"></div>
        <div className="flex flex-col w-full sm:w-auto sm:flex-row  sm:gap-40 sm:mr-12 sm:ml-[20px]">
          <div className="sm:flex sm:flex-col ">
            <div
              className={MapCss(Style, "brutal-subhead", "text-sm sm:text-xl")}
            >
              F77
            </div>
            <div
              className={MapCss(
                Style,
                "brutal-subtext",
                "text-sm sm:text-lg cursor-pointer"
              )}
              onClick={() => {
                setModal(true);
              }}
            >
              Rollout calendar
            </div>
            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
            >
              <a href={`${originURL}/`} hrefLang="en-in">Home</a>
            </div>
            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
            >
              <a href={`${originURL}/limited`} hrefLang="en-in">Limited</a>
            </div>
            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
            >
              <a href={`${originURL}/configure`} hrefLang="en-in">Configure</a>
            </div>
            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
            >
              <a href={`${originURL}/f99`} hrefLang="en-in">F99</a>
            </div>
            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
            >
              <a href={`${originURL}/enquiry`} hrefLang="en-in">Enquiry</a>
            </div>
          </div>
          <div className=" flex h-auto border-b-2 border-grey mt-2 mb-2 sm:ml-12 sm:mr-12 sm:hidden"></div>
          <div className="sm:flex sm:flex-col ">
            <div
              className={MapCss(Style, "brutal-subhead", "text-sm sm:text-xl")}
            >
              Ultraviolette
            </div>
            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
            >
              <a href={`${originURL}/about`} hrefLang="en-in">About</a>
            </div>
            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
            >
              <a href={`${originURL}/squadron`} hrefLang="en-in">Squadron</a>
            </div>


            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
            >
              <a href={`${originURL}/squadron/leaderboard`} hrefLang="en-in">Leaderboard</a>
            </div>
            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
            >
              <a href={`${originURL}/squadron/wallpaper`} hrefLang="en-in">Wallpaper</a>
            </div>


            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
            >
              <a href={`${originURL}/press`} hrefLang="en-in">Press</a>
            </div>
            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
            >
              <a href={`${originURL}/contact`} hrefLang="en-in">Contact</a>
            </div>
            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
            >
              <a href={`${originURL}/faq`} hrefLang="en-in">FAQ</a>
            </div>
            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
            >
              <a href={`${originURL}/legal`} hrefLang="en-in">Legal</a>
            </div>
            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
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
          <div className=" flex h-auto border-b-2 border-grey mt-2 mb-2 sm:ml-12 sm:mr-12 sm:hidden"></div>
          <div className="sm:flex sm:flex-col ">
            <div
              className={MapCss(Style, "brutal-subhead", "text-sm sm:text-xl")}
            >
              Social
            </div>
            <div
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
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
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
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
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
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
              className={MapCss(Style, "brutal-subtext", "text-sm sm:text-lg")}
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
          {isMobile && (
            <div className="brutal text-[10px] tracking-wide py-3">
              For any queries please reach out to us on <b>080-694-53322</b>
            </div>
          )}
          <div className=" flex h-auto border-b-2 border-grey mt-3 mb-0 sm:ml-12 sm:mr-12 sm:hidden"></div>
        </div>
      </div>
      {!isMobile && (
        <div className="brutal text-sm pl-[62vw] tracking-wide h-16 py-5">
          For any queries please reach out to us on <b>080-694-53322</b>
        </div>
      )}
      <div className=" hidden h-auto border-b-2 border-grey mt-2 mb-2 sm:ml-20 sm:mr-20 sm:flex"></div>
      <div
        className={MapCss(
          Style,
          "footerText",
          "ml-8 mb-6 text-[10px] sm:flex-row sm:text-sm sm:ml-20 sm:mb-5"
        )}
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
    </div>
  );
};

export default Layout;

