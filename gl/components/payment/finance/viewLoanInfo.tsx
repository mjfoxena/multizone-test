import React from "react";
import { useEffect, useState } from "react";
import Button from "../../atoms/Button";
import { TextElement } from "../../atoms/Texts";

import Styles from "./finance.module.scss";

const UserFinanceForm = ({
  partner,
  onNextHandlerCompleted,
  isMobile,
  loan_info,
  onBackTapped,
  className = "",
}) => {
  const [isError, setIsError] = useState(false);

  // const [isFormValid, setIsFormValid] = useState(false);

  return (
    <div className="">
      {
        <div className={`${className} pt-6`}>
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
                text: "Back/ Tenure",
                fontSize: 12,
                fontName: "nunito",
                className: "underline ",
              }).REGULAR.BLACK
            }
          </div>
        </div>
      }
      <div className={`${className} pt-8 `}>
        {/* Header Info */}

        <div className="pb-5">
          {
            TextElement({
              text: partner.name,
              fontSize: isMobile ? 14 : 16,
            }).MEDUIM.BLACK
          }
        </div>
        {/* Render Payment Info */}
        <div className="relative overflow-x-auto">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-9 nunito text-xs">DOWN PAYMENT</div>
            <div className="col-span-3 nunito text-xs text-right">
              {loan_info.tenure.down_payment.toLocaleString("en-IN")}{" "}
            </div>

            <div className="col-span-9 nunito text-xs">INTEREST[PA]</div>
            <div className="col-span-3 nunito text-xs text-right">
              {" "}
              {loan_info.tenure.interest_rate} %
            </div>

            <div className="col-span-9 nunito text-xs">TENURE</div>
            <div className="col-span-3 nunito text-xs text-right">
              {" "}
              {loan_info.tenure.tenure} Months
            </div>

            <div className="col-span-9 nunito text-xs">LOAN AMOUNT</div>
            <div className="col-span-3 nunito text-xs text-right">
              {" "}
              {loan_info.loan_amount.toLocaleString("en-IN")}
            </div>

            {/* New Divide */}
            <div className="col-span-12 ">
              <div
                style={{
                  height: "1px",
                  backgroundColor: "gray",
                  opacity: "0.4",
                }}
              ></div>
            </div>

            <div className="col-span-9 nunito text-xs">Total Amount</div>
            <div className="col-span-3 nunito text-xs text-right">
              INR {loan_info.total_loan_amount.toLocaleString("en-IN")}{" "}
            </div>
          </div>
          {/* New Divide */}
          <div className="col-span-12 mt-4">
            <div
              style={{
                height: "1px",
                backgroundColor: "gray",
                opacity: "0.4",
              }}
            ></div>
          </div>
        </div>

        {/* Render */}
        {/* <div className="pt-5">
          {
            TextElement({
              text: "Details",
              fontSize: isMobile ? 14 : 20,
            }).MEDUIM.BLACK
          }
          <p className="pt-2 text-xs">
            Below information should be based on the person availing the loan
          </p>
        </div> */}
      </div>

      <div className="nextButton">
        <Button
          className="paymentBtn"
          text={"NEXT"}
          onClick={() => {
            if (!isError) {
              onNextHandlerCompleted();
            }
          }}
          bg={isError ? "#EAEAEA" : "black"}
          hoverColor={!isError ? "" : "black"}
          width="100%"
          disable={isError}
          isDark={!isError}
          allowHover={!isError}
        />
      </div>
    </div>
  );
};

export default UserFinanceForm;
