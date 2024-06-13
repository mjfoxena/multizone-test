/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { API_CONSTANTS } from '../../services/constants';
const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}`;

const images = [
    // `${imageUrl}/careers/carousel2/1.jpg`,
    `${imageUrl}/careers/carousel2/3.jpg`,
    `${imageUrl}/careers/carousel2/2.jpg`,
    // `${imageUrl}/careers/carousel2/3.jpg`,
];

const Calture = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handlePrevious = () => {
        setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    return (
        <div className="sm:flex brutal sm:mt-24 sm:pb-10">
            <div className="sm:w-1/2 sm:pr-40 sm:mt-14">
                <div className='sm:hidden block mt-9'>
                    <Image
                        width={2140}
                        height={1800}
                        alt="MissionSection Image"
                        src="/images/careers/careers1.JPG"
                        style={{ objectFit: "cover", width: "100%", height: "248px" }}
                    />
                </div>
                <div className='text-[#404040] font-medium text-[18px] sm:text-[22px] mt-5 sm:-mt-14'>
                    Rediscover your calling!
                </div>
                <div className='text-[14px] sm:text-[16px] sm:mt-6 mt-3'>
                    At Ultraviolette, we value and nurture individuals who understand what it takes to leap ahead. This is the space where the
best idea wins and where one can break through personal barriers and overcome challenges to compete at the highest possible level. If your calling reflects the tenacity to be at the top of the world, to be a key component of this sweeping revolution, you're made of the right stuff for us.
                </div>
            </div>
            <div className="sm:w-1/2 hidden sm:block">
                <div className="carousel-container flex justify-center">
                    <button onClick={handlePrevious} className='text-[30px] text-[#8c8a8a] pr-3'>&lt;</button>
                    <div className=''>
                        <Carousel
                            showArrows={false}
                            showStatus={false}
                            showIndicators={false}
                            infiniteLoop={true}
                            autoPlay={false}
                            interval={2000}
                            selectedItem={selectedIndex}
                        >
                            {images.map((image, index) => (
                                <div key={index}>
                                    <Image
                                        width={3000}
                                        height={3000}
                                        alt={`Image ${index}`}
                                        src={image}
                                        style={{ objectFit: "cover", width: "100%", height: "437px" }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <button onClick={handleNext} className='text-[30px] text-[#8c8a8a] ml-3 -mr-7'>&gt;</button>
                </div>
            </div>
        </div>
    )
}

export default Calture