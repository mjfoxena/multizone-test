import React from "react";
import CommonSideBar from "../../components/molecules/CommonSideBar";
import { TextElement } from "../../components/atoms/Texts";
import Style from "./support.module.scss";
import Image from "next/image";
import { MapCss } from "../../utils/utils";
import CommonFooter from "../../components/molecules/CommonFooter";
import Head from "next/head";
import Script from "next/script";
import GraphTags from "../../components/GraphTags";
import { GetServerSidePropsContext } from "next";

const Support = () => {
  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Ultraviolette Automotive | Support</title>
        <link rel="canonical" href="https://www.ultraviolette.com/support" />
        <GraphTags
          title="Ultraviolette Automotive | Support"
          description=""
          image=""
          url="https://www.ultraviolette.com/support"
        />
      </Head>
      <div className="w-full">
        <div className="flex flex-col w-full ">
          {/*------------contact top------ */}
          <div
            className={MapCss(
              Style,
              "support color",
              "flex flex-col font-normal w-full h-fit sm:h-2/3  sm:flex-row"
            )}
          >
            {/*------ mobile header----- */}
            <div className=" flex flex-col pl-7 pr-7 sm:hidden">
              <div className="w-full flex flex-row justify-between items-center">
                <div
                  className={MapCss(Style, "eurostile color", "text-2xl mt-3")}
                >
                    SUPPORT
                </div>
                <div className="mt-3">
                  <Image
                    src={"/images/about/aboutmobile.png"}
                    width={94}
                    height={22}
                    alt="Bike"
                  />
                </div>
              </div>
              <div className={MapCss(Style, "border", " mt-4")}></div>
            </div>
            {/* left dib */}
            <div className=" flex flex-col w-full sm:pr-16 h-full">
              {/* contact header */}
              <div
                className={MapCss(
                  Style,
                  "eurostile color",
                  "text-[48px] font-normal hidden mt-16 ml-16 sm:flex flex-col"
                )}
              >
                SUPPORT
                <div className={MapCss(Style, "border", "mt-4")}></div>
              </div>
              {/* contact left content */}
              <div className="flex flex-col  w-full pl-7 mt-11 gap-16 sm:gap-20 sm:pl-0 sm:mt-24 sm:mb-36 sm:flex-row sm:ml-16">
                <div className="flex flex-col w-full sm:w-1/5">
                  <div
                    className={MapCss(
                      Style,
                      "color brutal",
                      "flex flex-col text-base font-medium sm:font-medium sm:leading-[50px] sm:text-[28px]"
                    )}
                  >
                      CUSTOMER CARE
                  </div>
                  <div
                    className="flex flex-col text-xs font-normal sm:leading-[50px] sm:text-[18px]"
                  >
                    <a href="tel:08069453322" hrefLang="en-in">08069453322</a>
                  </div>
                  <div
                    className={MapCss(
                      Style,
                      "brutal color",
                      "text-xs sm:text-sm font-normal leading-6 sm:leading-[28px]"
                    )}
                  >
                    Hours: Monday - Friday, 9AM TO 7PM
                  </div>
                </div>
                <div className="flex flex-col ">
                  <div
                    className={MapCss(
                      Style,
                      "color brutal",
                      "flex flex-col text-base font-medium sm:font-medium sm:leading-[50px] sm:text-[28px]"
                    )}
                  >
                    ROAD SIDE ASSISTANCE
                  </div>
                  <div
                    className="flex flex-col text-xs font-normal sm:leading-[50px] sm:text-[18px]"
                  >
                    <a href="tel:18002661095" hrefLang="en-in">18002661095</a>
                  </div>
                </div>
                <div className="flex flex-col sm:mb-10 w-full pr-7 sm:pr-0 sm:mb-0 sm:w-2/5">
                  <div
                    className={MapCss(
                      Style,
                      "color brutal",
                      "flex flex-col text-base font-medium sm:font-medium sm:leading-[50px] sm:text-[28px]"
                    )}
                  >
                    EMAIL
                  </div>
                  <div
                    className="flex flex-col text-xs font-normal sm:leading-[50px] sm:text-[18px]"
                  >
                    <a href="mailto:support@ultraviolette.com" hrefLang="en-in">support@ultraviolette.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonFooter />
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

export default Support;
