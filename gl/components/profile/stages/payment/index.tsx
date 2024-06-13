import { useRouter } from "next/router";
import Image from "next/image";

import Style from "./payment-stage.module.scss";
import { MapCss } from "../../../../utils/utils";
import Button from "../../../atoms/Button";
import { bool } from "aws-sdk/clients/signer";
import React, { useContext } from "react";
import { NavbarContext } from "../../../../contexts/NavbarContext";
import { originURL } from "../../../../services/constants";

const InProductionStage = ({ name, stage, vip = false, isKyc = false }) => {
  const router = useRouter();
  const { isMobile } = useContext(NavbarContext);

  const onProceedHandler = (): void => {
    router.push(`${originURL}/payments`);
  };

  return (
    <>
      <div
        className={MapCss(
          Style,
          "background",
          " text-white px-6 sm:px-8 py-7 bg-neutral-800"
        )}
      >
        <h3
          className={`${
            !vip ? "text-red-500" : "text-yellow-500"
          } text-2xl font-medium  nunito`}
        >
          Stage 0{stage}
        </h3>

        <div className="mt-6 max-w-2xl text-base nunito ">
          To proceed you are required to select your insurance plan and vehicle
          financing partner. Alternatively, you can pay the full amount using
          credit card, net banking, mobile payments, UPI. All payments are
          secured and encrypted.
        </div>

        <div className="mt-20">
          <Button
            bg="white"
            onClick={onProceedHandler}
            text="Proceed"
            width={isMobile ? "100%" : "320px"}
            disable={false}
            height={"56px"}
          />
        </div>
      </div>
    </>
  );
};

export default InProductionStage;
