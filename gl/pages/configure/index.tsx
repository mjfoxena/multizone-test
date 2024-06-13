import Head from "next/head";
import Script from "next/script";
import { GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import ConfigureContainer from "../../components/configure";
import VarientSelection from "../../components/configure/varientSelection";
import { useRouter } from "next/router";
import { API_CONSTANTS } from "../../services/constants";

const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/meta/ultraviolette.png`;

const Configure = () => {
    const router = useRouter();
    const [varientStep, setVarientStep] = useState(0)
    const [selectedVariant, setSelectedVariant] = useState("Original");

    useEffect(() => {
        const { varientStep } = router.query;
        if (varientStep !== undefined) {
          setVarientStep(1);
        }
    }, [router.query]);    
    
    return (
        <>
            <Script src="/js/hotjar.js" strategy="afterInteractive" />
            <Head>
                <title>
                    Configure Your Ultraviolette | Customize Your Electric Bike
                </title>
                <meta name="description" content="Select your preferred electric bike, configurate it, and place an order online. Book your electric bike now" />
                <meta property="og:image" content={imageUrl} />
            </Head>

            {varientStep === 0 && (<div className="mt-16 sm:mx-16 lg:mx-20">
                <VarientSelection onChoseVarient={() => { setVarientStep(1) }} setSelectedVariant={setSelectedVariant} selectedVariant={selectedVariant}/>
            </div>)}

            {varientStep === 1 && (<div className="mt-16 sm:mx-16 lg:mx-20">
                <ConfigureContainer selectedVariant={selectedVariant}/>
            </div>)}
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
  


export default Configure;