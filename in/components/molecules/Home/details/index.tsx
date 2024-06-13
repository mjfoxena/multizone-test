import React, { useState, useRef, useEffect } from "react";
import Style from "./details.module.scss";
import Image from "next/image";
import VideoPlayer from "../video/video";
import { motion } from "framer-motion";
import { API_CONSTANTS } from "../../../../services/constants";
const imageUrl = `${API_CONSTANTS.HOMEPAGE_BASE_URL}/dttld`;

const Details = () => {
  const [play, setPlay] = useState(false);

  const detailsRef = useRef(null);
  useEffect(() => {
    if (detailsRef.current) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [play, setPlay]);
  return (
    <div className={Style.details} ref={detailsRef}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className={Style.heading}
      >
        <p>
          <span className="text-[#ED1C24] font-extrabold">A NEW IDENTITY</span>{" "}
          FOR ELECTRIC
          <br />
          MOTORCYCLES
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className={Style.headingM}
      >
        <p>
          <span className="text-[#ED1C24] font-extrabold">A NEW IDENTITY</span>{" "}
          FOR ELECTRIC
          {/* <br /> */}
          MOTORCYCLES
        </p>
      </motion.div>
      <div className="hidden xl:flex relative w-[80%]  xl:h-screen ">
        {/* section 1 */}
        <div className="w-[42%] h-full">
          <div className=" w-full h-[49%] relative border border-[#363636]">
            <VideoPlayer
              play={play}
              loop={true}
              src={
                "https://player.vimeo.com/external/937032648.m3u8?s=be5ce34517a6b80ee1bb07ccf93d3fb828bfa626&logging=false"
              }
            />

            <p className={Style.imageTitle}>Dual Channel ABS</p>
          </div>

          <div className="w-full h-[26%]">
            <div className=" flex flex-col gap-0 justify-center items-start w-full h-full">
              <p className={Style.textDes}>Designed to the</p>
              <p className={Style.title}>LAST DETAIL</p>
            </div>
          </div>

          {/* SWINGARM */}
          <div className="relative w-full h-[25%] border border-[#363636]">
            <Image
              width={312}
              height={312}
              alt={"swingarm"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={`${imageUrl}/swing_arm_1.webp`}
            />
            <p className={Style.imageTitle}>SWINGARM</p>
          </div>
        </div>

        {/* section 2 */}
        <div className="w-[28%] h-full">
          <div className="w-full h-[25%]"></div>
          <div className="relative  w-full h-[50%] border border-[#363636]">
            <Image
              className=""
              width={312}
              height={312}
              alt={"brakes"}
              style={{ width: "100%", height: "100%" }}
              src={`${imageUrl}/f77_2.2484_1.webp`}
            />
            <p className={Style.imageTitle}>N40 HATCH</p>
          </div>
        </div>

        {/* section 3 */}

        <div className="w-[15%] h-full">
          <div className="relative w-full h-[25%] border border-[#363636] ">
            <Image
              width={312}
              height={312}
              className=""
              alt={"taillight"}
              src={`${imageUrl}/f77_2.2482_1.webp`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <p className={Style.imageTitle}>TAIL LIGHT</p>
          </div>

          <div className=" w-full h-[25%]"></div>

          <div className="relative w-full h-[25%] border border-[#363636] border-l-0">
            <VideoPlayer
              play={play}
              loop={true}
              src={
                "https://player.vimeo.com/external/937032668.m3u8?s=530500667c3568143949b89049860640a9d7559b&logging=false"
              }
            />

            <p className={Style.imageTitle}>SIDE PANEL</p>
          </div>
        </div>

        {/*section 4  */}
        <div className="w-[15%] h-full ">
          <div className=" w-full h-[25%]"></div>
          <div className=" relative w-full h-[25%] border border-[#363636]">
            <Image
              width={312}
              height={312}
              className=""
              alt={"indicators"}
              src={`${imageUrl}/air_intake.webp`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <p className={Style.imageTitle}>AIR INTAKEs</p>
          </div>
          <div className=" w-full h-[25%]"></div>

          <div className="relative w-full h-[25%] border border-[#363636]">
            <Image
              style={{ width: "100%", height: "100%" }}
              width={312}
              height={312}
              alt={"side_stand"}
              src={`${imageUrl}/side_stand_1.webp`}
            />
            <p className={Style.imageTitle}>side stand</p>
          </div>
        </div>

        <div className={Style.text1}>
          <p>
            When making an iconic silhouette wasn’t enough, we dived into making
            every small detail count.
          </p>
        </div>
      </div>

      {/* mobile */}

      <div className="xl:hidden relative w-full h-fit md:p-6 md:mb-[20%]">
        <div className="w-full h-[100vh]">
          <div className="relative w-full h-[50%] md:h-[60%] border border-[#363636]  ">
            <VideoPlayer
              play={play}
              loop={true}
              src={
                "https://player.vimeo.com/external/937032648.m3u8?s=be5ce34517a6b80ee1bb07ccf93d3fb828bfa626&logging=false"
              }
            />

            <p className={Style.imageTitle}>Dual Channel ABS</p>
          </div>
          <div className=" flex flex-col justify-center items-center w-full  h-[25%] ">
            <p className={Style.textDes}>Designed to the</p>
            <p className={Style.title}>LAST DETAIL</p>
          </div>
          <div className="relative w-full h-[25%] border border-[#363636]">
            <Image
              width={312}
              height={312}
              alt={"swingarm"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={`${imageUrl}/swing_arm_1.webp`}
            />
            <p className={Style.imageTitle}>SWINGARM</p>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center w-full  h-[200px] ">
          <div className={Style.text2Mob}>
            <p>
              When making an iconic silhouette wasn’t enough, we dived into
              making every small detail count.
            </p>
          </div>
        </div>

        <div className="w-full h-[100vh]">
          <div className="w-full h-[25%] md:h-[30%] md:mt-[8.188rem] flex justify-start">
            <div className="relative w-1/2 h-full border border-[#363636]">
              <Image
                className=""
                width={312}
                height={312}
                alt={"brakes"}
                style={{ width: "100%", height: "100%" }}
                src={`${imageUrl}/f77_2.2484_1.webp`}
              />
              <p className={Style.imageTitle}>N40 HATCH</p>
            </div>
          </div>
          <div className="w-full h-[25%] md:h-[30%] flex justify-end">
            <div className="relative w-1/2 h-full border border-[#363636]">
              <Image
                className=""
                width={312}
                height={312}
                alt={"brakes"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={`${imageUrl}/f77_2.2482_1.webp`}
              />
              <p className={Style.imageTitle}>tail light</p>
            </div>
          </div>
          <div className="w-full h-[25%] md:h-[30%] flex justify-start">
            <div className="relative w-1/2 h-full border border-[#363636]">
              <Image
                className=""
                width={312}
                height={312}
                alt={"brakes"}
                style={{ width: "100%", height: "100%" }}
                src={`${imageUrl}/air_intake.webp`}
              />
              <p className={Style.imageTitle}>AIR INTAKEs</p>
            </div>
          </div>
          <div className="w-full h-[25%] md:h-[30%] flex justify-end">
            <div className="relative w-1/2 h-full border border-[#363636] ">
              <VideoPlayer
                play={true}
                loop={true}
                src={
                  "https://player.vimeo.com/external/937032668.m3u8?s=530500667c3568143949b89049860640a9d7559b&logging=false"
                }
              />

              <p className={Style.imageTitle}>SIDE PANEL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
