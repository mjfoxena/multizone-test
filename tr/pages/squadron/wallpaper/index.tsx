import { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Head from "next/head";
import Script from "next/script";
import { useAnimation } from "framer-motion";

import WallpaperGallery from "../../../components/squadron/wallpaper/imagegallery";
import { NavbarContext } from "../../../contexts/NavbarContext";
import CommonFooter from "../../../components/molecules/CommonFooter";
import { squadronRawData } from "../../../constants/raw_data";
import { useRouter } from "next/router";
import Image from "next/image";
import { originURL } from "../../../services/constants";
import GraphTags from "../../../components/GraphTags";
import { GetServerSidePropsContext } from "next";


const Wallpaper = () => {
  const [refBoxCharged, inViewBoxCharged] = useInView();
  const { isMobile } = useContext(NavbarContext);
  const controlBoxCharged = useAnimation();
  const router = useRouter();

  useEffect(() => {
    if (inViewBoxCharged) {
      controlBoxCharged.start("visible");
    } else {
      controlBoxCharged.start("hidden");
    }
  }, [controlBoxCharged, inViewBoxCharged]);

  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      <Head>
        <title>Ultraviolette Automotive | Wallpaper</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="View high-quality images featuring our electric motorcycles. View now"
        />
        <link rel="canonical" href="https://www.ultraviolette.com/squadron/wallpaper" />
        <GraphTags
          title="Ultraviolette Automotive | Wallpaper"
          description=""
          image=""
          url="https://www.ultraviolette.com/squadron/wallpaper"
        />
      </Head>
      <div className=" bg-[#17191d]">
        {/* back button */}
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

        <div className="w-[100%]">
          <div className="px-7 sm:px-[93px] pb-10">
            {/* Header Info*/}
            <div className="sm:w-[100%] mt-16 sm:pb-8">
              <div className="text-[18px] sm:text-[40px] text-[#ffffff] eurostile">
                WALLPAPERS
              </div>
              <div className="text-right text-[#e2e2e2] sm:-mt-14 -mt-6">
                <p className="disketMono text-[18px] sm:text-[40px] font-semibold sm:pr-4 pr-3">SQUADRON</p>
                <p className="sm:-mt-[60px] -mt-[30px] sm:pr-[108px] pr-7 text-[7px] sm:text-[10px] eurostile">ULTRAVIOLETTE</p>
                <div className="flex justify-end -mt-[14px] sm:-mt-5">
                  <Image
                    alt="menu"
                    width={isMobile ? 20 : 30}
                    height={8}
                    src={"/images/leaderboard/group-red-dot.svg"}
                  />
                </div>
              </div>
            </div>
            <div className=" w-full  sm:flex mt-[18px] sm:mt-[40px] border-b-[2px] border-[#2D2D2D]"></div>

            {/*  Gallery */}
            <div className="mt-10 sm:mt-20 sm:mb-[65px]">
              {/* F99: section */}
              {/* <div>
                <div className="text-[#FFF] brutal text-[20px] sm:text-[32px] font-medium tracking-widest mb-4 sm:mb-8">
                  F99: FACTORY RACING PLATFORM
                </div>
                <WallpaperGallery
                  isMobile={isMobile}
                  images={squadronRawData.f99Images}
                />
              </div> */}
              {/* F77 THE FUTURE */}
              <div>
                <div className="text-[#FFF] brutal text-[20px] sm:text-[32px] font-medium tracking-widest mb-4 sm:mb-8 mt-10 sm:mt-24">
                F77 - THE FUTURE 
                </div>
                <WallpaperGallery
                  isMobile={isMobile}
                  images={squadronRawData.f77Future}
                />
              </div>

              {/* space: section */}
              <div>
                <div className="text-[#FFF] brutal text-[20px] sm:text-[32px] font-medium tracking-widest mb-4 sm:mb-8 mt-10 sm:mt-24">
                  SPACE EDITION
                </div>
                <WallpaperGallery
                  isMobile={isMobile}
                  images={squadronRawData.spaceImages}
                />
              </div>

              {/* Beyond Asphalt*/}
              <div>
                <div className="text-[#FFF] brutal text-[20px] sm:text-[32px] font-medium tracking-widest mb-4 sm:mb-8 mt-10 sm:mt-24">
                  Beyond Asphalt
                </div>
                <WallpaperGallery
                  isMobile={isMobile}
                  images={squadronRawData.beyondAsphaltImages}
                />
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
      country: country
    },
  };
}

export default Wallpaper;