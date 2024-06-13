import { useContext } from "react";
import { NavbarContext } from "../../contexts/NavbarContext";
import { API_CONSTANTS, originURL } from "../../services/constants";
import React from "react";

import Script from "next/script";
import Head from "next/head";
import CommonFooter from "../../components/molecules/CommonFooter";
import Style from "./squadron.module.scss";
import SquaronHeader from "../../components/squadron/header";
import CommonDivider from "../../components/molecules/commondivider";
import SquadronLeaderBoard from "../../components/squadron/LeaderboardHeader";
import SquadronImages from "../../components/squadron/imageSection";
import PilotTestimonials from "../../components/squadron/leaderboard/testimonial";
import Image from "next/image";
import Link from "next/link";
import RangeBoard from "../../components/squadron/leaderboard/range/rangeboard";
import TestimonialHeader from "../../components/squadron/header/testimonialHeader";
import ActivityHeader from "../../components/squadron/header/ActivityHeader";
import WallpaperHeader from "../../components/squadron/header/WallpaperHeader";
import GraphTags from "../../components/GraphTags";
import { GetServerSidePropsContext } from "next";

const baseLink = `${API_CONSTANTS.BASE_URL_S3}/homepage/`;

const Squadron = () => {
  const px = "px-[20px] sm:px-[68px]";

  const { responsive, isMobile } = useContext(NavbarContext);
  const { breakpoint } = responsive;

  const videoLink = `${baseLink}squadron/1.mp4`;

  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Ultraviolette Automotive | Squadron</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Explore the Ultraviolette Squadron, a revolutionary range of high-performance electric motorcycles. Discover cutting-edge technology and unmatched riding experience."
        />
        <link rel="canonical" href="https://www.ultraviolette.com/squadron" />
        <GraphTags
          title="Ultraviolette Automotive | Squadron"
          description=""
          image=""
          url="https://www.ultraviolette.com/squadron"
        />
      </Head>
      <div className="w-full">
        <div className="relative" style={{ paddingBottom: '43.5%', maxWidth: "100%" }}>
          <video autoPlay muted loop className="absolute inset-0 w-[160vw] h-full object-cover">
            <source src={videoLink} />
          </video>
        </div>
      </div>

      <div className={Style.squadron}>
        <div>
          <SquaronHeader />
        </div>

        <CommonDivider
          className={`${px}  sm:pt-[10px] pb-8 opacity-20`}
          borderColor="#9E9E9E"
        />

        <div>
          <div className="xl:flex xl:justify-between xl:items-center">
            <div className="-ml-10 sm:ml-0 mr-6 sm:-mt-0">
              <SquadronLeaderBoard />
            </div>
            <div className="mr-8 sm:mr-16 pl-7 sm:ml-[70px] sm:mt-6 mt-16 sm:mb-8">
              <RangeBoard isMobile={isMobile} />
            </div>
          </div>
          <div className="sm:ml-16 hidden sm:block">
            <Image
              width={110}
              height={50}
              src={"/images/payments/group.png"}
              alt="Group"
              className="mt-8 opacity-20"
            />
          </div>
        </div>

        {/* Testimonials */}
        <CommonDivider
          className={`${px}  sm:pt-[10px] -mb-4 opacity-20 hidden sm:block`}
          borderColor="#9E9E9E"
        />
        <div className="mt-6 sm:mt-0">
          <div>
            <TestimonialHeader />
          </div>
          <CommonDivider
            className={`${px}  sm:pt-[10px] pb-8 opacity-20 sm:hidden block`}
            borderColor="#9E9E9E"
          />
          <div className="sm:ml-16 sm:mb-20 -mt-24 sm:mt-0 sm:mr-12">
            <PilotTestimonials
              key="leaderboard_testimonials"
              isMobile={isMobile}
            />
          </div>
        </div>


        {/* ACTIVITIES */}
        <div className="mt-4 sm:mt-0">
          <div className="">
            <ActivityHeader />
          </div>
          <CommonDivider
            className={`${px}  sm:pt-[10px] sm:pb-8 sm:-mt-4 opacity-20`}
            borderColor="#9E9E9E"
          />
          <div className="-ml-6 sm:-mt-20 -mt-7">
            <SquadronImages key={"squadron_image"} isMobile={isMobile} />
          </div>
        </div>

        {/* WALLPAPERS */}
        <div>
          <div className="">
            <WallpaperHeader />
          </div>
          <CommonDivider
            className={`${px}  sm:pt-[10px] sm:pb-8 sm:-mt-4 opacity-20`}
            borderColor="#9E9E9E"
          />
          <div className="sm:mx-16 mx-5 sm:-mt-10 mt-3 sm:pb-32 pb-8">
            <Link href={`${originURL}/squadron/wallpaper`}>
              <Image
                width={2000}
                height={200}
                alt="UV SQUADRON PILOTS"
                src="/images/squadron/wallpaper.jpg"
                style={{ objectFit: "cover" }}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#e5e7eb]">
        <CommonFooter />
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

export default Squadron;