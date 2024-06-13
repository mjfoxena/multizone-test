/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PlasmaRed from '../../plasmaTab';
import { IVariantCombination } from '.';
import Image from 'next/image';

interface IColorSelectionProps {
    colorCombination: IVariantCombination[];
    selectedCombination: IVariantCombination;
    category: string;
    onColorSelect: (value: IVariantCombination, category: string) => void;
    selectedCategory: string;
    setReconSelections: any;
    setOriginalSelections: any;
    selectedModel: any;
    updateOptionCode: any;
}

const ColorSelection = ({ colorCombination, onColorSelect, selectedCombination, category, selectedCategory, setReconSelections, setOriginalSelections, selectedModel, updateOptionCode }: IColorSelectionProps) => {

    useEffect(() => {
        if (selectedCombination.option_code) {
            updateOptionCode(selectedCombination.option_code, selectedModel);
        }
    }, [selectedCombination.option_code, selectedModel, updateOptionCode]);
    
    return (
        <>
            <div className=''>
                <div className='flex -mr-2'>
                    {colorCombination.map((combination, index) => (
                        <div key={index} className=''>
                            <PlasmaRed
                                onClick={() => onColorSelect(combination, category)}
                                isSelected={combination.option_code === selectedCombination.option_code}
                                colorSelectionImage={combination.image}
                            />
                        </div>
                    ))}
                </div>
                <div className='flex justify-between brutal text-[#8B8B8B] sm:text-[15px] text-[13px] leading-[38px] tracking-[0.2px] font-medium'>
                    <div className=''>
                        <span className=''>SELECTED: </span>
                        <span className={selectedCategory === category && selectedCombination.name ? '' : ''}>
                            {selectedCategory === category && selectedCombination.name}
                        </span>
                    </div>
                    {/* <div>
                        <span className={selectedCategory === category && selectedCombination.price !== 0 ? '' : ''}>
                            {selectedCategory === category && selectedCombination.price !== 0 ? '₹ ' : ''}
                            {selectedCombination.price !== 0 ? selectedCombination.price : ''}
                        </span>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default ColorSelection;
