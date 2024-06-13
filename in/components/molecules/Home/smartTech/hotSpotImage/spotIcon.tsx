import React, { useState } from "react";
import Style from "./index.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

const SpotIcon = ({ title }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="cursor-pointer relative  z-50 ">
      {title !== "" && show && (
        <div
          className={`${Style.spec} bg-[#180C2F] backdrop-filter backdrop-blur-lg bg-opacity-30 firefox:bg-opacity-90 px-4 py-2 absolute w-fit text-nowrap rounded-[2px] -top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white  z-50`}
        >
          {title}
        </div>
      )}

      <motion.img
        width={80}
        height={80}
        alt="f77Mob"
        initial={{ scale: 1 }}
        animate={show ? { scale: 1.5 } : {}}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        src={"/images/home/newhome/smartTech/mach2.svg"}
        className=""
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default SpotIcon;

// import React, { useState } from 'react'
// import Style from './index.module.scss'
// import Image from 'next/image';

// const SpotIcon = ({title}) => {

//   const [show, setShow] = useState(false);
//   return (
//     <div className='cursor-pointer border relative  z-50'  >
//       {(title !== '' && show ) &&  <div className={`${Style.spec} bg-[#180C2F] backdrop-filter backdrop-blur-sm bg-opacity-30 firefox:bg-opacity-90 px-6 py-4 absolute w-fit text-nowrap rounded-[2px] -top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white  z-50`}>{title}</div>}

// <Image
//             width={100}
//             height={100}
//             alt="f77Mob"
//             onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
//             // src={"/images/home/newhome/smartTech/f77Mob.png"}
//             src={"/images/home/newhome/smartTech/mach2.svg"}
//             className=""
//             style={{objectFit:'cover'}}
//           />

//           </div>
//   )
// }

// export default SpotIcon
