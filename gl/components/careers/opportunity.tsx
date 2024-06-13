/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import React, { useState } from 'react'
import Button from '../atoms/Button'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { API_CONSTANTS } from '../../services/constants';
const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}`;

const images = [
    `${imageUrl}/careers/carousel1/1.jpg`,
    `${imageUrl}/careers/carousel1/2.jpg`,
    `${imageUrl}/careers/carousel1/3.jpg`,
    `${imageUrl}/careers/carousel1/4.jpg`,
];

const Oppertunity = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handlePrevious = () => {
        setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="sm:flex brutal sm:mt-24">
            <div className="sm:w-1/2 sm:pr-24">
                <div className='sm:hidden block mt-9'>
                    <Image
                        width={3000}
                        height={3000}
                        alt="MissionSection Image"
                        src="/images/careers/careers5.png"
                        style={{ objectFit: "cover", width: "100%", height: "248px" }}
                    />
                </div>
                <div className='text-[#404040] font-medium text-[18px] sm:text-[22px] sm:mt-0 mt-5'>
                    Accelerating innovation and fostering collective passion since 2016.
                </div>
                <div className='text-[14px] sm:text-[16px] sm:mt-6 mt-3'>
                    In 2016, Narayan Subramanium and Niraj Rajmohan developed the Ultraviolette F77, a machine that wasn't just the fastest electric motorcycle in India, but also the safest and most efficient. A game-changer that captured the attention of the world.
                </div>
            </div>
            <div className="w-1/2 hidden sm:block">
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

export default Oppertunity