/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import React from 'react'
import CommonFooter from '../../../components/molecules/CommonFooter'
import CommonHyperLinkViewer from '../../../components/molecules/CommonHyperlinkViewer'
import GraphTags from '../../../components/GraphTags'
import { GetServerSidePropsContext } from "next";

const TermsConditions = () => {
  return (
    <>
    <Head>
        <title>Ultraviolette Automotive | Terms-Conditions</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Read and familiarize yourself with Ultraviolette's terms and conditions."
        />
        <link rel="canonical" href="https://www.ultraviolette.com/legal/terms-conditions" />
        <GraphTags
          title="Ultraviolette Automotive | Terms-Conditions"
          description="initial-scale=1.0, width=device-width"
          image=""
          url="https://www.ultraviolette.com/legal/terms-conditions"
        />
      </Head>
    
    <div className="flex flex-col sm:flex-col sm:w-screen">
    <div className="">
      
          <CommonHyperLinkViewer Subheading={"Terms Conditions"} Heading={"Ultraviolette Terms & Conditions"} body={
          <div>
            <p className='mb-2 sm:mb-4'>
            www.ultraviolette.com is owned and operated by Ultraviolette Automotive Private Limited. 
            </p>
            <p className='mb-2 sm:mb-4'>
            We reserve the right to change these terms and conditions at any time and you agree that each visit you make to our website shall be subject to the current terms and conditions as published on our website at www.ultraviolette.com (henceforth referred as the 'Website').
            </p>
            <h1 className='font-medium sm:mb-4 mb-2'>General Terms of Use</h1>
            <p className='mb-2 sm:mb-4'>
            By accessing the Website, you are agreeing to be bound by these Website Terms & Conditions of Use and all applicable laws and regulations, and you agree that you are solely responsible for compliance with any applicable local laws. If you do not agree with any of these terms, do not use this site. Any claim relating to the website shall be governed by the laws of India, under the jurisdiction of Bengaluru Courts
            </p>
            <p className='mb-2 sm:mb-4'>
            The materials contained on the Website are protected by applicable copyright and trademark laws.
            </p>
            <h1 className='font-medium sm:mb-4 mb-2'>Preservation of Intellectual Property Rights</h1>
            <p className='mb-2 sm:mb-4'>
            All material on this site, including, but not limited to text, images, illustrations, and multimedia assets, is protected by copyrights which are owned and controlled by Ultraviolette.
            </p>
            <p className='mb-2 sm:mb-4'>
            Material from this Website may not be copied, reproduced, republished, uploaded, posted, transmitted, or distributed in any way. Modification of the materials or use of the materials for any other purpose is a violation of the copyrights and other proprietary rights held by the respective providers thereof. The use of any such material on any other website, ftp server or network environment is prohibited. We reserve the right to pursue legal action for inappropriate usage of copyrighted material or otherwise.
            </p>
            <h1 className='mb-2 sm:mb-4 font-medium'>Changes and Improvements</h1>
            <p className='mb-2 sm:mb-4'>
            We may make changes, improvements, alterations or amendments in and to the products, services, information and materials contained on the Website including the terms and conditions of your use of this Website, without liability.
            </p>
            <h1 className='mb-2 sm:mb-4 font-medium'>Termination</h1>
            <p className='mb-2 sm:mb-4'>We may cancel or terminate your right to use the Website or any part of the Website at any time without notice. In the event of a cancellation or termination of your registration or membership within our Website, you are no longer authorized to access the part of the Website affected by such cancellations or terminations. The restrictions imposed on you with respect to material downloaded from our Website, and the disclaimers and limitations of liabilities set forth in these Terms and Conditions of Service, shall survive.</p>
            <h1 className='mb-2 sm:mb-4 font-medium'>Your Use of the Site</h1>
            <p className='mb-2 sm:mb-4'>You may not use any "deep-link", "page-scrape", "robot", "spider" or other automatic device, script, program, algorithm or methodology, or any similar or equivalent manual process, to access, acquire, copy or monitor any portion of the Site or any Content, or in any way reproduce or circumvent the navigational structure or presentation of the Site or any Content, to obtain or attempt to obtain any materials, documents or information through any means not purposely made available through the Website. Ultraviolette reserves the right to restrict or prohibit any such activity or activities.</p>
            <h1 className='mb-2 sm:mb-4 font-medium'>Purchases; Other Terms and Conditions</h1>
            <p className='mb-2 sm:mb-4'>Additional terms and conditions may apply to the purchases of goods or services and to specific portions or features of the Website, including contests, promotions or other similar features, all of which terms are made a part of these Terms of Use by this reference. You agree to abide by such other terms and conditions, including where applicable representing that you are of sufficient legal age and or from a specific geographic region to use or participate in such service or feature. If there is a conflict between these Terms of Use and the terms posted for or applicable to a specific portion of the Website or for any service offered on or through the Website, the latter terms shall control with respect to your use of that portion of the Website or the specific service.</p>
            <h1 className='mb-2 sm:mb-4 font-medium'>Limitation of Liability</h1>
            <p className='mb-2 sm:mb-4'>Except where prohibited by law, in no event will Ultraviolette be liable to you for any indirect, consequential, exemplary, incidental or punitive damages, including lost profits, even if we have been advised of the possibility of such damages.</p>
            <h1 className='mb-2 sm:mb-4 font-medium'>Indemnity</h1>
            <p className='mb-2 sm:mb-4'>You agree to indemnify and hold Ultraviolette, its employees, and affiliates, harmless from any demands, loss, liability, claims or expenses (including attorneys’ fees), made against Ultraviolette by any third party due to or arising out of or in connection with your use of the Website.</p>
            <p className='mb-2 sm:mb-4'>Ultraviolette reserves the right to refuse access to use the Services offered via the Website to new Users or to terminate access granted to existing Users at any time without according any notifications if found violating any terms and conditions.</p>

            </div>}/>
      <CommonFooter />

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


export default TermsConditions
