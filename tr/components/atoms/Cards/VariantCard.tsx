import { TextElement } from "../Texts";
import Style from "./cards.module.scss";
import { MapCss } from "../../../utils/utils";
import { useContext, useRef, useState } from "react";
import Modal from "../../molecules/Modal";
import Image from "next/image";
import { NavbarContext } from "../../../contexts/NavbarContext";
import useOutsideClick from "../../../utils/hooks/useOutsideClick";
import React from "react";
import { GetServerSidePropsContext } from "next";

interface ITooltip {
  header?: string;
  description: string;
  list?: string[];
}

interface IVariantCard {
  label: string;
  price?: string | number;
  selected?: boolean;
  onClick;
  info?: ITooltip;
  description?: string;
  isLimited?: boolean;
  showIncluded?: boolean;
  isInProgress?: boolean;

  trailing?: string;
  parentLabel?: boolean;
  showEmi?: boolean;
  disabled?: boolean;
  country?: string;
}

export const TooltipInfo = ({
  info,
  onclose,
}: {
  info: ITooltip;
  onclose: any;
}) => {
  const { isMobile } = useContext(NavbarContext);

  const tooltipRef = useRef<HTMLDivElement>(null);

  useOutsideClick(tooltipRef, () => {
    onclose();
  });

  return (
    <div
      ref={tooltipRef}
      className="w-10/12 lg:w-6/12 lg:pr-20 bg-white px-10 pb-10 pt-14 relative"
    >
      <div className="absolute right-7 top-7 cursor-pointer" onClick={onclose}>
        <Image
          width={10}
          height={10}
          alt="tent"
          src="/images/icons/cross-black.svg"
        />
      </div>
      {info.header &&
        TextElement({
          text: info.header,
          fontSize: isMobile ? 16 : 20,
          className: "mb-4 pb-1 border-b  border-grey3",
        }).REGULAR.BLACK}
      {
        TextElement({
          text: info.description,
          fontSize: isMobile ? 12 : 16,
        }).REGULAR.BLACK
      }

      <div className="mt-6 ml-3">
        {info.list?.map(
          (e, i) =>
            e && (
              <div className="flex space-x-4 items-center" key={i}>
                <div className="w-[5px] h-[5px] rounded-full bg-black" />
                {
                  TextElement({
                    text: e,
                    fontSize: isMobile ? 12 : 16,
                  }).REGULAR.BLACK
                }
              </div>
            )
        )}
      </div>
    </div>
  );
};

const VariantCard = ({
  label,
  price = "",
  selected,
  onClick,
  info,
  description,
  isLimited,
  showIncluded = false,
  parentLabel,

  isInProgress = false,
  trailing = "",
  showEmi = false,
  disabled = false,
  country,
}: IVariantCard) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  console.log("cou", country);
  return (
    <>
      <div
        onClick={() => !disabled && onClick()}
        className={MapCss(
          Style,
          `${
            isLimited
              ? `variantCardLimited  ${
                  (!showIncluded || !disabled) && selected && "selected"
                }`
              : `variantCard  ${selected && "selected"}`
          }`,

          `${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`
        )}
      >
        <div className="flex justify-between">
          <div className="flex space-x-2 items-center">
            <div className="w-fit lg:w-full">
              {isLimited
                ? (selected && (!showIncluded || !disabled)) || parentLabel
                  ? TextElement({
                      text: label,
                      fontName: "brutal",
                      fontSize: 14,
                    }).REGULAR.WHITE
                  : TextElement({
                      text: label,
                      fontName: "brutal",
                      fontSize: 14,
                    }).REGULAR.LIMITEDTEXT
                : selected
                ? TextElement({ text: label, fontSize: 14 }).MEDUIM.BLACK
                : TextElement({ text: label, fontSize: 14 }).REGULAR.BLACK}
            </div>
            {info && (
              <div
                onClick={(e) => {
                  if (!disabled) {
                    e.stopPropagation();
                    setTooltipOpen(true);
                  }
                }}
                className={
                  (isLimited && selected && (!showIncluded || !disabled)) ||
                  parentLabel
                    ? Style.selectedInfoIcon
                    : isLimited && (showIncluded || disabled)
                    ? Style.infoIconLimit
                    : Style.infoIcon
                }
              >
                i
              </div>
            )}
          </div>
          {/* Show In Progress Text: Added By Mrutyunjaya */}
          {isInProgress && (
            <div className="">
              {
                TextElement({
                  text: `IN PROGRESS`,
                  fontName: "disketMono",
                  fontSize: 14,
                }).REGULAR.SUBTEXTGREY
              }
            </div>
          )}
          {trailing.length !== 0 && (
            <div className="text-right">
              {
                TextElement({
                  text: trailing,
                  fontName: "disketMono",
                  fontSize: 16,
                  className: "",
                }).REGULAR.BLACKSECONDARY
              }
            </div>
          )}
          {price !== 0 && (
            <div className="min-w-max">
              {isLimited
                ? (selected && (!showIncluded || !disabled)) || parentLabel
                  ? TextElement({
                      text: `${country === "IN" ? `+INR ${price}` : ""}`,
                      fontName: "disketMono",
                      fontSize: 14,
                    }).MEDUIM.WHITE
                  : showIncluded || disabled
                  ? TextElement({
                      text: `INCLUDED`,
                      fontName: "disketMono",
                      fontSize: 14,
                    }).REGULAR.LIMITEDTEXT
                  : TextElement({
                      text: `${country === "IN" ? `+INR ${price}` : ""}`,
                      fontName: "disketMono",
                      fontSize: 14,
                    }).REGULAR.SUBTEXTGREY
                : TextElement({
                    text: `${country === "IN" ? `+INR ${price}${showEmi ? "/MO" : ""}` : ""}`,
                    fontName: "disketMono",
                    fontSize: 14,
                  }).REGULAR.BLACK}
            </div>
          )}
        </div>
        {description && isLimited
          ? selected && (!showIncluded || !disabled)
            ? TextElement({
                text: `${description}`,
                fontSize: 10,
                className: "mt-1",
              }).REGULAR.WHITE
            : TextElement({
                text: `${description}`,
                fontSize: 10,
                className: "mt-1",
              }).REGULAR.LIMITEDTEXT
          : TextElement({
              text: `${description}`,
              fontSize: 10,
              className: "mt-1",
            }).REGULAR.BLACK}
      </div>
      {info && (
        <Modal
          state={tooltipOpen}
          stateHandler={setTooltipOpen}
          closeOnClickOutside
        >
          <TooltipInfo onclose={() => setTooltipOpen(false)} info={info} />
        </Modal>
      )}
    </>
  );
};

export default VariantCard;
