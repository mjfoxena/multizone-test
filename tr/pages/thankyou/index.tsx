import { useRouter } from 'next/router';
import React, { useState } from 'react'
import LeftSideBar from '../../components/molecules/LeftSideBar'
import { MapCss } from '../../utils/utils';
import Style from "./thankyou.module.scss";
import Image from "next/image";
import Script from "next/script";
import Head from 'next/head';
import GraphTags from '../../components/GraphTags';
import Link from 'next/link';
import { GetServerSidePropsContext } from "next";

const ThankYou = () => {
  const router = useRouter();
  const [international, setInternational] = useState(true);
  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <link rel="canonical" href="https://www.ultraviolette.com/thankyou" />
        <GraphTags
          title="Ultraviolette Automotive | thankyou"
          description=""
          image=""
          url="https://www.ultraviolette.com/thankyou"
        />
      </Head>
      <LeftSideBar>
        <div className="flex flex-col ml-7 mr-7 mb-20 sm:ml-16 sm:pt-8 sm:mb-40 sm:mr-20 justify-between">
          <div className="flex flex-col">
            <div
              className={MapCss(
                Style,
                "disketmono",
                "text-sm cursor-pointer top-16 z-50 mt-2 absolute sm:cursor-pointer sm:relative   sm:top-0"
              )}
              onClick={() => router.back()}
            >
              {"< "}Back
            </div>
            <div className='mt-4 sm:mt-0 '>
              <div className={MapCss(Style, "heading ", "w-full flex flex-row  justify-between  sm:flex-col")}>
                THANK YOU
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
               Thank you for your interest in the Ultraviolette F77 MACH 2.
                You have now signed up for <span className={MapCss(Style, "color-red")}>early access in your region!</span>
              </div>
              <div className='mb-5'>
              Our dealer partners will contact you for bookings, test rides & further communication. 
              </div>
              {/* <div className='mb-5'>
                Keep an eye on our emaliers and public communications for official news and updates
                regarding subsequent roll-out plans.
              </div> */}
              <div className='mb-20 sm:mb-5'>
                Looking forward to re-imagine the future together!
              </div>
            </div>
            {/* button */}
          </div>
        </div>
        <Link href="/">
          {international && (<div className={MapCss(Style, 'procced')}>
            <div className={Style.proccedText} >EXPLORE F77 MACH 2</div>
            <Image
              alt="arrow-right"
              width={20}
              height={20}
              src={"/images/icons/horizontalWhiteArrow.svg"}
            />
          </div>)}
        </Link>
      </LeftSideBar>
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