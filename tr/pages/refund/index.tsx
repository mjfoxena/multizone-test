import React, { useEffect, useState } from "react";
import { getCognitoInfo } from "../../services/helper";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import CancelBooking from "../../components/refund";
import { originURL } from "../../services/constants";
import GraphTags from "../../components/GraphTags";

const imageLink =
  "https://s3.ap-south-1.amazonaws.com/www.ultraviolette.com/config/configurator_combination/Airstrike/Original/Airstrike_1.jpg";

const Refund = ({ onCancel }) => {
  const [loader, setLoader] = useState(true);
  const router = useRouter();

  // When the user is login
  useEffect(() => {
    setLoader(true);
    if (!getCognitoInfo()) {
      router.push(`${originURL}/`);
      return;
    }
  });

  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Ultraviolette Automotive | Refund</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href="https://www.ultraviolette.com/refund" />
        <GraphTags
          title="Ultraviolette Automotive | Refund"
          description=""
          image=""
          url="https://www.ultraviolette.com/refund"
        />
      </Head>
      <div className="">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 ">
          {/* Content Tabs go here */}
          <div className=" md:col-span-1  sm:order-first scrollSection">
            <CancelBooking />
          </div>

          {/*  Image Will be displayed Here */}
          <div className="flex col-span-1 order-first noScroll">
            {/* For Desktop */}
            <div
              className="hidden md:block"
              style={{
                width: "100%",
                height: "calc(100vh - 64px)",
                position: "relative",
              }}
            >
              <Image
                style={{ objectFit: "cover" }}
                // @ts-ignore
                src={imageLink}
                alt="carousel"
                fill
              />
            </div>

            {/* For Mobile */}
            <div
              className="md:hidden"
              style={{
                width: "100%",
                height: "calc(50vh - 64px)",
                position: "relative",
              }}
            >
              <Image
                style={{ objectFit: "cover" }}
                src={imageLink}
                alt="carousel"
                fill
              />
            </div>
          </div>
        </div>
      </div>
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
export default Refund;