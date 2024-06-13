import { useContext, useState } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import {
  createPaymentSessionId,
  createTestPaymentSessionId,
} from "../../../services/PaymentService";
import Button from "../../atoms/Button";
import VariantCard from "../../atoms/Cards/VariantCard";
import { TextElement } from "../../atoms/Texts";
import { TextFieldInput } from "../UI/InputField";
import Styles from "./payment_gateway.module.scss";
import { iConstants } from "../../../constants/raw_data";
import React from "react";
import { getItoolTip } from "../../../utils/utils";

interface IVariant {
  id: string;
  title: string;
}

const PaymentModeView = ({
  isMobile,
  onClickHandler = (value: string, amount: string) => {},
  className = "",
  isSandbox = false,
  isLoading = false,
  isModalOpened = false,
  paymentContent,
}) => {
  const { userData } = useContext(NavbarContext);
  const [payableAmount, setPayableAmount] = useState({
    value: "",
    error: false,
  });
  const [selectedVariant, setSelectedVariant] = useState<IVariant>({
    id: "",
    title: "",
  });

  const isVariantSelected = () =>
    Object.keys(selectedVariant).length !== 0 &&
    selectedVariant.id.length !== 0;

  const isSelected =
    selectedVariant.id == iConstants.ONLINE_PAYMENT
      ? payableAmount.value.length !== 0 && parseInt(payableAmount.value) !== 0
      : isVariantSelected();

  const onNextHandler = async () => {
    if (isSelected) {
      onClickHandler(selectedVariant.id, payableAmount.value);
    }
  };

  return (
    <>
      <div className={`${className} `}>
        <div className="mb-2 mt-5">
          {
            TextElement({
              text: paymentContent.title,
              fontSize: isMobile ? 16 : 14,
            }).MEDUIM.BLACK
          }
        </div>
        <p className="mb-10 text-xs text-gray-600">
          {paymentContent.description}
        </p>
        {paymentContent.modes.map((mode) => (
          <div className="pt-5" key={mode.id}>
            <VariantCard
              description={""}
              info={getItoolTip(mode)}
              selected={
                selectedVariant.id == ""
                  ? false
                  : selectedVariant.id === mode.id
              }
              showEmi={true}
              price={0}
              isInProgress={false}
              label={mode.title}
              showIncluded={false}
              trailing={mode.trailing}
              onClick={() => {
                if (mode.id === selectedVariant.id) {
                  setSelectedVariant({
                    id: "",
                    title: "",
                  });
                } else {
                  setSelectedVariant({
                    id: mode.id,
                    title: mode.title,
                  });
                }
              }}
            />
            {mode.id === selectedVariant.id &&
              mode.id === iConstants.ONLINE_PAYMENT && (
                <div className="pt-5 pb-5">
                  <TextFieldInput
                    label="Amount to Pay *"
                    onChanged={(value) => {
                      try {
                        const parse = parseInt(value);
                        const isNan = Number.isNaN(parse);
                        if (!isNan) {
                          setPayableAmount({
                            value,
                            error: false,
                          });
                        } else {
                          setPayableAmount({
                            value: "",
                            error: true,
                          });
                        }
                      } catch (error) {
                        console.log("error: ", error);

                        // setPayableAmount({
                        //   value,
                        //   error: true,
                        // });
                      }
                    }}
                    value={payableAmount.value}
                    isError={payableAmount.error}
                    key="some_input"
                    placeholder="AMOUNT"
                  />
                </div>
              )}
          </div>
        ))}
      </div>
      <div className="nextButton mt-10">
        {!isModalOpened && (
          <Button
            className="paymentBtn"
            text={"NEXT"}
            onClick={onNextHandler}
            bg={isSelected ? "black" : "#EAEAEA"}
            width="100%"
            // Initail Disable State
            disable={!isSelected || isLoading}
            // Once Selected
            allowHover={isSelected}
            isDark={isSelected}
          />
        )}
      </div>
    </>
  );
};

export default PaymentModeView;
