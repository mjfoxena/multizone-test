import React, { useEffect, useState } from "react";
import Style from "./index.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

const SpotIconM = ({ title, setSpecMob, specMob }) => {
  return (
    <div
      className="cursor-pointer relative  z-50 md:h-[100px] md:w-[100px] h-[50px] w-[50px] "
      onClick={() => {
        setSpecMob(title);
      }}
    >
      <motion.img
        width={50}
        height={50}
        alt="f77Mob"
        initial={{ scale: 1.5 }}
        animate={specMob === title ? { scale: 2 } : {}}
        src={"/images/home/newhome/smartTech/mach2.svg"}
        className="wfull h-full object-cover"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default SpotIconM;
