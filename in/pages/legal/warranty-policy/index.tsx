import Head from "next/head";
import React from "react";
import CommonFooter from "../../../components/molecules/CommonFooter";
import CommonHyperLinkViewer from "../../../components/molecules/CommonHyperlinkViewer";
import GraphTags from "../../../components/GraphTags";
import { GetServerSidePropsContext } from "next";

const TermsConditions = () => {
  return (
    <>
      <Head>
        <title>Ultraviolette Automotive | Warranty Policy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href="https://www.ultraviolette.com/legal/warranty-policy" />
        <GraphTags
          title="Ultraviolette Automotive | Warranty Policy"
          description="initial-scale=1.0, width=device-width"
          image=""
          url="https://www.ultraviolette.com/legal/warranty-policy"
        />
      </Head>
      <div className="flex flex-col sm:flex-col sm:w-screen">
        <div className="">
          <CommonHyperLinkViewer
            Subheading={"Warranty Policy"}
            Heading={"Ultraviolette Warranty Policy"}
            body={
              <div>
                This Ultraviolette Privacy Policy was last updated in November
                2022. Your privacy is important to Ultraviolette. Ultraviolette
                Automotive Pvt Ltd., its affiliates and/or subsidiaries
                (collectively, “Ultraviolette”, “we”, “us” or “our”) have
                developed this privacy policy (“Ultraviolette Privacy Policy”)
                to protect the information derived from your use of
                Ultraviolette’s website (the “Site”) that Ultraviolette
                collects, stores, uses, and under certain conditions, discloses,
                shares, or transfers. Ultraviolette is both the Controller and
                Processor, as defined under GDPR, of personal or non- personal
                information we may collect. Ultraviolette may collect, use,
                disclose, share, transfer or store your Personal Information and
                Non-Personal Information according to the provisions of
                Ultraviolette Privacy Policy. By visiting the Site, you accept
                the practices described in Ultraviolette Privacy Policy.
                <p>
                  Personal Information Ultraviolette may collect While visiting
                  the Site, you may be asked to provide Ultraviolette with
                  “Personal Information” for different purposes, and
                  Ultraviolette will collect and may store such Personal
                  Information. Personal information includes information that
                  specifically identifies an individual, including but not
                  limited to, name, mailing address, email address, telephone
                  number, mobile number or employer. For instance, by requesting
                  Ultraviolette to notify you of updates to Ultraviolette’s
                  products or updates to the Site, Ultraviolette may ask you to
                  provide your personal email address. In addition, you may
                  submit to Ultraviolette messages that include information that
                  can facilitate communication with Ultraviolette including your
                  name, personal telephone number, mobile number, or your
                  employer.
                </p>
                <p>
                  Personal Information Ultraviolette may collect While visiting
                  the Site, you may be asked to provide Ultraviolette with
                  “Personal Information” for different purposes, and
                  Ultraviolette will collect and may store such Personal
                  Information. Personal information includes information that
                  specifically identifies an individual, including but not
                  limited to, name, mailing address, email address, telephone
                  number, mobile number or employer. For instance, by requesting
                  Ultraviolette to notify you of updates to Ultraviolette’s
                  products or updates to the Site, Ultraviolette may ask you to
                  provide your personal email address. In addition, you may
                  submit to Ultraviolette messages that include information that
                  can facilitate communication with Ultraviolette including your
                  name, personal telephone number, mobile number, or your
                  employer.
                </p>
              </div>
            }
          />
          <CommonFooter />
        </div>
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

export default TermsConditions;
