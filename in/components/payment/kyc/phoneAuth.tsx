import React, { useContext, useEffect, useState } from "react";
import { SEND_SMS_OTP, VERIFY_SMS_OTP } from "../../../utils/constants/index";
import { GetOtp, verifyOtp } from "../../../services/auth";
import { PhoneNumberInput, TextFieldInput } from "../UI/InputField";
import { NavbarContext } from "../../../contexts/NavbarContext";
import Styles from "./kyc.module.scss";

interface PhoneAuthProps {
  value: string;
  id: string;
  children?: React.ReactNode;
  isError: boolean;
  errorMessage: string;
  onGenerated: () => void;
  onVerified: (string) => void;
  isVerificationRequired?: boolean;
}

const PhoneAuth = ({
  value,
  children,
  onGenerated,
  onVerified,
  id = "",
  isError = false,
  errorMessage = "",
  isVerificationRequired = true,
}: PhoneAuthProps) => {
  const countryCode = "+91";
  const { userData } = useContext(NavbarContext);
  const [enteredPhone, setMobileNumber] = useState({
    error: false,
    value: value,
    isLoading: false,
    errorMessage: "",
  });
  const [enteredPhoneOTP, setEnteredPhoneOTP] = useState({
    error: false,
    value: "",
    isGenerated: false, // true: if OTP generated for this value
    isSuccess: false,
    errorMessage: "",
  });

  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setMobileNumber({
      ...enteredPhone,
      error: isError,
      errorMessage,
    });
  }, [isError, errorMessage]);

  useEffect(() => {
    if (userData?.phone) {
      const phone = addCountryCodeIfNot(userData?.phone);

      setMobileNumber({
        ...enteredPhone,
        value: phone,
      });
    } else {
      setMobileNumber({
        ...enteredPhone,
        value: countryCode,
      });
    }
  }, []);

  useEffect(() => {
    CounterTimer();
  }, [counter]);

  const CounterTimer = () => {
    counter > 0 &&
      enteredPhoneOTP.value.length === 0 &&
      setTimeout(() => setCounter(counter - 1), 1000);
  };

  const isValidPhoneNumber = (value) => {
    if (value && value.length !== 0) {
      // Allow only digits
      let str = allowDigit(value);
      if (value.includes(countryCode) && value?.length == 13) return true;
      else return false;
    } else {
      return false;
    }
  };

  const allowDigit = (number) => number.replace(/[^0-9]/g, "");

  const addCountryCodeIfNot = (phoneNumber) => {
    const phone = phoneNumber.includes(countryCode)
      ? phoneNumber
      : countryCode + phoneNumber;
    return phone;
  };

  const generateOTPHandler = async () => {
    const phone = addCountryCodeIfNot(enteredPhone.value);
    // console.log(phone, isValidPhoneNumber(phone));

    if (!isValidPhoneNumber(phone)) {
      setMobileNumber({
        ...enteredPhone,
        error: true,
        errorMessage: "Invalid phone number.",
      });
      return;
    }

    setMobileNumber({
      ...enteredPhone,
      isLoading: true,
      error: false,
      errorMessage: "",
    });
    const requestPayload = SEND_SMS_OTP;
    requestPayload.phone_number = phone;

    try {
      const res = await GetOtp(requestPayload);
      // console.log("OTP Response: ", res);
      setMobileNumber({
        ...enteredPhone,
        isLoading: false,
      });
      if (res._id) {
        setEnteredPhoneOTP({
          ...enteredPhoneOTP,
          isGenerated: true,
        });
      }
    } catch (err) {}
  };
  const verifyOTPHandler = async (otpValue) => {
    const requestPayload = VERIFY_SMS_OTP;
    requestPayload.username = addCountryCodeIfNot(enteredPhone.value);
    requestPayload.otp = otpValue;
    try {
      const res = await verifyOtp(requestPayload);
      if (res.id_token) {
        setEnteredPhoneOTP({
          ...enteredPhoneOTP,
          isSuccess: true,
          error: false,
          value: otpValue,
        });
        onVerified(enteredPhone.value);
      }

      // Get JWt Response
    } catch (err) {
      setEnteredPhoneOTP({
        ...enteredPhoneOTP,
        error: true,
        value: otpValue,
        errorMessage: "Failed to verify",
      });
    }
  };

  const onOtpChange = (otp) => {
    setEnteredPhoneOTP({
      ...enteredPhoneOTP,
      value: otp,
    });
    if (otp.length === 4) {
      // Verify otp
      verifyOTPHandler(otp);
      setEnteredPhoneOTP({
        ...enteredPhoneOTP,
        value: otp,
        error: false,
      });
    } else if (otp.length >= 5) {
      setEnteredPhoneOTP({
        ...enteredPhoneOTP,
        value: otp,
        error: true,
      });
    }
  };

  return (
    <>
      <PhoneNumberInput
        id={id}
        onBlur={(v) => {
          const isValid = isValidPhoneNumber(v);

          setMobileNumber({
            error: !isValid,
            value: v,
            isLoading: false,
            errorMessage: isValid ? "" : "Invalid phone number",
          });
        }}
        getOTP={isVerificationRequired}
        disable={
          enteredPhone.isLoading ||
          enteredPhoneOTP.isGenerated ||
          !isValidPhoneNumber(enteredPhone.value)
        }
        isSuccess={enteredPhoneOTP.isSuccess}
        onGetOTPClicked={() => {
          generateOTPHandler();
        }}
        isError={enteredPhone.error || isError}
        errorMessage={enteredPhone.errorMessage}
        onChanged={(number) => {
          // Allow +91 always
          if (enteredPhone.value === countryCode && number.length <= 3) {
            return;
          }
          const isValid = isValidPhoneNumber(number);
          isError = !isValid;
          const nmWithCode = addCountryCodeIfNot(number);
          setMobileNumber({
            ...enteredPhone,
            value: "+" + allowDigit(nmWithCode), // Do not allow alphabet
            error: !isValid,
            errorMessage: isValid ? "" : "Invalid phone number",
          });
        }}
        value={enteredPhone.value}
        label="Phone Number *"
        placeholder={`${countryCode} PHONE NUMBER`}
        readOnly={enteredPhoneOTP.isGenerated}
      />
      {enteredPhoneOTP.isGenerated && (
        <div className="mt-7">
          <TextFieldInput
            readOnly={enteredPhoneOTP.isSuccess}
            isError={enteredPhoneOTP.error}
            onChanged={(otp) => {
              onOtpChange(otp);
            }}
            value={enteredPhoneOTP.value}
            label={`Please enter the OTP sent to your number ${enteredPhone.value}`}
            placeholder="OTP"
          />

          <div className="flex justify-between ">
            <div>
              {enteredPhoneOTP.error && !enteredPhoneOTP.isSuccess && (
                <div className="text-red-500 my-2 text-sm font-bold">
                  Invalid OTP
                </div>
              )}
              {enteredPhoneOTP.isSuccess && !enteredPhoneOTP.error && (
                <div className="text-green-500 my-2 text-sm font-bold">
                  OTP APPROVED
                </div>
              )}
            </div>
            <div
              className={`right-0 mt-2 pr-4 ${
                enteredPhoneOTP.isSuccess ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {counter === 0 ? (
                <span
                  className={Styles.resend}
                  onClick={() => {
                    if (!enteredPhoneOTP.isSuccess) {
                      setCounter(30);
                      generateOTPHandler();
                    }
                  }}
                >
                  Resend OTP
                </span>
              ) : (
                <span className={Styles.resend}>0:{counter} Sec</span>
              )}
            </div>
          </div>
          {/* Error Msg */}
        </div>
      )}
    </>
  );
};

export default PhoneAuth;
