import Image from "next/image";
import React, { useState } from "react";
import Style from "./index.module.scss";
import parse from 'html-react-parser';

const Accordian = ({ title, answer, Id, Index, setIndex }) => {
  const handleSetIndex = (Id: any) => Index !== Id && setIndex(Id);
  

  const content  =  answer;
  return (
    <div className={Style.container}>
      <div className={Style.wrapper}>
        <div className="flex flex-row w-fit">
          <div className="border-l-2 h-7 border-zinc-300 sm:border-l-8 sm:h-14 sm:border-zinc-300 sm:ml-[-10px]"></div>
          <div className={Style.subWrapper}>
            {" "}
            <div className={Style.question}>{title}</div>
             {Index === Id && <div className={Style.answer}>{parse(answer)}</div>}
          </div>
        </div>
        <div className={`flex h-auto  ${Index === Id ? 'align-start sm:align-start' : 'align-center sm:align-center'}`}>
         <div className={`hidden h-7 cursor-pointer sm:h-14 sm:py-2 sm:flex `}>
         {Index === Id ?<Image
            alt="Minus"
            width={20}
            height={20}
            src={"/images/icons/minus.svg"}
            onClick={() => handleSetIndex(!Id)}
          />: <Image
            alt="Add"
            width={20}
            height={20}
            src={"/images/icons/add.svg"}
            onClick={() => handleSetIndex(Id)}
          />}
         </div>
         <div className="flex h-7 sm:hidden">
         {Index === Id ?<Image
            alt="Minus"
            width={12}
            height={12}
            src={"/images/icons/minus.svg"}
            onClick={() => handleSetIndex(!Id)}
          />: <Image
            alt="Add"
            width={12}
            height={12}
            src={"/images/icons/add.svg"}
            onClick={() => handleSetIndex(Id)}
          />}
         </div>

          
        </div>
      </div>
    </div>
  );
};

export default Accordian;
