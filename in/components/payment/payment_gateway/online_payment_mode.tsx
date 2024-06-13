import React, { useContext, useState } from "react";
import Button from "../../atoms/Button";
import { ClosableSidePanel } from "../../molecules/ClosableGridPanel";
import Styles from "./payment_gateway.module.scss";
import Image from "next/image";
import { NavbarContext } from "../../../contexts/NavbarContext";
import {
  createPaymentSessionId,
  createTestPaymentSessionId,
} from "../../../services/PaymentService";

const PayOnlineMode = ({
  onClosedHandler,
  onNextHandler,
  amount,
  className = "",
  isSandbox = false,
  isLoading = false,
  content,
}) => {
  const { userData } = useContext(NavbarContext);
  const logoURL = "/images/payments/cashfree_logo_bg_white.png";

  return (
    <ClosableSidePanel
      title={content.title}
      autoWidth={false}
      onClose={() => {
        onClosedHandler();
      }}
      className={className}
    >
      <div>
        <div className={className}>
          <p className="text-xs mt-20">{content.description}</p>

          {/* Image Goes here */}
          <div className="mt-12">
            <Image alt="cashfree_logo" src={logoURL} width={180} height={90} />
          </div>
          {isLoading && <div className="text-center mt-10">Redirecting...</div>}
        </div>
        {/* Button */}
        <div
          className=" mt-10"
          style={{
            bottom: 0,
            position: "absolute",
            width: "100%",
          }}
        >
          <Button
            className="paymentBtn"
            text={"NEXT"}
            onClick={() => {
              if (!isLoading) {
                onNextHandler();
              }
            }}
            bg={isLoading ? "#EAEAEA" : "black"}
            width="100%"
            isDark={!isLoading}
            allowHover={!isLoading}
            disable={isLoading}
            price={`INR ${amount}`}
          />
        </div>
      </div>
    </ClosableSidePanel>
  );
};

export default PayOnlineMode;
