import { NextPage } from "next";
import Head from "next/head";
import CommonFooter from "../components/molecules/CommonFooter";
import Script from "next/script";
import { F99 } from "../containers/F99";
import GraphTags from "../components/GraphTags";
const F99Page: NextPage & { getLayout?: any } = ({}) => {
  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Ultraviolette F99 Electric Bike | Performance and Style</title>
        <meta name="description" content="Explore the Ultraviolette F99 electric bike. Combining performance and style for an exhilarating riding experience." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href="https://www.ultraviolette.com/f99" />
        <GraphTags
          title="Ultraviolette F99 Electric Bike | Performance and Style"
          description=""
          image=""
          url="https://www.ultraviolette.com/f99"
        />
      </Head>
      <div>
        <F99 />
        <CommonFooter />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default F99Page;
