import React from "react";
import Image from "next/image";
import Style from "./charger.module.scss";
import { motion, useAnimation, useInView } from "framer-motion";
import { API_CONSTANTS } from "../../../../services/constants";
const imageUrl = `${API_CONSTANTS.HOMEPAGE_BASE_URL}/charger`;

const Charger = () => {
  return (
    <div className={Style.charger}>
      {/* mobile  and tablet*/}
      <div className="w-full h-[120px] mt-6  xl:hidden  text-center  flex flex-col justify-start p-6 ">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          viewport={{ once: true }}
          className={`${Style.subHead} md:mb-5`}
        >
          WITH ULTRAVIOLETTE’S CHARGING OPTIONS
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          viewport={{ once: true }}
          className={`${Style.Head} `}
        >
          RANGE ANXIETY{" "}
          <span className="text-[#ED1C24] font-extrabold">
            <br />
            IS A THING OF THE PAST
          </span>
        </motion.p>
      </div>
      {/* desktop */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className="w-full hidden  text-center  xl:flex flex-col justify-between 2xl:justify-around items-center  p-6 pt-0 sm:gap-0"
      >
        <div className="flex flex-col gap-3 ">
          <p className={Style.subHead}>WITH ULTRAVIOLETTE’S CHARGING OPTIONS</p>
          <p className={`${Style.Head}`}>
            RANGE ANXIETY{" "}
            <span className="text-[#ED1C24] font-extrabold">
              IS A THING OF THE PAST
            </span>
          </p>
        </div>
        <div
          className={`text-[#b4bcc4] mt-[2.688rem] brutal font-normal flex text-[12px] sm:text-[14px]   sm:leading-[20px]  w-full xl:w-fit justify-center sm:text-center  `}
        >
          <p>
            Rapid convenient and efficient battery charging via <br></br>regular
            16 Amp sockets found in every household.
          </p>
        </div>
      </motion.div>
      <div className=" w-full  p-6  max-sm:mt-[0.0rem]   pt-0 pb-0 xl:w-[80%]  mb-0 xl:mb-0  h-full mt-[2.688rem]">
        <motion.div
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 1 } },
            hidden: { opacity: 0, y: 40 },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full h-fit xl:hidden flex flex-col "
        >
          <div className={`${Style.titleDesc} `}>
            <p>
              Rapid convenient and efficient battery charging via regular 16 Amp
              sockets found in every household.
            </p>
          </div>
        </motion.div>

        {/* desktop */}
        <div className="hidden w-full h-[80%] xl:flex justify-between ">
          <div className="section1 w-[47%] h-full relative">
            <div className="w-full h-[80%] border border-[#333333] border-b-0">
              <Image
                width={2000}
                height={2000}
                alt={"standard"}
                src={`${imageUrl}/standard_charger.webp`}
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: 1,
                }}
              />
            </div>

            <div className="w-full h-[20%] flex border border-[#333333] ">
              <div className="relative w-1/2 h-full flex justify-center items-center border-r border-[#333333]">
                <p className={`${Style.chargerType} text-[#FFF]`}>Standard</p>
              </div>
              <div className="relative w-1/2 h-full flex justify-center items-center  ">
                <div className="w-[45%] h-full flex ml-2 flex-col justify-center items-center gap-2">
                  <p className={Style.spec}>1.3 kW</p>
                  <p className={Style.desc}>charger</p>
                </div>
                <div className=" w-[55%] mr-4 h-full flex flex-col justify-center items-center gap-2">
                  <p className={Style.spec}>3 hr </p>
                  <p className={Style.desc}>20% to 80%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="section2 w-[47%] h-full relative">
            <div className="w-full h-[80%] border border-[#333333] border-b-0">
              <Image
                width={2000}
                height={2000}
                alt={"boost"}
                src={`${imageUrl}/boost_charger.webp`}
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: 1,
                }}
              />

              <div className="absolute top-6 right-6 flex flex-col justify-start items-start">
                <p className={Style.threeX}>2X</p>
                <p className={Style.faster}> faster</p>
              </div>
            </div>
            <div className="w-full h-[20%] flex border border-[#333333] ">
              <div className="relative w-1/2 h-full flex justify-center items-center border-r border-[#333333]">
                <p className={`${Style.chargerType} text-[#FF0422]`}>Boost</p>
              </div>
              <div className="relative w-1/2 h-full flex justify-center items-center">
                <div className=" w-[45%] h-full ml-2 flex flex-col justify-center items-center gap-2">
                  <p className={Style.spec}>3.0 kW</p>
                  <p className={Style.desc}>charger</p>
                </div>
                <div className="w-[55%] mr-4 3 h-full flex flex-col justify-center items-center gap-2">
                  <p className={Style.spec}>1.5 hr </p>
                  <p className={Style.desc}>20% to 80%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile and tabview */}
        <div className="xl:hidden w-full  mt-8 border border-[#333333]">
          <div className="w-full h-[60%] md:h-full relative">
            <Image
              width={2000}
              height={2000}
              alt="boost"
              src={`${imageUrl}/both_charger_mobile.webp`}
              style={{
                width: "100%",
                height: "100%",
                opacity: 1,
              }}
              className=""
            />
            <div className="absolute top-2 right-2 flex flex-col justify-center items-start">
              <p className={Style.threeX}>2X</p>
              <p className={Style.fasterMob}>faster</p>
            </div>
          </div>

          <div className="w-full h-[5rem]  flex border-t border-b border-[#333333]">
            <div className="w-1/2 flex justify-center items-center border-r border-[#333333]">
              <p className={`${Style.chargerType} text-[#FFF]`}>Standard</p>
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <p className={`${Style.chargerType} text-[#FF0422]`}>Boost</p>
            </div>
          </div>

          <div className="w-full h-[9.188rem] md:h-[10rem]">
            <div className="w-full h-1/2 flex">
              <div className="w-1/2 h-full flex flex-col justify-center items-center border-r border-[#333333]">
                <p className={`${Style.specMob} mt-2`}>1.3 kW</p>
                <p className={Style.descMob}>Capacity</p>
              </div>
              <div className="w-1/2 h-full flex flex-col justify-center items-center">
                <p className={`${Style.specMob} mt-2`}>3.0 kW</p>
                <p className={Style.descMob}>Capacity</p>
              </div>
            </div>
            <div className="w-full h-1/2 flex">
              <div className="w-1/2 h-full flex flex-col justify-center items-center border-r border-[#333333]">
                <p className={`${Style.specMob} -mt-2`}>3 hr</p>
                <p className={Style.descMob}>20% to 80%</p>
              </div>
              <div className="w-1/2 h-full flex flex-col justify-center items-center">
                <p className={`${Style.specMob} -mt-2`}>1.5 hr</p>
                <p className={Style.descMob}>20% to 80%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charger;
