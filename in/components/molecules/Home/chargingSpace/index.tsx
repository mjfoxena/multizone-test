import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Style from "./chargingSpace.module.scss";
import { motion } from "framer-motion";
import VideoPlayer from "../video/video";
import { API_CONSTANTS } from "../../../../services/constants";
const imageUrl = `${API_CONSTANTS.HOMEPAGE_BASE_URL}/supernova`;

const ChargingSpace = () => {
  const [play, setPlay] = useState(false);

  const superNovaRef = useRef(null);
  useEffect(() => {
    if (superNovaRef.current) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [play, setPlay]);

  return (
    <div className={Style.chargingSpace} ref={superNovaRef}>
      <div className={Style.charger}>
        <VideoPlayer
          play={play}
          loop={true}
          src={
            "https://player.vimeo.com/external/937031560.m3u8?s=842ab2a99c573f6629e8e0b9eb3bc6346984c1fc&logging=false"
          }
        />

        <div className=" absolute p-6 left-0 flex flex-col gap-2 xl:hidden text-white">
          <p className={Style.superNovaTitlemob}>CHARGE ANYWHERE WITH</p>
          <div className={Style.uvSuperNovamob}>
            <div>
              UV<span className={Style.super}>SUper</span>nova
            </div>
          </div>
        </div>
      </div>

      <div className={Style.superNova}>
        <div className={Style.superNovatextmob}>
          <div className="w-2/3 md:w-1/2">
            Combining the industry-leading 323 kms IDC range of the F77 MACH 2
            with the expansion of the UV SUPERNOVA and UV SUPERNOVA PLUS DC Fast
            Charging network, you can now embark on thrilling adventures beyond
            borders.
          </div>
          <motion.div
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 1 } },
              hidden: { opacity: 0, y: 40 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className=" flex flex-col gap-2 md:mt-10   w-1/2"
          >
            <p className={Style.superNovaStat}>6 kW & 12 kW</p>
            <p className={Style.superNovaStatDesc}>chargers</p>
          </motion.div>
          <motion.div
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 1 } },
              hidden: { opacity: 0, y: 40 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-2 md:mt-10  w-1/2 "
          >
            <p className={Style.superNovaStat}>&lt;60 MIN</p>
            <p className={Style.superNovaStatDesc}>20% to 80%</p>
          </motion.div>
        </div>
        <div className={Style.superNovaImg}>
          <Image
            width={2000}
            height={2000}
            className="p-32 sm:p-0 hidden xl:flex"
            alt={"sn_location"}
            src={`${imageUrl}/sn_location.webp`}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
          <motion.img
            width={2000}
            height={2000}
            className="p-32 sm:p-0 xl:hidden "
            initial={{ padding: 32 }}
            whileInView={{ padding: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            alt={"sn_location"}
            src={`${imageUrl}/sn_location.webp`}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <div className={Style.superNovaDesc}>
          <motion.p
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 1 } },
              hidden: { opacity: 0, y: 40 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={Style.superNovaTitle}
          >
            CHARGE ANYWHERE WITH
          </motion.p>
          <motion.div
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 1 } },
              hidden: { opacity: 0, y: 40 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={Style.uvSuperNova}
          >
            <div>
              UV<br></br> <span className={Style.super}>SUper</span>nova
            </div>
            <hr className="w-[5%] border-[1px]" />
          </motion.div>
          <motion.div
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 1 } },
              hidden: { opacity: 0, y: 40 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={Style.superNovatext}
          >
            <p>
              Combining the industry-leading 323 kms IDC range of the F77 MACH 2
              with the expansion of the UV SUPERNOVA and UV SUPERNOVA PLUS DC
              Fast Charging network, you can now embark on thrilling adventures
              beyond borders.
            </p>
          </motion.div>

          <div className="flex flex-col justify-start  sm:gap-0  2xl:gap-4 ">
            <motion.div
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 1 } },
                hidden: { opacity: 0, y: 40 },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className=" flex flex-col gap-2   w-1/2 pl-8"
            >
              <p className={Style.superNovaStat}>6 kW & 12 kW</p>
              <p className={Style.superNovaStatDesc}>chargers</p>
            </motion.div>
            <motion.div
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 1 } },
                hidden: { opacity: 0, y: 40 },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-1 mt-6  w-1/2 pl-8"
            >
              <p className={Style.superNovaStat}>&lt;60 MIN</p>
              <p className={Style.superNovaStatDesc}>20% to 80%</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargingSpace;
