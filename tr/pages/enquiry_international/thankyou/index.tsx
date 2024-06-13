import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { MapCss } from '../../../utils/utils';
import Style from "../../thanks/thanks.module.scss";
import Image from "next/image";
import Script from "next/script";
import ThanksBar from '../../../components/molecules/LeftSideBar/thanks';
import Head from 'next/head';
import GraphTags from '../../../components/GraphTags';
import { GetServerSidePropsContext } from 'next';

const ThankYou = () => {
  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <link rel="canonical" href="https://www.ultraviolette.com/enquiry/thankyou" />
        <GraphTags
          title="thankyou Ultraviolette"
          description=""
          image="/images/thankyou/thnxlogo.png"
          url="https://www.ultraviolette.com/enquiry/thankyou"
        />
      </Head>
      <ThanksBar>
        <div className="flex flex-col ml-7 mr-7 mb-20 sm:ml-16 sm:pt-8 sm:mb-40 sm:mr-20 justify-between">
          <div className="flex flex-col">
            <div className='mt-4 sm:mt-0 '>
              <div className={MapCss(Style, "heading ", "w-full flex flex-row  justify-between  sm:flex-col")}>
                THANK YOU!
                <div className={MapCss(Style, "border", "hidden sm:flex")}></div>
                <div className='sm:hidden flex items-center '>
                  <Image
                    alt="arrow-right"
                    width={90}
                    height={20}
                    src={"/images/thankyou/thnxlogo.png"}
                  />
                </div>
              </div>
            </div>
            {/* thank you paragraph */}
            <div className={MapCss(Style, "brutal", 'text-xs font-normal mt-7 sm:mt-10  sm:text-base')}>
              <div className='mb-5'>
              Thank you for registering your interest in F77! We will get back to you.
              </div>
            </div>
            {/* button */}
          </div>
        </div>
      </ThanksBar>
    </>
  )
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const country = context?.query?.country;

  return {
      props: {
          country: country
      },
  };
}
export default ThankYou;