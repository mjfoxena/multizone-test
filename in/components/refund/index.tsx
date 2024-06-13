import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { NavbarContext } from "../../contexts/NavbarContext";
import { refundRawData } from "../../constants/raw_data";
import { useRouter } from "next/router";
import Button from "../atoms/Button";

import ConfirmDetailsForm from "./refundForms/confirmDetailsForm";
import ReasonForm from "./refundForms/reasonForm";
import RetainForm from "./refundForms/retainForm";
import CalculatesavingsForm from "./refundForms/calculatesavingsForm";
import FinalRefundForm from "./refundForms/finalRefundForm";
import Modal from "../molecules/Modal";
import { getcompleteUserProfile } from "../../services/ProfileService";
import { saveRefundDetails } from "../../services/FormServices"

interface IUser {
  order_id: any;
  name: string;
  model: string;
}

const CancelBooking = ({ className = "" }) => {
  const { userData, isMobile } = useContext(NavbarContext);
  const [userDetails, setUserDetails] = useState<IUser | null>(null);

  // const { profileDetails } = useContext();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [refundDataSet, setRefundDataSet] = useState({
    confirm_form: {},
    reasons: [],
    retain: "",
    calculate_savings: "",
    final_refund: "",
  });

  console.log("refundDataSet ", refundDataSet)
  
  // checkbox Fields values
  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        // sending the email as a body and based on email getting complete profileDetails data
        const reqpayload = {
          email: userData?.email,
        };
        const profileDetails = await getcompleteUserProfile(reqpayload);
        setUserDetails(profileDetails);

        // Once userDetails is updated, set the refundDataSet
        setRefundDataSet({
          ...refundDataSet,
          confirm_form: {
            email: userData?.email,
            phone: userData?.phone,
            order_id: profileDetails?.order_id,
            name: profileDetails?.name
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileDetails();
  }, [userData?.email]);

  const handleReaon = (items: []) => {
    setRefundDataSet({
      ...refundDataSet,
      reasons: items,
    });
    if (items.length != 0) {
      setErrorMessage("");
    }
  };
  const handleRetain = (value: string) => {
    setRefundDataSet({
      ...refundDataSet,
      retain: value,
    });
    setErrorMessage("");
  };
  const handleCalculate = (value: string) => {
    setRefundDataSet({
      ...refundDataSet,
      calculate_savings: value,
    });
    setErrorMessage("");
  };
  const handleFinalForm = (value: string) => {
    setRefundDataSet({
      ...refundDataSet,
      final_refund: value,
    });
    setErrorMessage("");
  };

  // NEXT button handler
  const onNextHandler = async () => {
    if (currentIndex > 4) {
      return;
    }
    let error = "";
    if (currentIndex === 1 && refundDataSet.reasons.length === 0) {
      error = "Please select reason";
    } else if (currentIndex === 2 && refundDataSet.retain.length === 0) {
      error = "Please select one";
    } else if (
      currentIndex === 3 &&
      refundDataSet.calculate_savings.length === 0
    ) {
      error = "Please select one";
    } else if (currentIndex === 4 && refundDataSet.final_refund.length === 0) {
      error = "Please select one";
    }

    setErrorMessage(error);

    // if !error then show model
    if (currentIndex === 4) {
      if (!error) {
        if (refundDataSet.final_refund.length > 0) {
          setShowModal(true);
          // api integration
          const refund_info = {
            confirm_form: refundDataSet.confirm_form,
            reasons: refundDataSet.reasons,
            retain: refundDataSet.retain,
            calculate_savings: refundDataSet.calculate_savings,
            final_refund: refundDataSet.final_refund,
          };
          const { payload } = await saveRefundDetails(refund_info);
          console.log("refund_data", refund_info)
        }
      }
      return;
    } else if (currentIndex === 2) {
        if (!error) {
          if (refundDataSet.retain === "I'd like to retain my booking") {
            setShowModal(true);
          }
        }
      }

    if (error.length === 0) {
      const index = currentIndex + 1;
      setCurrentIndex(index);
    }
  };

  const getRenderComp = () => {
    switch (currentIndex) {
      case 0:
        return (<>{<ConfirmDetailsForm email={userData?.email} orderId={userDetails?.order_id} />}{" "}</>);
      case 1:
        return (<>{<ReasonForm onCheckboxChange={handleReaon} selectedOption={refundDataSet.reasons}/>}{" "}</>);
      case 2:
        return (<>{<RetainForm onCheckboxChange={handleRetain} selectedOption={refundDataSet.retain}/>}{" "}</>);
      case 3:
        return (<>{<CalculatesavingsForm onCheckboxChange={handleCalculate} selectedOption={refundDataSet.calculate_savings} /> }{" "}</>);
      case 4:
        return (<>{<FinalRefundForm onCheckboxChange={handleFinalForm} selectedOption={refundDataSet.final_refund}/> }{" "}</>);
      default:
        break;
    }
  };

  const onModalClosed = () => {
    router.push("/profile");
  };

  return (
    <div>
      <div className={`${className} pb-20`}>
        <div className="sm:mx-16 mx-8">
          <div className="grid grid-cols-6 justify-center">
            <div className="col-span-5 mt-5 mb-2">
              <div className="font-medium brutal sm:text-[24px] text-[14px]">
                {refundRawData.title}
              </div>
            </div>
            <div className="col-span-1 mt-7">
              <Image
                width={137}
                height={32}
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
                backgroundColor: "#CF342A",
                opacity: "0.8",
              }}
            ></div>
          </div>
        </div>

        {/* Showing based on currentIndex state */}
        <div>{getRenderComp()}</div>
        <div>
          {errorMessage.length !== 0 && (
            <>
              <p className="text-red-500 ml-16 -mt-16 text-[12px]">
                {errorMessage}
              </p>
            </>
          )}
        </div>
      </div>

      {/* model 1 */}
      <div className="nextButton">
        <Button
          className="paymentBtn"
          onClick={onNextHandler}
          // @ts-ignore
          text="NEXT"
          width="100%"
          bg={"black"}
          disable={false}
          allowHover={true}
          isDark={true}
        />
      </div>

      {/* Modals */}
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
          <div className="bg-white rounded-sm">
            <div className="sm:max-w-2xl w-[90vw] p-7 shadow">
              <div className="flex justify-between">
                <div className="pr-6">
                  {refundDataSet.retain === "I'd like to retain my booking" ? (
                    <span>Great! Your order has been retained successfully and you are still on the F77 priority list.</span>
                  ) : refundDataSet.final_refund === "I want to speak to a UV Executive" ? (
                    <span>Your request is been processed and the team will get back at you shortly.</span>
                  ) : refundDataSet.final_refund === "Yes, process my refund" ? (
                    <span>Your request is been processed and the team will get back at you shortly.</span>
                  ) : (
                    <span>Great! Your order has been retained successfully and you are still on the F77 priority list.</span>
                  )}
                </div>

                <div
                  className="cursor-pointer -mt-3 -mr-3"
                  onClick={(e) => {
                    setShowModal(false);
                    onModalClosed();
                  }}
                >
                  <Image
                    width={16}
                    height={16}
                    alt="tent"
                    src="/images/icons/cross-black.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CancelBooking;