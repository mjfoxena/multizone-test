/* eslint-disable react/jsx-no-target-blank */
import Image from "next/image";
import { useContext } from "react";
import Style from "./index.module.scss";
import { TextElement } from "../../atoms/Texts";
import { NavbarContext } from "../../../contexts/NavbarContext";
import React from "react";

export const ClosableGridSidePanel = ({
  children,
  onClose,
  title,
  autoWidth = false,
  downloadOption = { text: "", link: "" },
}) => {
  const { isMobile } = useContext(NavbarContext);

  return (
    <div
      className={Style.gridPanel}
      style={{
        width: autoWidth ? (isMobile ? "100vw" : "88vw") : "",
        padding: autoWidth ? (isMobile ? "0 22px" : "") : "",
        marginLeft: autoWidth ? (isMobile ? "-9.4vw" : "") : "",
        backgroundColor: autoWidth ? "white" : "",
        paddingTop: autoWidth ? (isMobile ? "45px" : "") : "",
        height: autoWidth ? (isMobile ? "100%" : "94vh") : "",
      }}
    >
      <div className={`${isMobile ? "h-[100vh]" : "h-[100%]"} flex flex-col`}>
        <div
          className={Style.close}
          onClick={() => onClose()}
          style={{ paddingTop: autoWidth ? "24px" : "" }}
        >
          <Image
            alt="cross"
            width={isMobile ? 16 : 24}
            height={isMobile ? 16 : 24}
            src={"/images/icons/cross.png"}
          />
        </div>
        <div className="sm:flex justify-between">
          {
            TextElement({
              text: title,
              fontSize: isMobile ? 14 : 32,
              className: "underline -mt-1 inline underline-offset-8",
            }).MEDUIM.BLACK
          }
          {downloadOption?.text && (
            <a
              className="mt-3.5"
              target="_blank"
              download={"spec"}
              href={downloadOption?.link}
            >
              {
                TextElement({
                  text: downloadOption?.text,
                  fontSize: isMobile ? 12 : 18,
                  className: `${
                    isMobile
                      ? "flex w-[88vw] justify-center underline sm:-mt-1 absolute bottom-[3%] z-100 mt-3"
                      : "underline mt-4 sm:-mt-1"
                  }`,
                }).MEDUIM.BLACK
              }
            </a>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export const ClosableSidePanel = ({
  children,
  onClose,
  title,
  autoWidth = false,
  downloadOption = { text: "", link: "" },
  className = "",
}) => {
  const { isMobile } = useContext(NavbarContext);

  return (
    <div
      className={Style.plainPanel}
      style={{ width: autoWidth ? "auto" : "" }}
    >
      <div className={"grid grid-cols-12 " + className}>
        <div className="col-span-11">
          {
            TextElement({
              text: title,
              fontSize: isMobile ? 14 : 24,
              className: Style.headerText,
            }).MEDUIM.BLACKSECONDARY
          }
        </div>
        <div className="col-span-1 pl-12" onClick={() => onClose()}>
          <Image
            alt="cross"
            width={isMobile ? 16 : 18}
            height={isMobile ? 16 : 18}
            src={"/images/icons/cross.png"}
            className={Style.close}
          />
        </div>
      </div>

      <div className="h-[100%] flex flex-col">
        {/* <div className={Style.close} onClick={() => onClose()}></div> */}

        {children}
      </div>
    </div>
  );
};
