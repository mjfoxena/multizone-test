import { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { motion, useAnimation } from "framer-motion";

import Script from "next/script";
import Head from "next/head";
import { TextElement } from "../../../components/atoms/Texts";
import CommonFooter from "../../../components/molecules/CommonFooter";
import { leaderboardRawData } from "../../../constants/raw_data";
import { useRouter } from "next/router";

import Image from "next/image";
import DistanceBoard from "../../../components/squadron/leaderboard/distance/distanceboard";
import RangeBoard from "../../../components/squadron/leaderboard/range/rangeboard";
import MileStoneBoard from "../../../components/squadron/leaderboard/milestone";
import PilotTestimonials from "../../../components/squadron/leaderboard/testimonial";
import { originURL } from "../../../services/constants";
import GraphTags from "../../../components/GraphTags";
import { GetServerSidePropsContext } from "next";

const LeaderBoard = () => {
  const [refBoxCharged, inViewBoxCharged] = useInView();
  const { isMobile, responsive } = useContext(NavbarContext);
  const { breakpoint, isTabWindow, isDesktopWindow, width } = responsive;
  console.log(responsive);

  const controlBoxCharged = useAnimation();
  const router = useRouter();

  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: 40 },
  };

  useEffect(() => {
    if (inViewBoxCharged) {
      controlBoxCharged.start("visible");
    } else {
      controlBoxCharged.start("hidden");
    }
  }, [controlBoxCharged, inViewBoxCharged]);

  const folderImage = `/images/leaderboard/${
    isMobile || isTabWindow
      ? "distance-folder-mobile.png"
      : width < 1400 && width > 1280
      ? "distance-folder-xl-1300.svg"
      : breakpoint === "xl"
      ? "distance-folder.svg"
      : "distance-folder-2xl.svg"
  }`;

  const milestoneImage = `/images/leaderboard/${
    isMobile
      ? "milestone-folder-mobile.png"
      : isTabWindow
      ? "milestone-folder-tab.svg"
      : breakpoint === "xl"
      ? "milestone-folder.svg"
      : "milestone-folder-2xl.svg"
  }`;

  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Ultraviolette Automotive | Leader Board</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Check out the Squadron Leaderboard and see where you rank in the Ultraviolette electric motorcycle community"
        />
        <link rel="canonical" href="https://www.ultraviolette.com/squadron/leaderboard" />
        <GraphTags
          title="Ultraviolette Automotive | LeaderBoard"
          description=""
          image=""
          url="https://www.ultraviolette.com/squadron/leaderboard"
        />
      </Head>
      <div className=" bg-[#121212] h-auto pb-20">

        <div className="text-[#FFF] pt-8 sm:pt-12 sm:pl-24 pl-5 -mb-9 text-[10px] sm:text-[12px] disketMono">
          <div
            onClick={() => {
              router.push(`${originURL}/squadron`);
            }}
            className="cursor-pointer"
          >
            &lt;
            <span className="underline pl-1">BACK</span>
          </div>
        </div>

        <div className="px-5 sm:px-[93px] py-5 sm:pt-[81px]">
          {/* Header Info*/}
          <div className="w-[100%] mt-10 sm:mt-0">
            <motion.div
              ref={refBoxCharged}
              variants={boxVariant}
              initial="hidden"
              animate={controlBoxCharged}
              className="flex flex-row justify-between items-center "
            >
              <div className=" mr-[-20px] flex">
                {
                  TextElement({
                    text: leaderboardRawData.header.title,
                    fontName: "disketMono",
                    fontSize: isMobile ? 24 : 50,
                    className: "leading-10",
                  }).BOLD.WHITE
                }
                <Image
                  alt="menu"
                  width={isMobile ? 20 : 40}
                  height={10}
                  src={"/images/leaderboard/group-red-dot.svg"}
                  className="cursor-pointer -mt-4 sm:-mt-9 -ml-2 mb-3 sm:mb-5"
                />
              </div>

              <div>
                <Image
                  alt="menu"
                  width={isMobile ? 64 : 110}
                  height={110}
                  src={leaderboardRawData.header.trailing}
                  className="cursor-pointer opacity-30"
                />
              </div>
            </motion.div>
          </div>
          {/* Distance and Range */}

          <div className="flex gap-6 sm:gap-4 mt-10 sm:mt-[60px] xl:flex-row flex-col justify-between">
            <div>
              {/* RangeBoard component */}
              <RangeBoard
                key="leaderboard_range_board"
                isMobile={isMobile || isTabWindow || isDesktopWindow}
              />
            </div>
            <div className="lg:pl-40 xl:pl-0">
              {/* DistanceBoard component */}
              <DistanceBoard
                key="leaderboard_distance_board"
                isMobile={isMobile}
                folderImage={folderImage}
                breakpoint={breakpoint}
              />
            </div>
          </div>

          {/* Pilot MileStone */}
          <MileStoneBoard
            key={"leaderboard_milestone"}
            isMobile={isMobile}
            folderImage={milestoneImage}
            breakpoint={breakpoint}
          />

          {/* Testimonials */}
          {/* <PilotTestimonials
            key="leaderboard_testimonials"
            isMobile={isMobile}
          /> */}
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

export default LeaderBoard;