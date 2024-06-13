import React, { useContext, useState } from "react";
import Styles from "./payment_gateway.module.scss";
import { TextElement } from "../../atoms/Texts";
import UIDataTable from "../UI/data_table";
import { PaymentContext } from "../../../contexts/PaymentContext";
import { covertToLocaleDateString } from "../../../utils/utils";

const ViewTranscationHistoy = ({
  className,

  isMobile = false,

  isProfile = false,
}) => {
  const { paymentHistories } = useContext(PaymentContext);
  const headers = [
    {
      text: "Date",
      value: "date",
    },
    {
      text: "Mode",
      value: "mode_of_payment",
      hidden: true,
    },
    {
      text: "Order ID",
      value: "order_id",
    },
    {
      text: "Amount",
      value: "amount",
      className: "text-right",
    },
  ];
  const [currentItems, setCurrentItems] = useState(paymentHistories);

  const onCurrentItemsChange = (items) => {
    setCurrentItems([...items]);
  };

  return paymentHistories.length === 0 ? (
    <></>
  ) : (
    <div className={className}>
      <div className="mb-5 mt-9">
        {isProfile
          ? TextElement({
              text: "Previous Transactions",
              fontSize: isMobile ? 16 : 24,
              className: "brutal mt-1 px-5",
            }).REGULAR.WHITE
          : TextElement({
              text: "Previous Transactions",
              fontSize: isMobile ? 16 : 24,
              className: "brutal",
            }).REGULAR.BLACKSECONDARY}
      </div>
      <div className="mt-1 mx-5 sm:ml-0 sm:mr-0">
        <div
          className=""
          style={{
            height: "1px",
            backgroundColor: "#BBBBBB",
            opacity: isProfile ? "1" : "0.4",
          }}
        ></div>
      </div>
      {/* Table */}
      <div
        className={`${
          isProfile ? "px-5" : ""
        } relative overflow-x-auto pb-7 pt-5`}
      >
        {
          <UIDataTable
            isDark={isProfile}
            classNames={{
              tableClassName: "w-full text-sm text-left font-normal ",
              theadClassName: "text-sm brutal",
              styles: {
                color: isProfile ? "#AFAFAF" : "#7E7E7E",
              },
              thHeadClassName: "pb-3 font-normal",
            }}
            headers={headers}
            items={paymentHistories}
            onCurrentItemsChange={onCurrentItemsChange}
          >
            {currentItems.map((transcation, ind) => (
              <tr
                key={transcation.order_id + ind}
                className={isProfile ? "text-white" : "bg-white"}
              >
                <th
                  scope="row"
                  className=" py-2 brutal text-xs sm:text-sm font-normal"
                >
                  {covertToLocaleDateString(transcation.event_dt_tm)}
                </th>

                {/* <td className=" py-2 brutal text-xs sm:text-sm uppercase font-normal">
                  {formatMode(transcation.mode_of_payment)}
                </td> */}
                <td className=" py-2 brutal text-xs sm:text-sm font-normal truncate">
                  {transcation.order_id}
                </td>
                <td className="  py-2 disketMono text-xs sm:text-sm text-right">
                  <span className="text-left">INR</span>{" "}
                  <span className="text-right">
                    {transcation.amount.toLocaleString("en-IN")}
                  </span>
                </td>
              </tr>
            ))}
          </UIDataTable>
        }
      </div>
    </div>
  );
};

export default ViewTranscationHistoy;
