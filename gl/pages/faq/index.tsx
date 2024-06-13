import Head from "next/head";
import React, { useState } from "react";
import Accordian from "../../components/molecules/Accordian";
import CommonFooter from "../../components/molecules/CommonFooter";
import { useFaqList } from "../../queries/config";
import { MapCss } from "../../utils/utils";
import Style from "./faq.module.scss";
import Script from "next/script";
import faqSchema from "../../schemas/faq-schema";
import { GetServerSidePropsContext } from "next";

const FAQPage = () => {
  const [Index, setIndex] = useState("");
  const { data: faqList, error } = useFaqList(()=>{})
  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
     <Head>
        <title>Ultraviolette FAQs | Answers to Common Questions</title>
        <meta name="description" content="Find answers to common questions about Ultraviolette's electric vehicles and sustainable mobility solutions." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href="https://www.ultraviolette.com/faq" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Head>
    <div className="flex flex-col sm:flex-col sm:w-screen">
      <div className={MapCss(Style, "backgroundImage")}>
        <div className=" ml-7 mr-7 sm:ml-20 sm:mt-16  sm:z-50">
          <div
            className={MapCss(
              Style,
              "eurostile font-color",
              "font-normal  mb-4  text-2xl mt-5 sm:mb-16 sm:text-[48px] "
            )}
          >
            FAQ
          </div>
          <div className=" flex h-auto border-b-2 border-gray-300 mt-6 mb-1 sm:ml-12 sm:mr-12 sm:hidden"></div>
          <div className="border-0 mb-12 sm:mb-48 sm:border-t-2 sm:border-zinc-300 sm:mr-6">
            {faqList?.map((accordianItem, index) => (
              <Accordian
                key={index}
                title={accordianItem.question}
                Id={accordianItem.id}
                answer={accordianItem.response}
                Index={Index}
                setIndex={setIndex}
              ></Accordian>
            ))}
          </div>
        </div>
      </div>
      <CommonFooter />
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

export default FAQPage;
