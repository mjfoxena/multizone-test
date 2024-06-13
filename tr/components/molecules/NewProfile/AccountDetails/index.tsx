import Image from "next/image";
import router from "next/router";
import { clearLocalStorage } from "../../../../services/helper";
import { MapCss } from "../../../../utils/utils";
import Style from "./../newprofile.module.scss";

import { API_CONSTANTS } from "../../../../services/constants";
import {
  BookingFlow,
  ConfigFlow,
  ReferrerFlow,
} from "../../../../utils/CookieManagement";
import { IBookingInfo } from "../../../../utils/interface/user_booking_type";

const baseLink = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}`;

/// baseurl/booking_details.color_data.option_code/booking_details.model_data.variant_name/ else case of Mac pack =>booking_details.color_data.option_code[_1.png]
/// baseurl/booking_details.color_data.option_code/booking_details.model_data.variant_name/ {{if Mach pack}} MA/booking_details.color_data.option_code[_MA_1.png]

interface AccountDetailsProps {
  profileDetails: IBookingInfo;
}

export function AccountDetails({ profileDetails }: AccountDetailsProps) {
  let imageUrl: string;

  const hasMaBikePack = profileDetails.booking_details.options_data.some(
    (option) => option.name === "MACH 2 PACK"
  );

  if (hasMaBikePack) {
    imageUrl = `${baseLink}/config/configurator_combination_refresh/${profileDetails.booking_details.color_data.option_code}/${profileDetails.booking_details.model_data.variant_name}/MA/${profileDetails.booking_details.color_data.option_code}_MA_1.png`;
  } else {
    imageUrl = `${baseLink}/config/configurator_combination_refresh/${profileDetails.booking_details.color_data.option_code}/${profileDetails.booking_details.model_data.variant_name}/${profileDetails.booking_details.color_data.option_code}_1.png`;
  }

  console.log("this is image url", imageUrl);

  const signOut = () => {
    clearLocalStorage();
    ReferrerFlow.clearCookie();
    BookingFlow.clearCookie();
    ConfigFlow.clearCookie();
    router.push("/");
  };
  return (
    <div className="w-full   flex flex-col items-center justify-start bg-white h-[43.750rem] max-md:h-[21.188rem]">
      <div className=" w-full  max-w-[70%] 2xl:max-w-[60%] h-full">
        {/* image section */}
        <div className="flex  mt-[3.688rem] justify-between items-start">
          <div className="flex flex-col w-full max-w-[39.938rem]">
            <div>
              <h1 className="text-gray-700 eurostile text-xl font-medium leading-normal ">
                ACCOUNT DETAILS
              </h1>

              <div
                className={MapCss(Style, "border", " sm:flex mt-[0.688rem]")}
              ></div>

              <Image
                src={`${imageUrl}`}
                width={600}
                height={600}
                alt="bike_img"
                className="h-full w-full max-md:mt-[2.750rem]"
              ></Image>
            </div>
          </div>

          {/* card section */}

          <div className="ml-[5.625rem] max-md:hidden">
            <div
              onClick={() => signOut()}
              className=" brutal cursor-pointer  flex justify-end items-start "
            >
              <h1 className="text-sm  text-black brutal font-medium leading-[34px] tracking-[0.2px]">
                SIGN OUT
              </h1>
              <Image
                src={"/images/profile/iconArrow.svg"}
                width={10}
                height={10}
                alt="arrow"
                className="mt-[5px]"
              />
            </div>
            <div className="w-[17.750rem] h-[25.188rem] mt-2">
              <div>
                <Image
                  src="/images/newprofile/very_important_pilot.svg"
                  width={500}
                  height={500}
                  alt="veryimportan pilot"
                  className="h-[11.063rem] w-[17.750rem] "
                ></Image>
              </div>
              <div
                className="pl-[1.125rem] pr-[1.125rem] pb-[1.000rem] pt-[1.438rem] flex flex-col justify-start"
                style={{
                  borderRadius: "1.524px",
                  background: "#FFF",
                  boxShadow: "0px 0px 30px 3.75px rgba(0, 0, 0, 0.10)",
                }}
              >
                {/* name */}
                <div className="w-full flex justify-between items-start">
                  <h1 className="text-black brutal text-[21.332px] font-normal leading-[23.998px] tracking-[0.152px] max-w-[7.500rem]">
                    {profileDetails.name}
                  </h1>

                  <Image
                    src="/images/newprofile/arrow.svg"
                    width={500}
                    height={500}
                    alt="very important pilot"
                    className="h-[2.750rem] w-[2.813rem]"
                  />
                </div>
                {/* order id  */}

                <div className="flex-col flex mt-[1.125rem]">
                  <div className="flex justify-between">
                    <div className="w-full flex flex-col  items-start">
                      <h1 className="text-black brutal text-[10.666px] font-normal leading-normal">
                        ORDER ID
                      </h1>

                      <h1 className="text-black brutal text-[10.666px] font-medium leading-normal">
                        {profileDetails.order_id}
                      </h1>
                    </div>
                    <div className="w-full flex flex-col   items-end">
                      <div className="">
                        <h1 className="text-black brutal text-[10.666px] font-normal leading-normal">
                          VARIANT
                        </h1>
                        <h1 className="text-black uppercase brutal text-[10.666px] font-medium leading-normal">
                          {profileDetails.booking_details.model_data.model_name}{" "}
                          {
                            profileDetails.booking_details.model_data
                              .version_name
                          }{" "}
                          {profileDetails.booking_details?.model_data
                            .variant_name === "Recon"
                            ? profileDetails.booking_details?.model_data
                                .variant_name
                            : ""}
                        </h1>
                      </div>
                    </div>
                  </div>

                  {/* personality */}
                  <div className="mt-[0.750rem] flex flex-col">
                    <h1 className="text-black brutal text-[10.666px] font-normal leading-normal">
                      PERSONALITY
                    </h1>
                    <h1 className="text-black brutal text-[10.666px] font-medium leading-normal">
                      {profileDetails.booking_details.options_data[0].name}
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
                    className="h-[0.688rem] w-[5.500rem]"
                  />
                  <Image
                    src="/images/newprofile/stamp.svg"
                    width={500}
                    height={500}
                    alt="very important pilot"
                    className="h-[1.750rem] w-[5.625rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
