import React from "react";
import { useRouter } from "next/router";
import Style from "./smartTech.module.scss";
import Image from "next/image";
import ImageHotSpot from "./hotSpotImage";
import {motion} from 'framer-motion'

const SmartTech = () => {
  const router = useRouter();
  return (
    <div className={Style.smartTech}>
      <div className="h-screen  max-h-[550px] sm:h-[60vh] sm:max-h-[360px] sm:mt-12 w-full p-6 sm:p-0  sm:w-[80%]  flex flex-col sm:flex-row justify-start gap-32 sm:justify-between items-center sm:items-start">
        <motion.div initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
           viewport={{ once: true }}
           className={`${Style.mainTitle} mt-24  h-fit sm:mt-12 2xl:mt-0 `}>
          <p className={Style.subText}>Ultraviolette</p>
          <p className={Style.smartechText}>
            <span className="hidden sm:flex">
              SMART <br></br>TECH
            </span>
            <span className="sm:hidden">SMART TECH</span>
          </p>
        </motion.div>
        <div className="sm:w-[42%]  sm:h-[65%] 2xl:h-[85%]  2xl:w-[35%] sm:mt-12 2xl:mt-0 flex flex-col sm:justify-around  gap-4 sm:mr-[2%] ">
          <motion.p initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }} viewport={{ once: true }} className={Style.heading} >
            WE MADE THE F77 SMARTER THAN EVER
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }} viewport={{ once: true }} className={Style.desc}>
          The UV smart tech powered by Violette A.I., is loaded with all the essentials & beyond that helps you and your motorcycle be secure, safe and fast! You’re never alone in your sortie when on an F77 MACH 2.  
          </motion.p>
          <div onClick={() => router.push("/smarttech")} className={`${Style.learnMore} cursor-pointer z-50`}>
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              className="absolute top-0 left-0 "
            >
              <path
                d="M8.54297 1.00011L1.00011 1.00011L1.00011 8.54297"
                stroke="white"
                stroke-width="0.685714"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              className="absolute bottom-0 right-0"
            >
              <path
                d="M0.857422 8.31434H8.40028V0.771484"
                stroke="white"
                stroke-width="0.685714"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        className={` ${Style.bikePart}  w-full flex  h-fit  justify-center items-center  relative`}
      >
        <div className="w-full absolut bottom-0 left-0 hidden sm:w-full overflow-hidden sm:flex justify-center items-end  h-[600px] max-h-[300px] sm:h-fit sm:max-h-full ">
          <ImageHotSpot />
        </div>

        <div className="w-full sm:hidden  flex justify-center items-end h-[350px]">
          <ImageHotSpot />
        </div>
      </div>

      <div className="sm:hidden absolute -top-72 right-0  z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="393"
          height="913"
          viewBox="0 0 393 913"
          fill="none"
        >
          <g filter="url(#filter0_f_12300_13750)">
            <path
              d="M418.073 200.355C502.767 203.571 676.647 292.648 673.286 381.164C668.785 499.693 530.016 715.591 445.322 712.375C395.503 598.282 131.322 560.103 136.241 430.543C139.602 342.027 333.379 197.139 418.073 200.355Z"
              fill="url(#paint0_linear_12300_13750)"
              fill-opacity="0.2"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_12300_13750"
              x="-63.8271"
              y="0.302246"
              width="937.161"
              height="912.108"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="100"
                result="effect1_foregroundBlur_12300_13750"
              />
            </filter>
            <linearGradient
              id="paint0_linear_12300_13750"
              x1="305.543"
              y1="568.094"
              x2="764.823"
              y2="657.703"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#914EFF" />
              <stop offset="1" stop-color="#0038FF" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="hidden sm:flex absolute sm:-top-[500px] 2xl:-top-80 right-0 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1003"
          height="1788"
          viewBox="0 0 1003 1788"
          fill="none"
        >
          <g filter="url(#filter0_f_11383_13150)">
            <path
              d="M943.732 400.95C1106.91 407.146 1441.92 578.769 1435.45 749.312C1426.78 977.679 1159.41 1393.65 996.232 1387.45C900.247 1167.63 391.253 1094.07 400.731 844.45C407.207 673.907 780.554 394.754 943.732 400.95Z"
              fill="url(#paint0_linear_11383_13150)"
              fill-opacity="0.2"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_11383_13150"
              x="0.600586"
              y="0.848633"
              width="1834.94"
              height="1786.67"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="200"
                result="effect1_foregroundBlur_11383_13150"
              />
            </filter>
            <linearGradient
              id="paint0_linear_11383_13150"
              x1="726.922"
              y1="1109.47"
              x2="1611.81"
              y2="1282.12"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#914EFF" />
              <stop offset="1" stop-color="#0038FF" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="hidden absolute -top-80 left-0  ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="777"
          height="1412"
          viewBox="0 0 777 1412"
          fill="none"
        >
          <g filter="url(#filter0_f_11714_18251)">
            <path
              d="M-100.168 402.243C63.01 408.439 383.19 410.819 376.715 581.362C368.043 809.729 68.2639 1017.44 -94.9142 1011.25C-190.9 791.426 -673.781 825.257 -664.303 575.637C-657.827 405.094 -263.346 396.047 -100.168 402.243Z"
              fill="url(#paint0_linear_11714_18251)"
              fill-opacity="0.4"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_11714_18251"
              x="-1064.44"
              y="0.919922"
              width="1841.25"
              height="1410.46"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="200"
                result="effect1_foregroundBlur_11714_18251"
              />
            </filter>
            <linearGradient
              id="paint0_linear_11714_18251"
              x1="-331.808"
              y1="941.517"
              x2="553.08"
              y2="1114.17"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#914EFF" />
              <stop offset="1" stop-color="#0038FF" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default SmartTech;
