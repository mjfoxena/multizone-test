import React from "react";
import {
  TextFieldInput,
} from "../../payment/UI/InputField";
import { refundRawData } from "../../../constants/raw_data";
import { useRouter } from "next/router";
import { originURL } from "../../../services/constants";


const CancelBooking1 = ({ className = "", orderId, email }) => {
  const router = useRouter();

  const onExitHandler = () => {
    router.push(`${originURL}/profile`)
  }

  return (
    <div>
      <div className={`${className} pb-20`}>
        <div className=" ">

          <div className="mx-8 sm:mx-16" style={{ marginTop: "26px" }}>
            {/* Description */}
            <p className=" text-sm brutal">{refundRawData.confirmDetailsDescription}</p>
            <div className="" id="form">
              {/* Email ID */}
              <div className="mt-7">
                <TextFieldInput
                  id={'email_id'}
                  readOnly={
                    true
                  }
                
                 
                  onChanged={(v)=>{}}
                  value={email}
                  label="Registered email"
                  placeholder="EMAIL ID"
                />
              </div>
              {/* Order ID */}
              <div className="mt-7">
                <TextFieldInput
                  id={'order_id'}
                  readOnly={
                    true
                  }
                
                  onChanged={(v)=>{}}
                  value={orderId}
                  label="Order ID"
                  placeholder="Order ID"
                />
              </div>
              
              {/* Exit button */}
              <div className="mt-7 text-[#DA4F46]">
                  <button className="underline" onClick={() => onExitHandler()}>EXIT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelBooking1;