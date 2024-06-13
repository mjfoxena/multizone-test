import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useContext } from "react";
import GraphTags from "../../components/GraphTags";
import TestRideForm from "../../components/rides/test_ride_form";
import { DocumentConstants } from "../../constants/document";
import { NavbarContext } from "../../contexts/NavbarContext";
import { API_CONSTANTS } from "../../services/constants";
const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/meta/ultraviolette.png`;

const TestRide: NextPage & { getLayout?: any } = ({}) => {
  const { isMobile } = useContext(NavbarContext);

  const imageLink = isMobile
    ? DocumentConstants.testRideMobile
    : DocumentConstants.testRide;

  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>
          Ultraviolette Test Ride | Experience Our Electric Vehicles
        </title>
        <meta
          name="description"
          content="Schedule a test ride to experience the thrill of Ultraviolette's electric vehicles. Discover the future of mobility."
        />
        <meta property="og:image" content={imageUrl} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href="https://www.ultraviolette.com/testride" />
        <GraphTags
          title="Ultraviolette Test Ride | Experience Our Electric Vehicles"
          description="Schedule a test ride to experience the thrill of Ultraviolette's electric vehicles. Discover the future of mobility."
          image={imageLink}
          url="https://www.ultraviolette.com/testride"
        />
      </Head>
      <div className="">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 ">
          {/* Content Tabs go here */}
          <div className=" md:col-span-1  sm:order-first scrollSection">
            <TestRideForm
              className="px-7 md:px-20"
              nextHandlerTapped={(formData) => {
                // console.log(formData);
              }}
            />
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
                src={imageLink}
                alt="Ultraviolette F77 Side View"
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

// export async function getServerSideProps(context) {
//   return {
//     props: {},
//   };
// }
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const country = context?.query?.country;

  return {
    props: {
      country: country,
    },
  };
}

export default TestRide;
