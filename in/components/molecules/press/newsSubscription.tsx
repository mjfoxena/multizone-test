import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "../../atoms/Button";
import Modal from "../Modal";
import Image from "next/image";
import { TextFieldInput } from "../../payment/UI/InputField";
import { validateEmailId } from "../../../utils/commonFunction/form_validations";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { subscribeNewsLetter } from "../../../services/FormServices";
import { originURL } from "../../../services/constants";

const NewsSubscription = ({ isMobile }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { userData } = useContext(NavbarContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subscribed, setSubscribed] = useState(false);

  const [enteredEmailId, setEnteredEmailId] = useState({
    error: false,
    value: "",
    errorMessage: "",
    id: "enteredEmailId",
  });

  useEffect(() => {
    // Check if 'localStorage' is available in the current environment
    if (typeof window !== "undefined" && window.localStorage) {
      // Get the 'subscribed' value from 'localStorage' if it exists
      const storedSubscribed = localStorage.getItem("subscribed");
      // If the stored value exists, update the 'subscribed' state
      if (storedSubscribed === "true") {
        setSubscribed(true);
      }
    }
  }, []);

  const onEmailIdChanged = (value) => {
    const validationError = validateEmailId(value);
    setEnteredEmailId((prev) => ({
      ...prev,
      value: value,
      error: !!validationError,
      errorMessage: validationError || "",
    }));
  };

  const validateFields = () => {
    let isValid = true;
    if (!enteredEmailId.value) {
      setEnteredEmailId((prev) => ({
        ...prev,
        error: true,
        errorMessage: "Please enter your email id",
      }));
      isValid = false;
    } else if (enteredEmailId.error) {
      isValid = false;
    }
    return isValid;
  };

  const checkFormatValidation = async () => {
    onEmailIdChanged(enteredEmailId.value);
    const isValid = validateFields();
    return isValid;
  };

  // Subscribe button if user is loggedin
  useEffect(() => {
    if (userData && userData.email) {
      setSubscribed(true);
    }
  }, [userData]);

  const onModalClosed = () => {
    router.push(`${originURL}/press`);
  };

  const onSubmitHandler = async () => {
    if (subscribed) {
      return;
    } else {
      setShowModal(true);
    }
  };

  const onSubmitEmail = async () => {
    // Check format
    const isValid = await checkFormatValidation();
    if (!isValid) {
      return;
    }

    setIsLoading(true);
    const subscribeNewsLetter_info = {
      email: enteredEmailId.value,
    };
    const { error, payload } = await subscribeNewsLetter(
      subscribeNewsLetter_info
    );

    // Storing 'subscribed' in localStorage if it's available
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("subscribed", "true");
    }

    if (subscribeNewsLetter_info.email) {
      setShowModal(false);
      setSubscribed(true);
    }
  };

  return (
    <>
      <div className="pb-[57px] -mt-16 sm:mt-0">
        <div>
          <div className="text-2xl text-[#404040] brutal font-normal">
            Subscribe to our Email list
          </div>
          <div className="text-base font-normal text-[#404040] pt-3 brutal">
            Stay up to date with all the latest updates from
            <br className="hidden lg:hidden sm:inline" />
            Ultraviolette and access to our newsletters.
          </div>
        </div>
        <div className="grid sm:justify-items-end pt-5 sm:pt-0 sm:-mt-[61px]">
          <Button
            width={"304px"}
            fontSize={15}
            onClick={() => onSubmitHandler()}
            text={subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
            bg={subscribed ? "#DA4F46" : "black"}
            color={subscribed ? "#FEFAFA" : "#FEFAFA"}
            disable={subscribed}
            height={"54px"}
            allowHover
            isDark
            trailingIcon={!subscribed}
            successfull={subscribed}
            className="pl-6 pt-[17px] pb[17px] pr-9 leading-5 "
          />
        </div>
      </div>
      {/* Modal if user is not loggedin */}
      {showModal && (
        <Modal
          state={showModal}
          stateHandler={(v) => {
            if (!v) {
              setShowModal(false);
              onModalClosed();
            }
          }}
          closeOnClickOutside
        >
          <div className="bg-white rounded-sm sm:w-[785px] sm:h-[307px] w-[90vw] h-[317px]">
            <div className="flex justify-between">
              <div className="px-12 mt-10 brutal">
                Stay connected with us! Subscribe to our mailing list for
                updates, offers, and a spam-free inbox.
              </div>
              <div
                className=" right-7 top-7 cursor-pointer"
                onClick={(e) => {
                  setShowModal(false);
                  onModalClosed();
                }}
              >
                <Image
                  width={22}
                  height={22}
                  alt="tent"
                  src="/images/icons/cross-black.svg"
                  className="mt-[14px] sm:mr-5 mr-10"
                />
              </div>
            </div>

            {/* Email ID */}
            <div className="mt-7 px-12 nunito">
              <TextFieldInput
                id={enteredEmailId.id}
                isError={enteredEmailId.error}
                errorMessage={enteredEmailId.errorMessage}
                onChanged={onEmailIdChanged}
                value={enteredEmailId.value}
                label=""
                placeholder="ENTER YOUR EMAIL"
              />
            </div>

            {/* Button Stuff */}
            <div className="sm:mt-11 mt-8 brutal font-normal tracking-wide flex justify-end pr-12">
              <button
                className="bg-black text-[#FFF] sm:w-[150px] w-[140px] sm:h-[45px] h-[40px] sm:text[16px] text[12px]"
                onClick={() => onSubmitEmail()}
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NewsSubscription;
