import { useRouter } from "next/router";
import React, { useState } from "react";
import LeftSideBar from "../../components/molecules/LeftSideBar";
import { MapCss } from "../../utils/utils";
import Style from "./uhoh.module.scss";
import Image from "next/image";
import Script from "next/script";
import Head from "next/head";
import GraphTags from "../../components/GraphTags";
import { GetServerSidePropsContext } from "next";

const Uhoh = () => {
  const router = useRouter();
  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <link rel="canonical" href="https://www.ultraviolette.com/uhoh" />
        <GraphTags
          title="Ultraviolette Automotive | uhoh"
          description=""
          image=""
          url="https://www.ultraviolette.com/uhoh"
        />
      </Head>
      <LeftSideBar>
        <div className="flex flex-col ml-7 mr-7 mb-20 sm:ml-16 sm:pt-8 sm:mb-40 sm:mr-20 justify-between">
          <div className="flex flex-col">
            <div
              className={MapCss(
                Style,
                "disketmono",
                "text-sm cursor-pointer top-20 z-50 mt-2 absolute sm:cursor-pointer sm:relative   sm:top-0"
              )}
              onClick={() => router.back()}
            >
              {"< "}Back
            </div>
            <div className="mt-4 sm:mt-0 ">
              <div
                className={MapCss(
                  Style,
                  "heading ",
                  "w-full flex flex-row  justify-between  sm:flex-col"
                )}
              >
                UH-OH
                <div
                  className={MapCss(Style, "border", "hidden sm:flex")}
                ></div>
                <div className="sm:hidden flex items-center ">
                  <Image
                    alt="arrow-right"
                    width={90}
                    height={20}
                    src={"/images/thankyou/thnxlogo.png"}
                  />
                </div>
              </div>
            </div>
            {/* thank you paragraph */}
            <div
              className={MapCss(
                Style,
                "brutal",
                "text-base font-normal mt-7 sm:mt-10  sm:text-xl"
              )}
            >
              <div className="mb-5 text-xs sm:text-base">
                You already have an existing order. Please check profile for
                existing order details.
              </div>
              <div
                className={MapCss(
                  Style,
                  "color-grey",
                  "mb-5 text-xs sm:text-base"
                )}
              >
                To book another F77, please log in from a different account.
              </div>
            </div>
            {/* button */}
          </div>
        </div>
        <div
          className={MapCss(Style, "procced")}
          onClick={() => router.push("/profile")}
        >
          <div className={Style.proccedText}>TRACK YOUR ORDER</div>
          <Image
            alt="arrow-right"
            width={20}
            height={20}
            src={"/images/icons/horizontalWhiteArrow.svg"}
          />
        </div>
      </LeftSideBar>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const country = context?.query?.country;

  return {
      props: {
          country: country
      },
  };
}

export default Uhoh;
