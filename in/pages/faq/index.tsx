import Head from "next/head";
import React, { useEffect, useState } from "react";
import Accordian from "../../components/molecules/Accordian";
import CommonFooter from "../../components/molecules/CommonFooter";
import { useFaqList } from "../../queries/config";
import Style from "./faq.module.scss";
import Script from "next/script";
import faqSchema from "../../schemas/faq-schema";
import { GetServerSidePropsContext } from "next";
import FaqHead from "../../components/molecules/faq/head";
import FaqSection from "../../components/molecules/faq/faqsection";
import { getOldUserInfo } from "../../services/auth";
import { GetNewFaqList } from "../../services/config";
import { IFAQ } from "../../utils/interface/faq";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const FAQPage = () => {
  const [faq, setFaq] = useState<IFAQ[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const onPageLoaded = async () => {
    console.log("onPageLoaded");

    try {
      const fetchedFAQ: IFAQ[] = await GetNewFaqList();
      setFaq(fetchedFAQ);
      setIsLoading(false);
      console.log("faq response", fetchedFAQ);
    } catch (error) {
      console.log("faq error", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    onPageLoaded();
  }, []);

  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Ultraviolette FAQs | Answers to Common Questions</title>
        <meta
          name="description"
          content="Find answers to common questions about Ultraviolette's electric vehicles and sustainable mobility solutions."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href="https://www.ultraviolette.com/faq" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Head>
      <div className="flex flex-col w-full bg-[#ECECEC] max-sm:bg-[#F1F1F1]  ">
        <div className="wfull">
          <FaqHead />
          {isLoading ? (
            <div>
              <SkeletonTheme baseColor="#FFF" highlightColor="#888">
                <p>
                  <Skeleton count={10} />
                </p>
              </SkeletonTheme>
              
              <CommonFooter />
            </div>
          ) : faq ? (
            <FaqSection faq={faq} />
          ) : (
            <div>Error: Unable to fetch data</div>
          )}
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
      country: country,
    },
  };
}

export default FAQPage;
