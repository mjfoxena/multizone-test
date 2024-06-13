import { MapCss } from "../../../utils/utils";
import Style from "./text.module.scss";
import { MouseEventHandler } from "react";

enum EFONTBOLD {
  REGULAR = "REGULAR",
  MEDUIM = "MEDUIM",
  BOLD = "BOLD",
}
enum IFONTCOLORS {
  BLACK = "BLACK",
  BLACKSECONDARY = "BLACKSECONDARY",
  REDPRIMARY = "REDPRIMARY",
  GRAY1 = "GRAY1",
  GRAY2 = "GRAY2",
  GRAY3 = "GRAY3",
  WHITE = "WHITE",
  LIGHTGREY = "LIGHTGREY",
  NOCOLOR = "NOCOLOR",
  SUBTEXTGREY = "SUBTEXTGREY",
  TITLETEXTBLACK = "TITLETEXTBLACK",
  GRAY4 = "GRAY4",
  GRAY5 = "GRAY5",
  GRAY6 = "GRAY6",
  GRAY7 = "GRAY7",
  OVERLAYHEADING = "OVERLAYHEADING",
  SILVERGREY = "SILVERGREY",
  INHERIT = "INHERIT",
  LIMITEDTEXT = "LIMITEDTEXT",
}

const FONT_BOLD_TYPES = {
  REGULAR: "regular",
  MEDUIM: "meduim",
  BOLD: "bold",
};

const FONT_TEXT_COLORS = {
  BLACK: "black",
  BLACKSECONDARY: "black-secondary",
  REDPRIMARY: "red-primary",
  GRAY1: "gray-primary",
  GRAY2: "gray-secondary",
  GRAY3: "gray-tertiary",
  WHITE: "white",
  LIGHTGREY: "light-grey",
  NOCOLOR: "no-color",
  SUBTEXTGREY: "subTextGrey",
  TITLETEXTBLACK: "titleTextBlack",
  GRAY4: "gray-quaternary",
  GRAY5: "gray-five",
  GRAY6: "gray-six",
  GRAY7: "gray-seven",
  SILVERGREY: "silver-grey",
  OVERLAYHEADING: "overlay-heading",
  INHERIT: "color-inherit",
  LIMITEDTEXT: "limitedText",
};

type ITextColors = {
  [key in IFONTCOLORS]: React.ReactNode;
};

type ITextEle = {
  [key in EFONTBOLD]: ITextColors;
};

export const TextElement = ({
  text,
  fontRelative = "",
  fontSize = 16,
  className = "",
  fontName = "brutal",
  onClick = () => {},
}: {
  text: string;
  fontSize?:
    | 8
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 18
    | 20
    | 22
    | 24
    | 32
    | 36
    | 42
    | 48
    | 50;
  className?: string;
  fontName?: "brutal" | "disketMono" | "eurostile" | "nunito";
  onClick?: MouseEventHandler<HTMLDivElement>;
  fontRelative?: string;
}): ITextEle => {
  const fontWeightTypes = Object.keys(FONT_BOLD_TYPES);
  const colorKeys = Object.keys(FONT_TEXT_COLORS);

  const allTexts = fontWeightTypes.reduce(
    (pre, curr) => ({
      ...pre,
      [curr]: colorKeys.reduce(
        (p, c) => ({
          ...p,
          [c]: (
            <div
              onClick={onClick}
              style={{ fontSize: fontRelative || `${fontSize / 16}rem` }}
              className={MapCss(
                Style,
                `${FONT_BOLD_TYPES[curr]} ${FONT_TEXT_COLORS[c]} ${fontName}`,
                className
              )}
            >
              {text}
            </div>
          ),
        }),
        {}
      ),
    }),
    {}
  );

  // @ts-ignore
  return allTexts;
};