import Image from "next/image";
import { useContext, useState } from "react";
import Style from "../variant.module.scss";
import SideTabs from "../../../components/atoms/SideTabs";

import { NavbarContext } from "../../../contexts/NavbarContext";
import { TextElement } from "../../../components/atoms/Texts";
import { TooltipInfo } from "../../../components/atoms/Cards/VariantCard";
import Modal from "../../../components/molecules/Modal";
import { useLimitedSpaceAvailableStatus } from "../../../queries/config";
import { ReconfigureFlow } from "../../../utils/CookieManagement";


const TotalFooter = ({
  currentTab,
  onNext,
  selectedItems,
  selectedPaymentMode,
  setSelectedPaymentMode,
  isLimited,
  pricingDetails = [],
  country
}) => {
  const { isMobile, userData } = useContext(NavbarContext);
  const { data: availableStatus } = useLimitedSpaceAvailableStatus(() => {});
  const [tooltip, showTooltip] = useState(false);

  return (
    <div className={Style.totalFooter}>
      <Modal state={tooltip} stateHandler={showTooltip}>
        <TooltipInfo
          onclose={() => showTooltip(false)}
          info={{
            description:
              selectedPaymentMode || isLimited
                ? "GST, RTO, Registration Services and Insurance charges will be extra as applicable. Prevailing Rates and Prices at the time of delivery would be applicable."
                : "Monthly Installment (EMI) mentioned is approximately based on 8% interest rate for 48 months, with 20% down-payment. Prices are exclusive of taxes.",
          }}
        />
      </Modal>
      <div
        onClick={() => {
          if (isLimited && !availableStatus) {
            return;
          }
          onNext();
        }}
        className={
          isLimited
            ? "bg-[#F26322]  py-3 pl-6 lg:pl-12 pr-4  lg:pr-8 flex justify-between cursor-pointer"
            : "bg-red-secondary lg:bg-black  lg:hover:bg-red-secondary py-3 pl-6 lg:pl-14 pr-4  lg:pr-14 flex justify-between cursor-pointer"
        }
      >
        {
          TextElement({
            text:
              currentTab === 2
                ? `CONFIRM ${ReconfigureFlow.getValue()==='A' && !userData.reconfigured ?'RE-':''}CONFIGURATION`
                : isLimited
                ? !availableStatus
                  ? "SOLD OUT"
                  : `CONFIRM ${ReconfigureFlow.getValue()==='A' && !userData.reconfigured ?'RE-':''}CONFIGURATION`
                : "NEXT",
          }).MEDUIM.WHITE
        }
        <Image
          alt="arrow white"
          width={16}
          height={16}
          src={"/images/icons/arrow-white.svg"}
        />
      </div>

      <div className={Style.pricing}>
       { country === "TR" ? (<div className={Style.total}>
          <div className="bg-grey4 xl:px-2 py-1 mt-1 xl:mt-0">
            <SideTabs
              isLimited={isLimited}
              list={
                isLimited ? ["EX-SHOWROOM"] : ["MONTHLY COST", "EX-SHOWROOM"]
              }
              onSelect={(i) => {
                isLimited
                  ? setSelectedPaymentMode(i)
                  : setSelectedPaymentMode(i);
              }}
              selected={selectedPaymentMode}
              variant="toggle"
            />
          </div>

          <div>
             <div className="flex space-x-1 items-center justify-end">
              {
                TextElement({
                  text:
                    selectedPaymentMode || isLimited
                      ? `INR ${Number(
                          selectedItems
                            ?.filter((e) => {
                                return !selectedItems.find(
                                  (a) => a.id === e.included_on
                                );
                              })
                            ?.reduce((init, curr) => {
                              
                              let total = init + curr.price;
                              if (curr?.uv_care_previous) {
                                const target: any = pricingDetails.find(
                                  (eachP: any) =>
                                    eachP.id === curr?.uv_care_previous
                                );
                                if (target) {
                                  total = total - target?.price;
                                }
                              }
                              return total;
                            }, 0)
                        ).toLocaleString("en-IN")}`
                      : `EMI INR  ${Number(selectedItems
                          ?.filter((e) => {
                            return !selectedItems.find(
                              (a) => a.id === e.included_on
                            );
                          })
                          ?.reduce((init, curr) => {
                            let total = init + curr.emi_mo;
                            if (curr?.uv_care_previous) {
                              const target: any = pricingDetails.find(
                                (eachP: any) =>
                                  eachP.id === curr?.uv_care_previous
                              );
                              if (target) {
                                total = total - target?.emi_mo;
                              }
                            }
                            return total;
                          }, 0)||0).toLocaleString("en-IN")}/MO`,
                  fontSize: isMobile ? 14 : 15,
                  // className: "sm:text-[12px] lg:text-[13px] xl:text-[18px]"
                }).MEDUIM.BLACK
              }
              <div
                onClick={() => showTooltip(!tooltip)}
                className="rounded-full text-[11px] h-4 w-4 min-w-[16px] flex justify-center items-center border border-gray-600 cursor-pointer"
              >
                i
              </div>
            </div> 
          </div>
        </div> ) : null }
      </div>
    </div>
  );
};

export default TotalFooter;