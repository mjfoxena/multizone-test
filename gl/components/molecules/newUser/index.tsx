import React from "react";
import { MapCss } from "../../../utils/utils";
import Style from "./newUser.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { clearLocalStorage } from "../../../services/helper";
import {
  BookingFlow,
  ConfigFlow,
  ReferrerFlow,
} from "../../../utils/CookieManagement";

const NewUser = ({ name }) => {
  const router = useRouter();
  const signOut = () => {
    clearLocalStorage();
    ReferrerFlow.clearCookie();
    BookingFlow.clearCookie();
    ConfigFlow.clearCookie();
    router.push("/");
  };
  return (
    <div className={MapCss(Style, "background", "")}>
      {/* top div */}
      <div className="w-full  h-full flex flex-row">
        {/*---------------------- Account details---------- */}
        <div className="w-full   h-full  flex-flex-col sm:ml-20 sm:mr-20 sm:w-2/3">
          {/* account details header */}
          <div
            className={MapCss(
              Style,
              "eurostile color border",
              "mt-5 pb-5  text-xl mx-6 font-normal sm:mt-16 sm:text-2xl sm:mx-0"
            )}
          >
            ACCOUNT DETAILS
          </div>
          {/*hello pilot*/}
          <div
            className={MapCss(
              Style,
              "color-white brutal",
              "mt-8 font-normal mx-6 text-sm sm:text-xl sm:mx-0"
            )}
          >
            Hello <span className="capitalize">{name}</span>,
            <div
              className={MapCss(
                Style,
                "color-white",
                "font-normal text-xs mt-3 sm:mt-5 sm:text-base max-w-[75%]"
              )}
            >
              This is your account with Ultraviolette Automotive. We are GDPR
              compliant & your data is safe with us. You can choose to view,
              edit or remove you data & preferences via this link -
            </div>
          </div>
          {/* configure your f77 */}
          <div
            onClick={() => router.push("/managedata")}
            className="flex flex-row items-start  ml-7 sm:ml-0 mt-10 cursor-pointer"
          >
            <div
              className={MapCss(
                Style,
                "brutal color-white",
                "font-normal text-sm sm:text-lg"
              )}
            >
              MANAGE YOUR DATA CONSENT
            </div>
            <Image
              src={"/images/profile/crossarrow.svg"}
              className={`w-2 h-2 mt-1 ml-1`}
              width={10}
              height={10}
              alt="product"
            />
            {/* f77 */}
            {/* <div className={MapCss(Style, "f77-text", "ml-2 mr-4")}>
              <Image
                src={"/images/profile/f77.png"}
                className={Style.f77Img}
                fill
                alt="product"
              />
            </div> */}
            {/* button */}
            {/* <div
              className={MapCss(Style, "btn-text", "cursor-pointer")}
              onClick={() => router.push("/configure")}
            >
              <Image
                src={"/images/profile/btn.png"}
                fill
                className={Style.btnImg}
                alt="product"
              />
            </div> */}
          </div>
        </div>

        {/* logout */}
        <div className="w-1/3 hidden sm:flex flex-col">
          <div className="mt-[66px] hidden  sm:flex text-end justify-end  cursor-pointer">
            <div
              className={MapCss(Style, "color-white brutal", "text-sm w-full")}
              onClick={() => signOut()}
            >
              SIGN OUT
            </div>
            <div className={MapCss(Style, "signout-arrow", "ml-1 ")}>
              <Image
                src="/images/profile/signout-arrow.png"
                width={8}
                height={8}
                alt="arrow"
              />
            </div>
          </div>
        </div>
      </div>
      {/* logout mobile */}
      <div className="pl-6 pr-6 sm:hidden">
        <div className={MapCss(Style, "border", "mt-4")}></div>
        <div className="mt-5 flex  sm:hidden   cursor-pointer">
          <div
            className={MapCss(Style, "color-white brutal", "text-sm")}
            onClick={() => signOut()}
          >
            SIGN OUT
          </div>
          <div className={MapCss(Style, "signout-arrow", "ml-1 ")}>
            <Image
              src="/images/profile/signout-arrow.png"
              width={8}
              height={8}
              alt="arrow"
            />
          </div>
        </div>
      </div>
      {/* bike Image */}
      <div className={MapCss(Style, "f77", "mt-44")}>
        <Image
          src={"/images/profile/f77dark.png"}
          fill
          className={Style.f77Dark}
          alt="product"
        />
      </div>
    </div>
  );
};

export default NewUser;
