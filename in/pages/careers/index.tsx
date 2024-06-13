/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import React, { useEffect, useState } from "react";
import CommonFooter from "../../components/molecules/CommonFooter";
import Head from "next/head";
import Script from "next/script";
import { GetServerSidePropsContext } from "next";
import Button from "../../components/atoms/Button";
import CommonDivider from "../../components/molecules/commondivider";
import MissionSection from "../../components/careers/mission";
import Oppertunity from "../../components/careers/opportunity";
import Calture from "../../components/careers/culture";
import Image from "next/image";

import { FaArrowRight } from "react-icons/fa6";
declare global {
  interface Window {
    rec_embed_js: any;
  }
}

const Careers = () => {
  const onSubmitHandler = () => {
    const element = document.getElementById("scroll-target");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [searchInput, setSearchInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    const jobListings = document.querySelectorAll(
      ".rec_job_listing_div_jobs .rec-job-info"
    );
    const searchTerm = searchInput.trim().toLowerCase();

    let hasVisibleJobs = false;
    jobListings.forEach((job) => {
      const jobText = job.textContent?.toLowerCase();
      const isVisible =
        searchTerm.length === 0 || jobText?.includes(searchTerm);
      // @ts-ignore
      job.style.display = isVisible ? "block" : "none";
      if (isVisible) hasVisibleJobs = true;
    });
    setNoResults(!hasVisibleJobs);
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setIsTyping(!!e.target.value);
    handleSearch();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://static.zohocdn.com/recruit/embed_careers_site/javascript/v1.0/embed_jobs.5a71e72320d517a462350c6022ccfe36.js";
    script.onload = () => {
      if (window.rec_embed_js) {
        window.rec_embed_js.load({
          widget_id: "rec_job_listing_div",
          page_name: "Careers",
          source: "CareerSite",
          site: "https://ultraviolette.zohorecruit.in",
          empty_job_msg: "No current Openings",
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Ultraviolette Automotive | Careers</title>
        <link
          rel="stylesheet"
          href="https://static.zohocdn.com/recruit/embed_careers_site/css/v1.0/embed_jobs.2adf19016c407ddf2323624dc049766c.css"
          type="text/css"
        />
      </Head>
      <div className="sm:px-24 px-8 bg-[#ECECEC]">
        {/* headers */}
        <div className="flex flex-row justify-between items-center sm:pt-20 pt-6">
          <p className="text-[24px] sm:text-[48px] font-normal text-[#414141] eurostile">
            LIFE AT UV
          </p>
          <div className="brutal sm:text-xl text-[10px] font-normal right-0 text-[#404040] hidden sm:block">
            <Button
              width={"216px"}
              fontSize={16}
              onClick={onSubmitHandler}
              text={"WORK WITH US"}
              bg={"#000"}
              disable={false}
              height={"54px"}
              allowHover
              isDark
            />
          </div>
          <div className="sm:hidden block">
            <Image
              src={"/images/about/aboutmobile.png"}
              width={94}
              height={22}
              alt="Bike"
            />
          </div>
        </div>
        <CommonDivider className="sm:pb-8" borderColor="#9E9E9E" />

        {/* Mission Section */}
        <MissionSection />

        {/* Oppertunity */}
        <Oppertunity />

        {/* Calture */}
        <Calture />

        {/* careers */}
        <div
          className="flex flex-row justify-between items-center"
          id="scroll-target"
        >
          <p className="text-[22px] sm:text-[38px] lg:text-[48px] font-normal text-[#414141] eurostile mt-10 sm:mt-0">
            CURRENT OPENINGS
          </p>
        </div>

        <CommonDivider className="pb-3" borderColor="#9E9E9E" />

        {/* embeded code for zoho for the openings */}
        <div className="pb-8">
          <div className="search-bar -mt-5 relative">
            <input
              type="text"
              placeholder="Search .."
              className="border border-[#E7E7E7] bg-[#E7E7E7] rounded-md px-6 py-5 w-[100%]"
              value={searchInput}
              onChange={handleChange}
            />
            <FaArrowRight
              className={`cursor-pointer absolute sm:right-8 right-5 ${
                isTyping ? "text-[#000]" : "text-[#BCBCBC]"
              } text-[25px] sm:text-[35px] top-[30%] sm:top-[25%] bottom-0 font-bold`}
              onClick={handleSearch}
            />
          </div>
          <div className="embed_jobs_head embed_jobs_with_style_3 embed_jobs_with_style">
            <div className="embed_jobs_head2">
              <div className="embed_jobs_head3">
                {noResults && (
                  <p className="text-[22px] sm:text-[30px] lg:text-[24px] font-normal text-[#414141] brutal text-center">
                    We also believe that certain roles cannot be defined by a
                    conventional JD and if this sounds like you, write to us at
                    <span className="font-extrabold">
                      <a className="" href="mailto:careers@ultraviolette.com">
                        {" "}
                        careers@ultraviolette.com
                      </a>
                    </span>
                  </p>
                )}
                <div id="rec_job_listing_div"></div>
                <Script
                  type="text/javascript"
                  strategy="beforeInteractive"
                  src="https://static.zohocdn.com/recruit/embed_careers_site/javascript/v1.0/embed_jobs.5a71e72320d517a462350c6022ccfe36.js"
                />
                <Script
                  type="text/javascript"
                  strategy="afterInteractive"
                  id="rec_embed_script"
                >
                  {`
                                rec_embed_js.load({
                                    widget_id: "rec_job_listing_div",
                                    page_name: "Careers",
                                    source: "CareerSite",
                                    site: "https://ultraviolette.zohorecruit.in",
                                    empty_job_msg: "No current Openings",
                                });
                            `}
                </Script>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonFooter />
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
export default Careers;
