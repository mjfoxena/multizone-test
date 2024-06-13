import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import GraphTags from "../../components/GraphTags";
import LeftSideBar from "../../components/molecules/LeftSideBar";
import { DocumentConstants } from "../../constants/document";
import { NavbarContext } from "../../contexts/NavbarContext";
import {
  getAwsIdentity,
  getOldUserInfo,
  GetOtp,
  saveConfigUserInfo,
  verifyOtp,
} from "../../services/auth";
import { API_CONSTANTS, originURL } from "../../services/constants";
import {
  deleteEmailTokens,
  getBookingConfig,
  getRefPage,
  removeAccessToken,
  removeCognito,
  removeRefPage,
  setAccessToken,
  setEmail,
  setEmailTokens,
  setUserIds,
} from "../../services/helper";
import { IUser } from "../../services/ProfileService";
import { handleChange } from "../../utils/commonFunction/handleChange";
import { SEND_EMAIL_OTP, VERIFY_EMAIL_OTP } from "../../utils/constants";
import {
  BookingFlow,
  ConfigFlow,
  ReferrerFlow,
} from "../../utils/CookieManagement";
import { MapCss } from "../../utils/utils";
import Style from "./signin.module.scss";
const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/meta/ultraviolette.png`;

const Signin = (country) => {
  const router = useRouter();
  const initialFieldState = {
    value: process.env.NODE_ENV !== "production" ? "dn.singh@foxena.com" : "",
    error: "",
  };
  const [emailId, setEmailId] = useState(initialFieldState);
  const [otpTextValue, setOtpTextValue] = useState(initialFieldState);
  const [otpError, setOtpError] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [enterOtp, setEnterOtp] = useState(false);
  const [counter, setCounter] = useState(0);

  const {
    userData,
    setUserData,
    allUserDetailsFilled,
    flows,
    IsInternational,
    setTempAuth,
    tempAuth,
    isMobile,
  } = useContext(NavbarContext);

  const [postSignin, setPostSignin] = useState("/deliverydetails");

  let timerRan = useRef(false);

  useEffect(() => {
    if (timerRan.current) {
      return;
    }
    setTimeout(() => {
      timerRan.current = true;
    }, 5000);
    if (userData?.email) {
      router.push(`/profile`);
    }
  }, [userData]);

  useEffect(() => {
    CounterTimer();
  }, [counter]);

  useEffect(() => {
    const ref = getRefPage();
    if (ref) {
      setPostSignin(getRefPage());
      removeRefPage();
    } else {
      if (router.query.ref) {
        setPostSignin(router?.query?.ref as string);
      }
    }
  }, [router]);

  const HandlePostSignin = async (res) => {
    await handleOtpResponse(res, emailId.value);
    const userResult: IUser = await getOldUserInfo();

    if (userResult) {
      setUserData(userResult);
      if (!allUserDetailsFilled(userResult)) {
        setTempAuth(res);
        // clearLocalStorage();
        deleteEmailTokens();
        removeCognito();
        removeAccessToken();
        router.push(`/deliverydetails`);
      } else {
        // booking flow
        if (BookingFlow.getValue() === "A") {
          flows.BookingFlowPostInternationalCheck(userResult);
        }
        // config flow
        else if (ConfigFlow.getValue()) {
          // from rollout
          if (ConfigFlow.getValue() === "rollout") {
            flows.configurator.RolloutFlowPostLogin(userResult);
          } else if (ConfigFlow.getValue() === "next") {
            flows.configurator.ConfigFlowPostLogin(userResult as IUser);
          }
        } else if (ReferrerFlow.getValue()) {
          router.push(ReferrerFlow.getValue());
          ReferrerFlow.clearCookie();
        } else {
          // heck User Booking Exist
          const userBookingOptions = getBookingConfig();
          console.log(userBookingOptions, "userBookingOptions");
          console.log(
            userBookingOptions && !userData?.booking_paid,
            "userBookingOptions && !userData?.booking_paid"
          );

          /// Check User Has booking Selection and booking_paid is false
          /// Go to Summary for possible payment

          if (userBookingOptions && userData?.booking_paid === false) {
            /// Save user booking and Go to User Summary
            const config_body: Partial<IUser> = {
              email: userData?.email,
              options: userBookingOptions,
            };
            await saveConfigUserInfo(config_body, tempAuth);
            router.push("/summary");
            return;
          }

          router.push(`/profile`);
        }
      }
    }
  };

  const handleOtpChange = (e) => {
    let otp = e.target.value;
    otp = otp.replace(/\D/g, "");
    setOtpTextValue({ ...initialFieldState, value: otp });
    showArrow();
    if (e.target.value.length === 4) {
      verifyEmailOTP(e.target.value);
    } else {
      setOtpError(false);
      setOtpSuccess(false);
    }
  };
  const handleOtpResponse = async (res, userEmail) => {
    if (res && res.access_token) {
      setEmailTokens(res);
      setAccessToken(res.access_token);
      await getAwsIdentity();
    } else {
      setOtpError(true);
    }
  };

  const CounterTimer = () => {
    counter > 0 && enterOtp && setTimeout(() => setCounter(counter - 1), 1000);
  };

  const proceedHandler = async () => {
    if (!enterOtp && emailId.error === "" && checkbox) {
      handleEmailOTP();
    }
    setEmail(emailId);
  };

  const handleEmailOTP = async () => {
    const requestPayload = SEND_EMAIL_OTP;
    requestPayload.email = emailId.value;
    try {
      const res = await GetOtp(requestPayload);
      setUserIds({ email: { id: res._id, email: res.email } });

      setEnterOtp(true);
    } catch (err) {}
  };
  const verifyEmailOTP = async (otpValue) => {
    const requestPayload = VERIFY_EMAIL_OTP;
    requestPayload.username = emailId.value;
    requestPayload.otp = otpValue;
    try {
      const res = await verifyOtp(requestPayload);
      setOtpError(false);
      setOtpSuccess(true);
      await HandlePostSignin(res);
    } catch (err) {
      setOtpSuccess(false);
      setOtpError(true);
    }
  };
  const disableing = () => {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!enterOtp && regex.test(emailId.value) && checkbox) {
      return Style.proceedError;
    } else if (enterOtp && otpSuccess) {
      return Style.proceedError;
    }
    return Style.procced;
  };

  const showArrow = () => {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!enterOtp && regex.test(emailId.value) && checkbox) {
      return (
        <Image
          className={Style.arrowImage}
          alt="arrow-right"
          fill
          src={"/images/icons/horizontalWhiteArrow.svg"}
        />
      );
    } else if (enterOtp && otpSuccess) {
      return (
        <Image
          className={Style.arrowImage}
          alt="arrow-right"
          fill
          src={"/images/icons/horizontalWhiteArrow.svg"}
        />
      );
    }
    return (
      <Image
        className={Style.arrowImage}
        alt="arrow-right"
        fill
        src={"/images/icons/horizontalArrow.svg"}
      />
    );
  };

  const description =
    country === "IN"
      ? "Sign in to track your order, vehicle, profile information and updates. If you are an existing user, please sign in using the email ID already used for pre-booking."
      : "Sign in to track your enquiry, F77, profile information and updates. If you are an existing user, please sign in using the email ID already used for pre-booking.";

  return (
    <>
      <Head>
        <title>Ultraviolette Automotive | Sign In</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Sign in to your Ultraviolette account to access exclusive content, track orders, and stay connected with the electric motorcycle community"
        />
        <meta property="og:image" content={imageUrl} />
        <link rel="canonical" href="https://www.ultraviolette.com/signin" />
        <GraphTags
          title="Ultraviolette Automotive | Sign In"
          description=""
          image=""
          url="https://www.ultraviolette.com/signin"
        />
      </Head>
      <LeftSideBar
        rightImageSrc={
          isMobile ? DocumentConstants.signInMobile : DocumentConstants.signIn
        }
      >
        <div className="flex flex-col ml-7 mr-7 pb-8 sm:pb-28  sm:ml-16 sm:pt-8  sm:mr-20 justify-between">
          <div className="flex flex-col">
            <div
              className={MapCss(
                Style,
                "disketmono",
                "text-sm cursor-pointer top-16 z-50 mt-2 absolute sm:cursor-pointer sm:relative  sm:top-0 "
              )}
              onClick={() => {
                enterOtp ? setEnterOtp(false) : router.back();
              }}
            >
              {"< "}Back
            </div>
            <div>
              <div className={Style.heading}>SIGN IN</div>
            </div>
            <div className={Style.subtext}>{description}</div>
            <div className={Style.email}>Please enter your email</div>
            <div
              className={
                emailId.error && !enterOtp
                  ? Style.inputboxError
                  : Style.inputbox
              }
            >
              <input
                className={Style.input}
                type={"text"}
                placeholder="ENTER EMAIL"
                value={emailId.value}
                autoComplete="off"
                // onChange={(e) =>
                //   setEmailId({ ...emailId, value: e.target.value })
                // }
                onChange={(e) => {
                  if (emailId.error) {
                    setEmailId({
                      ...emailId,
                      value: e.target.value,
                      error: "",
                    });
                  } else {
                    setEmailId({ ...emailId, value: e.target.value });
                  }
                }}
                onBlur={(e) => {
                  handleChange(e.target.value, setEmailId, "email");
                }}
                readOnly={enterOtp}
              />
            </div>

            {emailId.error && (
              <p className="text-[#d44c43] text-[10px] sm:text-[13px] mt-3">
                {emailId.error}
              </p>
            )}

            {enterOtp && (
              <>
                <div className={Style.email}>
                  Please enter the OTP sent to {emailId.value}
                </div>
                <div
                  className={
                    otpTextValue.error === ""
                      ? Style.inputbox
                      : Style.inputboxError
                  }
                >
                  <input
                    className={Style.input}
                    type="tel"
                    value={otpTextValue.value}
                    maxLength={4}
                    onChange={(e) => {
                      handleOtpChange(e);
                    }}
                    //   onBlur={(e) => handleOtpBlur(e)}
                    autoComplete="off"
                    placeholder="ENTER OTP"
                  />
                </div>
                <div className="mt-3 mb-8 mx-2 sm:mb-4 sm:mt-4 sm:mx-3">
                  {otpError && otpTextValue.value.length === 4 ? (
                    <span className={Style.invalid}>Invalid OTP!</span>
                  ) : otpSuccess && otpTextValue.value.length === 4 ? (
                    <span className={Style.otpVerified}>OTP Approved!</span>
                  ) : (
                    <></>
                  )}
                  {counter === 0 ? (
                    <span
                      className={Style.resend}
                      onClick={() => {
                        setCounter(30);
                        handleEmailOTP();
                      }}
                    >
                      Resend OTP
                    </span>
                  ) : (
                    <span className={Style.resend}>0:{counter} Sec</span>
                  )}
                </div>
              </>
            )}
          </div>
          {!enterOtp && (
            <div className="flex flex-row mt-[32px] pb-10 mb-6 mr-7 sm:mb-10 sm:mr-20  sm:mt-[16px]">
              <div className={Style.check}>
                <input
                  type="checkbox"
                  checked={checkbox}
                  onChange={() => setCheckbox((prev) => !prev)}
                />
                <span className={Style.checkmark}></span>
              </div>
              <div className={Style.checkboxText}>
                I accept Ultraviolette’s{" "}
                <Link
                  href={`${originURL}/legal/terms-conditions`}
                  className="underline cursor-pointer"
                >
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link
                  href={`${originURL}/legal/privacy-policy`}
                  className="underline cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col"></div>
        <div className={disableing()} onClick={() => proceedHandler()}>
          <div className={Style.proccedText}>PROCEED</div>
          <div className="w-3.5 h-3.5 sm:w-7 sm:h-7">{showArrow()}</div>
        </div>
      </LeftSideBar>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const country = context?.query?.country;

  return {
    props: {
      country: country,
    },
  };
}

export default Signin;
