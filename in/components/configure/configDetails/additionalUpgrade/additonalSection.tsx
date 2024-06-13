import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ConfigAdditionalButton from '../../../atoms/Button/configAditionalAdd';

const AdditionalSection = ({ id, item, description, description_point, price, onClick, isSelected, }) => {

    const [isClicked, setIsClicked] = useState(false);    

    return (
        <div>
            <div style={{ letterSpacing: "0.2px" }}>
                <h2 className='brutal font-medium sm:text-[22px] text-[18px] uppercase'>{item}</h2>
                <p className='text-[11px] sm:text-[12px] brutal font-normal sm:mt-4 mt-3 leading-[17px] tracking-[0.2px]'>{description}</p>
            </div>
            <div className='mt-4 sm:mt-6'>
                <div className="sm:mt-6 mt-4">
                    <div className="sm:mt-6 mt-4">

                        {description_point?.map((item, index) => (
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
                                <div className='ml-[10px] brutal sm:text-[16px] text-[15px] leading-[24px] tracking-[0.2px] -mt-1 text-[#000]'>{item}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='sm:mt-6 mt-4'>
                    <ConfigAdditionalButton
                        text={isSelected ? `ADDED FOR ₹ ${price}` : `ADD FOR ₹ ${price}`}
                        onClick={() => {
                            onClick(id);
                            setIsClicked(!isClicked);
                        }}
                        dynamicIconSrc={isSelected ? "/images/config/configArightarrow.svg" : "/images/config/configAdd.svg"}
                        setIsClicked={setIsClicked}
                        isClicked={isClicked}
                        isSelected={isSelected}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdditionalSection
