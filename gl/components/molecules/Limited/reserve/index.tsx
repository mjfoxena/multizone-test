import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../../../contexts/NavbarContext";
import Style from "../../../../pages/limited/limited.module.scss";
import { useLimitedSpaceAvailableStatus } from "../../../../queries/config";
import { getOldUserInfo } from "../../../../services/auth";
import { getUserIds } from "../../../../services/helper";
import { IUser } from "../../../../services/ProfileService";
import { ReferrerFlow } from "../../../../utils/CookieManagement";
import { originURL } from "../../../../services/constants";

const ReserveSpot = ({ imageUrl }) => {
  const router = useRouter();
  const [isSoldOut, setIsSoldOut] = useState(false);
  const { userData, isMobile } = useContext(NavbarContext);

  const { data: availableStatus, error } = useLimitedSpaceAvailableStatus(() => {});
  useEffect(() => {
    setIsSoldOut(!availableStatus);
  }, [availableStatus]);
  const redirection = async () => {
    if (userData?.email) {
      router.push(`${originURL}/configure/limited`);
    } else {
      ReferrerFlow.setCookie(`${originURL}/configure/limited`);
      router.push(`${originURL}/signin`);
    }
  };

  return (
    <div className={Style.reserve}>
      <div className="pl:[10px] sm:min-w-[300px] lg:min-w-[500px] sm:max-w-[60%] flex items-center mb-[38px] sm:mt-[61px] sm:mb-[61px] sm:pl-[20px] lg:pl-[40px]">
        <Image
          className={Style.imageContainer}
          alt="infoBike"
          width={736}
          height={452}
          src={`${imageUrl}limited_7.jpg`}
        />
      </div>
      <div className="flex flex-col sm:mt-[53px] sm:pl-[10px] lg:pl-[40px]">
        <div className={Style.spotText}>limited edition</div>
        <div className={Style.subReserve}>
          <div>77 of you could take command of the these </div>
          <div>machines and redefine the future.</div>
        </div>
        <div className={Style.subReserveMobile}>
          <div>
            77 of you could take command of the these machines and redefine the
            future.
          </div>
        </div>
        <div
          className={isSoldOut ? Style.accesswrapperSold : Style.accesswrapper}
          onClick={() => {
            !isSoldOut && redirection();
          }}
        >
          {isSoldOut ? (
            <div className={Style.accessTextSoldOut}>sold out</div>
          ) : (
            <div className={Style.accessText}>access the future</div>
          )}
          {!isSoldOut && (
            <>
              <div className="hidden sm:flex">
                {" "}
                <Image
                  alt="arrow-right"
                  width={20}
                  height={19}
                  src={"/images/icons/horizontalWhiteArrow.svg"}
                />
              </div>
              <div className="flex sm:hidden">
                {" "}
                <Image
                  alt="arrow-right"
                  width={20}
                  height={16}
                  src={"/images/limited/blackArrow.svg"}
                />
              </div>
            </>
          )}
        </div>
        <div className={Style.arrowText}>
          {">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"}
        </div>
      </div>
    </div>
  );
};

export default ReserveSpot;
