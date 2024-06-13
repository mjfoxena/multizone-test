import React, { useContext } from "react";
import Style from "./press.module.scss";
import Image from "next/image";
import CommonFooter from "../../components/molecules/CommonFooter";
import Head from "next/head";
import Button from "../../components/atoms/Button";
import VideoSlider from "../../components/molecules/press/videoSlider";
import PressHeader from "../../components/molecules/press/pressHeader";
import CommonDivider from "../../components/molecules/commondivider";
import NewsSubscription from "../../components/molecules/press/newsSubscription";
import { NavbarContext } from "../../contexts/NavbarContext";
import { pressRawData } from "../../constants/raw_data";
import NewsArticle from "../../components/molecules/press/article";
import { API_CONSTANTS } from "../../services/constants";
import GraphTags from "../../components/GraphTags";
import { GetServerSidePropsContext } from "next";

const imageBase = API_CONSTANTS.BASE_URL_S3;

const Press = () => {
  const px = "px-[26px] sm:px-[91px]";
  const { isMobile } = useContext(NavbarContext);

  return (
    <>
      <Head>
        <title>Ultraviolette Automotive | Press</title>
        <link rel="canonical" href="https://www.ultraviolette.com/press" />
        <meta
          name="description"
          content="Stay informed with the latest news and media coverage about Ultraviolette. Explore press releases, articles, and updates on our electric motorcycles and innovations."
        />
        <GraphTags
          title="Ultraviolette Automotive | Press"
          description=""
          image=""
          url="https://www.ultraviolette.com/press"
        />
      </Head>
      <div className={Style.press}>
        {/* Header Section Goes Here */}
        <div className={`${px} pt-[48px] sm:pt-[97px]`}>
          <PressHeader />
        </div>
        <CommonDivider className={`${px} sm:pt-[2px]`} borderColor="#9E9E9E" />

        {/* Desktop Subscribe News Section Goes Here */}
        <div className={`${px} hidden sm:block`}>
          <NewsSubscription isMobile={isMobile} />
        </div>
        <CommonDivider
          className={`${px}  sm:mt-[100px] hidden sm:block`}
          borderColor="#9E9E9E"
        />

        {/* News Article Section Goes Here */}
        <div
          className={`pl-[26px] sm:pl-[91px] sm:pt-[35px] flex flex-col sm:flex-row ${Style.newsArticleHorizontal}`}
        >
          {pressRawData.newsArticles.map((article, index) => (
            <NewsArticle
              key={index}
              date={article.date}
              id={article.id}
              imageLink={imageBase + article.imageLink}
              isMobile={isMobile}
              link={article.link}
              shortDescription={article.shortDescription}
              title={article.title}
            />
          ))}
        </div>

        <div className={Style.press}>
          {/*------ video header----- */}
          <div className="bg-grey5">
            <CommonDivider
              className={`${px} hidden sm:block`}
              borderColor="#9E9E9E"
            />
            <div className="text-[#414141]">
              <div className="font-normal sm:pt-8 sm:pb-4 sm:pl-20 sm:pr-20">
                <img
                  src="images/about/navigation.png"
                  className="ml-1 pb-2 hidden sm:block"
                />
                <p className="brutal sm:mb-2 sm:ml-20 sm:pl-1 sm:text-base sm:left-0 mt-3 absolute h-2 w-30 right-0 text-[10px] mr-6">
                  Latest Videos And Reviews
                </p>
              </div>
              <div className="sm:text-[48px] sm:font-normal eurostile sm:mt-5 sm:pt-5 sm:pl-[51px] sm:pr-20 text-2xl mb-3 ml-7">
                VIDEOS
              </div>
            </div>
            <div className="hidden sm:flex justify-end pr-7 sm:pr-20 sm:pb-16 mt-[-45px]">
              <a
                href="https://www.youtube.com/@UltravioletteEV"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  width={"304px"}
                  fontSize={15}
                  onClick={() => {}}
                  text={"SUBSCRIBE TO OUR YOUTUBE"}
                  bg={"black"}
                  color="white"
                  disable={false}
                  height={"54px"}
                  allowHover
                  isDark
                />
              </a>
            </div>
          </div>
          <CommonDivider
            className={`${px} sm:mt-[-50px] hidden sm:block`}
            borderColor="#9E9E9E"
          />
          <div>
            <VideoSlider isMobile={isMobile} />
          </div>
          {/* Mobile Subscribe News Section Goes Here */}
          <div className={`${px} pt-[62px] sm:hidden`}>
            <NewsSubscription isMobile={isMobile} />
          </div>
          <div></div>
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
export default Press;