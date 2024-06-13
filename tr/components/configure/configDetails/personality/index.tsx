import React, { useEffect, useState } from 'react';
import ColorSelection from './colorSelection';
import Image from 'next/image';

const INITIAL_STATE = {
    "laser_box": "",
    "shadow_box": "",
    "airstrike_box": ""
}

export interface IVariantCombination {
    option_code: string;
    name: string;
    image: string;
    price: number;
}

interface IPersonalityProps {
    onPersonalitySelected: (id: string) => void;
    selectedModel: any;
    selectedDetails: any;
    setOriginalSelections: any
    setReconSelections: any
    updateOptionCode: any
}

const Personality = ({ onPersonalitySelected, selectedModel, selectedDetails, setOriginalSelections, setReconSelections, updateOptionCode }: IPersonalityProps) => {

    const laserColorCombination = selectedDetails.sub_categories_data[0].options_data
    const shadowColorCombination = selectedDetails.sub_categories_data[1].options_data
    const airstrikeColorCombination = selectedDetails.sub_categories_data[2].options_data

    const [showColorSelection, setShowColorSelection] = useState({
        laser: true,
        shadow: false,
        airstrike: false,
    });

    const [selectedCombination, setSelectedCombination] = useState<IVariantCombination>(laserColorCombination[0]);
    const [selectedCategory, setSelectedCategory] = useState<string>("laser_box");

    const handleLaser = () => {
        setShowColorSelection({
            airstrike: false,
            shadow: false,
            laser: true,
        });
        setSelectedCategory("laser_box");
        setSelectedCombination(laserColorCombination[0]);
        onPersonalitySelected(laserColorCombination[0].option_code);
    };

    const handleShadow = () => {
        setShowColorSelection({
            airstrike: false,
            shadow: true,
            laser: false,
        });
        setSelectedCategory("shadow_box");
        setSelectedCombination(shadowColorCombination[0]);
        onPersonalitySelected(shadowColorCombination[0].option_code);
    };    

    const handleAirstrike = () => {
        setShowColorSelection({
            airstrike: true,
            shadow: false,
            laser: false,
        });
        setSelectedCategory("airstrike_box");
        setSelectedCombination(airstrikeColorCombination[0]);
        onPersonalitySelected(airstrikeColorCombination[0].option_code);
    };

    const handleColorSelect = (item: IVariantCombination, category: string) => {
        setSelectedCombination(item);
        setSelectedCategory(category);
        onPersonalitySelected(item.option_code)
        console.log("onColorSelect ", item.option_code);
    };
    

    return (
        <>
            <div>
                <h2 className='brutal font-medium sm:text-[22px] text-[18px]' style={{ letterSpacing: "0.2px" }}>CHOOSE YOUR PERSONALITY</h2>
            </div>

            <div className='sm:mt-4 mt-0'>
                <div>
                    <div onClick={handleLaser} className="relative cursor-pointer hover:bg-[#F3F3F3] h-16 w-[114%] bg-[#ffffff] -ml-[22px]">
                        <div className='text-[#000] brutal font-medium brutal sm:text-[18px] text-[15px] leading-[38px] tracking-[0.2px] pt-[15px] pl-[22px]'>LASER</div>
                        {!showColorSelection.laser && (
                            <div className="absolute inset-0 flex items-center justify-end text-[#000]">
                                <Image
                                    width={12}
                                    height={8}
                                    alt="dropdown"
                                    loading="eager"
                                    src="/images/config/personality/dropdownBlack.png"
                                    className="mr-10"
                                />
                            </div>
                        )}
                    </div>
                    {showColorSelection.laser && (
                        <div className='mt-2'>
                            <ColorSelection
                                category={"laser_box"}
                                colorCombination={laserColorCombination}
                                selectedCombination={selectedCombination}
                                selectedCategory={selectedCategory}
                                onColorSelect={handleColorSelect}
                                setOriginalSelections={setOriginalSelections}
                                setReconSelections={setReconSelections}
                                selectedModel={selectedModel}
                                updateOptionCode={updateOptionCode}
                            />
                        </div>
                    )}
                </div>

                <div className='mt-2'>
                    <div onClick={handleShadow} className="relative cursor-pointer hover:bg-[#F3F3F3] h-16 w-[114%] bg-[#ffffff] -ml-[22px]">
                        <div className='text-[#000] brutal font-medium brutal sm:text-[18px] text-[15px] leading-[38px] tracking-[0.2px] pt-[15px] pl-[22px]'>SHADOW</div>
                        {!showColorSelection.shadow && (
                            <div className="absolute inset-0 flex items-center justify-end text-[#000]">
                                <Image
                                    width={12}
                                    height={8}
                                    alt="dropdown"
                                    loading="eager"
                                    src="/images/config/personality/dropdownBlack.png"
                                    className="mr-10"
                                />
                            </div>
                        )}
                    </div>
                    {showColorSelection.shadow && (
                        <div className='mt-2'>
                            <ColorSelection
                                category={"shadow_box"}
                                colorCombination={shadowColorCombination}
                                selectedCategory={selectedCategory}
                                selectedCombination={selectedCombination}
                                onColorSelect={handleColorSelect}
                                setOriginalSelections={setOriginalSelections}
                                setReconSelections={setReconSelections}
                                selectedModel={selectedModel}
                                updateOptionCode={updateOptionCode}
                            />
                        </div>
                    )}
                </div>

                <div className='mt-2'>
                    <div onClick={handleAirstrike} className="relative cursor-pointer hover:bg-[#F3F3F3] h-16 w-[114%] bg-[#ffffff] -ml-[22px]">
                        <div className='text-[#000] brutal font-medium brutal sm:text-[18px] text-[15px] leading-[38px] tracking-[0.2px] pt-[15px] pl-[22px]'>AIRSTRIKE</div>
                        {!showColorSelection.airstrike && (
                            <div className="absolute inset-0 flex items-center justify-end text-[#000]">
                                <Image
                                    width={12}
                                    height={8}
                                    alt="dropdown"
                                    loading="eager"
                                    src="/images/config/personality/dropdownBlack.png"
                                    className="mr-10"
                                />
                            </div>
                        )}
                    </div>

                    {showColorSelection.airstrike && (
                        <div className='mt-2'>
                            <ColorSelection
                                category={"airstrike_box"}
                                colorCombination={airstrikeColorCombination}
                                selectedCombination={selectedCombination}
                                selectedCategory={selectedCategory}
                                onColorSelect={handleColorSelect}
                                setOriginalSelections={setOriginalSelections}
                                setReconSelections={setReconSelections}
                                selectedModel={selectedModel}
                                updateOptionCode={updateOptionCode}
                            />
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default Personality;
