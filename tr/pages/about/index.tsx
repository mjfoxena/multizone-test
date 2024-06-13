import React from "react";
import { TextElement } from '../../components/atoms/Texts';
import Style from './about.module.scss';
import Image from "next/image";
import { MapCss } from "../../utils/utils";
import CommonFooter from "../../components/molecules/CommonFooter";
import Head from "next/head";
import Script from "next/script";
import GraphTags from "../../components/GraphTags";
import { GetServerSidePropsContext } from "next";

const About = () => {

  return (
    <>
    <Script src="/js/hotjar.js" strategy="afterInteractive" />
    <Head>
        <title>About Ultraviolette | Our Vision and Mission</title>
        <meta name="description" content="Learn about Ultraviolette's vision and mission to revolutionize sustainable mobility with innovative electric vehicles." />
        <link rel="canonical" href="https://www.ultraviolette.com/about" />
        <GraphTags
          title="About Ultraviolette | Our Vision and Mission"
          description="Learn about Ultraviolette's vision and mission to revolutionize sustainable mobility with innovative electric vehicles."
          image="/images/about/about-bike.jpg"
          url="https://www.ultraviolette.com/about"
        />
      </Head>
      <div className={MapCss(Style, "about", "w-full h-fit ")}>
        {/* heading */}
        {/*------ mobile header----- */}
        <div className=" flex flex-col sm:hidden">
          <div className="w-full flex flex-row justify-between items-center pl-7 pr-7">
            <div className={MapCss(Style, "eurostile color", "text-2xl mt-3")}>
              ABOUT
            </div>
            <div className="mt-3">
              <Image src={'/images/about/aboutmobile.png'} width={94} height={22} alt='Bike' />
            </div>
          </div>
          <div className={MapCss(Style, "border", " mt-4 ml-7 mr-7")}>
          </div>
        </div>
        <div className={MapCss(Style, "eurostile color", " text-[48px] font-normal pt-16 pb-5 hidden sm:flex sm:pl-20 sm:pr-20")}>
          ABOUT

        </div>
        <div className={MapCss(Style, "border", "hidden sm:flex sm:ml-20 sm:mr-20")}>

        </div>

        {/* subheading */}
        <div className={MapCss(Style, "brutal", "font-normal mt-10 hidden sm:flex sm:text-[26px] sm:ml-20 sm:mr-20")}>
          <div>
            We are Ultraviolette. And our race has just  <span className="font-medium"> begun.</span>
          </div>
        </div>
        {/* subheading mobile */}
        <div className={MapCss(Style, "brutal", "sm:hidden font-normal mt-7 text-lg pl-7 leading-6")}>
          <div>We are Ultraviolette.
            <div>And our race has just <span className="font-medium">begun.</span></div>
          </div>

        </div>
        <div className={MapCss(Style, "brutal about-text", "text-sm leading-6 mt-6 w-full pb-16 sm:leading-7 front-normal sm:text-base sm:pb-0 pl-7 pr-7 sm:pl-20 sm:pr-20")}>
          Ultraviolette Automotive Pvt. Ltd., is an innovator in sustainable mobility and
          energy infrastructure. Established in 2016, Ultraviolette Automotive was founded
          by Narayan Subramaniam and Niraj Rajmohan. The company was born out of the unique
          vision of creating top-of-the line mobility solutions, that’s driven by progressive
          design and energy efficient technology. Ultraviolette Automotive is developing India’s first ecosystem of high-performance electric vehicles and future-ready energy infrastructure.
        </div>
        {/* image */}
        <div className={MapCss(Style, "", "hidden sm:flex mt-16")}>
          <Image src={'/images/about/about-bike.jpg'} fill className={Style.image} alt='high performance electric vehicles' />
        </div>
        <div className={MapCss(Style, "", "mt-1 sm:mt-16 sm:hidden")}>
          <Image src={'/images/about/about-mobile-bike.jpg'} fill className={Style.image} alt='high performance electric vehicles' />
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
          country: country
      },
  };
}
export default About; 
