import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import LeftSideBar from "../../components/molecules/LeftSideBar";
import { MapCss } from "../../utils/utils";
import Style from "./delivery.module.scss";
import Image from "next/image";
import { handleChange } from "../../utils/commonFunction/handleChange";
import { COUNTRIES_DATA } from "../../constants/countryData";
import { IUser } from "../../services/ProfileService";
import {
  getAwsIdentity,
  GetOtp,
  saveConfigUserInfo,
  saveUserInfo,
  updateUserInfo,
  verifyOtp,
} from "../../services/auth";
import { SEND_SMS_OTP, VERIFY_SMS_OTP } from "../../utils/constants";
import { delBookingConfig, getBookingConfig, getCognitoInfo, getEmail, getUserIds, setAccessToken, setEmail, setEmailTokens, setPhoneTokens } from "../../services/helper";
import { NavbarContext } from "../../contexts/NavbarContext";
import { BookingFlow, ConfigFlow, ReferrerFlow } from "../../utils/CookieManagement";
import { UpdateUserBooking } from "../../services/configuratorService";
import { GetServerSidePropsContext } from "next";

const Delivery = ({countryName}) => {
  const router = useRouter();
  const initialFieldState = {
    value: "",
    error: "",
  };
  const [fullName, setFullName] = useState(initialFieldState);
  const [country, setCountry] = useState({ ...initialFieldState, value: "IN" });
  const [pincode, setPinCode] = useState(initialFieldState);
  const [phone, setPhone] = useState(initialFieldState);
  const [otptext, setOtpText] = useState(initialFieldState);
  const [signinMail, setSigninMail] = useState(null);
  const [approved, setApproved] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [enterOtp, setEnterOtp] = useState(false);
  const [getOtp, setGetOtp] = useState(false);
  const [international, setInternational] = useState(false);
  const [counter, setCounter] = useState(0);
  const [states, setStates] = useState({});

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [existingUser, setExistingUser] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [configureData, setConfigureData] = useState([]);
  const { userData, setUserData, flows, tempAuth, allUserDetailsFilled } = useContext(NavbarContext);

  // const storedEmail = localStorage.getItem("email");
  useEffect(() => {
    const storedEmail = getEmail(); 
    if (storedEmail) {
      try {
        const parsedEmail = JSON.parse(storedEmail); 
        const mail = parsedEmail.value;
        setSigninMail(mail); 
      } catch (error) {
        console.error("Error parsing stored email:", error);
      }
    }
  }, []);

  // console.log("email ", signinMail)

  const hideOtp = true;

  useEffect(() => {
    if (country.value && country.value.length > 0 && country.value !== "IN") {
      setInternational(true);
    } else {
      setInternational(false);
    }
  }, [country]);

  useEffect(()=>{
    if((!getCognitoInfo()&&!tempAuth)|| getCognitoInfo()){
      router.push('/')
    }
  },[tempAuth])

  useEffect(() => {
    const configureDataString = getBookingConfig();
    if (configureDataString) {
      setConfigureData(configureDataString);
    }
  }, []);

  useEffect(() => {

    (async () => {
      const result: IUser = userData as IUser;
      if (result?.email) {
        setExistingUser(true);
        setFullName({ ...initialFieldState, value: result.name });
        setCountry({ ...initialFieldState, value: result.country });
        setPinCode({ ...initialFieldState, value: result.pincode });
        setPhone({ ...initialFieldState, value: result.phone });
        setMobileVerified(Boolean(result.mobile_verified))
      }
    })();
  }, [userData]);

  const sendSmsOtp = async () => {
    const requestPayload = SEND_SMS_OTP;
    requestPayload.phone_number = "+91" + phone.value;
    const data = await GetOtp(requestPayload);
    setPhoneTokens({
      phone: { id: data._id, phone_number: data.phone_number },
    });

  };

  const verifyOTP = async (otpVal) => {
    const requestPayload = VERIFY_SMS_OTP;
    requestPayload.username = "+91" + phone.value;
    requestPayload.otp = otpVal;
    const data = await verifyOtp(requestPayload);


    if (data.id_token) {
      // setOtpVerified(true)
      setMobileVerified(true);
    }
    const payload: any = {};
    payload.id_token = data.id_token;
  };

  const UpdateBookingPostSignin = async (email) => {
    try {
      const bookings = getBookingConfig()
      if (bookings?.booking_configuration) {
        await UpdateUserBooking({ model: bookings.model, email: email, booking_configuration: bookings?.booking_configuration?.map((each) => each.id), pay_option: bookings.payment_mode, country: countryName, limited_type: "" })
        return bookings
      } else {

      }
    } catch (err) {
      delBookingConfig();
    }
  }

  const handleOtpResponse = async (res) => {

    if (res && res.access_token) {
      setEmailTokens(res);
      setAccessToken(res.access_token);
      await getAwsIdentity()
    } else {

    }
  };

  const trimmedPincode = pincode.value.trim();
  const alphanumericPattern = /^[a-zA-Z0-9]+$/;

  const isPincodeValid = alphanumericPattern.test(trimmedPincode);
  const ValidateForm = () => {
    return phone.error === "" &&
      phone.value !== "" &&
      country.error === "" &&
      country.value !== "" &&
      pincode.error === "" &&
      alphanumericPattern.test(trimmedPincode) &&
      fullName.value !== "" &&
      fullName.error === ""
  }

  const submitDetails = async () => {
    if (!ValidateForm()) {
      return
    }
    try {
      const body: Partial<IUser> = {
        name: fullName.value,
        country: country.value,
        email: userData?.email || getUserIds()?.email?.email,
        phone: phone.value,
        pincode: pincode.value,
        mobile_verified: mobileVerified,
      };
      
      let filteredSelections = [];

      configureData.forEach(item => {
    if (!filteredSelections.includes(item)) {
      filteredSelections.push(item);
    }
});
    const config_body: Partial<IUser> = {
      email: userData?.email || getUserIds()?.email?.email,
      options: filteredSelections,
    };
    console.log(config_body, 'config_body');

    if (filteredSelections.length > 0)  {
        await saveConfigUserInfo(config_body, tempAuth);
    }


      
      const resp = existingUser ? await updateUserInfo(body, tempAuth) : await saveUserInfo(body, tempAuth);

      // await handleOtpResponse(tempAuth);

      if (resp?.status) {
        setUserData(body as any);
        router.push('/thankyou')
        // if (BookingFlow.getValue() === 'A') {
        //   flows.BookingFlowPostInternationalCheck(body as IUser)
        // } else if (ConfigFlow.getValue()) {
        //   if (ConfigFlow.getValue() === 'rollout') {
        //     flows.configurator.RolloutFlowPostLogin(body as IUser)
        //   } else if (ConfigFlow.getValue() === 'next') {
        //     flows.configurator.ConfigFlowPostLogin(body as IUser,);
        //   }
        // } else {
        //   if (ReferrerFlow.getValue()) {
        //     router.push(ReferrerFlow.getValue());
        //     ReferrerFlow.clearCookie()
        //   } else {
        //     router.push('/summary')
        //   }
        // }
      }
    } catch (err) {

    }
  };

  useEffect(() => {
    CounterTimer();
  }, [counter]);

  useEffect(() => {
    country.value !== "" && setStates(getRegionData("states", country.value));
  }, [country]);
  const getRegionData = (type, id = "") => {
    if (type === "countries") {
      return COUNTRIES_DATA;
    } else if (type === "states") {
      return COUNTRIES_DATA[id].states;
    }
  };
  const countries = getRegionData("countries");
  const CounterTimer = () => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  };
  const handleOtpChange = (e) => {
    let otp = e.target.value;
    otp = otp.replace(/\D/g, "");
    setOtpText({ ...initialFieldState, value: otp });
    if (otp.length === 4) {

      // first verify otp
      // then make enter otp true and approved true
    } else {
      setEnterOtp(false);
      setApproved(false);
    }
  };

  // country code based on the selected country
  let countryNames: string[] = [];
  for (const countryCode in COUNTRIES_DATA) {
    if (COUNTRIES_DATA.hasOwnProperty(countryCode)) {
      const countryName = COUNTRIES_DATA[countryCode].name;
      countryNames.push(countryName);
    }
  }

  let countryCode = "+91"; // Default value  

  if (country?.value) {
    const selectedCountryCode = country.value;
    const selectedCountry = COUNTRIES_DATA[selectedCountryCode];
    if (selectedCountry) {
      const selectedCountryName = selectedCountry.name.toLowerCase();
      for (const code in COUNTRIES_DATA) {
        if (COUNTRIES_DATA.hasOwnProperty(code)) {
          if (COUNTRIES_DATA[code].name.toLowerCase() === selectedCountryName) {
            countryCode = COUNTRIES_DATA[code].country_code;
            break;
          }
        }
      }
  
    }
  }

  const submitInternationalDetails = () => {
    router.push("/deliverydetails/thankyou");
  };

  return (
    <LeftSideBar>
      <div className="flex flex-col ml-7 mr-7 mb-20 sm:ml-16 sm:pt-8 sm:mb-40 sm:mr-20 justify-between">
        <div className="flex flex-col pb-20 sm:pb-0">
          <div
            className={MapCss(
              Style,
              "disketmono",
              "text-sm cursor-pointer top-16 z-50 mt-2 absolute sm:cursor-pointer sm:relative sm:top-0"
            )}
            onClick={() => router.back()}
          >
            {"< "}Back
          </div>
          <div className="mt-4 sm:mt-0 ">
            <div
              className={MapCss(
                Style,
                "heading ",
                "w-full flex flex-row  justify-between uppercase sm:flex-col"
              )}
            >
              DELIVERY DETAILS
              <div className="sm:hidden flex items-center ">
                <Image
                  alt="arrow-right"
                  width={75}
                  height={10}
                  src={"/images/thankyou/thnxlogo.png"}
                />
              </div>
            </div>
            <div className={Style.subtext}>
            Please enter details as per where you want your bike to be delivered.
            </div>
            {/* Enter your name */}
            <div className="">
              <div className={Style.email}>Enter your name*</div>
            </div>
            <div
              className={fullName.error ? Style.inputboxError : Style.inputbox}
            >
              <input
                className={Style.input}
                type={"text"}
                placeholder="FIRST AND LAST NAME"
                value={fullName.value}
                onChange={(e) =>
                  setFullName({
                    ...initialFieldState,
                    value: e.target.value.replace(/[^a-zA-Z ]/g, ""),
                  })
                }
                onBlur={(e) =>
                  handleChange(e.target.value, setFullName, "fullName")
                }
                autoComplete="off"
              />
            </div>
            {/* Enter your country */}
            <div className="">
              <div className={Style.age}>Enter your Country of Residence*</div>
            </div>
            <div
              className={country.error ? Style.inputboxError : Style.inputbox}
            >
              <div className="w-full">
                <select
                  name="country"
                  id="country"
                  onChange={(e) =>
                    handleChange(e.target.value, setCountry, "country")
                  }
                  onBlur={(e) =>
                    handleChange(e.target.value, setCountry, "country")
                  }
                  className={MapCss(
                    Style,
                    `${country.value === "" ? "selecttag" : "selecttagBlack"}`,
                    ""
                  )}
                >
                  <option value="" disabled selected={!country.value} hidden>
                    COUNTRY
                  </option>
                  <option value="" disabled>
                    Select Country
                  </option>
                  {Object.keys(countries).map((id) => {
                    return (
                      <option
                        key={id}
                        value={id}
                        selected={id === country.value}
                      >
                        {countries[id].name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* Enter area pin */}
            <div className="">
              <div className={Style.age}>Enter area PIN*</div>
            </div>
            <div
              // className={pincode.error || !isPincodeValid ? Style.inputboxError : Style.inputbox}
              className={pincode.error || !isPincodeValid ? Style.inputbox : Style.inputbox}
            >
              <input
                className={Style.input}
                type={"text"}
                placeholder="PINCODE"
                value={pincode.value}
                onChange={(e) =>
                  handleChange(e.target.value, setPinCode, "pincode")
                }
                onBlur={(e) =>
                  handleChange(e.target.value, setPinCode, "pincode")
                }
                autoComplete="off"
              />
            </div>
            {/* Verify Phone Number */}
            <div className="">
              <div className={Style.age}>Phone Number*</div>
            </div>

            <div
              className={phone.error ? Style.inputboxError : Style.inputbox}
            >
              <div className={Style.mobile}>{countryCode}</div>
              <input
                className={Style.input}
                type={"text"}
                placeholder="PHONE NUMBER"
                onChange={(e) =>
                  handleChange(e.target.value, setPhone, "phone")
                }
                onBlur={(e) =>
                  handleChange(e.target.value, setPhone, "phone")
                }
                value={phone.value}
                autoComplete="off"
              />
              <div
                onClick={() => {
                  if (!phone.error
                    //  && phone.value.length === 10
                    ) {
                    setShowOtp(true);
                    sendSmsOtp();
                    setGetOtp(true);
                  }
                }}
                className={MapCss(
                  Style,
                  "brutal",
                  "font-normal text-sm w-1/2 underline cursor-pointer text-center sm:text-sm"
                )}
              >
                {/* GET OTP */}
              </div>
            </div>

            {/* Resend otp */}
            {!international && !hideOtp && (
              <div className="flex flex-row justify-between">
                {enterOtp && (
                  <div
                    className={MapCss(
                      Style,
                      `brutal ${approved ? "color-green" : "color-red"}`,
                      "mt-2 text-sm sm:text-base"
                    )}
                  >
                    {approved ? `OTP Approved!` : "Invalid OTP!"}
                  </div>
                )}
                <div></div>
                <div
                  className={MapCss(
                    Style,
                    "brutal color-dark-grey",
                    "w-1/2  cursor-pointer text-right mt-2 text-sm sm:text-sm"
                  )}
                >
                  {!getOtp && <div>
                    <span className="underline" onClick={
                      () => {
                        if (!phone.error 
                          // && phone.value.length === 10
                        ) {
                          setShowOtp(true);
                          sendSmsOtp();
                          setGetOtp(true);
                        }
                      }
                    }>
                      GET OTP
                    </span>
                  </div>
                  }
                  {getOtp && <div>
                    {counter == 0 ? (
                      <span className="underline" onClick={() => {
                        setCounter(30);
                        sendSmsOtp();
                      }}>
                        Resend OTP
                      </span>
                    ) : (
                      <span>0:{counter} sec</span>
                    )}
                  </div>}
                </div>
              </div>
            )}
          </div>

          {showOtp && !hideOtp && (
            <>
              <div className="">
                <div className={Style.age}>
                  Please enter the OTP sent to your number{" "}
                  <span className="hidden sm:inline">+91 {phone?.value}</span>
                </div>
              </div>
              <div className={MapCss(Style, "inputbox", "")}>
                <input
                  className={Style.input}
                  type={"number"}
                  placeholder="ENTER OTP"
                  value={otp}
                  autoComplete="off"
                  onChange={(e) => {
                    setOtp(e.target.value);
                    if (e.target.value.length === 4 && !phone.error) {
                      verifyOTP(e.target.value);
                    }
                  }}
                />
              </div>
            </>
          )}
          {/* button */}
        </div>
      </div>
      {/* proceed button for india */}
      {!international && (
        <div
          onClick={() => {
            submitDetails();
          }}
          className={
            ValidateForm()
              ? Style.proceedError
              : Style.procced
          }
        >
          <div className={Style.proccedText}>PROCEED</div>
          {ValidateForm() ? (
            <Image
              className={Style.arrowImage}
              alt="arrow-right"
              fill
              src={"/images/icons/horizontalWhiteArrow.svg"}
            />
          ) : (
            <Image
              className={Style.arrowImage}
              alt="arrow-right"
              fill
              src={"/images/icons/horizontalArrow.svg"}
            />
          )}
        </div>
      )}
      {/* International */}
      {international && (
        <div
          onClick={() => {
            // submitDetails();
            submitInternationalDetails();
          }}
          className={
            ValidateForm()
              ? Style.proceedError
              : Style.procced
          }
        >
          <div className={Style.proccedText}>PROCEED</div>
          {ValidateForm() ? (
            <Image
              className={Style.arrowImage}
              alt="arrow-right"
              width={20}
              height={20}
              src={"/images/icons/horizontalWhiteArrow.svg"}
            />
          ) : (
            <Image
              className={Style.arrowImage}
              alt="arrow-right"
              width={20}
              height={20}
              src={"/images/icons/horizontalArrow.svg"}
            />
          )}
        </div>
      )}
    </LeftSideBar>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const countryName = context?.query?.country;

  return {
      props: {
        countryName: countryName
      },
  };
}

export default Delivery;
