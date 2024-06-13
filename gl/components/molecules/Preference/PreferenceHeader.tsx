import Image from "next/image";
import { useState } from "react";

function PreferenceHearder() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#ECECEC]">
      <div className="w-full h-full max-w-[90%] flex flex-col">
        <div className=" flex justify-between items-center w-full mt-[6.063rem]">
          <h1 className="eurostile text-[#414141] text-[40px] max-sm:text-[24px] font-normal leading-normal">
            YOUR DATA & PREFERENCES
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
        <div className="mt-[3.125rem]  max-sm:mt-5">
          <hr
            className="w-full h-0 flex-shrink-0"
            style={{ borderWidth: "1.486px", borderColor: "#ED1C24" }}
          />
        </div>
        <div className="mt-[3.125rem] max-sm:mt-5">
          <p className="text-[#414141] brutal text-[24px ]font-normal capitalize">
            Hello Maverick!
          </p>

          <p className="text-[#404040] brutal text-16px font-normal w-[55%] max-sm:w-full mt-3">
            On this page, you can check and amend your newsletter subscriptions
            and keep up-to-date with all news from the Ultraviolette universe.
            You can also manage your preferences related to the processing of
            your personal data, and keep up-to-date with initiatives and
            products. Depending on the preferences you edit, please remember to
            save any amendments you made by clicking on the "Save changes"
            button.
          </p>

          <div className="mt-16">
            <p className="text-[#404040] brutal text-[16px] font-normal">
              Your email address
            </p>

            <input
              type="email"
              placeholder="Enter your email address"
              className="flex w-[600px] max-sm:w-full p-[18px] px-[24px] items-center gap-[272px] rounded-[4px] border border-black bg-[#EAEAEA] mt-2"
            />
          </div>
        </div>

        <div className="mt-[3.125rem]">
          <p className="text-[#404040] brutal text-[16px] font-normal capitalize">
            Your preferences:
          </p>

          <div className="flex max-sm:flex-col justify-between">
            {/* select language */}
            <div className="flex flex-col mt-[1.438rem]">
              <h1 className="text-[#404040] brutal text-[20px] font-medium">
                LANGUAGE
              </h1>

              <div className="mt-3 max-sm:w-full flex justify-between items-center w-[284px] p-[18px_24px] gap-[272px] rounded-[4px] border border-black bg-custom-background text-custom-black font-brutal text-14px font-normal leading-[28px] tracking-[0.2px] uppercase">
                ENGLISH
              </div>
            </div>
            <div className="bg-[#404040] w-[0.5px] h-[128px] mt-[1.438rem] max-sm:hidden" />

            {/* subscribe */}
            <div className="flex flex-col mt-[1.438rem]">
              <h1 className="text-[#404040] brutal text-[20px] font-medium">
                SUBSCRIPTIONS
              </h1>

              <div className="mt-3 flex gap-5 max-sm:flex-col">
                <div className="flex gap-5 flex-col">
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#404040] border-[#404040] checked:border-[#6E6E6E] checked:bg-[#6E6E6E]"
                    />

                    <p className="text-[#404040] brutal text-[16px] font-normal">
                      Blackbox Newsletter
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#404040] border-[#404040] checked:border-[#6E6E6E] checked:bg-[#6E6E6E]"
                    />

                    <p className="text-[#404040] brutal text-[16px] font-normal">
                      Product updates
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#404040] border-[#404040] checked:border-[#6E6E6E] checked:bg-[#6E6E6E]"
                    />

                    <p className="text-[#404040] brutal text-[16px] font-normal">
                      Non-marketing emails
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 flex-col">
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#404040] border-[#404040] checked:border-[#6E6E6E] checked:bg-[#6E6E6E]"
                    />

                    <p className="text-[#404040] brutal text-[16px] font-normal">
                      Promotional emails
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#404040] border-[#404040] checked:border-[#6E6E6E] checked:bg-[#6E6E6E]"
                    />

                    <p className="text-[#404040] brutal text-[16px] font-normal">
                      Conferences & Events
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#404040] w-[0.5px] h-[128px] mt-[1.438rem] max-sm:hidden" />
            <div className="flex flex-col mt-[1.438rem]">
              <h1 className="text-[#404040] brutal text-[20px] font-medium">
                WHATSAPP
              </h1>

              <input
                type="text"
                placeholder="Phone number"
                className="mt-3 flex w-[284px] max-sm:w-full p-[18px_24px] items-center gap-[272px] rounded-[4px] border border-black bg-[#EAEAEA] text-[#828282] brutal text-[16px] font-normal leading-[28px] tracking-[0.2px]"
              />
              <div className="flex items-center gap-1 mt-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#404040] border-[#404040] checked:border-[#6E6E6E] checked:bg-[#6E6E6E]"
                />

                <p className="text-[#404040] brutal text-[16px] font-normal">
                  Updates and other communication
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[3.125rem]">
          <button className="inline-flex max-sm:w-full max-sm:flex max-sm:justify-center max-sm:items-center p-[14px_31px] rounded-md items-start gap-[10px] rounded-[4px]border-[1.5px] border-black bg-black text-white brutal text-[16px] font-medium leading-[28px] tracking-[0.2px]">
            <p>EDIT PREFERENCES</p>
          </button>
        </div>
        <div className="mt-[3.125rem] w-[60%] max-sm:w-full mb-[4.688rem]">
          <p className="text-[#404040] brutal text-16px font-normal ">
            We only use your data for specific purposes as mentioned in our
            <span className="underline cursor-pointer">Privacy Policy</span>.
            This helps us deliver consistent & memorable experiences. You can
            also choose to
            <span className="underline cursor-pointer">
              Delete your account
            </span>
            or <span className="underline cursor-pointer">Erase your data</span>
            from our database.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PreferenceHearder;
