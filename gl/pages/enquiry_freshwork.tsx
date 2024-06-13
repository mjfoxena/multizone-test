import { NextPage } from "next";
import Head from "next/head";
import CommonFooter from "../components/molecules/CommonFooter";
import HomeCover from "../components/molecules/Home";
import Script from "next/script";

const ENQUIRY: NextPage & { getLayout?: any } = ({}) => {
  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Ultraviolette Automotive</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div id="script-container-enquiry" className="bg-black py-10">
        <Script
          src="/js/freshworksEnquiryPage.js"
          crossOrigin="anonymous"
          id="fs_88c362dceeb5513fd30ee0b51056b162d605ae79ef132d4e7510023df27188b9"
          strategy={"afterInteractive"}
        />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ENQUIRY;
