import Image from "next/image";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { saveKYCInfo } from "../../../services/PaymentService";
import Button from "../../atoms/Button";
import {
  DropDownTextField,
  PhoneNumberInput,
  TextFieldInput,
  UserGenderInput,
} from "../UI/InputField";
import Styles from "./kyc.module.scss";
import { rawCityList } from "../../../constants/raw_data";
import PhoneAuth from "./phoneAuth";
import {
  formatDateOfBirth,
  formatFirstName,
  formatIdentityNumber,
  formatPincode,
  removeWhiteSpace,
  validateAddress,
  validateCity,
  validateDOB,
  validateEmailId,
  validateFirstname,
  validateGender,
  validateIdentityNumber,
  validateLastname,
  validateOccupation,
  validatePancard,
  validatePincode,
  validateProofOfId,
} from "../../../utils/commonFunction/form_validations";

const documentItems = [
  {
    text: "Aadhaar ID",
    value: "aadhaar_id",
  },
  {
    text: "Driving License",
    value: "driving_license",
  },
  {
    text: "Passport ID",
    value: "passport_id",
  },
  {
    text: "Voter ID",
    value: "voter_id",
  },
];

const occupationItems = [
  {
    text: "Student",
    value: "student",
  },
  {
    text: "Salaried",
    value: "salaried",
  },
  {
    text: "Self-employed",
    value: "self_employed",
  },
  {
    text: "Unemployed",
    value: "Unemployed",
  },
];

const KYCForm = ({ nextHandlerTapped, className = "" }) => {
  const { userData, isMobile } = useContext(NavbarContext);

  const [phoneAuth, setPhoneAuth] = useState({
    value: "",
    isVerified: false,
    id: "phoneAuth",
    error: false,
    errorMessage: "",
  });

  const [enteredIdentyNumber, setIdentyNumber] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "enteredIdentyNumber",
  });

  const [enteredPanCard, setEnteredPanCard] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "enteredPanCard",
  });
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
  const [enteredCurrentAddress, setEnteredCurrentAddress] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "enteredCurrentAddress",
  });
  const [enteredPinCode, setEnteredPinCode] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "enteredPinCode",
  });

  const [enteredCity, setEnteredCity] = useState({
    error: false,
    value: "",
    item: {},
    errorMessage: "",
    id: "enteredCity",
  });
  const [enteredDOB, setEnteredDOB] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "enteredDOB",
  });
  const [selctedOccupation, setSelectedOccupation] = useState({
    error: false,
    value: "",
    item: {},
    errorMessage: "",
    id: "selctedOccupation",
  });

  const [selectedIdCategory, setSelectedIdCategory] = useState({
    error: false,
    value: "",
    item: {},
    errorMessage: "",
    id: "selectedIdCategory",
  });
  const [selectedGender, setSelectedGender] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "selectedGender",
  });
  const [enteredEmailId, setEnteredEmailId] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "enteredEmailId",
  });

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let scrollTarget = "";

  const getFields = () => [
    enteredFirstName,
    enteredLastName,
    phoneAuth,
    enteredEmailId,
    enteredPanCard,
    enteredDOB,
    selectedGender,
    enteredCurrentAddress,
    enteredPinCode,
    enteredCity,
    selectedIdCategory,
    enteredIdentyNumber,
    selctedOccupation,
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
    console.log("scrollTarget: ", scrollTarget);

    if (countError !== 0) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    // Set Up Fill
    if (userData?.phone != null) {
      setPhoneAuth({
        ...phoneAuth,
        value: userData?.phone,
      });
    }

    if (userData?.email != null) {
      setEnteredEmailId({
        ...enteredEmailId,
        value: userData?.email,
      });
    }
  }, []);

  // Form Validation
  useEffect(() => {
    const isValid = validateFields();

    setIsFormValid(isValid);
  }, getFields());

  const checkFormatValidation = async () => {
    onFirstnameChanged(enteredFirstName.value);
    onLastnameChanged(enteredLastName.value);

    onEmailIdChanged(enteredEmailId.value);
    checkPhoneVerification();
    onOccupationChanged(selctedOccupation.item);
    onPancardChanged(enteredPanCard.value);
    onDOBChanged(enteredDOB.value);
    onGenderChanged(selectedGender.value);
    onCurrentAddressChanged(enteredCurrentAddress.value);
    onPincodeChanged(enteredPinCode.value);
    onCityChanged(enteredCity.item);
    onProofOfAddressChanged(selectedIdCategory.item);
    onIdentityNumberChanged(enteredIdentyNumber.value);

    const isValid = validateFields();
    if (scrollTarget.length !== 0) {
      scrollToInputField(scrollTarget);
    } else if (!phoneAuth.isVerified) {
      scrollToInputField(phoneAuth.id);
    }
    return isValid && phoneAuth.isVerified;
  };

  const onSubmitHandler = async () => {
    if (!isFormValid) return;
    // Check format
    const isValid = await checkFormatValidation();
    if (!isValid) {
      return;
    }

    setIsLoading(true);
    const kyc_info = {
      first_name: enteredFirstName.value.trim(),
      last_name: enteredLastName.value,
      phone: phoneAuth.value,
      email: userData?.email?.trim().toLowerCase(),

      pancard: enteredPanCard.value,
      date_of_birth: enteredDOB.value,
      occupation: selctedOccupation.value,
      gender: selectedGender.value,

      current_address: enteredCurrentAddress.value,
      pincode: enteredPinCode.value,
      city: enteredCity.value,
      proof_of_document: selectedIdCategory.value,
      identity_number: enteredIdentyNumber.value,
    };
    // nextHandlerTapped(kyc_info);
    // return;

    //
    const response = await saveKYCInfo(kyc_info);
    if (response.status) {
      nextHandlerTapped(kyc_info);
    }

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
  //
  //
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

  const onPhoneVerified = (value) => {
    setPhoneAuth({
      ...phoneAuth,
      isVerified: true,
      value: value,
      error: false,
      errorMessage: "",
    });
    const isValid = validateFields();
    setIsFormValid(isValid);
  };
  const checkPhoneVerification = () => {
    const isVerified = phoneAuth.isVerified;
    setPhoneAuth({
      ...phoneAuth,
      error: !isVerified,
      errorMessage: isVerified ? "" : "Phone number must be verified.",
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
  const onOccupationChanged = (item) => {
    const validate = validateOccupation(item);
    setSelectedOccupation({
      ...selctedOccupation,
      value: validate ? "" : item.value,
      item: validate ? {} : item,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };
  const onPancardChanged = (value) => {
    const removeSpace = removeWhiteSpace(value);

    const validate = validatePancard(removeSpace);
    setEnteredPanCard({
      ...enteredPanCard,
      value: removeSpace.toUpperCase(),
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  const onDOBChanged = (value) => {
    const removeSpace = removeWhiteSpace(value);

    const format = formatDateOfBirth(removeSpace, enteredDOB.value);
    const validate = validateDOB(format);

    setEnteredDOB({
      ...enteredDOB,
      value: format,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  const onGenderChanged = (value) => {
    const validate = validateGender(value);
    setSelectedGender({
      ...selectedGender,
      value: value,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  const onCurrentAddressChanged = (value) => {
    // const removeSpace = removeWhiteSpace(value);

    const validate = validateAddress(value);

    setEnteredCurrentAddress({
      ...enteredCurrentAddress,
      value: value,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  const onPincodeChanged = (value) => {
    const validate = validatePincode(value);
    const format = formatPincode(value);
    if (format) {
      setEnteredPinCode({
        ...enteredPinCode,
        value: format,
        error: !!validate,
        errorMessage: !validate ? "" : validate,
      });
    }
  };
  const onCityChanged = (item) => {
    const validate = validateCity(item.value);
    console.log(validate);
    console.log(item);

    setEnteredCity({
      ...enteredCity,
      value: validate ? "" : item.value,
      item: validate ? {} : item,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };
  const onProofOfAddressChanged = (item) => {
    const validate = validateProofOfId(item);

    setSelectedIdCategory({
      ...selectedIdCategory,
      value: validate ? "" : item.value,
      item: validate ? {} : item,
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
    // reset identity
    setIdentyNumber({
      ...enteredIdentyNumber,
      value: "",
      error: false,
      errorMessage: "",
    });
  };

  const onIdentityNumberChanged = (value) => {
    let validate = validateIdentityNumber(value, selectedIdCategory.value);
    const format = formatIdentityNumber(
      value,
      selectedIdCategory.value,
      enteredIdentyNumber.value
    );
    setIdentyNumber({
      ...enteredIdentyNumber,
      value:
        format || format.length == 0
          ? format.toUpperCase()
          : value.toUpperCase(),
      error: !!validate,
      errorMessage: !validate ? "" : validate,
    });
  };

  const buildIdentyNumber = () => {
    let placeHolderText = "IDENTITY NUMBER";
    let labelText = "Identity Number";

    const filteredItems = documentItems.filter(
      // @ts-ignore
      (item) => item.value === selectedIdCategory.value
    );
    if (filteredItems.length !== 0) {
      placeHolderText = filteredItems[0].text.toUpperCase();
      labelText = filteredItems[0].text + " *";
    }

    return (
      <>
        <TextFieldInput
          id={selectedIdCategory.id}
          onBlur={onIdentityNumberChanged}
          isError={enteredIdentyNumber.error}
          errorMessage={enteredIdentyNumber.errorMessage}
          placeholder={placeHolderText}
          readOnly={selectedIdCategory.value.length === 0}
          onChanged={onIdentityNumberChanged}
          value={enteredIdentyNumber.value}
          label={labelText}
        />
      </>
    );
  };

  return (
    <div>
      {/* Content Tabs go here */}
      <div className={`${className} pb-20`}>
        <div className=" ">
          <div className="grid grid-cols-6 content-center ">
            <div className="col-span-5  ">
              <h3 className=" configuration-header-text font-medium  text-gray mt-5 mb-2 eurostile">
                KYC Details
              </h3>
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
            <p className="text-gray-800 text-xs ">
              We require these details for further processing of your motorcycle
              order. Please ensure details provided are that of the F77 owner.
            </p>
            <div className="" id="form">
              {/* Name */}
              <div className="grid lg:grid-cols-2  sm:gap-4 ">
                <div className=" col-span-1 mt-7">
                  <TextFieldInput
                    id={enteredFirstName.id}
                    onBlur={onFirstnameChanged}
                    isError={enteredFirstName.error}
                    errorMessage={enteredFirstName.errorMessage}
                    label={"First Name *"}
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
                    label={"Last Name *"}
                    onChanged={onLastnameChanged}
                    value={enteredLastName.value}
                    placeholder="LAST NAME"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="mt-7">
                <PhoneAuth
                  errorMessage={phoneAuth.errorMessage}
                  isError={phoneAuth.error}
                  id={phoneAuth.id}
                  value={phoneAuth.value}
                  onGenerated={() => {}}
                  onVerified={onPhoneVerified}
                  key={"phone_authentication"}
                ></PhoneAuth>
              </div>
              {/* Email ID */}
              <div className="mt-7">
                <TextFieldInput
                  id={enteredEmailId.id}
                  onBlur={onEmailIdChanged}
                  isError={enteredEmailId.error}
                  onChanged={onEmailIdChanged}
                  value={enteredEmailId.value}
                  label="Email Id *"
                  readOnly
                  placeholder="EMIAL ID"
                />
              </div>
              {/* Occupation */}
              <div className="mt-7">
                <DropDownTextField
                  id={selctedOccupation.id}
                  isError={selctedOccupation.error}
                  errorMessage={selctedOccupation.errorMessage}
                  items={occupationItems}
                  itemText="text"
                  valueText="value"
                  placeholder="OCCUPATION"
                  isMobile={isMobile}
                  onChanged={onOccupationChanged}
                  value={selctedOccupation.item}
                  label="Occupation *"
                />
              </div>

              {/* Render PAN Field */}
              <div className="mt-7">
                <TextFieldInput
                  id={enteredPanCard.id}
                  onBlur={onPancardChanged}
                  isError={enteredPanCard.error}
                  errorMessage={enteredPanCard.errorMessage}
                  label={"Pancard *"}
                  onChanged={onPancardChanged}
                  value={enteredPanCard.value}
                  placeholder="PANCARD"
                />
              </div>

              {/* Date of Birth */}
              <div className="mt-7">
                <TextFieldInput
                  id={enteredDOB.id}
                  onBlur={onDOBChanged}
                  label={"Date of Birth *"}
                  isError={enteredDOB.error}
                  errorMessage={enteredDOB.errorMessage}
                  onChanged={onDOBChanged}
                  value={enteredDOB.value}
                  placeholder="DD-MM-YYYY"
                />
              </div>
              {/* gender */}
              <div className="mt-7">
                <UserGenderInput
                  id={enteredDOB.id}
                  isError={selectedGender.error}
                  errorMessage={selectedGender.errorMessage}
                  label={"Gender *"}
                  onChanged={onGenderChanged}
                  value={selectedGender.value}
                />
              </div>

              {/* Current Address */}
              <div className="mt-7 ">
                <TextFieldInput
                  id={enteredCurrentAddress.id}
                  onBlur={onCurrentAddressChanged}
                  isError={enteredCurrentAddress.error}
                  errorMessage={enteredCurrentAddress.errorMessage}
                  label={"Current Address *"}
                  onChanged={onCurrentAddressChanged}
                  value={enteredCurrentAddress.value}
                  placeholder="CURRENT ADDRESS"
                />
              </div>
              {/* Pincode and City */}
              <div className=" grid lg:grid-cols-2  sm:gap-4 ">
                <div className="col-span-1 mt-7">
                  <TextFieldInput
                    id={enteredPinCode.id}
                    onBlur={onPincodeChanged}
                    isError={enteredPinCode.error}
                    errorMessage={enteredPinCode.errorMessage}
                    label={"Pincode *"}
                    onChanged={onPincodeChanged}
                    value={enteredPinCode.value}
                    placeholder="PINCODE"
                  />
                </div>
                <div className="col-span-1 mt-7">
                  <DropDownTextField
                    items={rawCityList.map((city) => ({
                      text: city.city_name.toUpperCase(),
                      value: city.city_name,
                    }))}
                    itemText="text"
                    valueText="value"
                    placeholder="CITY"
                    isMobile={isMobile}
                    onChanged={onCityChanged}
                    value={enteredCity.item}
                    isError={enteredCity.error}
                    errorMessage={enteredCity.errorMessage}
                    label={"City *"}
                  />
                </div>
              </div>
              {/* <div className="mt-7"></div> */}
            </div>

            {/* Document Category */}
            <div className="mt-7">
              <DropDownTextField
                isError={selectedIdCategory.error}
                errorMessage={selectedIdCategory.errorMessage}
                items={documentItems.map((item) => ({
                  text: item.text.toUpperCase(),
                  value: item.value,
                }))}
                itemText="text"
                valueText="value"
                placeholder="PROOF OF ADDRESS"
                isMobile={isMobile}
                onChanged={(item) => {
                  onProofOfAddressChanged(item);
                }}
                value={selectedIdCategory.item}
                label="Proof of Address *"
              />
            </div>

            {/* Identy Number */}
            <div className="mt-7">{buildIdentyNumber()}</div>

            <div className="pb-20 sm:pb-20"></div>
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="nextButton">
        <Button
          className="paymentBtn"
          onClick={() => onSubmitHandler()}
          text="NEXT"
          width="100%"
          bg={isFormValid ? "black" : "#EAEAEA"}
          disable={!isFormValid || isLoading}
          // // Once Selected
          allowHover={isFormValid}
          isDark={isFormValid}
        />
      </div>
    </div>
  );
};

export default KYCForm;
