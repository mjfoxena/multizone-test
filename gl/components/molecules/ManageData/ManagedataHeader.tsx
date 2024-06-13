import Image from "next/image";
import { useState } from "react";
import ThankyouManageData from "./thankyou";

function ManageDataHearder() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return <ThankyouManageData />;
  }
  return (
    <div className="w-full h-full  flex flex-col justify-center items-center bg-[#ECECEC]">
      <div className="w-full h-full max-w-[80%] max-sm:max-w-[90%] flex flex-col">
        <div className=" flex justify-between items-center w-full mt-[6.063rem]">
          <h1 className="eurostile text-[#414141] text-[40px] max-sm:text-[24px] font-normal leading-normal text-custom-gray">
            MANAGE YOUR DATA CONSENT
          </h1>{" "}
          <div className="w-[137px] h-[32px] opacity-80 max-sm:hidden">
            <Image
              src={"/images/consent/dotssquare.svg"}
              alt="arrow"
              width={100}
              height={100}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <div className="mt-[3.125rem] max-sm:mt-5">
          <hr
            className="w-full h-0 flex-shrink-0"
            style={{ borderWidth: "1.486px", borderColor: "#ED1C24" }}
          />
        </div>
        <div className="mt-[3.125rem] max-sm:mt-10">
          <p className="text-custom-gray brutal text-[16px] font-normal leading-normal">
            Enter your email address to get access to your data.
          </p>

          <input
            type="email"
            placeholder="Enter your email address"
            className="flex w-[600px] max-sm:w-full p-[18px] px-[24px] items-center gap-[272px] rounded-[4px] border border-black bg-[#EAEAEA] mt-5"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-[7.625rem] max-sm:w-full mb-[8.313rem] max-sm:mb-[24.125rem] mt-5 inline-flex p-[14px_31px] items-start gap-[10px] rounded-[4px] border border-black bg-black text-white brutal text-16px font-medium leading-[28px] tracking-[0.2px]"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default ManageDataHearder;
