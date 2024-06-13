import { useContext } from "react";
import { sidebarSteps } from "..";
import Style from "../variant.module.scss";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { TextElement } from "../../../components/atoms/Texts";
import { useRouter } from "next/router";
import { toTitleCase } from "../../../utils/utils";

const VariantInfoMobile = ({
  sidebarTab,
  setSidebarTab,
  setConfigTooltip,
  finalModal,
}) => {
  const { isMobile } = useContext(NavbarContext);

  const info = [
    {
      value: "",
      label: "Potential Saving",
      tab: sidebarSteps.potentialSavings,
    },
  ];

  const deliveryStartDate = "JAN 2023";

  return (
    <div className={Style.variantInfo}>
      <div className={Style.infoTop}>
        <div>
          {/* {isMobile?TextElement({text:'Delivery Starting from',fontSize:10, className:'w-max'}).REGULAR.BLACK :  TextElement({text:'Delivery Starting from',fontSize:12}).REGULAR.WHITE}
          {isMobile
            ? TextElement({ text: deliveryStartDate, fontSize: 12 }).MEDUIM
                .BLACK
            : TextElement({ text: deliveryStartDate, fontSize: 24 }).BOLD.WHITE} */}
        </div>
        <div
          className=""
          onClick={() => {
            setSidebarTab(sidebarSteps.rolloutCal);
          }}
        >
          {isMobile
            ? TextElement({
                text: "Rollout Calendar",
                fontSize: 12,
                className: "underline cursor-pointer w-max",
              }).REGULAR.BLACK
            : TextElement({
                text: "Rollout Calendar",
                fontSize: 14,
                className: "underline cursor-pointer",
              }).MEDUIM.WHITE}
        </div>
      </div>

      <div className={Style.infoBottom}>
        <div className="flex space-x-20">
          {info.map((e, i) => (
            <div key={i}>
              {
                TextElement({
                  text: e.value,
                  fontSize: 12,
                  className: "text-left",
                }).BOLD.BLACK
              }
              {
                TextElement({
                  text: e.label,
                  fontSize: 12,
                  className: "mt-0.5 underline",
                  onClick: () => {
                    if (e.tab) {
                      setSidebarTab(e.tab);
                      return;
                    }
                  },
                }).REGULAR.BLACK
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VariantInfoMobile;
