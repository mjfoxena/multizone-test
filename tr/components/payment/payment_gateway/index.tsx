import { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import ViewLoanInfo from "./viewLoanInfo";
import Styles from "./payment_gateway.module.scss";
import PaymentModeView from "./payment_mode";
import SidePanel from "../../molecules/SidePanel";
import { MapCss } from "../../../utils/utils";
import OnlinePaymentMode from "./online_payment_mode";
import PayDirectMode from "./direct_payment_mode";
import { TextElement } from "../../atoms/Texts";
import ViewTranscatioHistoy from "./transcation_history";
import React from "react";
import { PaymentContext } from "../../../contexts/PaymentContext";
import { iConstants, iContent } from "../../../constants/raw_data";
import {
  createPaymentSessionId,
  createTestPaymentSessionId,
} from "../../../services/PaymentService";

const PaymentGatewayTab = ({
  kyc_info,
  loanInfo,
  formUserData,
  selectedInsuranceItem,
  selectedFinanceItem,
  onCompleted,

  isSandbox = false,
}) => {
  const { paymentHistories, paymentHistoryInfo } = useContext(PaymentContext);

  const className = "px-7 md:px-20";
  const [selectedVariant, setSelectedVariant] = useState({});
  const { sidebarOpen, isMobile, userData } = useContext(NavbarContext);

  // Show Modal
  const [showModal, setShowModal] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [category, setCategory] = useState({
    category: "",
    amount: 0.0,
  });
  const [indexing, setIndexing] = useState(0);

  const isVariantSelected = (): boolean =>
    Object.keys(selectedVariant).length !== 0;

  const onVariantTappedHandler = (variant) => {
    console.log("Variant: ", variant);
    setSelectedVariant(variant);
  };

  const onProceedToPay = async (amountToPay) => {
    setIsPaymentProcessing(true);
    // Make API Call
    const body = {
      email: userData?.email,
      phone: userData?.phone,
      name: userData?.name,
      amount: amountToPay,
    };
    const { payload, error } = isSandbox
      ? await createTestPaymentSessionId(body)
      : await createPaymentSessionId(body);
    if (error) {
      return;
    }
    if (payload) {
      setShowModal(false);
      setIsPaymentProcessing(false);

      // @ts-ignore
      const paymentSessionId = payload.payment_session_id;
      // @ts-ignore
      const cf = new Cashfree(paymentSessionId);
      cf.redirect();
    }
  };

  const isValidLoan = loanInfo != null && Object.keys(loanInfo).length !== 0;

  const buildRenderView = (index) => {
    switch (index) {
      case 0:
        return buildPaymentMode();
      case 1:
        return buildTranscationHistoryView();

      default:
        return <>No View</>;
    }
  };
  const buildPaymentMode = () => (
    <div>
      {
        <PaymentModeView
          paymentContent={iContent.payment}
          className={className}
          isMobile={isMobile}
          isSandbox={isSandbox}
          isModalOpened={showModal}
          isLoading={isPaymentProcessing || showModal}
          key="pay"
          onClickHandler={(variant_id, amount) => {
            if (showModal) return;
            if (variant_id === iConstants.ONLINE_PAYMENT && amount) {
              // Call Cashfree
              const amountToPay = parseFloat(amount);
              setCategory({
                amount: amountToPay,
                category: variant_id,
              });
              setShowModal(true);
              onProceedToPay(amountToPay);
            } else {
              setCategory({
                amount: 0.0,
                category: variant_id,
              });

              setShowModal(true);
            }
          }}
        />
      }
      {/* Build Transcation List */}
      {paymentHistories.length !== 0 && (
        <div className={className + " pb-32 sm:pb-24"}>
          <div
            onClick={(e) => {
              setIndexing(1);
            }}
          >
            {
              TextElement({
                text: "Previous Transactions",
                fontSize: isMobile ? 12 : 14,
                className: "underline brutal mt-6 cursor-pointer",
              }).REGULAR.BLACKSECONDARY
            }
          </div>
        </div>
      )}
      {/* For Modal Show */}
      {showModal && renderSideBarModal()}
    </div>
  );

  const renderSideBarModal = () => {
    const content = iContent.payment.modes.filter(
      (mode) => mode.id == category.category
    )[0].modal;
    return (
      <>
        <div
          className={MapCss(
            Styles,
            "panel",
            "absolute top-0 right-0 left-0 bottom-0 bg-[#000000ab] "
          )}
        >
          <SidePanel isLimited={false}>
            {category.category == iConstants.ONLINE_PAYMENT && (
              <OnlinePaymentMode
                content={content}
                className={className}
                amount={category.amount}
                isLoading={isPaymentProcessing}
                onClosedHandler={() => {
                  setShowModal(false);
                  setIsPaymentProcessing(false);
                }}
                onNextHandler={() => {
                  if (!isPaymentProcessing) {
                    // onProceedToPay();
                  }
                }}
              />
            )}
            {category.category == iConstants.DIRECT_PAYMENT && (
              <PayDirectMode
                content={content}
                isSandbox={isSandbox}
                className={className}
                amountToPay={category.amount}
                onClosedHandler={() => {
                  setShowModal(false);
                }}
                onNextHandler={() => {
                  setShowModal(false);
                }}
              />
            )}
          </SidePanel>
        </div>
      </>
    );
  };
  // console.log(loanInfo);

  const buildTranscationHistoryView = () => (
    <>
      <div className={`${className} pt-6`}>
        <div
          className={Styles.configureBack}
          onClick={() => {
            setIndexing(0);
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
              text: "Back/ Payment",
              fontSize: 12,
              fontName: "nunito",
              className: "underline ",
            }).REGULAR.BLACK
          }
        </div>
      </div>
      <ViewTranscatioHistoy
        className={className}
        // history={paymentHistories}
        isMobile={isMobile}
        key="view_transcation_history"
      />
    </>
  );

  return (
    <>
      {isValidLoan && (
        <ViewLoanInfo
          className={className}
          loanAmount={loanInfo.loan_amount}
          remainingAmount={loanInfo.remaining_amount}
          totalPayable={loanInfo.total_payable}
          totalPaid={loanInfo.total_paid}
          key="view_loan_info_gateway"
        />
      )}
      {buildRenderView(indexing)}
    </>
  );
};

export default PaymentGatewayTab;
