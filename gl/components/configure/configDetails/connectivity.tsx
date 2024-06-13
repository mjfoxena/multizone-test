import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ConfigButton from '../../atoms/Button/configAdd'
import style from '../../../pages/configure/map.module.scss'

const Connectivity = ({ selectedModel, selectedDetails }) => {

    // console.log("selectedDetails", selectedDetails);

    return (
        <div>
            <div style={{ letterSpacing: "0.2px" }}>
                <h2 className='brutal font-medium sm:text-[20px] text-[18px] uppercase'>{selectedDetails?.category_name}</h2>
                <p className='text-[10px] sm:text-[12px] brutal font-normal sm:mt-4 mt-3 leading-[17px] tracking-[0.2px]'>{selectedDetails?.category_desc}</p>
            </div>
            <div className='mt-4 sm:mt-6'>
                <div className="sm:mt-6 mt-4">
                    <div className="sm:mt-6 mt-4">

                        {selectedDetails?.category_desc_points?.map((item, index) => (
                            <div key={index} className="flex justify-start my-2">
                                <div>
                                    <Image
                                        src="/images/config/plus.svg"
                                        alt="Image 3"
                                        width={16}
                                        height={16}
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <div className='ml-[10px] brutal sm:text-[16px] text-[14px] leading-[24px] tracking-[0.2px] -mt-1 text-[#000]'>{item}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='sm:mt-6 mt-4'>
                    <ConfigButton
                        text={"INCLUDED"}
                        onClick={() => { }}
                        dynamicIconSrc={"/images/config/configArightarrow.svg"}
                    />
                </div>
            </div>
            <div style={{ letterSpacing: "0.2px" }}>
                {selectedDetails?.disclaimer !== "None" && (
                    <p className='text-[10px] sm:text-[12px] brutal font-normal sm:mt-4 mt-3 leading-[17px] tracking-[0.2px]'>*{selectedDetails?.disclaimer}</p>
                )}
            </div>
        </div>
    )
}

export default Connectivity
