import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { MapCss } from "../../../utils/utils";
import Style from "./commonhyperlinkviewer.module.scss";

const CommonHyperLinkViewer = ({
  Heading = "",
  Subheading = "",
  body,
  customBodyStyle = {},
  backgroundColor = "",
  noBackground = false,
}) => {
  const router = useRouter();
  return (
    <div
      className={MapCss(Style, "backgroundImage")}
      style={{ backgroundImage: noBackground ? "none" : "" }}
    >
      <div className="ml-7 mr-7 pb-6 sm:ml-20 sm:pt-10 sm:mr-20 sm:pb-6">
        <div
          className={MapCss(
            Style,
            "disketmono",
            "text-sm cursor-pointer sm:cursor-pointer pt-10 mb-6 sm:mb-16 sm:pt-10 "
          )}
          onClick={() => router.back()}
        >
          {"< "}Back
        </div>
        <div
          className={MapCss(Style, "brutal", "text-xl sm:text-2xl font-normal")}
        >
          LEGAL {"< "} {Subheading}
        </div>

        <div
          className={MapCss(
            Style,
            "backgroundColor",
            "flex flex-col mt-6 mb-10"
          )}
          style={{ background: backgroundColor || "" }}
        >
          <div className="ml-5 mt-7 mr-2 sm:ml-20 sm:mt-8 sm:mr-2 w-full">
            <div
              className={MapCss(
                Style,
                "brutal",
                "text-sm sm:text-[32px] font-normal"
              )}
            >
              {Heading}
            </div>
          </div>
          <div className=" flex h-auto border-b-2 ml-5 mr-5 border-slate-500 mt-6 mb-2 sm:ml-20 sm:mr-10  sm:flex"></div>
          <div
            className={MapCss(
              Style,
              "scroll",
              "ml-5 mr-5 mt-4 h-96 sm:ml-20 text-xs sm:text-base sm:mt-8 sm:mr-8 sm:h-96 sm:mb-16 sm:pr-96"
            )}
            style={customBodyStyle}
          >
            {body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonHyperLinkViewer;
