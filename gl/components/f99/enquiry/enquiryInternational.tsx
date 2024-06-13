import Image from "next/image";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { saveEnquiryFormClient } from "../../../services/FormServices";
import Style from "./enquiry.module.scss";
import Button from "../../atoms/Button";
import {
  DropDownTextField,
  PhoneNumberInput,
  TextFieldInput,
} from "../../payment/UI/InputField";
import { enquiryRawData } from "../../../constants/raw_data";
import { useRouter } from "next/router";
import {
  validateCity,
  validateEmailId,
  validatePincode,
  validateFullname,
  validateWorldPhoneNumber,
  validateIndiaPhoneNumber,
} from "../../../utils/commonFunction/form_validations";
import { TextElement } from "../../atoms/Texts";
import { COUNTRIES_DATA } from "../../../constants/countryData";
import { originURL } from "../../../services/constants";
import Link from "next/link";

type StateOption = {
  value: string;
  label: string;
  name: string;
};

const InternationalEnqueryForm = ({ nextHandlerTapped, className = "" }) => {
  const { userData, isMobile } = useContext(NavbarContext);
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedState, setSelectedState] = useState<StateOption | null>(null);

  const [enteredHelp, setEnteredHelp] = useState({
    error: false,
    value: "F99",
    item: {},
    errorMessage: "",
    id: "enteredHelp",
  });

  // country code based on the selected country
  let countryNames: string[] = [];
  for (const countryCode in COUNTRIES_DATA) {
    if (COUNTRIES_DATA.hasOwnProperty(countryCode)) {
      const countryName = COUNTRIES_DATA[countryCode].name;
      countryNames.push(countryName);
    }
  }

  let countryCode = "+91"; // Default value

  if (selectedCountry?.label) {
    const selectedCountryName = selectedCountry.label.toLowerCase();
    for (const code in COUNTRIES_DATA) {
      if (COUNTRIES_DATA.hasOwnProperty(code)) {
        if (COUNTRIES_DATA[code].name.toLowerCase() === selectedCountryName) {
          countryCode = COUNTRIES_DATA[code].country_code;
          break;
        }
      }
    }
  }

  const [enteredPhone, setMobileNumber] = useState({
    error: false,
    value: "",
    isLoading: false,
    errorMessage: "",
    id: "enteredPhone",
  });

  const [enteredQuery, setEnteredQuery] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "enteredQuery",
  });

  const [enteredFullName, setEnteredFullName] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "enteredFullName",
  });

  const [enteredEmailId, setEnteredEmailId] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "enteredEmailId",
  });

  const [enteredPincode, setEnteredPincode] = useState({
    error: false,
    value: "",
    isLoading: false,
    errorMessage: "",
    id: "enteredPincode",
  });

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let scrollTarget = "";

  const getFields = () => [
    enteredHelp,
    // enteredQuery,
    enteredFullName,
    enteredPhone,
    enteredEmailId,
    // enteredState,
    enteredPincode,
  ];

  const validateFields = () => {
    let countError = 0;
    getFields()
      .reverse()
      .forEach((fieldItem) => {
        if (
          fieldItem.error ||
          (typeof fieldItem.value === "string" &&
            fieldItem.value.length === 0) ||
          typeof fieldItem.value === "undefined"
        ) {
          countError++;
          scrollTarget = fieldItem.id;
        }
      });

    if (countError !== 0) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    // Set Up Fill

    // Help
    if (enquiryRawData.rawHelpList.length == 1) {
      const vehicle = enquiryRawData.rawHelpList[0].text;
      setEnteredHelp({
        ...enteredHelp,
        value: vehicle,
        item: {
          text: vehicle,
          value: vehicle,
        },
      });
    }

    if (userData?.phone != null) {
      const nmWithCode = addCountryCodeIfNot(userData?.phone);
      onPhoneNumberChanged(nmWithCode);
    }

    if (userData?.name != null) {
      const name = userData.name;
      setEnteredFullName({
        ...enteredFullName,
        value: name,
      });
    }
  }, [userData?.email]);

  // Form Validation
  useEffect(() => {
    const isValid = validateFields();

    setIsFormValid(isValid);
  }, getFields());

  const checkFormatValidation = async () => {
    // onHelpChanged(enteredHelp.item);
    onFullnameChanged(enteredFullName.value);
    // onQueryChanged(enteredQuery.value);
    onPhoneNumberChanged(enteredPhone.value);
    onEmailIdChanged(enteredEmailId.value);
    // onStateChanged(enteredState.item);
    onPincodeChanged(enteredPincode.value);

    const isValid = validateFields();
    if (scrollTarget.length !== 0) {
      scrollToInputField(scrollTarget);
    }
    return isValid;
  };

  const onSubmitHandler = async () => {
    if (!isFormValid) return;
    if (isFormSubmitted) return;
    // Check format
    const isValid = await checkFormatValidation();
    if (!isValid) {
      return;
    }

    const name = `${enteredFullName.value.trim()}`;

    setIsLoading(true);
    const enquiry_info = {
      help_with: "F77 International",
      query: enteredQuery.value,
      full_name: enteredFullName.value,
      mobile_number: enteredPhone.value,
      email: enteredEmailId.value,
      country: selectedCountry?.label,
      state: selectedState?.label || "",
      pincode: enteredPincode.value,
      has_current_vehicle: true,
      current_vehicle_model: "NA",
    };

    const { error, payload } = await saveEnquiryFormClient(enquiry_info);
    // setShowModal({ value: true, error: !payload });
    if (payload) {
      nextHandlerTapped(enquiry_info);
      setIsFormSubmitted(true);
    }
    router.push(`${originURL}/enquiry/thankyou`);
  };

  const scrollToInputField = (target) => {
    // Check All Fields

    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onQueryChanged = (value) => {
    setEnteredQuery({
      ...enteredQuery,
      value: value,
    });
  };

  const onFullnameChanged = (value) => {
    const validate = validateFullname(value);
    setEnteredFullName({
      ...enteredFullName,
      value: value,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  const onPhoneNumberChanged = (number) => {
    // Allow +91 always
    if (enteredPhone.value === countryCode && number.length <= 3) {
      return;
    }

    let validate;

    if (selectedCountry?.label === "INDIA") {
      validate = validateIndiaPhoneNumber(number);
    } else {
      validate = validateWorldPhoneNumber(number);
    }

    const nmWithCode = addCountryCodeIfNot(number);
    setMobileNumber({
      ...enteredPhone,
      value: "+" + allowDigit(nmWithCode), // Do not allow alphabet
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  const onEmailIdChanged = (value) => {
    const validate = validateEmailId(value);
    setEnteredEmailId({
      ...enteredEmailId,
      value: value,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  const onPincodeChanged = (value) => {
    const validate = validatePincode(value);

    setEnteredPincode({
      ...enteredPincode,
      value: value,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  const handleCountryChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null);

    // Clearing the enteredPincode field in countryChange
    setEnteredPincode({
      error: false,
      value: "",
      isLoading: false,
      errorMessage: "",
      id: "enteredPincode",
    });

    // Clearing the enteredPhone field in countryChange
    setMobileNumber({
      error: false,
      value: "",
      isLoading: false,
      errorMessage: "",
      id: "enteredPhone",
    });
  };

  const handleStateChange = (selectedOption: StateOption | null) => {
    setSelectedState(selectedOption);
  };

  const allowDigit = (number) => number.replace(/[^0-9]/g, "");

  const addCountryCodeIfNot = (phoneNumber) => {
    const phone = phoneNumber.includes(countryCode)
      ? phoneNumber
      : countryCode + phoneNumber;
    return phone;
  };

  const [checkbox, setCheckbox] = useState(false);

  return (
    <div>
      {/* Content Tabs go here */}
      <div className={`${className} pb-12 scrollSection`}>
        <div className="">
          <div className="grid grid-cols-6 content-center ">
            <div className="col-span-5 mt-5 sm:mt-12 mb-2 ">
              {
                TextElement({
                  text: "REGISTER YOUR INTEREST",
                  fontSize: isMobile ? 16 : 24,
                  className: "brutal",
                }).REGULAR.BLACKSECONDARY
              }
            </div>
            <div className="col-span-1 mt-7 sm:mt-14">
              <Image
                width={110}
                height={50}
                src={"/images/payments/group.png"}
                alt="Group"
              />
            </div>
          </div>

          {/* New Divide */}
          <div className="">
            <div
              style={{
                height: "2px",
                backgroundColor: "red",
                opacity: "0.4",
              }}
            ></div>
          </div>
          <p className="text-gray-600 font-normal text-[14px] leading-[20px] tracking-[0.2px] mt-5">
            We are expanding globally at a rapid pace & will be there at your
            location soon. Drop in your details and we will get in touch. Check
            our{" "}
            <span className="underline cursor-pointer">Rollout Calendar</span>{" "}
            for more details.
          </p>

          <div className="" style={{ marginTop: "26px" }}>
            {/* Description */}
            <div className="" id="form">
              {/* Name */}
              <div className="mt-7">
                <TextFieldInput
                  id={enteredFullName.id}
                  onBlur={onFullnameChanged}
                  isError={enteredFullName.error}
                  errorMessage={enteredFullName.errorMessage}
                  label={"Enter your Full Name *"}
                  onChanged={onFullnameChanged}
                  value={enteredFullName.value}
                  placeholder="FULL NAME"
                />
              </div>

              {enteredFullName.value !== "" && (
                <div className="mt-7">
                  <DropDownTextField
                    items={Object.keys(COUNTRIES_DATA)?.map((countryCode) => ({
                      text: COUNTRIES_DATA[countryCode].name.toUpperCase(),
                      value: countryCode.toUpperCase(),
                    }))}
                    value={selectedCountry || {}}
                    isMobile={isMobile}
                    onChanged={handleCountryChange}
                    label="Select your Country *"
                    placeholder="COUNTRY"
                  />

                  {/* Conditional state rendering based on the country */}
                  {selectedCountry &&
                    COUNTRIES_DATA[selectedCountry.value]?.states &&
                    Object.keys(COUNTRIES_DATA[selectedCountry.value].states)
                      .length > 0 && (
                      <>
                        <div className="mt-7">
                          <DropDownTextField
                            items={Object.keys(
                              COUNTRIES_DATA[selectedCountry?.value].states
                            ).map((stateCode) => ({
                              text: COUNTRIES_DATA[selectedCountry?.value]
                                .states[stateCode],
                              value: stateCode,
                            }))}
                            isMobile={isMobile}
                            onChanged={handleStateChange}
                            value={selectedState || ""}
                            label="Select your State *"
                            placeholder="STATE"
                          />
                        </div>
                      </>
                    )}
                </div>
              )}

              {/* Pincode */}
              {(selectedState ||
                (selectedCountry &&
                  COUNTRIES_DATA[selectedCountry.value]?.states &&
                  Object.keys(COUNTRIES_DATA[selectedCountry.value].states)
                    .length === 0)) && (
                <div className="mt-7">
                  <TextFieldInput
                    id={enteredPincode.id}
                    readOnly={
                      userData?.email !== null && userData?.email !== undefined
                    }
                    onBlur={onPincodeChanged}
                    isError={enteredPincode.error}
                    errorMessage={enteredPincode.errorMessage}
                    onChanged={onPincodeChanged}
                    value={enteredPincode.value}
                    label="Enter your Pincode *"
                    placeholder="PINCODE"
                  />
                </div>
              )}

              {/* Phone Number */}
              {enteredPincode.value !== "" && (
                <div className="mt-7">
                  <PhoneNumberInput
                    id={enteredPhone.id}
                    readOnly={
                      userData?.phone !== null && userData?.phone !== undefined
                    }
                    isError={enteredPhone.error}
                    errorMessage={enteredPhone.errorMessage}
                    onChanged={onPhoneNumberChanged}
                    onBlur={onPhoneNumberChanged}
                    value={enteredPhone.value}
                    label="Enter your Mobile Number *"
                    placeholder={`${countryCode} PHONE NUMBER`}
                  />
                </div>
              )}

              {/* Email ID */}
              <div className="mt-7">
                {enteredPhone.value !== "" && (
                  <div className="mt-7">
                    <TextFieldInput
                      id={enteredEmailId.id}
                      readOnly={
                        userData?.email !== null &&
                        userData?.email !== undefined
                      }
                      onBlur={onEmailIdChanged}
                      isError={enteredEmailId.error}
                      errorMessage={enteredEmailId.errorMessage}
                      onChanged={onEmailIdChanged}
                      value={enteredEmailId.value}
                      label="Enter your Email *"
                      placeholder="EMAIL ID"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row mb-5 px-7 md:px-20 justify-center items-start">
        <div className={Style.check}>
          <input
            type="checkbox"
            checked={checkbox}
            onChange={() => setCheckbox((prev) => !prev)}
          />
          <span className={Style.checkmark}></span>
        </div>
        <div className={Style.checkboxText}>
          Subscribe to official communication, product launches, and new
          features updates. We won’t spam.
        </div>
      </div>

      <Link href="/managedata">
        <div className="mb-32 px-7 md:px-20 text-[#565656] brutal text-[14px] font-normal leading-normal underline cursor-pointer">
          Manage your data consent
        </div>
      </Link>

      {/* Button */}
      <div className="sm:-mt-[87px] -mt-10 relative z-10">
        <Button
          className="paymentBtn"
          onClick={() => onSubmitHandler()}
          text="NEXT"
          width="100%"
          bg={isFormValid && !isFormSubmitted ? "black" : "#EAEAEA"}
          disable={!isFormValid || isLoading || isFormSubmitted}
          // Once Selected
          allowHover={isFormValid}
          isDark={isFormValid}
        />
      </div>
    </div>
  );
};

export default InternationalEnqueryForm;
