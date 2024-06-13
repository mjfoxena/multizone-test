
import { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../../../contexts/NavbarContext";
import { saveSpaceInterests } from "../../../../services/FormServices";
import {
    PhoneNumberInput,
} from "../../../payment/UI/InputField";
import { useRouter } from "next/router";
import {
    validatePhoneNumber,
} from "../../../../utils/commonFunction/form_validations";




const Notify = () => {
    const router = useRouter();
    const { userData } = useContext(NavbarContext);

    const countryCode = "+91";
    const [enteredPhone, setMobileNumber] = useState({
        error: false,
        value: "",
        isLoading: false,
        errorMessage: "",
        id: "enteredPhone",
    });


    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    let scrollTarget = "";

    const getFields = () => [
        enteredPhone,
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
        if (userData?.phone != null) {
            const nmWithCode = addCountryCodeIfNot(userData?.phone);
            onPhoneNumberChanged(nmWithCode);
        }
    }, [userData?.email]);

    // Form Validation
    useEffect(() => {
        const isValid = validateFields();

        setIsFormValid(isValid);
    }, getFields());

    const checkFormatValidation = async () => {
        onPhoneNumberChanged(enteredPhone.value);

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

        setIsLoading(true);
        const enquiry_info = {
            user_phone: enteredPhone.value,
        };

        const { error, payload } = await saveSpaceInterests(enquiry_info);
        setIsFormSubmitted(true);
    };

    const scrollToInputField = (target) => {
        // Check All Fields

        const element = document.getElementById(target);

        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Input Fields Validation Starts Her

    const onPhoneNumberChanged = (number) => {
        // Allow +91 always
        if (enteredPhone.value === countryCode && number.length <= 3) {
            return;
        }
        const validate = validatePhoneNumber(number);
        const nmWithCode = addCountryCodeIfNot(number);
        setMobileNumber({
            ...enteredPhone,
            value: "+" + allowDigit(nmWithCode), // Do not allow alphabet
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

    return (
        <div>
            {/* Phone Number */}
            {isFormSubmitted ? ( // If the form is submitted, show the "Thank You" message
                <div className="text-center mt-7">
                    <p className="text-xl disketMono">Thank you!</p>
                </div>
            ) : (
                <div>
                    <div className="mt-7 sm:mr-10 lg:mr-0">
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
                            label="Notify Me When It Opens up"
                            placeholder={`${countryCode} PHONE NUMBER`}
                        />
                    </div>
                    {/* Button */}
                    <div className="bg-black text-white p-3 mt-2 flex justify-center items-center sm:mr-10 lg:mr-0">
                        <button onClick={onSubmitHandler}>Notify</button>
                    </div>

                </div>
            )}

        </div>
    );
};

export default Notify;