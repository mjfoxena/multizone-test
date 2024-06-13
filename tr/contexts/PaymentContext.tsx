import React, { useState, createContext, useEffect, useContext } from "react";
import router, { useRouter } from "next/router";
import { IUser } from "../services/ProfileService";
import { getPaymentTranscationHistory } from "../services/PaymentService";
import { NavbarContext } from "./NavbarContext";

type PaymentProps = {
  paymentHistories: Array<any>;
  isLoadingHistories: boolean;
  paymentHistoryInfo: any;
};

interface PaymentHistory {
  booking_amount_pad: number;
  booking_dt_tm: string;
  booking_order_id: string;
  payment_history: Array<any>;
}

export const PaymentContext = createContext<PaymentProps>({
  paymentHistories: [],
  isLoadingHistories: false,
  paymentHistoryInfo: undefined,
});

export default function PaymentContextProvider({
  children,
  reload,
}: {
  children: React.ReactNode;
  reload: boolean;
}) {
  const route = useRouter();
  const { userData } = useContext(NavbarContext);
  const [paymentHistories, setPaymentHistories] = useState([]);
  const [paymentHistoryInfo, setPaymentHistoryInfo] =
    useState<PaymentHistory>();
  const [isLoadingHistories, setILoadingHistories] = useState(false);

  const getHistory = async (email) => {
    setILoadingHistories(true);
    // console.log(paymentHistoryInfo, paymentHistories);

    if (paymentHistories.length === 0) {
      const { error, payload } = await getPaymentTranscationHistory({ email });
      // console.log("getPaymentTranscationHistory Response: ", error, payload);
      if (payload) {
        // @ts-ignore
        let history = payload.payment_history;

        if (history) {
          // @ts-ignore
          setPaymentHistories([...history]);
        }
        setPaymentHistoryInfo(payload as PaymentHistory);
      } else {
        setPaymentHistories([...paymentHistories]);
        // @ts-ignore
        setPaymentHistoryInfo({ ...paymentHistoryInfo });
      }
    } else {
      setPaymentHistories([...paymentHistories]);
      // @ts-ignore
      setPaymentHistoryInfo({ ...paymentHistoryInfo });
    }
    setILoadingHistories(false);
  };

  useEffect(() => {
    if (userData?.email) {
      console.log("Get History Called--->");

      getHistory(userData.email);
    }
  }, [userData?.email]);

  return (
    <PaymentContext.Provider
      value={{
        paymentHistories,
        isLoadingHistories,
        paymentHistoryInfo,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
