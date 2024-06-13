import React, { useEffect, useState } from "react";
import Style from "./index.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

const SpotIconM = ({ title, setSpecMob, specMob }) => {
  return (
    <div
      className="cursor-pointer relative  z-50"
      onClick={() => {
        setSpecMob(title);
      }}
    >
      <motion.img
        width={50}
        height={50}
        alt="f77Mob"
        initial={{ scale: 1 }}
        animate={specMob === title ? { scale: 1.5 } : {}}
        src={"/images/home/newhome/smartTech/mach2.svg"}
        className=""
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default SpotIconM;
