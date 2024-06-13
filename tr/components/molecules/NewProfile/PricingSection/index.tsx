import Image from "next/image";
import Link from "next/link";
import { IBookingInfo } from "../../../../utils/interface/user_booking_type";
import {
  calculateMonthlyEmi,
  formatDate,
  formatPriceStringWithCommas,
  formatPriceStringWithCommasWithNumber,
} from "../../../../utils/utils";

const stages = [
  {
    imageSrc: "/images/newprofile/red_plus.svg",
    heading: "Stage 01",
    subHeading: "F77 CONFIGURED",
    color: "text-red-500",
  },
  {
    imageSrc: "/images/newprofile/white_plus.svg",
    heading: "Stage 02",
    subHeading: "IN PRODUCTION",
    color: "text-white",
  },
  {
    imageSrc: "/images/newprofile/white_plus.svg",
    heading: "Stage 03",
    subHeading: "READY FOR TAKE OFF",
    color: "text-white",
    showDots: false,
  },
];

const pricingItmes = [
  {
    title: "F77 MACH 2",
    price: "INR 4,19,000",
    info: "211 km IDC Range",
  },
  {
    title: "LASER - AFTERBURNER YELLOW",
    price: "INR 6000",
    info: "Personality",
  },
  {
    title: "MACH 2 RACING PACK",
    price: "INR 10,000",
    info: "Aero Disc, Tank Grips & Lever Guards.",
  },
  {
    title: "Violette A.I.",
    price: "INR 10,000",
    info: "Delta Watch, Crash Alert, Anti-Collision Warning System, Lockdown & more",
  },
  {
    title: "BOOST CHARGER",
    price: "INR 26,650",
    info: "20% to 80% charge in 90 min, 2x charging speed.",
  },
  {
    title: "UV care plus warranty",
    price: "INR 23,000",
    info: "5 yrs or 1,00,000 which ever is earlier",
  },
  {
    title: "BOOKING amount",
    price: "- INR 9,999",
    info: "Paid as an advance",
  },
  {
    title: "fuel rebate discount max. VALUE",
    price: "- INR 20,000",
    info: "Introductory offer#",
  },
];
interface AccountDetailsProps {
  profileDetails: IBookingInfo;
}

export default function PicingSection({ profileDetails }: AccountDetailsProps) {
  const priceValue =
    profileDetails?.booking_details?.model_data.variant_properties
      .book_today_price;

  // Convert to string only if it's not undefined
  const priceString =
    typeof priceValue === "number" ? priceValue : priceValue || "0";

  // Convert to string only if it's not undefined
  const optionsTotal = (
    profileDetails?.booking_details?.options_data ?? []
  ).reduce((acc, item) => {
    if (!item || Object.keys(item).length === 0) {
      return acc;
    }
    return acc + (item?.price ?? 0);
  }, 0);

  const fullPrice = Number(
    profileDetails?.booking_details?.model_data?.variant_properties
      ?.full_price ?? 0
  );
  const discount = Number(
    profileDetails?.booking_details?.model_data?.variant_properties?.discount ??
      0
  );

  const totalPrice = optionsTotal + (fullPrice - discount);

  const finalTotalPrice = typeof totalPrice === "number" ? totalPrice : 0;

  const emi = calculateMonthlyEmi(finalTotalPrice, 60, 9.99, 20);
  const formattedEMI = formatPriceStringWithCommas(emi);
  return (
    <div className="w-full   flex flex-col items-center justify-center bg-black  ">
      <div className="w-full flex justify-start items-start   max-w-[70%] 2xl:max-w-[60%] h-full ">
        <div className="flex-col  flex h-full w-full  max-md:max-w-full ">
          <div className="flex justify-between max-md:w-full">
            <div className="max-w-[39.938rem]  flex flex-col w-full h-full mt-[1.563rem] justify-start items-start">
              {/* pricing ......... */}

              {/* head and paragraph */}

              <div className="flex flex-col mt-10">
                <h1 className="text-white brutal text-16 max-md:text-[0.875rem] font-medium leading-[32px] max-md:leading-[1.375rem] tracking-wide">
                  Hello Pilot,
                </h1>
                <p className=" text-gray-300 brutal text-16 max-md:text-[0.750rem] font-normal leading-[23px] max-md:leading-[1.250rem] tracking-wide mt-[0.813rem] max-md:mt-[0.625rem] max-w-[39.938rem]">
                  Congratulations on booking your{" "}
                  {profileDetails.booking_details.model_data.model_name}{" "}
                  {profileDetails.booking_details.model_data.version_name} Your
                  booking has been confirmed and you will be updated regarding
                  production delivery soon.
                  <span className="max-md:block mt-5">
                    Please{" "}
                    <span className="font-medium text-[#FFF]">
                      Check Rollout Calender {""}
                    </span>
                    to know the estimated time of delivery in your city.
                  </span>
                </p>
              </div>

              {/* staging section desktop*/}

              <div className="w-full mt-[2.500rem] max-md:hidden">
                <div className="flex gap-[0.438rem]">
                  {stages.map((item, index) => (
                    <div key={index} className="flex-col flex">
                      <div className="flex justify-start items-center gap-[0.625rem]">
                        <Image
                          src={item.imageSrc}
                          width={500}
                          height={500}
                          alt="plusimage"
                          className="h-[1.125rem] w-[1.313rem]"
                        />
                        {item.showDots !== false && (
                          <Image
                            src="/images/newprofile/dots.svg"
                            width={500}
                            height={500}
                            alt="bike_img"
                            className="h-[0.5rem] w-[13.250rem]"
                          />
                        )}
                      </div>

                      <div className="mt-[0.438rem]">
                        <h1
                          className={`${item.color} brutal text-16 font-medium leading-[25.5px] tracking-wide`}
                        >
                          {item.heading}
                        </h1>
                        <h2 className="text-gray-300 brutal text-[12px] font-normal leading-[21px] tracking-wide mt-[0.250rem]">
                          {item.subHeading}
                        </h2>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* staging for mobile */}

              <div className="md:hidden flex w-full justify-start items-start mt-[3.063rem]">
                <div className="flex flex-col justify-start items-start gap-2">
                  {stages.map((stage, index) => (
                    <div key={index} className="flex justify-start items-start">
                      <div className="flex flex-col justify-start items-center">
                        <Image
                          src={stage.imageSrc}
                          width={500}
                          height={500}
                          alt="plusimage"
                          className="h-[1.125rem] w-[1.313rem]"
                        />
                        {stage.showDots !== false && (
                          <Image
                            src="/images/newprofile/dots_mobile.svg"
                            width={500}
                            height={500}
                            alt="bike_img"
                            className="h-[4.5rem] w-[0.500rem] mt-[0.313rem]"
                          />
                        )}
                      </div>
                      <div className="flex flex-col pl-1">
                        <h1
                          className={`${stage.color} brutal text-[14px] font-normal leading-[1.375rem] tracking-wide`}
                        >
                          {stage.heading}
                        </h1>
                        <h2 className="text-gray-300 brutal text-[10px] font-normal leading-[1.125rem] tracking-wide ">
                          {stage.subHeading}
                        </h2>
                      </div>
                    </div>
                  ))}
                </div>

                {/* vip card section on mobile */}
                <div className="ml-[1.188rem]">
                  <div className="w-[11.500rem] h-[14.875rem] flex flex-col justify-start  items-start">
                    <Image
                      src="/images/newprofile/very_important_pilot.svg"
                      width={500}
                      height={500}
                      alt="veryimportan pilot"
                      className="h-[6.688rem] w-full object-cover"
                    ></Image>

                    <div
                      className="pl-[0.625rem] pr-[0.625rem] pb-[0.625rem] pt-[0.688rem] flex flex-col justify-start w-[11.4301em]"
                      style={{
                        background: "#FFF",
                        boxShadow: "0px 0px 30px 3.75px rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      {/* name */}
                      <div className="w-full flex justify-between items-start">
                        <h1 className="text-black brutal text-[0.750rem] font-normal leading-[0.875rem] tracking-[0.152px] max-w-[5.500rem]">
                          {profileDetails.name}
                        </h1>

                        <Image
                          src="/images/newprofile/arrow.svg"
                          width={500}
                          height={500}
                          alt="very important pilot"
                          className="h-[1.625rem] w-[1.625rem]"
                        />
                      </div>
                      {/* order id  */}

                      <div className="flex-col flex mt-[1.125rem]">
                        <div className="flex justify-between">
                          <div className="w-full flex flex-col  items-start">
                            <h1 className="text-black brutal text-[0.375rem] font-normal leading-normal">
                              ORDER ID
                            </h1>
                            <h1 className="text-black brutal text-[0.375rem] font-medium leading-normal">
                              {profileDetails.order_id}
                            </h1>
                          </div>
                          <div className="w-full flex flex-col   items-end">
                            <div className="">
                              <h1 className="text-black brutal text-[0.375rem] font-normal leading-normal">
                                VARIANT
                              </h1>
                              <h1 className="text-black uppercase brutal text-[0.375rem] font-medium leading-normal">
                                {
                                  profileDetails.booking_details.model_data
                                    .model_name
                                }{" "}
                                {
                                  profileDetails.booking_details.model_data
                                    .version_name
                                }{" "}
                                {
                                  profileDetails.booking_details.model_data
                                    .variant_name
                                }
                              </h1>
                            </div>
                          </div>
                        </div>
                        {/* personality */}
                        <div className="mt-[0.750rem] flex flex-col">
                          <h1 className="text-black brutal text-[0.375rem] font-normal leading-normal">
                            PERSONALITY
                          </h1>
                          <h1 className="text-black brutal text-[0.375rem] font-medium leading-normal">
                            {
                              profileDetails.booking_details.options_data[0]
                                .name
                            }
                          </h1>
                        </div>
                      </div>
                      {/* logo and stamp */}

                      <div className="w-full flex justify-between items-end mt-[1.375rem]">
                        <Image
                          src="/images/newprofile/ultraviolet_logo.svg"
                          width={500}
                          height={500}
                          alt="very important pilot"
                          className="h-[0.375rem] w-[3.125rem]"
                        />
                        <Image
                          src="/images/newprofile/stamp.svg"
                          width={500}
                          height={500}
                          alt="very important pilot"
                          className="h-[1.000rem] w-[3.313rem]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* only for mobile divider */}

              <hr className="w-full h-[1px]  bg-[#787878] border-0 mt-[3.625rem]  md:hidden" />

              {/* booking amout paid section */}

              <div className="mt-[3.625rem] max-md:mt-[2.900rem] w-full flex flex-col">
                <h1 className="text-white brutal text-[15px] max-md:text-[0.875rem] font-normal leading-[31.5px] max-md:leading-[1.375rem] tracking-wide">
                  BOOKING AMOUNT PAID: <span>&#8377;</span>{" "}
                  {formatPriceStringWithCommas(priceString)}
                </h1>

                {/* grp of items */}

                <div className="mt-4 max-md:mt-[1.125rem] w-full">
                  <h1 className="text-white brutal text-[12px] max-md:text-[0.750rem] font-normal leading-[31.5px] max-md:leading-[0.938rem] tracking-wide">
                    Order ID: {profileDetails.order_id}
                  </h1>
                  <div className="flex justify-between items-center">
                    <h1 className="text-white brutal text-[12px] max-md:text-[0.750rem] font-normal leading-[31.5px] max-md:leading-[0.938rem] tracking-wide mt-1 max-md:mt-2">
                      Order date: {formatDate(profileDetails.order_date)}
                    </h1>
                    <Link href="/refund">
                      <h1 className="max-md:hidden text-gray-400 text-right brutal text-[12px] font-normal leading-[21px] tracking-wide underline mt-[0.375rem]">
                        Cancel booking*
                      </h1>
                    </Link>
                    {/* <h1 className="max-md:hidden cursor-pointer text-gray-400 text-right brutal text-[12px] font-normal leading-[21px] tracking-wide underline">
                      Download invoice
                    </h1> */}
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <h1 className="text-white brutal text-[12px] font-normal leading-[31.5px] max-md:leading-[1.250rem] tracking-wide mt-1 max-md:mt-2">
                      Delivery address: Sobha Turquoise, Ulsoor, Bengaluru,
                      Karnataka.
                    </h1>
                    <Link href="/refund">
                      <h1 className="max-md:hidden text-gray-400 text-right brutal text-[12px] font-normal leading-[21px] tracking-wide underline mt-[0.375rem]">
                        Cancel booking*
                      </h1>
                    </Link>
                  </div> */}

                  <div className="flex justify-between mt-[1.250rem] md:hidden">
                    {/* <h1 className="cursor-pointer text-gray-400 text-right brutal text-[12px] font-normal leading-[21px] tracking-wide underline">
                      Download invoice
                    </h1> */}
                    <Link href="/refund">
                      <h1 className="cursor-pointer text-gray-400 text-right brutal text-[12px] font-normal leading-[21px] tracking-wide underline">
                        Cancel booking*
                      </h1>
                    </Link>
                  </div>

                  {/* line */}

                  <hr className="w-full h-[1px] max-md:h-[0.5px]   bg-[#D9D9D9] border-0  mt-[2.438rem]" />
                </div>

                {/* pricing */}

                <div className="flex flex-col w-full mt-[2.438rem] max-md:mt-[3.125rem] gap-[1.938rem]">
                  <div>
                    <div className="w-full flex justify-between ">
                      <h1 className="text-white brutal text-[14px] max-md:text-[12px] font-normal leading-[25.5px] max-md:leading-[21px] tracking-wide max-md:tracking-[0.2px] uppercase">
                        {profileDetails.booking_details.model_data.model_name}{" "}
                        {profileDetails.booking_details.model_data.version_name}{" "}
                        {profileDetails.booking_details?.model_data
                          .variant_name === "Recon"
                          ? profileDetails.booking_details?.model_data
                              .variant_name
                          : ""}
                      </h1>
                      <h1
                        className={` text-right brutal text-[14px] max-md:text-[12px] font-normal max-md:tracking-[0.2px] leading-[25.5px] ${"text-white"}`}
                      >
                        <span>&#8377;</span>{" "}
                        {formatPriceStringWithCommas(
                          profileDetails.booking_details.model_data
                            .variant_properties.full_price
                        )}
                      </h1>
                    </div>

                    <div className="flex justify-start items-start text-gray-400 brutal text-[12px] font-normal  tracking-wide max-md:tracking-[0.2px] max-md:max-w-[13.813rem]">
                      <h1 className="leading-[21px] max-md:leading-[20px]">
                        Ex-showroom price
                      </h1>
                    </div>
                  </div>
                  {/* pricing list  */}
                  {profileDetails.booking_details.options_data.map(
                    (item, index) => {
                      // Check if item exists and is not empty
                      if (!item || Object.keys(item).length === 0) {
                        return null; // Skip rendering if item is empty
                      }
                      const priceString =
                        item.price !== undefined ? item.price.toString() : "0";

                      return (
                        <div key={index}>
                          <div className="w-full flex justify-between ">
                            <h1 className="text-white brutal text-[14px] max-md:text-[12px] font-normal leading-[25.5px] max-md:leading-[21px] tracking-wide max-md:tracking-[0.2px] uppercase">
                              {item.name}
                            </h1>
                            <h1
                              className={` text-right brutal text-[14px] max-md:text-[12px] font-normal max-md:tracking-[0.2px] leading-[25.5px] ${"text-white"}`}
                            >
                              <span>&#8377;</span>{" "}
                              {formatPriceStringWithCommas(priceString)}
                            </h1>
                          </div>

                          <div className="">
                            {index ===
                            profileDetails.booking_details.options_data.length -
                              1 ? (
                              <div className="flex justify-start items-start text-gray-400 brutal text-[12px] font-normal  tracking-wide max-md:tracking-[0.2px] max-md:max-w-[13.813rem]">
                                <h1 className="leading-[21px] max-md:leading-[20px]">
                                  Introductory offer
                                </h1>
                                <h6 className="text-[9px]">#</h6>
                              </div>
                            ) : (
                              <div className="text-gray-400 brutal text-[12px] font-normal leading-[21px] max-md:leading-[20px] tracking-wide max-md:tracking-[0.2px] max-md:max-w-[13.813rem]">
                                {item.desc}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}

                  {/*  discount section */}

                  {Number(
                    profileDetails.booking_details.model_data.variant_properties
                      .discount
                  ) > 0 ? (
                    <div>
                      <div className="w-full flex justify-between ">
                        <h1 className="text-white brutal text-[14px] max-md:text-[12px] font-normal leading-[25.5px] max-md:leading-[21px] tracking-wide max-md:tracking-[0.2px] uppercase">
                          {
                            profileDetails.booking_details.model_data
                              .variant_properties.discount_name
                          }
                        </h1>

                        <h1
                          className={`text-right brutal text-[14px] max-md:text-[12px] font-normal max-md:tracking-[0.2px] leading-[25.5px] text-[#ED1C24]`}
                        >
                          - <span>&#8377;</span>
                          {
                            profileDetails.booking_details.model_data
                              .variant_properties.discount
                          }
                        </h1>
                      </div>

                      <div className="flex justify-start items-start text-gray-400 brutal text-[12px] font-normal  tracking-wide max-md:tracking-[0.2px] max-md:max-w-[13.813rem]">
                        <h1 className="leading-[21px] max-md:leading-[20px]">
                          {
                            profileDetails.booking_details.model_data
                              .variant_properties.discount_desc
                          }
                        </h1>
                        <h6 className="text-[9px]">#</h6>
                      </div>
                    </div>
                  ) : null}

                  <hr className="w-full h-[1px] max-md:h-[0.5px]   bg-[#FFF] border-0 mt-[1.000rem]  " />

                  {/* total section */}

                  <div className="mt-[1.000rem]  max-md:mt-[1.500rem] w-full flex flex-col">
                    <div className="flex w-full justify-between">
                      <h1 className="text-white brutal text-[15px] max-md:text-[14px] font-medium leading-[25.5px] max-md:leading-[24px] tracking-wide max-md:tracking-[0.2px]">
                        TOTAL
                      </h1>
                      <h1 className="text-white text-right brutal text-[18px] max-md:text-[15px] font-normal leading-[15.75px] max-md:leading-[21px]">
                        <span>&#8377;</span>{" "}
                        {formatPriceStringWithCommasWithNumber(finalTotalPrice)}
                      </h1>
                    </div>
                    <div className="flex w-full justify-end">
                      {/* <h1 className="text-gray-500 brutal text-[13.5px] max-md:text-[12px] font-normal leading-[21px] tracking-wide max-md:tracking-[0.2px]">
                        (Including 5% GST)
                      </h1> */}
                      <h1 className="text-white text-right brutal text-[12px] font-normal leading-[21px] tracking-wide max-md:hidden">
                        EMI INR {formattedEMI}/Month
                      </h1>
                    </div>
                  </div>
                </div>

                {/* paragraph section */}

                <div className="flex flex-col w-full mt-[1.375rem] mb-[9.313rem] max-md:mb-[6.250rem]">
                  <p className="text-gray-500 brutal text-[10.5px] max-md:text-[10px] font-normal leading-[18px] tracking-wide max-md:tracking-[0.15px]  w-full max-w-[23.438rem]">
                    Please note that free cancelation is only applicable till
                    vehicle allotment. For any queries regarding your booking,
                    please contact bookings@ultraviolette.com. View our Booking
                    Agreement
                    <Link href="/legal">
                      <span className="underline cursor-pointer"> here.</span>
                    </Link>
                  </p>

                  <p className="text-gray-500 brutal text-[12px] max-md:text-[10px] font-normal leading-[18px] tracking-wide max-md:tracking-[0.2px] mt-[1.875rem]">
                    *RTO, Registration Services and Insurance charges will be
                    extra as applicable. Prevailing Rates and Prices at the time
                    of delivery would be applicable.
                  </p>
                  <p className="text-gray-500 brutal text-[12px] max-md:text-[10px] font-normal leading-[18px] tracking-wide max-md:tracking-[0.2px] mt-[1.875rem]">
                    **Monthly Installment (EMI) mentioned is approximately based
                    on 8% interest rate for 48 months, with 20% down-payment.
                    Prices are exclusive of taxes.
                  </p>

                  <p className="text-gray-500 brutal text-[12px] max-md:text-[10px] font-normal leading-[18px] tracking-wide max-md:tracking-[0.2px]  mt-[1.875rem]">
                    #Introductory offer is available for first 1,000 deliveries
                    & provided full amount is paid within 3 months of booking
                    date. Availability of this offer is on first come first
                    serve basis. The actual discount may vary as per our
                    <span className="underline"> T&C </span>
                    policy.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[32.063rem] w-[11.000rem]">
              <Image
                src="/images/newprofile/Group.svg"
                width={500}
                height={500}
                alt="bike_img"
                className=" mt-[1.563rem]  max-md:hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
