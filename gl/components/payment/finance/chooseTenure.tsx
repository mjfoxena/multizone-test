import React from "react";
import { useEffect, useState } from "react";
import Button from "../../atoms/Button";
import { TextElement } from "../../atoms/Texts";
import { PhoneNumberInput, VariantBox } from "../UI/InputField";
import Styles from "./finance.module.scss";

const ChooseTenure = ({
  tenure,
  emi_plans,
  partner,
  onNextHandlerCompleted,
  isMobile,
  isLoading = false,
  onBackTapped,
  className = "",
  total_amount,
}) => {
  const [isError, setIsError] = useState(false);
  const [downpaymentAmount, setDownPaymentAmount] = useState(total_amount);

  // Loan Amount
  const [loanAmount, setLoanAmount] = useState(0);
  // Selected Tenure
  const [enteredTenure, setEnteredTenure] = useState(null);

  useEffect(() => {
    // Set Up default Tenure
    if (enteredTenure == null && emi_plans.length !== 0) {
      setEnteredTenure(emi_plans[0]);
    }
    updateDownPayment();
  }, [enteredTenure]);

  useEffect(() => {
    updateDownPayment();
  }, [loanAmount]);

  const updateDownPayment = () => {
    if (loanAmount && enteredTenure != null) {
      if (loanAmount < total_amount) {
        const downpayment = total_amount - loanAmount;

        setDownPaymentAmount(downpayment);
      }
    } else {
      setDownPaymentAmount(total_amount);
    }
  };

  const isValid = () =>
    loanAmount !== 0 &&
    loanAmount.toString().length !== 0 &&
    enteredTenure != null;

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
                text: "Back/ Finance",
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
        <>
          <label
            className={`block mb-2 text-sm font-regular text-gray-400 brutal`}
          >
            Tenure *
          </label>
          <div className={`grid grid-cols-3 gap-4 place-content-stretch `}>
            {emi_plans.map((emi) => (
              <VariantBox
                key={emi.id}
                title={`${emi.tenure.toString()} Months`}
                item={emi}
                isSelected={
                  // @ts-ignore
                  enteredTenure != null && enteredTenure.id === emi.id
                }
                onClicked={() => {
                  setEnteredTenure(emi);
                }}
              ></VariantBox>
            ))}
          </div>
        </>

        {/* Render Loan Amount Field */}
        <div className="mt-4 mb-12">
          <PhoneNumberInput
            isError={isError}
            label={"Loan Amount *"}
            onChanged={(amount) => {
              // onLoanAmountChanged(amount);
              if (amount < total_amount) {
                setLoanAmount(amount);
              }
            }}
            value={loanAmount}
            isINRFormat
          />
        </div>

        {/* Render Payment Info */}
        <div className="relative overflow-x-auto pb-20">
          <table className="w-full text-sm text-left  ">
            <tbody>
              <tr className="bg-white ">
                <th
                  scope="row"
                  className="px-2 py-2 text-sm font-normal brutal"
                >
                  Down payment
                </th>
                <td className="px-2 py-2 brutal">
                  {
                    // @ts-ignore
                    enteredTenure != null &&
                      downpaymentAmount.toLocaleString("en-IN")
                  }
                </td>
                <td className="px-2 py-2"></td>
              </tr>

              <tr className="bg-white ">
                <th scope="row" className="px-2 text-sm font-normal brutal">
                  Interest
                </th>
                <td className="px-2 py-2 brutal">
                  {
                    // @ts-ignore
                    enteredTenure != null && enteredTenure.interest_rate
                  }{" "}
                  %
                </td>
                <td className="px-2 py-2"></td>
              </tr>
              <tr className="bg-white">
                <th scope="row" className="px-2 py-2 text-sm">
                  {
                    TextElement({
                      text: "TOTAL AMOUNT",
                      fontSize: isMobile ? 14 : 20,
                      fontName: "brutal",
                    }).REGULAR.BLACK
                  }
                </th>
                <td className="px-2 py-2">
                  {
                    TextElement({
                      text: `INR ${total_amount.toLocaleString("en-IN")}`,
                      fontSize: isMobile ? 14 : 20,
                      fontName: "brutal",
                    }).REGULAR.BLACK
                  }
                </td>
                <td className="px-2 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="nextButton">
        <Button
          className="paymentBtn"
          text={"NEXT"}
          onClick={() => {
            if (isValid()) {
              onNextHandlerCompleted({
                tenure: enteredTenure,
                loan_amount: parseInt(loanAmount.toString()),
                total_loan_amount: total_amount,
              });
            }
          }}
          bg={!isValid() ? "#EAEAEA" : "black"}
          color={!isValid() ? "white" : "black"}
          hoverColor={!isValid() ? "" : "black"}
          width="100%"
          allowHover={isValid()}
          disable={!isValid()}
          isDark={isValid()}
        />
      </div>
    </div>
  );
};

export default ChooseTenure;
