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
                        <div className="text-[14px] sm:text-[16px] brutal font-normal mt-7 sm:mt-10">
                            <div className='mb-5'>
                                Thank you for your interest in the Ultraviolette F77. You have now signed up for <span className='text-[#ED1C24]'>early access in your region!</span>
                            </div>
                            <div className='mb-5'>
                                We will notify you when we commence pre-bookings and roll-outs in your region. Keep an eye on our emailers and public communications for official news and updates regarding subsequent roll-out plans.
                            </div>
                            <div className='mb-5'>
                                Looking forward to re-imagine the future together!                            
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