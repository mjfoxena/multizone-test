import React from "react";

const ViewLoanInfo = ({
  loanAmount = 0,
  remainingAmount = 0,
  totalPayable = 0,
  totalPaid = 0,
  className = "",
}) => {
  return (
    <>
      <div className={`${className} relative overflow-x-auto `}>
        <table className="w-full text-sm text-left text-gray-600 mt-5 table-fixed ">
          <thead className="text-xs ">
            <tr>
              <th scope="col" className="pb-3 text-left">
                Loan Amount
              </th>
              <th scope="col" className="pb-3">
                Paid
              </th>
              <th scope="col" className="pb-3">
                Remaining
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white ">
              <td className="  disketMono text-xs text-left">
                INR {loanAmount.toLocaleString("en-IN")}
              </td>
              <td className="text-xs text-left disketMono">
                {totalPaid.toLocaleString("en-IN")}{" "}
              </td>
              <td className=" text-xs disketMono">
                INR {remainingAmount.toLocaleString("en-IN")}
              </td>
            </tr>
          </tbody>
        </table>
        {/* New Divide */}
        <div className="col-span-12 mt-4">
          <div
            style={{
              height: "1px",
              backgroundColor: "#BBBBBB",
              opacity: "0.4",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ViewLoanInfo;
