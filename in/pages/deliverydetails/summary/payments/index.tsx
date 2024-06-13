import React from 'react'
import Image from "next/image";
import { MapCss } from '../../../../utils/utils';
import Style from './payments.module.scss';
import Script from "next/script";
import { GetServerSidePropsContext } from "next";

const Payments = () => {
    return (
        <>
              <Script src="/js/hotjar.js" strategy="afterInteractive" />
            <div className='w-full'>
                <div className={MapCss(Style,"",'w-full font-normal p-10 sm:ml-24 sm:mt-28 sm:w-1/2 sm:p-0')}>
                    {/* heading */}
                    <div className={MapCss(Style,"brutal",'w-full text-base leading-7  font-normal sm:text-3xl sm:leading-10 sm:w-5/6')}>
                        PLEASE WAIT WHILE WE REDIRECT YOU
                        TO OUR PAYMENT GATEWAY
                    </div>
                    <div className='mt-4'>
                        <Image src={'/images/payments/payment.png'} width={550} height={125} alt='product' />
                    </div>
                    <div className={MapCss(Style,"brutal",'mt-4 w-full font-normal text-base leading-5 sm:leading-7 sm:text-xl sm:w-5/6')}>
                        Close the Cashfree tab after payment is complete. You will
                        recieve an e-mail upon confirmation of payment.
                    </div>
                    <div className={MapCss(Style,"border",'w-full mt-10 sm:hidden')}>

                    </div>
                </div>

            </div>
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
  

export default Payments;
