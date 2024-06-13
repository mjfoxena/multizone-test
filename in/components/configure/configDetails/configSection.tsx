import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ConfigButton from '../../atoms/Button/configAdd'
import style from '../../../pages/configure/map.module.scss'
import { log } from 'console'

const ConfigSection = ({ selectedModel, selectedDetails, setOriginalSelections, originalSelections, setSelectedOptionCodes }) => {
   

    useEffect(() => {
        // console.log(selectedDetails, 'selectedDetails 343533');
        setSelectedOptionCodes( pre => [...pre, selectedDetails.default])
        
        setOriginalSelections(prevState => {
            const updatedSelections = { ...prevState };
            const defaultArray = Array.isArray(selectedDetails.default) ? selectedDetails.default : [selectedDetails.default];
            
            if (!updatedSelections.selected_option.includes(selectedDetails.default)) {
                updatedSelections.selected_option = [
                    ...(updatedSelections.selected_option || []), 
                    ...defaultArray 
                ];
            }

            console.log(updatedSelections, 'updatedSelections');
            
            
            return updatedSelections;
        });
    }, [selectedDetails.default]);
    

    return (
        <div>
            <div style={{ letterSpacing: "0.2px" }}>
                <h2 className='brutal font-medium sm:text-[22px] text-[18px] uppercase'>{selectedDetails?.category_name}</h2>
                <p className='text-[13px] sm:text-[14px] brutal font-normal sm:mt-4 mt-3 leading-[17px] tracking-[0.2px]'>{selectedDetails?.category_desc}</p>
            </div>
            <div className='mt-4 sm:mt-6'>
                <div className="sm:mt-6 mt-4">
                    <div className="sm:my-10 my-8">
                        {selectedDetails?.category_desc_points?.map((item, index) => (
                            <div key={index} className="flex justify-start my-4">
                                <div>
                                    <Image
                                        src="/images/config/plus.svg"
                                        alt="Image 3"
                                        width={16}
                                        height={16}
                                        style={{ objectFit: "cover" }}
                                        className='absolute'
                                    />
                                </div>
                                <div className='ml-6 brutal sm:text-[16px] text-[15px] leading-[24px] tracking-[0.2px] -mt-1 text-[#000]'>{item}</div>
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
                    <p className='text-[11px] sm:text-[12px] brutal font-normal sm:mt-4 mt-3 leading-[17px] tracking-[0.2px]'>*{selectedDetails?.disclaimer}</p>
                )}
            </div>
        </div>
    )
}

export default ConfigSection