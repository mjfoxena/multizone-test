import React from "react";
import Paymentindex from "./payment";

const Baseindex = ({ stages, index, vip = false, isKyc = false }) => {
  return (
    <>
      {/* For Payment Gateway */}
      {index == 1 && (
        <Paymentindex
          name="payment_index"
          stage={index + 1}
          vip={vip}
          isKyc={isKyc}
        ></Paymentindex>
      )}
    </>
  );
};
export default Baseindex;
