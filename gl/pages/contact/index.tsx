import React from "react";
import CommonSideBar from "../../components/molecules/CommonSideBar";
import { TextElement } from "../../components/atoms/Texts";
import Style from "./contact.module.scss";
import Image from "next/image";
import { MapCss } from "../../utils/utils";
import CommonFooter from "../../components/molecules/CommonFooter";
import Head from "next/head";
import Script from "next/script";
import GraphTags from "../../components/GraphTags";
import { GetServerSidePropsContext } from "next";
import { API_CONSTANTS } from "../../services/constants";
const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/meta/ultraviolette.png`;

const Contact = () => {
  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Contact Ultraviolette | Reach Out for Support</title>
        <meta
          name="description"
          content="Reach out to Ultraviolette for support, inquiries, or assistance with our electric vehicles and mobility solutions."
        />
        <link rel="canonical" href="https://www.ultraviolette.com/contact" />
        <meta property="og:image" content={imageUrl} />
        <GraphTags
          title="Contact Ultraviolette | Reach Out for Support"
          description="Reach out to Ultraviolette for support, inquiries, or assistance with our electric vehicles and mobility solutions."
          image="/images/contact/ultraviolette-map1.jpg"
          url="https://www.ultraviolette.com/contact"
        />
      </Head>
      <div className="w-full">
        <div className="flex flex-col w-full ">
          {/*------------support top------ */}
          <div
            className={MapCss(
              Style,
              "contact color",
              "flex flex-col font-normal w-full h-fit sm:h-2/3  sm:flex-row pb-10 sm:pb-0"
            )}
          >
            {/*------ mobile header----- */}
            <div className=" flex flex-col pl-7 pr-7 sm:hidden">
              <div className="w-full flex flex-row justify-between items-center">
                <div
                  className={MapCss(Style, "eurostile color", "text-2xl mt-3")}
                >
                  CONTACT
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
              {/* careers header */}
              <div
                className={MapCss(
                  Style,
                  "eurostile color",
                  "text-[48px] font-normal hidden mt-16 ml-16 sm:flex flex-col"
                )}
              >
                CONTACT
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
                    GENERAL QUERY
                  </div>
                  <div
                    className={MapCss(
                      Style,
                      "brutal color",
                      "text-xs sm:text-sm font-normal leading-6 sm:leading-[28px]"
                    )}
                  >
                    <a href="mailto:info@ultraviolette.com" hrefLang="en-in">
                      xxxx@xxxx.com
                    </a>
                  </div>
                </div>
                <div className="flex flex-col w-full sm:w-1/5">
                  <div
                    className={MapCss(
                      Style,
                      "color brutal",
                      "flex flex-col text-base font-medium sm:font-medium sm:leading-[50px] sm:text-[28px]"
                    )}
                  >
                    GRIEVANCES
                  </div>
                  <div
                    className={MapCss(
                      Style,
                      "brutal color",
                      "text-xs sm:text-sm font-normal leading-6 sm:leading-[28px]"
                    )}
                  >
                    <a href="mailto:info@ultraviolette.com" hrefLang="en-in">
                      info@ultraviolette.com
                    </a>
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
                    CAREERS
                  </div>
                  <div
                    className={MapCss(
                      Style,
                      "brutal color",
                      "text-xs sm:text-sm font-normal leading-6 sm:leading-[28px]"
                    )}
                  >
                    <a href="mailto:careers@ultraviolette.com" hrefLang="en-in">
                      careers@ultraviolette.com
                    </a>
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
                    UV HEADQUARTERS
                  </div>
                  <div
                    className={MapCss(
                      Style,
                      "brutal color",
                      " text-xs leading-6 sm:text-sm font-normal sm:leading-[28px]"
                    )}
                  >
                    Address: No. 529, 530, Intermediate Ring Rd, Krishna Reddy
                    Layout, Amarjyoti Layout, Domlur, Bengaluru, Karnataka
                    560071
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* map */}
      <div>
        <a
          href="https://www.google.com/maps/place/Ultraviolette+Automotive+Pvt+Ltd+-+R%26D+Center/@12.9535307,77.6418694,16.47z/data=!4m6!3m5!1s0x3bae159feb2cc50b:0x3421bfc459b134d!8m2!3d12.9539136!4d77.6409549!16s%2Fg%2F11bxdtf19m!5m2!1e1!1e4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-full">
            <Image
              src={"/images/contact/ultraviolette-map1.jpg"}
              width={2000}
              height={0}
              alt="Ultraviolette Hangar"
              className="object-cover w-full cursor-pointer"
            />
          </div>
        </a>
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
export default Contact;
