import Image from "next/image";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../contexts/NavbarContext";
import { bookTestRide } from "../../services/PaymentService";
import Button from "../atoms/Button";
import {
  DropDownTextField,
  PhoneNumberInput,
  TextFieldInput,
  RadioButtonField
} from "../payment/UI/InputField";
import { rawCityList, testRideRawData } from "../../constants/raw_data";
import { useRouter } from "next/router";

import {
  removeWhiteSpace,
  validateCity,
  validateEmailId,
  validateFirstname,
  validateLastname,
  validatePhoneNumber,
} from "../../utils/commonFunction/form_validations";
import { TextElement } from "../atoms/Texts";
import Modal from "../molecules/Modal";
import { originURL } from "../../services/constants";

const KYCForm = ({ nextHandlerTapped, className = "" }) => {
  const { userData, isMobile } = useContext(NavbarContext);
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const countryCode = "+91";
  const [enteredPhone, setMobileNumber] = useState({
    error: false,
    value: "",
    isLoading: false,
    errorMessage: "",
    id: "enteredPhone",
  });
  // const [selectedRadio, setSelectedRadio] = useState({
  //   error: false,
  //   value: "",
  //   errorMessage: "",
  //   id: "selectedRadio",
  // });
  const [enteredFirstName, setEnteredFirstName] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "enteredFirstName",
  });
  const [enteredLastName, setEnteredLastName] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "enteredLastName",
  });

  const [enteredCity, setEnteredCity] = useState({
    error: false,
    value: "",
    item: {},
    errorMessage: "",
    id: "enteredCity",
  });

  const [enteredEmailId, setEnteredEmailId] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "enteredEmailId",
  });

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let scrollTarget = "";

  const getFields = () => [
    enteredFirstName,
    enteredLastName,
    enteredPhone,
    // selectedRadio,
    enteredEmailId,
    enteredCity,
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

    // City
    if (rawCityList.length == 1) {
      const city = rawCityList[0].city_name.toUpperCase();
      setEnteredCity({
        ...enteredCity,
        value: city,
        item: {
          text: city,
          value: city,
        },
      });
    }

    if (userData?.phone != null) {
      const nmWithCode = addCountryCodeIfNot(userData?.phone);
      onPhoneNumberChanged(nmWithCode);
    }

    if (userData?.email != null) {
      setEnteredEmailId({
        ...enteredEmailId,
        value: userData?.email,
      });
    }
    if (userData?.name != null) {
      const name = userData.name;
      const split = name.split(" ");
      const lastname = split[split.length - 1];
      const fName = name.replace(lastname, "");
      // last index is last name
      setEnteredLastName({
        ...enteredLastName,
        value: lastname,
      });
      setEnteredFirstName({
        ...enteredFirstName,
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
    onFirstnameChanged(enteredFirstName.value);
    onLastnameChanged(enteredLastName.value);

    onEmailIdChanged(enteredEmailId.value);
    onCityChanged(enteredCity.item);
    onPhoneNumberChanged(enteredPhone.value);
    // onRadioButtonChanged(selectedRadio.value);

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

    const name = `${enteredFirstName.value.trim()} ${enteredLastName.value.trim()}`;

    setIsLoading(true);
    const test_ride_info = {
      name,
      phone: enteredPhone.value,
      email: enteredEmailId.value,
      city: enteredCity.value,
      // time: selectedRadio.value,
      time: "Day",
    };

    const { error, payload } = await bookTestRide(test_ride_info);

    router.push('/thanks');

    setIsLoading(false);
  };

  const scrollToInputField = (target) => {
    // Check All Fields

    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Input Fields Validation Starts Here
  const onFirstnameChanged = (value) => {
    // const format = formatFirstName(value);
    const validate = validateFirstname(value);
    setEnteredFirstName({
      ...enteredFirstName,
      value: value,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  const onLastnameChanged = (value) => {
    const removeSpace = removeWhiteSpace(value);
    const validate = validateLastname(removeSpace);
    setEnteredLastName({
      ...enteredLastName,
      value: removeSpace,
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

  const onCityChanged = (item) => {
    const validate = validateCity(item.value);

    setEnteredCity({
      ...enteredCity,
      value: validate ? "" : item.value,
      item: validate ? {} : item,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  const allowDigit = (number) => number.replace(/[^0-9]/g, "");

  const addCountryCodeIfNot = (phoneNumber) => {
    const phone = phoneNumber.includes(countryCode)
      ? phoneNumber
      : countryCode + phoneNumber;
    return phone;
  };

  const onPhoneNumberChanged = (number) => {
    // Allow +91 always
    if (enteredPhone.value === countryCode && number.length <= 3) {
      return;
    }
    const validate = validatePhoneNumber(number);
    const nmWithCode = addCountryCodeIfNot(number);
    
    console.log("## ", nmWithCode)
    setMobileNumber({
      ...enteredPhone,
      value: "+" + allowDigit(nmWithCode), // Do not allow alphabet
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  // const onRadioButtonChanged = (value) => {
  //   setSelectedRadio({
  //     ...selectedRadio,
  //     value: value,
  //   });
  // };

  const onModalClosed = () => {
    router.push(`${originURL}/`);
  };

  return (
    <div>
      {/* Content Tabs go here */}
      <div className={`${className} pb-20`}>
        <div className=" ">
          <div className="grid grid-cols-6 content-center ">
            <div className="col-span-5  mt-5 mb-2 ">
              {
                TextElement({
                  text: testRideRawData.title,
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
            <p className=" text-sm brutal">{testRideRawData.description}</p>
            <div className="" id="form">
              {/* Name */}
              <div className="grid lg:grid-cols-2  sm:gap-4 ">
                <div className=" col-span-1 mt-7">
                  <TextFieldInput
                    id={enteredFirstName.id}
                    onBlur={onFirstnameChanged}
                    isError={enteredFirstName.error}
                    errorMessage={enteredFirstName.errorMessage}
                    label={"Enter your first name *"}
                    onChanged={onFirstnameChanged}
                    value={enteredFirstName.value}
                    placeholder="FIRST NAME"
                  />
                </div>

                <div className=" col-span-1 mt-7">
                  <TextFieldInput
                    id={enteredLastName.id}
                    onBlur={onLastnameChanged}
                    isError={enteredLastName.error}
                    errorMessage={enteredLastName.errorMessage}
                    label={"Last name *"}
                    onChanged={onLastnameChanged}
                    value={enteredLastName.value}
                    placeholder="LAST NAME"
                  />
                </div>
              </div>

              {/* Phone Number */}
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
                  label="Enter your mobile number *"
                  placeholder={`${countryCode} PHONE NUMBER`}
                />
              </div>

              {/* Email ID */}
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
                  label="Enter your email *"
                  placeholder="EMAIL ID"
                />
              </div>

              {/*  City */}
              <div className="mt-7 ">
                <DropDownTextField
                    items={rawCityList.map((city) => ({
                      text: city.city_name.toUpperCase(),
                      value: city.city_name.toUpperCase(),
                    }))}
                    value={enteredCity.item}
                    isMobile={isMobile}
                    onChanged={onCityChanged} 
                    label="Select your city *"
                    placeholder="CITY"
                  />
                </div>

              {/* day and midnight */}
              {/* <div className=" mt-7">
                <label
                  className={`block mb-2 text-sm font-regular brutal ${
                    selectedRadio.error
                      ? "dark:text-gray-400"
                      : "dark:text-gray-400"
                  }`}
                >
                  Select preferred test ride type *
                </label>
                <div className="grid lg:grid-cols-2 sm:gap-4 mt-3 ml-1">
                  <div className="col-span-1 mt-2">
                    <RadioButtonField
                      id="radio-yes"
                      onBlur={() => { }}
                      label="Day Ride"
                      value="Day"
                      checked={selectedRadio.value === "Day"}
                      onChanged={onRadioButtonChanged}
                    />
                  </div>
                  <div className="col-span-1 mt-2">
                    <RadioButtonField
                      id="radio-no"
                      onBlur={() => { }}
                      label="Midnight Ride"
                      value="Midnight"
                      checked={selectedRadio.value === "Midnight"}
                      onChanged={onRadioButtonChanged}
                    />
                  </div>
                </div>
              </div> */}

              {/* <div className="mt-7"></div> */}
              <div className="pb-20 sm:pb-20"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="nextButton" id="TestrideNextButton">
        <Button
          className="paymentBtn"
          onClick={() => onSubmitHandler()}
          text="NEXT"
          width="100%"
          bg={isFormValid && !isFormSubmitted ? "black" : "#EAEAEA"}
          disable={!isFormValid || isLoading || isFormSubmitted}
          // // Once Selected
          allowHover={isFormValid}
          isDark={isFormValid}
        />
      </div>

    </div>
  );
};

export default KYCForm;
