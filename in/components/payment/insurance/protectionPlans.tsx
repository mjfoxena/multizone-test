import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { saveInsuranceSelection } from "../../../services/PaymentService";
import { MapCss } from "../../../utils/utils";
import Button from "../../atoms/Button";
import { TooltipInfo } from "../../atoms/Cards/VariantCard";
import { TextElement } from "../../atoms/Texts";
import Modal from "../../molecules/Modal";
import Styles from "./insurance.module.scss";

const ViewProtectionPlan = ({
  partner,
  onNextHandlerCompleted,
  isMobile,

  onBackTapped,
  className = "",
  plans,
  selectedPlan,
  isLoading = false,
}) => {
  const { userData } = useContext(NavbarContext);
  const [isError, setIsError] = useState(false);
  const [isToolTipModal, setIsToolTipModal] = useState({
    value: "",
    modal: false,
  });

  // Selected Plan
  const [selectedProtectionPlan, setSelectedProtectionPlan] = useState({});
  const [planTypes, setPlanTypes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (plans) {
      const filteredPlans = plans.filter(
        (plan) => plan.applicable_to_variant === userData.variant
      );
      setPlanTypes(filteredPlans);
      // Filter out plan_type
      if (Object.keys(selectedPlan).length === 0) {
        setSelectedIndex(0);
        if (filteredPlans) setSelectedProtectionPlan(filteredPlans[0]);
      }
    }
  }, []);

  const isSelected =
    selectedProtectionPlan != null &&
    Object.keys(selectedProtectionPlan).length !== 0;

  const getPrice = () => {
    if (selectedProtectionPlan) {
      // @ts-ignore
      if (!selectedProtectionPlan.ins_value) {
        return "";
      } else {
        // @ts-ignore
        return ` INR ${selectedProtectionPlan.ins_value.toLocaleString(
          "en-IN"
        )}`;
      }
    } else {
      return "";
    }
  };

  return (
    <div>
      {
        <div className={`${className} pt-6 mb-8`}>
          <div
            className={Styles.configureBack}
            onClick={() => {
              onBackTapped();
            }}
          >
            {
              TextElement({
                text: "<",
                fontSize: 12,
                fontName: "nunito",
              }).REGULAR.BLACK
            }
            {
              TextElement({
                text: "Back/ Insurance",
                fontSize: 12,
                fontName: "nunito",
                className: "underline ",
              }).REGULAR.BLACK
            }
          </div>
        </div>
      }
      <div className={`${className} pb-20`}>
        <div className="pb-4">
          {
            TextElement({
              text: partner.display_name,
              fontSize: isMobile ? 14 : 16,
            }).MEDUIM.BLACK
          }
        </div>

        {/* Render Tenure: cursor-not-allowed */}
        <label className={`block mb-2 text-sm font-regular text-gray-400`}>
          F77 Protection Plans *
        </label>
        <div className={`grid grid-cols-3 gap-4 place-content-stretch `}>
          {planTypes.map((t, index) => (
            <div
              key={
                //@ts-ignore
                t.id
              }
              className={`col-span-1 text-ellipsis bg-gray-200 text-center py-5 rounded cursor-pointer border ${
                // @ts-ignore
                isSelected && selectedProtectionPlan.id === t.id
                  ? "dark:border-red-400"
                  : ""
              }`}
              onClick={() => {
                // console.log(partner, t);
                setSelectedIndex(index);
                setSelectedProtectionPlan(t);
              }}
            >
              <span className="text-xs sm:text-sm ">
                {
                  // @ts-ignore
                  t.plan_display_name
                }
              </span>
              {/* {
                TextElement({
                  // @ts-ignore
                  text: t.plan_display_name,
                  fontSize: isMobile ? 14 : 16,
                  className: "text-center ",
                }).REGULAR.BLACK
              } */}
            </div>
          ))}
        </div>

        {/* Render Coverage Info */}
        <div className={MapCss(Styles, "", "relative overflow-x-auto pb-2")}>
          {isSelected &&
            //@ts-ignore
            selectedProtectionPlan.coverages && (
              <div className="py-6">
                {
                  TextElement({
                    // @ts-ignore
                    text: "COVERAGE",
                    fontSize: isMobile ? 14 : 16,
                    className: "mb-4",
                  }).MEDUIM.BLACK
                }

                {/* render Previous plan */}

                {selectedIndex !== 0 &&
                  TextElement({
                    //@ts-ignore
                    text: planTypes[selectedIndex - 1].plan_display_name + " +",
                    fontSize: isMobile ? 14 : 16,
                    className: "mb-4 pt-4",
                  }).REGULAR.BLACK}
                {
                  //@ts-ignore
                  selectedProtectionPlan.coverages.map((coverage, ind) => (
                    <div key={ind} className="flex pb-2 brutal text-left">
                      <p className="text-sm">{coverage.item}</p>
                      {coverage.tooltip && (
                        <>
                          <div
                            className={`${Styles.infoIcon} ml-2 mt-0.5`}
                            onClick={(e) => {
                              setIsToolTipModal({
                                modal: true,
                                value: coverage.tooltip,
                              });
                            }}
                          >
                            {" "}
                            i
                          </div>
                        </>
                      )}
                    </div>
                  ))
                }
              </div>
            )}
        </div>
      </div>

      <div className="nextButton">
        <Button
          className="paymentBtn"
          text={"NEXT"}
          price={getPrice()}
          onClick={async () => {
            if (isSelected) {
              console.log(selectedProtectionPlan);

              onNextHandlerCompleted(selectedProtectionPlan);
            }
          }}
          bg={!isSelected ? "#EAEAEA" : "black"}
          width="100%"
          disable={!isSelected || isLoading}
          allowHover={isSelected}
          isDark={isSelected}
        />
      </div>
      <div className="">
        {isToolTipModal && (
          <Modal
            state={isToolTipModal.modal}
            stateHandler={(v) => {
              setIsToolTipModal({
                value: "",
                modal: false,
              });
            }}
            closeOnClickOutside
          >
            <div className="max-w-sm p-6 bg-white rounded-lg shadow mx-2">
              <p className="mt-7 mb-3 font-normal text-gray-700 text-base ">
                {isToolTipModal.value}
              </p>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ViewProtectionPlan;
