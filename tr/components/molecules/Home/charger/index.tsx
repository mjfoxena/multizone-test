import React from "react";
import Image from "next/image";
import Style from "./charger.module.scss";
import { motion, useAnimation, useInView } from "framer-motion";
import { API_CONSTANTS } from "../../../../services/constants";
const imageUrl = `${API_CONSTANTS.HOMEPAGE_BASE_URL}/charger`;

const ChargerT = () => {
  return (
    <div className={Style.charger}>
      <div className=" w-[80%] h-full flex flex-col gap-8">

        {/* heading */}
        <div className="w-full h-[15%] xl:h-[10%] ">
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
        <motion.div  variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 1 } },
            hidden: { opacity: 0, y: 40 },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} className={`${Style.titleDescTurkey} xl:hidden text-center w-full  p-2`}>
            <div className="w-[95%] sm:w-[60%]">
            <p className="uppercase">
              Rapid convenient and efficient battery charging via regular 16 Amp
              sockets found in every household.
            </p>
              </div>
          </motion.div>
        </div>

        {/* Charger */}
        <div className="w-full h-[70%] xl:h-[85%] border border-[#333333] flex flex-col  xl:flex-row ">

          {/* boost Charger */}
          <div className="xl:w-[60%] w-full h-[80%] xl:h-full flex justify-center items-center relative">
          <Image
                width={2000}
                height={2000}
                alt={"boost"}
                src={`${imageUrl}/boost_charger.webp`}
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: 1,
                  objectFit:'cover'
                }}
              />
                <div className=" absolute xl:hidden top-4 right-4 flex flex-col justify-center items-start">
              <p className={Style.threeX}>2X</p>
              <p className={Style.fasterMob}>faster</p>
            </div>
          </div>
           {/* details-mobile */}
           <div className="xl:hidden flex h-[20%] border-t border-[#333333]">
           <div className="w-1/2 flex justify-center items-center">
              <p className={`${Style.chargerType} text-[#FF0422]`}>Boost</p>
            </div>
            <div className="w-1/2 flex justify-center items-center border-l border-[#333333]">
            <div className="w-1/2 h-full flex flex-col justify-center items-center">
                <p className={`${Style.specMob}`}>3.0 kW</p>
                <p className={Style.descMob}>Charger</p>
              </div>
              <div className="w-1/2 h-full flex flex-col justify-center items-center">
                <p className={`${Style.specMob}`}>1.5 hr</p>
                <p className={Style.descMob}>20% to 80%</p>
              </div>
            </div>
           </div>
         
         {/* details */}
          <div className="hidden xl:flex flex-col border-l border-[#333333] h-full w-[40%] ">
             <div className="border-b border-[#333333] w-full h-1/3 flex justify-center items-center">

             <div className={`${Style.titleDesc} `}>
            <p className="uppercase">
              Rapid convenient and efficient battery charging via regular 16 Amp
              sockets found in every household.
            </p>
          </div>

             </div>
             <div className="border-b border-[#333333] w-full h-1/3 flex flex-col justify-center items-center">
             <div className="w-[80%] flex flex-col gap-2">
             <div className="flex items-end gap-2">
              <p className={Style.spec}>3.0</p>
             <p className="sm:text-[30px] text-white disketMono">kW</p>
             </div>
             <p className={Style.desc}>charger</p>
             </div>
             </div>
             <div className="w-full h-1/3  flex flex-col justify-center items-center">
             <div className="w-[80%] flex flex-col gap-2">
             <div className="flex items-end gap-2">
              <p className={Style.spec}>1.5</p>
             <p className="sm:text-[30px] text-white disketMono">HR</p>
             </div>
             <p className={Style.desc}>20% to 80%</p>
             </div>
             </div>
          </div>

        </div>
        </div>
    </div>
  )
}

export default ChargerT
