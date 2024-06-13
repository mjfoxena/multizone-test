import { useContext, useEffect, useState } from "react";
import { sidebarSteps } from "..";
import Style from "../variant.module.scss";
import { DOMIDMAPPINGS } from "../../../constants";

import { NavbarContext } from "../../../contexts/NavbarContext";
import { TextElement } from "../../../components/atoms/Texts";
import { useRouter } from "next/router";

const VariantInfo = ({
  sidebarTab,
  setSidebarTab,
  width = "",
  setConfigTooltip,
  finalModal,
}) => {
  const { setSidebarOpen } = useContext(NavbarContext);

  const info = [
    {
      value: "",
      label: "Potential Savings",
      tab: sidebarSteps.potentialSavings,
    },
  ];

  const deliveryStartDate = "JAN 2023";

  const [variantInfoWidth, setWidth] = useState(0);
  useEffect(() => {
    const target = document
      .getElementById(DOMIDMAPPINGS.VARIANT_SIDE_PANEL)
      ?.getBoundingClientRect()?.width;
    if (target) setWidth(window.innerWidth - target);
  }, [sidebarTab]);

  return (
    <div
      className="relative"
      style={{
        width:
          width ||
          (sidebarTab === sidebarSteps.sidebarStep1
            ? variantInfoWidth
            : "90vw"),
      }}
    >
      <div className={Style.variantInfo}>
        <div>
          {/* {
            TextElement({ text: "Delivery Starting from", fontSize: 12 })
              .REGULAR.WHITE
          }
          {TextElement({ text: deliveryStartDate, fontSize: 24 }).MEDUIM.WHITE} */}

          <div
            onClick={() => {
              setSidebarTab(sidebarSteps.rolloutCal);
            }}
          >
            {
              TextElement({
                text: "Rollout Calendar",
                fontSize: 14,
                className: "underline cursor-pointer",
              }).MEDUIM.WHITE
            }
          </div>
        </div>
        <div className="flex space-x-20">
          {info.map((e, i) => (
            <div key={i} className="text-right">
              {TextElement({ text: e.value }).MEDUIM.WHITE}

              {
                TextElement({
                  text: e.label,
                  fontSize: 14,
                  className: "mt-1 underline cursor-pointer",
                  onClick: () => {
                    if (e.tab) {
                      setSidebarTab(e.tab);
                      return;
                    }
                  },
                }).REGULAR.WHITE
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VariantInfo;
