import getConfig from "next/config";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { DocumentConstants } from "../../../constants/document";
import { NavbarContext } from "../../../contexts/NavbarContext";
import Style from "../../../pages/summary/summary.module.scss";
import { IUser } from "../../../services/ProfileService";
import { getOldUserInfo } from "../../../services/auth";
import {
  CreateOrder,
  CreateTestOrder,
  GetSummary,
} from "../../../services/configuratorService";
import { API_CONSTANTS } from "../../../services/constants";
import Button from "../../atoms/Button";
import DueDate from "./dueDate";

declare global {
  interface Window {
    CashFree: any;
  }
}

const baseLink = API_CONSTANTS.BASE_IMAGE_URL_CDN;

// interface IBookin

const SummaryConfig = ({ setImageurl }) => {
  const { publicRuntimeConfig } = getConfig();
  const { userData } = useContext(NavbarContext);
  // console.log("userData ", userData);

  const [summaryData, setSummaryData] = useState<any>(null);
  const [checkbox, setCheckbox] = useState(false);

  const getUserSummary = async (userEmail: string) => {
    try {
      const summaryDataResponse = await GetSummary({ email: userEmail });
      // console.log(summaryDataResponse, 'summaryDataResponse');
      setSummaryData(summaryDataResponse);
      // for selected Images
      let imageUrl: string | undefined;
      const hasMaBikePack =
        summaryDataResponse?.booking_details?.options_data.some(
          (option) => option.name === "MACH 2 PACK"
        );

      const summary = summaryDataResponse?.booking_details;

      if (summary != null) {
        if (hasMaBikePack) {
          imageUrl = `${baseLink}/config/configurator_combination_refresh/${summary?.color_data.option_code}/${summary.model_data.variant_name}/MA/${summary.color_data.option_code}_MA_1.png`;
        } else {
          imageUrl = `${baseLink}/config/configurator_combination_refresh/${summary?.color_data.option_code}/${summary.model_data.variant_name}/${summary.color_data.option_code}_1.png`;
        }

        setImageurl(imageUrl);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const userEmail = userData.email;
    if (userEmail) {
      getUserSummary(userEmail);
    }
  }, [userData?.email]);

  const formatter = new Intl.NumberFormat("en-IN");
  const exshowroomPrice = formatter.format(
    summaryData?.booking_details?.model_data?.variant_properties?.full_price
  );
  const fullPrice =
    summaryData?.booking_details?.model_data?.variant_properties?.full_price;
  const discount = formatter.format(
    summaryData?.booking_details?.model_data?.variant_properties?.discount
  );
  const discountedPrice =
    summaryData?.booking_details?.model_data?.variant_properties?.full_price -
    summaryData?.booking_details?.model_data?.variant_properties?.discount;
  const bookPrice = formatter.format(
    summaryData?.booking_details?.model_data?.variant_properties
      ?.book_today_price
  );
  const colorPrice = formatter.format(
    summaryData?.booking_details?.color_data.price
  );

  const totalPrice =
    summaryData?.booking_details?.options_data.reduce((acc, item) => {
      return acc + (item.price > 0 ? item.price : 0);
    }, 0) + discountedPrice;
  const calculatedPrice = formatter.format(totalPrice);

  const router = useRouter();

  const handleEditDesign = () => {
    router.push({
      pathname: "/configure",
      query: { varientStep: 1 } 
    });
  };

  const handlePayment = async () => {
    const result: IUser =
      userData?.email == null ? await getOldUserInfo() : userData;

    const payload = {
      name: result.name,
      email: result.email,
      phone: result.phone,
      is_se: false,
    };
    let order;

    try {
      // order = await CreateOrder(payload);
      if (process.env.NODE_ENV !== "production") {
        order = await CreateTestOrder(payload);
      } else {
        order = await CreateOrder(payload);
      }
      // @ts-ignore
      if (order?.payment_session_id && window.Cashfree) {
        console.log("Inside");

        // @ts-ignore
        const cashfree = new window.Cashfree(order?.payment_session_id);
        cashfree.redirect();
      }
    } catch (err) {}

    // console.log("order ", order);
  };

  const calculateMonthlyEmi = (
    principle,
    tenure,
    annualRateOfIterest,
    downPaymentPercentage
  ) => {
    if (!downPaymentPercentage) downPaymentPercentage = 20;
    const downPayment = (principle * downPaymentPercentage) / 100;
    principle = principle - downPayment;
    const monthlyRateOfInterest = annualRateOfIterest / 12 / 100;
    const EMI =
      (principle *
        monthlyRateOfInterest *
        (1 + monthlyRateOfInterest) ** tenure) /
      ((1 + monthlyRateOfInterest) ** tenure - 1);

    return EMI.toFixed(2);
  };

  let selectedBikeName = "";

  if (summaryData?.booking_details?.model_data?.variant_name === "Recon") {
    selectedBikeName =
      summaryData?.booking_details?.model_data?.version_name + " Recon";
  } else {
    selectedBikeName = summaryData?.booking_details?.model_data?.version_name;
  }

  return (
    <div className="mx-6 sm:mb-10 mb-8">
      <div className="sm:mt-24 mt-10">
        <button
          className="underline text-[#343434] cursor-pointer"
          onClick={handleEditDesign}
        >
          {" "}
          &lt; EDIT YOUR DESIGN{" "}
        </button>
      </div>
      <div className="text-[#ED1C24] font-medium brutal sm:text-[20px] text-[16px] uppercase leading-10 tracking-[0.2px] mt-6">
        SUMMARY OF YOUR BOOKING
      </div>

      {/* varient personality details */}
      <div className="mt-[30px]">
        <h1 className="uppercase brutal sm:text-[18px] text-[16px] font-medium ">
          variant & PERSONALITY
        </h1>

        <div className="flex justify-between sm:mt-6 mt-4 font-medium leading-38 tracking-[0.2px]">
          <p className="uppercase">F77 {selectedBikeName}</p>
          <p className="sm:text-[14px] text-[13px]"> ₹ {exshowroomPrice}</p>
        </div>
        <p className="brutal sm:text-[12px] text-[11px] w-[67%] mt-2">
          (Ex-showroom)
        </p>

        <div className="flex justify-between sm:mt-6 mt-4 font-medium leading-38 tracking-[0.2px]">
          <p>
            {
              summaryData?.booking_details?.model_data?.variant_properties
                ?.discount_name
            }
          </p>
          <p className="sm:text-[14px] text-[13px]"> - ₹ {discount}</p>
        </div>
        <p className="brutal sm:text-[12px] text-[11px] w-[67%] mt-2">
          {
            summaryData?.booking_details?.model_data?.variant_properties
              ?.discount_desc
          }
        </p>
        {/* horizontal Line */}
        <div className="border-b border-[#8b8b8b] mt-5"></div>

        {/* Introductory section */}
        <div className="flex justify-between sm:mt-6 mt-4 font-medium leading-38 tracking-[0.2px]">
          <p>Introductory price</p>
          <div className="sm:text-[14px] text-[13px]">
            <p className="text-right">₹ {formatter.format(discountedPrice)}</p>
            <p className="brutal sm:text-[12px] text-[11px]">
              EMI ₹ {calculateMonthlyEmi(discountedPrice, 60, 9.99, 20)}/MO**
            </p>
          </div>
        </div>
        {/* horizontal Line */}
        <div className="border-b border-[#8b8b8b] mt-5"></div>

        <div className="sm:mt-8 mt-6">
          <p className="uppercase brutal sm:text-[18px] text-[16px] font-medium">
            SELECTED OPTIONS
          </p>
        </div>
        <div className="mt-3">
          {summaryData?.booking_details?.options_data.map((item, i) => (
            <div
              key={i}
              className={`flex justify-between brutal ${
                item.price > 0 ? "mt-5" : ""
              }`}
            >
              <div className="line-height-[24px] tracking-[0.2px]">
                {item.name}
              </div>
              <div className="tracking-[0.2px] font-medium sm:text-[14px] text-[13px]">
                {item.price > 0 ? `₹ ${item.price}` : null}
              </div>
            </div>
          ))}
        </div>
        <div className="border-b border-[#8b8b8b] mt-5"></div>
        <div className="mt-5 flex justify-between">
          <h1 className="brutal line-height-[24px] tracking-[0.2px]">
            Total Amount
          </h1>
          <div className="text-right">
            <h1 className="font-medium sm:text-[20px] text-[18px]">
              ₹ {calculatedPrice}*
            </h1>
            <p className="line-height-[24px] tracking-[0.2px] sm:text-[14px] text-[12px] font-normal brutal text-[#4b4b4b]">
              EMI ₹ {calculateMonthlyEmi(totalPrice, 60, 9.99, 20)}/MO**
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <DueDate bookPrice={bookPrice} />
      </div>

      <div className="flex flex-row sm:mt-12 mt-8">
        <div className={`${Style.check} mt-[5px]`}>
          <input
            type="checkbox"
            className="border border-red-700"
            checked={checkbox}
            onChange={() => setCheckbox((prev) => !prev)}
          />
        </div>
        <div className={`ml-2 mt-[3px] text-[#272727]`}>
          I accept Ultraviolette’s{" "}
          <a
            href={`${DocumentConstants.uvBookingAgreement}`}
            className="underline cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Booking agreement
          </a>{" "}
        </div>
      </div>
      <div>
        <div className="mt-4">
          <Button
            className="paymentBtn rounded-md brutal"
            onClick={handlePayment}
            text={`PAY ₹ ${bookPrice}`}
            width="100%"
            allowHover={true}
            height="85%"
            bg={checkbox ? "black" : "#EAEAEA"}
            disable={!checkbox}
            isDark={true}
            isConfig={true}
          />
        </div>
      </div>
      <div className="text-[#656565] text-[13px] sm:text-[14px] sm:mt-6 mt-4 brutal leading-2 tracking-[0.2px] my-2">
        #Introductory offer is available for first 1,000 deliveries.{" "}
        <a href="/legal/terms-conditions" className="underline cursor-pointer" target="_blank"
            rel="noopener noreferrer">
          {" "}
          T&C apply
        </a>
      </div>

      <div className="text-[#656565] text-[13px] sm:text-[14px] sm:mt-12 mt-8 brutal leading-2 tracking-[0.2px] my-2">
        *RTO, Registration Services and Insurance charges will be extra as
        applicable. Prevailing Rates and Prices at the time of delivery would be
        applicable.
      </div>

      <div className="text-[#656565] text-[13px] sm:text-[14px] sm:mt-12 mt-8 brutal leading-2 tracking-[0.2px] my-2">
        **Monthly Installment (EMI) mentioned is approximately based on 9.9%
        interest rate for 60 months, with 20% down-payment. Prices are exclusive
        of taxes.
      </div>
    </div>
  );
};

export default SummaryConfig;
