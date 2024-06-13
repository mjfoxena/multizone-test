import { useContext } from "react";
import { TextElement } from "../Texts";
import Style from "./sidetab.module.scss";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { MapCss } from "../../../utils/utils";
import React from "react";
interface ISideTabs {
  list: string[];
  onSelect: (ind: number) => void;
  selected: number;
  variant?: "default" | "toggle";
  appendIndex?: boolean;
  isLimited?: boolean;
}

const SideTabs = ({
  list,
  onSelect,
  selected,
  variant = "default",
  appendIndex = false,
  isLimited,
}: ISideTabs) => {
  const { isMobile } = useContext(NavbarContext);
  return (
    <div className={variant === "toggle" ? Style.toggleTabs : Style.sideTabs}>
      {list.map((each, i) => {
        return (
          <div key={i} className="cursor-pointer" onClick={() => onSelect(i)}>
            {/* variant toggle */}
            {variant === "toggle" ? (
              TextElement({
                text: each,
                className: MapCss(
                  Style,
                  `eachTab ${selected === i ? "selected" : ""}`
                ),
                fontSize: isMobile ? 10 : 10,
                
              }).REGULAR.BLACK
            ) : // variant default
              isMobile ? (
                <div className="flex">
                  {appendIndex &&
                    (selected === i
                      ? TextElement({
                        text: `0${i + 1}/`,
                        fontName: "disketMono",
                        fontSize: 14,
                      }).REGULAR.BLACK
                      : TextElement({
                        text: `0${i + 1}/`,
                        fontName: "disketMono",
                        fontSize: 14,
                      }).REGULAR.LIGHTGREY)}

                  {selected === i
                    ? TextElement({
                      text: each,
                      fontName: "brutal",
                      fontSize: 12,
                    }).MEDUIM.BLACK
                    : TextElement({
                      text: each,
                      fontName: "brutal",
                      fontSize: 12,
                    }).REGULAR.LIGHTGREY}
                </div>
              ) : (
                // desktop
                <div className="flex">
                  {appendIndex && selected === i
                    ? TextElement({
                      text: `0${i + 1}/`,
                      fontName: "disketMono",
                      fontSize: 14,
                    }).REGULAR.BLACK
                    : TextElement({
                      text: `0${i + 1}/`,
                      fontName: "disketMono",
                      fontSize: 14,
                    }).REGULAR.SILVERGREY}

                  {selected === i
                    ? TextElement({
                      text: each,
                      fontName: "brutal",
                      fontSize: 14,
                    }).MEDUIM.BLACK
                    : TextElement({
                      text: each,
                      fontName: "brutal",
                      fontSize: 14,
                    }).REGULAR.SILVERGREY}
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
};

export default SideTabs;
