import Button from "../../atoms/Button";
import { ClosableSidePanel } from "../../molecules/ClosableGridPanel";
import Styles from "./payment_gateway.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { userVBASetUp } from "../../../services/PaymentService";

let isExecuting = false;

const DirectPaymentMode = ({
  onClosedHandler,
  onNextHandler,
  amountToPay = 0,
  className = "",
  isSandbox = false,
  content,
}) => {
  const { userData } = useContext(NavbarContext);
  const [isLoading, setIsLoading] = useState(false);

  const [userVbaAccounts, setUserVbaAccounts] = useState([]);

  const setUpVBA = async () => {
    isExecuting = true;
    setIsLoading(true);

    const body = {
      name: userData.name?.trim(),
      email: userData.email,
      phone: userData.phone,
    };

    const { error, payload } = await userVBASetUp(isSandbox, body);
    console.log("Error: ", error, " Payload: ", payload);

    // @ts-ignore
    if (payload) {
      setUserVbaAccounts([...payload]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isExecuting) {
      setUpVBA();
    }
  }, []);

  return (
    <ClosableSidePanel
      title={content.title}
      autoWidth={false}
      onClose={() => {
        isExecuting = false;
        onClosedHandler();
      }}
      className={className}
    >
      <div>
        <div className={className}>
          <p
            className="text-base mt-20 nunito"
            style={{
              color: "#202020",
            }}
          >
            {content.description}
          </p>

          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div>
              {userVbaAccounts.length !== 0 &&
                userVbaAccounts.map((account, index) => (
                  <div key={index} className="bg-gray-100 my-7 px-2 sm:px-4">
                    <div className="grid grid-cols-6  text-left">
                      <p className="col-span-2 text-left text-sm sm:text-base nunito my-2 sm:my-4 pr-2">
                        BENEFICIARY
                      </p>
                      <p className="col-span-4 text-sm sm:text-base nunito my-2 sm:my-4">
                        ULTRAVIOLETTE AUTOMOTIVE PRIVATE LIMITED
                      </p>

                      <p className="col-span-2 text-left text-sm sm:text-base nunito my-2 sm:my-4 pr-2">
                        ACCOUNT TYPE
                      </p>
                      <p className="col-span-4 text-sm sm:text-base nunito my-2 sm:my-4">
                        CURRENT
                      </p>

                      <p className="col-span-2 text-left text-sm sm:text-base nunito my-2 sm:my-4 pr-2">
                        BANK NAME
                      </p>
                      <p className="col-span-4 text-sm sm:text-base nunito my-2 sm:my-4">
                        {
                          // @ts-ignore
                          account.bankName
                        }
                      </p>

                      <p className="col-span-2 text-left text-sm sm:text-base nunito my-2 sm:my-4 pr-2">
                        BANK ACCOUNT NUMBER
                      </p>
                      <p className="col-span-4 text-sm sm:text-base nunito my-2 sm:my-4">
                        {
                          // @ts-ignore
                          account.bankAccountNumber
                        }
                      </p>

                      <p className="col-span-2 text-left text-sm sm:text-base  nunito my-2 sm:my-4 pr-2">
                        IFSC CODE
                      </p>
                      <p className="col-span-4 text-sm sm:text-base  nunito my-2 sm:my-4">
                        {
                          // @ts-ignore
                          account.ifsc
                        }
                      </p>

                      {/* <p className="col-span-2 text-left text-base nunito my-4">AMOUNT</p>
                  <p className="col-span-4 text-base nunito my-4">
                    INR {amountToPay.toLocaleString("en-IN")}
                  </p> */}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div
          className=" mt-10"
          style={{
            bottom: 0,
            position: "absolute",
            width: "100%",
          }}
        >
          {/* <Button
            text={"NEXT"}
            onClick={() => onNextHandler()}
            bg={"black"}
            width="100%"
            isDark={true}
            allowHover={true}
          /> */}
        </div>
      </div>
    </ClosableSidePanel>
  );
};

export default DirectPaymentMode;
