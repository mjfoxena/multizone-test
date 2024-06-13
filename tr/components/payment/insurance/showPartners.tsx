import React, { useContext, useEffect, useState } from "react";
import { TextElement } from "../../../components/atoms/Texts";
import { NavbarContext } from "../../../contexts/NavbarContext";
import VariantCard from "../../atoms/Cards/VariantCard";
import Styles from "./insurance.module.scss";
import { getItoolTip, MapCss } from "../../../utils/utils";
import Button from "../../atoms/Button";
import { useRouter } from "next/router";
import Modal from "../../molecules/Modal";
import { iConstants } from "../../../constants/raw_data";

const ShowPartners = ({
  items,
  details,
  title,
  description,
  subheader,
  meta,

  selectedBankPartnerItem, // current Selected Item
  isPartnerBankSelected, // has User Tapped any Item
  onItemClickHandler, // item handler
  onCompleted,
  onNextHandler,
}) => {
  const { isMobile, userData } = useContext(NavbarContext);

  const nextButtonHandler = () => {
    if (isPartnerBankSelected) {
      // is Step Completed
      if (selectedBankPartnerItem.completed) {
        onCompleted(selectedBankPartnerItem);
      } else {
        onNextHandler(selectedBankPartnerItem);
      }
    }
  };

  const showPartners = () => {
    return (
      <div className="">
        {/* Show Contact Info */}
        <div
          className={MapCss(
            Styles,
            "insurance",
            "px-7 md:px-20  flex-grow h-full overflow-y-auto "
          )}
        >
          <div>
            {
              TextElement({
                text: title,
                fontSize: isMobile ? 16 : 20,
              }).MEDUIM.BLACK
            }

            <div className={Styles.subheader}>
              {
                TextElement({
                  text: description,
                  fontSize: isMobile ? 12 : 14,
                }).REGULAR.BLACK
              }
            </div>
          </div>
          {/* Show Bank Partners */}
          <div className="divide-y divide-gray-400 md:divide-y-2 ">
            <div className="">
              <div className="mt-6 mb-4 grid grid-cols-2 gap-4 place-content-between">
                <div className="">
                  {
                    TextElement({
                      text: subheader,
                      fontSize: isMobile ? 14 : 16,
                    }).MEDUIM.BLACKSECONDARY
                  }
                </div>
              </div>
              <div className="pb-16 overflow-auto">
                {[...items].map((e, i) => (
                  <div className="my-5" key={e.display_name + i}>
                    {
                      <VariantCard
                        description={e.description ? e.description : ""}
                        key={i}
                        selected={selectedBankPartnerItem.partner.id == e.id}
                        showEmi={e.price ? true : false}
                        price={
                          selectedBankPartnerItem.completed
                            ? 0
                            : e.price
                            ? e.price
                            : 0
                        }
                        isInProgress={
                          selectedBankPartnerItem.partner.id == e.id &&
                          selectedBankPartnerItem.completed
                        }
                        disabled={
                          selectedBankPartnerItem.partner.id !== e.id &&
                          selectedBankPartnerItem.completed
                        }
                        label={e.display_name.toUpperCase()}
                        info={getItoolTip(e)}
                        showIncluded={false}
                        onClick={
                          selectedBankPartnerItem.completed
                            ? null
                            : () => onItemClickHandler(e)
                        }
                      />
                    }

                    {selectedBankPartnerItem.partner.id == e.id &&
                      !selectedBankPartnerItem.completed && (
                        <div className="mt-4 pb-5">
                          {details
                            .filter((pln) => pln.partner === e.id)
                            .filter(
                              (plan) =>
                                plan.applicable_to_variant === userData.variant
                            )
                            .map((planType) => (
                              <div
                                key={planType.id}
                                className="grid grid-cols-4 gap-1 pl-6 pb-2 brutal"
                              >
                                <p className="col-span-3 text-xs">
                                  {planType.plan_display_name}
                                </p>
                                <p className="col-span-1 text-xs">
                                  INR{" "}
                                  {planType.ins_value.toLocaleString("en-IN")}
                                </p>
                              </div>
                            ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Request Call Back */}
        <div className="nextButton">
          <Button
            className="paymentBtn"
            text={"NEXT"}
            onClick={() => nextButtonHandler()}
            bg={isPartnerBankSelected ? "black" : "#EAEAEA"}
            hoverColor={isPartnerBankSelected ? "black" : "#EAEAEA"}
            width="100%"
            // Initail Disable State
            disable={!isPartnerBankSelected}
            // Once Selected
            allowHover={isPartnerBankSelected}
            isDark={isPartnerBankSelected}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {showPartners()}
      {/* For Modal Show */}
    </>
  );
};

export default ShowPartners;
