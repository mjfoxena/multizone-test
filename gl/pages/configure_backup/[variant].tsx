import { GetServerSideProps, GetServerSidePropsContext } from "next";
import VariantContainer from "../../containers/variants";
import { GetClientAndReferrer, toTitleCase } from "../../utils/utils";
import { BikeLabelMap } from "../../constants/configSelectionImageMap";
import Head from "next/head";
import Script from "next/script";
import React from "react";
import productSchema from "../../schemas/business-schema";


const Variants = ({ variant, open, country }) => {  
  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />

      <Head>
        <title>
          {/* Ultraviolette Automotive | Configure {toTitleCase(variant)} */}
          Configure Your Ultraviolette {toTitleCase(variant)} | Customize Your Electric Bike
        </title>
        <meta name="description" content="Select your preferred electric bike, configurate it, and place an order online. Book your electric bike now" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Head>
      <VariantContainer step={open} country={country}/>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const country = context?.query?.country;
  const { query } = context;
  const { variant, open } = query;
  
  if (
    !Object.keys(BikeLabelMap).includes(variant as string) &&
    variant !== "limited"
    ) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        variant,
        open: open || "",
        country: country,
        ...GetClientAndReferrer(context),
    },
  };
};

export default Variants;