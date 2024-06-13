import React from "react";
import Style from "../../../pages/squadron/squadron.module.scss";
import Image from "next/image";

const TestimonialHeader = () => {
  return (
    <>
      <div className={Style.squadron_child}>
        <div className="flex flex-col justify-between -ml-10 sm:ml-0">
          <p className="brutal text-[16px] sm:text-[28px] font-normal text-[#807F7F]">
            PILOT
          </p>
          <p className="text-[20px] sm:text-[48px] sm:-mt-2 -ml-1 font-normal text-[#ffffff] eurostile">
            TESTIMONIALS
          </p>
          <div className="col-span-1">
            <Image
              width={110}
              height={50}
              src={"/images/payments/group.png"}
              alt="Group"
              style={{ float: "right" }}
              className="-mt-7 sm:-mt-10 opacity-20 op"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialHeader;