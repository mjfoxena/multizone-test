import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import CommonFooter from "../components/molecules/CommonFooter";
import HomeCover from "../components/molecules/Home";
import Script from "next/script";
import { useEffect, useState } from "react";
import businessSchema from "../schemas/business-schema";
import { API_CONSTANTS } from "../services/constants";

const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/meta/ultraviolette.png`;

const Home: any = ({ referrer, country }) => {
  const [overlay, setOverlay] = useState(!Boolean(referrer));

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);  

  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Ultraviolette : High-Performance Electric Vehicles</title>
        <meta name="description" content="Explore Ultraviolette's cutting-edge electric vehicles and sustainable mobility solutions. Developing India's first ecosystem of high-performance electric vehicles. Book a Test Ride Now!" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width,viewport-fit=cover"
        />
        <meta property="og:image" content={imageUrl} />
        <link rel="canonical" href="https://www.ultraviolette.com/" />
        <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
      </Head>
      <div>
        <HomeCover overlay={overlay} setOverlay={setOverlay} country={country}/>
        <CommonFooter />
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { res } = context;

  const referrer = context?.req?.headers?.referer;
  const country = context?.query?.country;
  res.setHeader('Cache-Control', 'public, max-age=1800, must-revalidate');

  return {
    props: {
      referrer: referrer || "",
      country: country
    },
  };
}

export default Home;
