import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";
import { useContext, useEffect } from "react";
import GraphTags from "../../../components/GraphTags";
import LeftSideBar from "../../../components/molecules/LeftSideBar";
import { DocumentConstants } from "../../../constants/document";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { delBookingConfig } from "../../../services/helper";
import { MapCss } from "../../../utils/utils";
import Style from "./congratulation.module.scss";

const BookingConfirmation = () => {
  const router = useRouter();

  const { isMobile } = useContext(NavbarContext);

  useEffect(() => {
    delBookingConfig();
  }, []);

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
      <LeftSideBar
        rightImageSrc={
          isMobile ? DocumentConstants.signInMobile : DocumentConstants.signIn
        }
      >
        <div className="flex flex-col ml-7 mr-7 mb-20 sm:ml-16 sm:pt-8 sm:mb-40 sm:mr-20 justify-between">
          <div className="flex flex-col">
            <div className="mt-4 sm:mt-0 ">
              <div
                className={MapCss(
                  Style,
                  "heading ",
                  "w-full flex flex-row  justify-between  sm:flex-col"
                )}
              >
                CONGRATULATIONS!
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
                We are thrilled to inform you that your F77 successfully booked.
                Keep an eye on your Email and WhatsApp to receive updates
                regarding your booking.
              </div>
            </div>
            {/* button */}
          </div>
        </div>
        <div
          className={MapCss(Style, "procced")}
          onClick={() => router.push("/profile")}
        >
          <div className={Style.proccedText}>VIEW BOOKING DETAILS</div>
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
      country: country,
    },
  };
}
export default BookingConfirmation;
