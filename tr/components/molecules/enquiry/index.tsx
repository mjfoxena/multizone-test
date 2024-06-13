import Image from "next/image";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { saveEnquiryFormClient } from "../../../services/FormServices";
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
  validateQuery,
  validateIndiaPhoneNumber,
} from "../../../utils/commonFunction/form_validations";
import { TextElement } from "../../atoms/Texts";
import Modal from "../Modal";
import { COUNTRIES_DATA } from "../../../constants/countryData";
import { originURL } from "../../../services/constants";

type StateOption = {
  value: string;
  label: string;
  name: string;
  item: {
    value: string;
    label: string;
  };
};

const EnqueryForm = ({ nextHandlerTapped, className = "" }) => {
  const { userData, isMobile } = useContext(NavbarContext);
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState<{ value: string; label: string } | null>(null);
  const [selectedState, setSelectedState] = useState<StateOption | null>(null);

  const [enteredHelp, setEnteredHelp] = useState({
    error: false,
    value: "",
    item: {},
    errorMessage: "",
    id: "enteredHelp",
  });

  const [enteredEnquireAbout, setEnteredEnquireAbout] = useState({
    error: false,
    value: "",
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
    // @ts-ignore
    enteredHelp.item.value === "Others.." ? enteredQuery : null,
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
        if (fieldItem && (
          fieldItem.error ||
          (typeof fieldItem.value === "string" &&
            fieldItem.value.length === 0) ||
          typeof fieldItem.value === "undefined"
        )) {
          countError++;
          scrollTarget = fieldItem.id;
        }
      });

    return countError !== 0 ? false : true;
  };

  useEffect(() => {
    // Set Up Fill

    // Enquire About
    if (enquiryRawData.dealershipOrF77QueryList.length == 1) {
      const vehicle = enquiryRawData.dealershipOrF77QueryList[0].text;
      setEnteredEnquireAbout({
        ...enteredEnquireAbout,
        value: vehicle,
        item: {
          text: vehicle,
          value: vehicle,
        },
      });
    }

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
      const split = name.split(" ");
      const lastname = split[split.length - 1];
      const fName = name.replace(lastname, "");
      // last index is last name
      setEnteredFullName({
        ...enteredFullName,
        value: fName,
      });
    }
  }, [userData?.email]);

  // Form Validation
  useEffect(() => {
    const isValid = validateFields();

    setIsFormValid(isValid);
  }, getFields());

  const checkFormatValidation = async () => {
    onEnquireChanged(enteredEnquireAbout.item);
    onHelpChanged(enteredHelp.item);
    onFullnameChanged(enteredFullName.value);
    onQueryChanged(enteredQuery.value);
    onPhoneNumberChanged(enteredPhone.value);
    onEmailIdChanged(enteredEmailId.value);
    // onStateChanged(enteredState.item); 
    onPincodeChanged(enteredPincode.value)

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
      enquire_about: enteredEnquireAbout.value,
      help_with: enteredHelp.value,
      query: enteredQuery.value,
      full_name: enteredFullName.value,
      mobile_number: enteredPhone.value,
      email: enteredEmailId.value,
      country: selectedCountry?.label,
      state: selectedState?.label || "",
      pincode: enteredPincode.value,
      has_current_vehicle: true,
      current_vehicle_model: "NA"
    };

    const { error, payload } = await saveEnquiryFormClient(enquiry_info);
    // setShowModal({ value: true, error: !payload });
    if (payload) {
      nextHandlerTapped(enquiry_info);
      setIsFormSubmitted(true);
    }
    router.push(`${originURL}/enquiry/thankyou`)
  };

  const onSubmitDealership = async () => {
    router.push(`https://ultraviolette.typeform.com/retail`)
  }

  const scrollToInputField = (target) => {
    // Check All Fields

    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Input Fields Validation Starts Here
  const onEnquireChanged = (item) => {
    const validate = validateCity(item.value);
    setEnteredEnquireAbout({
      ...enteredHelp,
      value: validate ? "" : item.value,
      item: validate ? {} : item,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  const onHelpChanged = (item) => {
    const validate = validateCity(item.value);
    setEnteredHelp({
      ...enteredHelp,
      value: validate ? "" : item.value,
      item: validate ? {} : item,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  const onQueryChanged = (value) => {
    const validate = validateQuery(value);
    setEnteredQuery({
      ...enteredQuery,
      value: value,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
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

  const handleCountryChange = (selectedOption: { value: string; label: string } | null) => {
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

  const onModalClosed = () => {
    router.push(`${originURL}/`);
  };

  return (
    <div>
      {/* Content Tabs go here */}
      <div className={`${className} pb-12 scrollSection`}>
        <div className="">
          <div className="grid grid-cols-6 content-center ">
            <div className="col-span-5  mt-5 mb-2 ">
              {
                TextElement({
                  text: enquiryRawData.title,
                  fontSize: isMobile ? 16 : 24,
                  className: "brutal",
                }).REGULAR.BLACKSECONDARY
              }
            </div>
            <div className="col-span-1 mt-8 sm:mt-7">
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

          <div className="" style={{ marginTop: "26px" }}>
            {/* Description */}

            <p className=" text-sm brutal">{enquiryRawData.description}</p>
            <div className="" id="form">

              {/* F77 or Dealership */}
              <div className=" mt-7">
                <DropDownTextField
                  items={enquiryRawData.dealershipOrF77QueryList.map((help) => ({
                    text: help.text.toUpperCase(),
                    value: help.text,
                  }))}
                  isMobile={isMobile}
                  onChanged={onEnquireChanged}
                  value={enteredEnquireAbout.item}
                  isError={enteredEnquireAbout.error}
                  errorMessage={enteredEnquireAbout.errorMessage}
                  label={"What do you want to enquire about? *"}
                  placeholder={"Choose enquire about".toUpperCase()}
                />
              </div>

              {/* Help */}
              {enteredEnquireAbout.item !== "" && (
                // @ts-ignore
                enteredEnquireAbout.item.value === "F77" && (
                  <div className="mt-7">
                    <DropDownTextField
                      items={enquiryRawData.rawHelpList.map((help) => ({
                        text: help.text,
                        value: help.text,
                      }))}
                      isMobile={isMobile}
                      onChanged={onHelpChanged}
                      value={enteredHelp.item}
                      isError={enteredHelp.error}
                      errorMessage={enteredHelp.errorMessage}
                      label={"What can we help you with? *"}
                      placeholder={"Select your query".toUpperCase()}
                    />
                  </div>
                )
              )}

              {/* others part */}
              <div className="mt-7">
                {enteredHelp.item !== "" && (
                  // @ts-ignore
                  enteredHelp.item.value === "Others.." && enteredEnquireAbout.item.value === "F77" && (
                    <div>
                      <TextFieldInput
                        id={enteredQuery.id}
                        onBlur={onQueryChanged}
                        isError={enteredQuery.error}
                        errorMessage={enteredQuery.errorMessage}
                        label={"Enter your Query *"}
                        onChanged={onQueryChanged}
                        value={enteredQuery.value}
                        placeholder="QUERY"
                      />
                    </div>
                  )
                )}
              </div>

              {/* Full Name */}
              {
                // @ts-ignore
                enteredHelp.item.value === "Others.." && enteredQuery.value && enteredEnquireAbout.item.value === "F77" && (
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
                )}
              {
                // @ts-ignore
                enteredHelp.item.value !== undefined && enteredHelp.item.value !== "Others.." && enteredEnquireAbout.item.value === "F77" && (
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
                )}
              {/* Country */}
              {
                // @ts-ignore
                enteredFullName.value !== "" && enteredEnquireAbout.item.value === "F77" && (
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
                    {selectedCountry && COUNTRIES_DATA[selectedCountry.value]?.states && Object.keys(COUNTRIES_DATA[selectedCountry.value].states).length > 0 && (
                      <>
                        <div className="mt-7">
                          <DropDownTextField
                            items={Object.keys(COUNTRIES_DATA[selectedCountry?.value].states).map((stateCode) => ({
                              text: COUNTRIES_DATA[selectedCountry?.value].states[stateCode],
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
              {
                // @ts-ignore
                (selectedState || (selectedCountry && COUNTRIES_DATA[selectedCountry.value]?.states && Object.keys(COUNTRIES_DATA[selectedCountry.value].states).length === 0)) && enteredEnquireAbout.item.value === "F77" && (
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
              {
                // @ts-ignore
                enteredPincode.value !== "" && enteredEnquireAbout.item.value === "F77" && (
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
              {
                // @ts-ignore
                enteredPhone.value !== "" && enteredEnquireAbout.item.value === "F77" && (
                  <div className="mt-7">
                    <TextFieldInput
                      id={enteredEmailId.id}
                      readOnly={
                        userData?.email !== null && userData?.email !== undefined
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
              {/* <div className="mt-7"></div> */}
              <div className="pb-10 sm:pb-20"></div>
            </div>

            {/* @ts-ignore */}
            {enteredEnquireAbout.item.value === "Dealership / Distributorship" && (
              <p className=" text-sm brutal -mt-16">{enquiryRawData.dealershipDescription}</p>
            )}

          </div>
        </div>
      </div>

      {/* Button */}
      {/* <div className="sm:-mt-[87px] -mt-10 relative">
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
      </div> */}

      <div className="sm:-mt-[87px] -mt-10 relative">
        <Button
          className="paymentBtn"
          // @ts-ignore
          onClick={() => enteredEnquireAbout.item.value === "Dealership / Distributorship" ? onSubmitDealership() : onSubmitHandler()}
          text="NEXT"
          width="100%"
          // @ts-ignore
          bg={enteredEnquireAbout.item.value === "Dealership / Distributorship" ? "black" : (isFormValid && !isFormSubmitted ? "black" : "#EAEAEA")}
          // @ts-ignore
          disable={enteredEnquireAbout.item.value === "Dealership / Distributorship" ? false : (!isFormValid || isLoading || isFormSubmitted)}
          // @ts-ignore
          allowHover={enteredEnquireAbout.item.value === "Dealership / Distributorship" ? true : isFormValid}
          // @ts-ignore
          isDark={enteredEnquireAbout.item.value === "Dealership / Distributorship" ? true : isFormValid}
        />
      </div>

    </div>
  );
};

export default EnqueryForm;