import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import CommonFooter from '../CommonFooter';
import CommonHyperLinkViewer from '../CommonHyperlinkViewer';
import { MapCss } from '../../../utils/utils';
import Style from "./privacy-policy.module.scss";

const PrivacyPolicy = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Ultraviolette Automotive | Privacy Policy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col sm:flex-col sm:w-screen">
        <div className="">

          <CommonHyperLinkViewer Subheading={"Privacy policy"} Heading={"Ultraviolette Privacy Policy"} body={
            <div>
              <h1 className='font-bold mb-4'>Ultraviolette Website Privacy Policy</h1>
              <p className='mb-4'>This Ultraviolette Website Privacy Policy was last updated in October 2022.</p>
              <p className='mb-4'>Your privacy is important to Ultraviolette. Ultraviolette Automotive Pvt Ltd., its affiliates
                and/or subsidiaries (collectively, “Ultraviolette”, “we”, “us” or “our”) have
                developed this privacy policy (“Ultraviolette Privacy Policy”) to protect the
                information derived from your use of Ultraviolette’s website (the “Site”)
                that Ultraviolette collects, stores, uses, and under certain conditions, discloses, shares, or transfers. </p>
              <p className='mb-4'>
                Ultraviolette is both the Controller and Processor, as defined under GDPR, of personal or non-personal information
                we may collect.
              </p>
              <p className='mb-4'>
                Ultraviolette may collect, use, disclose, share, transfer or store your Personal Information and Non-Personal Information according to the provisions of Ultraviolette Privacy Policy. By visiting the Site, you accept the practices described in Ultraviolette Privacy Policy.
              </p>
              <h1 className='font-bold mb-4'>Personal Information Ultraviolette May Collect and Use</h1>
              <h2 className='font-medium mb-2'>Personal Information Ultraviolette may collect</h2>
              <p className='mb-4'>While visiting the Site, you may be asked to provide Ultraviolette with
                “Personal Information” for different purposes, and Ultraviolette will collect
                and may store such Personal Information. Personal information includes
                information that specifically identifies an individual, including but not limited
                to, name, mailing address, email address, telephone number, mobile number or
                employer.</p>
              <p className='mb-4'>
                For instance, by requesting Ultraviolette to notify you of updates to Ultraviolette’s 
                products or updates to the Site, Ultraviolette may ask you to provide your personal 
                email address. In addition, you may submit to Ultraviolette messages that include 
                information that can facilitate communication with Ultraviolette including your name, 
                personal telephone number, mobile number, or your employer.
              </p>
              <p className='mb-4'>
              For Personal Information received by Ultraviolette, it shall be deemed that you knowingly and specifically agreed to provide such Personal Information. In no event shall you provide any Personal Information of any third party without such third party’s prior consent. If you do not agree to provide your Personal 
              Information, Ultraviolette may not be able to inform you of any updates including, but not limited to, updates to Ultraviolette products, Terms of Use or Ultraviolette Privacy Policy. 
              </p>
              <h2 className='font-medium mb-2'>Personal Information Ultraviolette may use</h2>
              <p className='mb-4'>
              Ultraviolette may use your Personal Information by Ultraviolette itself, or through or together with its affiliates, subsidiaries or strategic partners by disclosure, share or transfer of your Personal Information to such affiliates, subsidiaries or strategic partners, for purposes below including:
              </p>
              <ul className={MapCss(Style,"ul-lists","mb-4 list-disc")}>
                <li>to provide the services, products, or information you request, and to 
                  process and complete such requests and any related transactions;</li>
                <li>to send you confirmations, updates, alerts, and support and administrative messages and otherwise facilitate your use of, and our administration and operation of, the Site;</li>
                <li>to keep you informed about various promotions, offers, events, products or services;</li>
                <li>to send you notices, such as changes to the Site, the Terms of Use, Ultraviolette Privacy Policy or any other policy or guideline;</li>
                <li>for internal purposes, such as research, auditing or data analysis; or</li>
                <li>to comply with any court order, law or legal process, including to respond to any government or regulatory request.</li>
        
              </ul>
              <h1 className='font-bold mb-4'>
              Non-Personal Information Ultraviolette May Collect and Use
              </h1>
              <h2 className='font-medium mb-4'>Non-Personal Information Ultraviolette may collect</h2>
              <p>Once you visit the Site or act on a Ultraviolette email, Ultraviolette or Ultraviolette’s strategic partners may use some technologies to collect “Non-Personal Information” about your usage of or activity on the Site that cannot, on its own, identify or allow direct association with a specific individual. Non-Personal Information may include, without limitation, information collected by or through web beacons or cookies.</p>
              <p className='mb-4'>For instance, web beacons are electronic images that we use on the Site or in Ultraviolette email that Ultraviolette sends to you, for the purpose of understanding your usage when you open or take any action via the email.</p>
              <h2 className='mb-4 font-medium'>Non-Personal Information Ultraviolette may use</h2>
              <p className='mb-4'>
              Ultraviolette Privacy Policy does not limit our use or disclosure of any Non-Personal Information in any way, and we reserve the right to use and disclose Non-Personal Information to our affiliates, subsidiaries or its strategic partners at our discretion. For instance, such Non-Personal Information may be used to better understand your behavior, to realize which parts of the Site that visitors have visited, and to facilitate and measure the effectiveness of advertisements and web searches.

              </p>
              <h1 className='mb-4 font-bold'>Protecting Your Personal Information</h1>
              <p className=''>
              Ultraviolette will take reasonable and appropriate measures to prevent your Personal Information provided by you from unauthorized or unlawful access, use, processing, or alteration, and from any breaches or loss of such Personal Information. Such measures may be implemented through the use of a third-party service. You are solely responsible for any Personal Information you choose to share or submit in public areas of the Site, such as a forum or a message board.
              </p>
              <p className='mb-4'>
              Despite Ultraviolette taking reasonable steps to use and improve various safeguards, you acknowledge and agree that no system or technology is completely secure and safe. If you become aware of any vulnerability of the Site, please email info@ultraviolette.com or visit the Site to report such vulnerability.
              </p>
              <h1 className='mb-4 font-bold'>Children</h1>
              <p className='mb-4'>
              Ultraviolette is not intended for children under thirteen (13) years of age. Ultraviolette, its affiliates, subsidiaries or its strategic partners do not knowingly or intentionally collect, disclose, share, transfer any Personal Information from children under the age of thirteen (13) and you should not, under any circumstance or for any reason, provide your Personal Information if you are under the age of thirteen (13). If Ultraviolette becomes aware of any collection of any Personal Information of a child under the age of thirteen (13), Ultraviolette will take steps to delete such Personal Information.
              </p>
              <h1 className='mb-4 font-bold'>International Privacy Laws</h1>
              <p className='mb-4'>If you are visiting our site from outside of India, please be aware that you are sending information (including personal data) to India, where our servers are located. That information may then be transferred within India or back out of India to other countries outside of your country of residence, depending on the type of information and how it is stored by us. These countries may not necessarily have data protection laws as comprehensive or protective as those in your country of residence; however, our collection, storage, and use of your personal data will at all times continue to be governed by this Privacy Policy.</p>
              <h1 className='mb-4 font-bold'>Changes to Ultraviolette Privacy Policy</h1>
              <p className='mb-4'>Ultraviolette may change the provisions of Ultraviolette Privacy Policy at any time. If we change or update Ultraviolette Privacy Policy, we will indicate that changes have been made by updating the effective date of Ultraviolette Privacy Policy. Ultraviolette encourages you to review Ultraviolette Privacy Policy from time to time to make sure you understand how any personal information you provide may be used.</p>
              <h1 className='mb-4 font-bold'>Ultraviolette may use cookies</h1>
              <p className=''>We and our partners use tracking technologies such as cookies on our site to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you have provided to them or that they have collected from your use of their or other services.</p>
              <p className='mb-4'>We reserve the right to make changes to the cookie statement at any time and for any reason. We will alert you about any changes by updating the “Last Updated” date of the cookie statement. Any changes will become effective immediately upon posting the updated statement on our site and you waive the right to receive specific notices of each such change. You are encouraged to periodically review this policy to stay informed of updates.</p>
              <h1 className='mb-4 font-bold'>Contact Information</h1>
              <p className='mb-4'>We welcome feedback if you have any questions regarding our Privacy Policy or the use of your information, please send an email to <span className='font-bold'>info@ultraviolette.com</span>, or write to us at 529-530, Intermediate Ring Road, Domlur, Bangalore 560071 Karnataka India.</p>
              <p>Copyright © 2015-2022 Ultraviolette Automotive Pvt Ltd. All rights reserved.</p>
            </div>} />
          <CommonFooter />

        </div>

      </div>
    </>
  )
}

export default PrivacyPolicy
