import { useEffect } from "react";
import { NextPage } from "next";
import { ConfigureContainer } from "../containers/configure";
import { GetClientAndReferrer } from "../utils/utils";
import Head from "next/head";
import Script from "next/script";

const Configurator: NextPage & { getLayout?: any } = ({}) => {
  return (
    <div>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Ultraviolette Automotive | Configure </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ConfigureContainer />
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      ...GetClientAndReferrer(context),
    },
  };
}

export default Configurator;
