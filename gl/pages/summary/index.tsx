import Head from "next/head";
import Script from "next/script";
import GraphTags from "../../components/GraphTags";
import SummaryConfig from "../../components/configure/summary";
import Image from "next/image";
import style from "./summary.module.scss";
import { GetServerSidePropsContext } from "next";
import { useContext, useEffect, useState } from "react";
import router from "next/router";
import { getCognitoInfo } from "../../services/helper";
import { NavbarContext } from "../../contexts/NavbarContext";

const Summary = () => {
  const { tempAuth, userData } = useContext(NavbarContext)
  const [imageUrl, setImageurl] = useState("");

  useEffect(()=>{
    if(!getCognitoInfo()){
      router.push('/configure')
    }
  },[userData?.email])

  return (
    <div>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Ultraviolette Automotive | Summary</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href="https://www.ultraviolette.com/summary" />
        <GraphTags
          title="Ultraviolette Automotive | Summary"
          description=""
          image=""
          url="https://www.ultraviolette.com/summary"
        />
      </Head>

      <div className={`${style.container}`}>
        <div className={`${style.left}`}>
          <div className={`${style.imageContainer}`}>
            {imageUrl && (
              <Image
                alt="bookedImage"
                src={imageUrl}
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
        </div>
        <div className={`${style.right}`}>
          <SummaryConfig setImageurl={setImageurl} />
        </div>
      </div>
    </div>
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

export default Summary;
