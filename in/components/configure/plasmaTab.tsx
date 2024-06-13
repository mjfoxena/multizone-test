/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React, { useState } from 'react';

interface PropsType {
    onClick: () => void;
    isSelected: boolean;
    colorSelectionImage: string;
}

const PlasmaRed: React.FC<PropsType> = ({ onClick, isSelected, colorSelectionImage }) => {

    return (
        <>
            <div
                className={`rounded-md pr-2`}
                onClick={onClick}
            >
                <div className={`flex cursor-pointer rounded-sm`} style={{ height: '100%', border: isSelected ? '2.3px solid #ED1C24' : '1px solid transparent' }}>
                    <div className={`rounded-sm`}>
                        <Image
                            width={2000}
                            height={2000}
                            alt="colorselection images"
                            loading="eager"
                            src={colorSelectionImage}
                            style={{objectFit: "cover", width:"100%", height: "70px"}}
                            className='rounded-sm hover:shadow-xl'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlasmaRed;
