import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import GraphTags from "../../components/GraphTags";
import EnqueryForm from "../../components/molecules/enquiry/";
import { DocumentConstants } from "../../constants/document";
import { API_CONSTANTS } from "../../services/constants";
const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/meta/ultraviolette.png`;

const Enquery = () => {
  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Contact Ultraviolette | Get in Touch with Our Team</title>
        <meta
          name="description"
          content="Have questions or need assistance? Contact Ultraviolette's team for information on our electric vehicles and services."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content={imageUrl} />
        <link rel="canonical" href="https://www.ultraviolette.com/enquiry" />
        <GraphTags
          title="Contact Ultraviolette | Get in Touch with Our Team"
          description="Have questions or need assistance? Contact Ultraviolette's team for information on our electric vehicles and services."
          image="/images/contact/ultraviolette-map1.jpg"
          url="https://www.ultraviolette.com/enquiry"
        />
      </Head>
      <div className="">
        <div className="grid lg:grid-cols-2 md:grid-cols-2">
          {/* Content Tabs go here */}
          <div className=" md:col-span-1 sm:order-first">
            <EnqueryForm
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
                height: "100%",
                position: "relative",
              }}
            >
              <Image
                style={{ objectFit: "cover" }}
                src={DocumentConstants.enquiry}
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
                src={DocumentConstants.enquiryMobile}
                alt="Ultraviolette F77 Enquiry"
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
      country: country,
    },
  };
}

export default Enquery;
