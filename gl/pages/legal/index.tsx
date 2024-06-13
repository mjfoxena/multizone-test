/* eslint-disable react/jsx-no-target-blank */
import CommonFooter from "../../components/molecules/CommonFooter";
import { MapCss } from "../../utils/utils";
import Style from "./legal.module.scss";
// @ts-ignore
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import GraphTags from "../../components/GraphTags";
import { DocumentConstants } from "../../constants/document";
import Arrow from "../../public/images/icons/arrow.svg";
import { API_CONSTANTS } from "../../services/constants";
const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/meta/ultraviolette.png`;

const LEGAL = () => {
  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Ultraviolette Legal Information | Terms and Policies</title>
        <meta
          name="description"
          content="Access legal information, terms, and policies related to Ultraviolette's electric vehicles and services."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content={imageUrl} />
        <link rel="canonical" href="https://www.ultraviolette.com/legal" />
        <GraphTags
          title="Ultraviolette Legal Information | Terms and Policies"
          description="Access legal information, terms, and policies related to Ultraviolette's electric vehicles and services."
          image=""
          url="https://www.ultraviolette.com/legal"
        />
      </Head>
      <div className="flex flex-col sm:flex-col sm:w-screen">
        <div className={MapCss(Style, "backgroundImage")}>
          <div className=" ml-7 mr-7 sm:ml-20 sm:mt-16  sm:z-50">
            <div className="flex flex-row justify-between">
              <div
                className={MapCss(
                  Style,
                  "eurostile font-color",
                  "font-normal  mb-4  text-[24px] mt-5 sm:mt-0 sm:mb-3 sm:text-[48px] "
                )}
              >
                LEGAL
              </div>
              <div className=" mb-4 mt-6 sm:hidden">
                <Image
                  alt="headt-side"
                  width={95}
                  height={22}
                  src={"/images/icons/heading.svg"}
                />
              </div>
            </div>
            <div className=" flex h-auto border-b-2 border-gray-300 sm:mt-6 sm:mb-5 sm:mr-12"></div>

            <div
              className={MapCss(
                Style,
                "brutal",
                "font-normal  mb-8  text-sm mr-8 mt-4 sm:mt-14 sm:mb-16 sm:w-4/5 sm:tracking-wide sm:text-[16px]"
              )}
            >
              This page contains information pertaining to Ultraviolette&apos;s
              ethics and privacy programs, in addition to the terms and
              conditions for Ultraviolette products and services.
            </div>
            <div className="mt-16 mb-16 sm:mt-[58px] sm:mb-[160px]">
              {DocumentConstants.legalData.map((legal, index) => {
                return (
                  <a
                    key={index}
                    href={`${legal.url}`}
                    target={legal.local ? "_self" : "_blank"}
                  >
                    <div className="flex cursor-pointer flex-row mt-3 mb-3 sm:mb-8 sm:mt-8 sm:cursor-pointer">
                      <div
                        className={MapCss(
                          Style,
                          "brutal font-color letterSpacing",
                          " mb-2  sm:mb-[6px] font-medium  text-base sm:text-[20px]"
                        )}
                      >
                        {legal.name}
                      </div>
                      <div className="w-3 ml-1 sm:ml-1.5 sm:mt-[-2px] sm:w-4">
                        <Image src={Arrow} alt="" />
                      </div>
                    </div>
                  </a>
                );
              })}
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
      country: country,
    },
  };
}

export default LEGAL;
