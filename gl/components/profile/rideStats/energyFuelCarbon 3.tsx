// Energy, Fuel and Carbon section

import Image from 'next/image'
import React from 'react'

const EnergyFuelCarbon = ({ isMobile }) => {
    return (
        <>
            <div className=''>
                {/* Energy Section */}
                <div className='uppercase flex sm:text-[24px] text-[20px]'>
                    <div className='text-[#6E6E6E] disketMono'>Since this date</div>
                    <div className='text-[#FFF] disketMono pl-3'>12.02.2023</div>
                </div>
                <div className='flex justify-between text-[#FFF] uppercase sm:mt-12 mt-8'>
                    <div>
                        <p className='disketMono sm:text-[24px] text-[18px]'>total energy consumed</p>
                        <div className='flex eurostile'>
                            <p className='lg:text-[128px] sm:text-[80px] text-[40px]'>468</p>
                            <p className='sm:pl-4 pl-1 lg:text-[32px] sm:text-[24px] text-[15px] lg:mt-[105px] sm:mt-[60px] mt-7'>WH</p>
                        </div>
                    </div>
                    <div>
                        <p className='disketMono sm:text-[24px] text-[18px]'>TOTAL ENERGY RECOVERED</p>
                        <div className='flex eurostile'>
                            <p className='lg:text-[128px] sm:text-[80px] text-[40px]'>233</p>
                            <p className='sm:pl-4 pl-1 lg:text-[32px] sm:text-[24px] text-[15px] lg:mt-[105px] sm:mt-[60px] mt-7'>WH</p>
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <div className='h-[73px] w-[60%] bg-[#FA0201] mt-6 text-[#FFF] text-[16px] sm:text-[20px]'></div>
                    <div className='h-[73px] w-[40%] bg-[#19B493] mt-6 text-[#FFF] flex justify-end text-[16px] sm:text-[20px]'></div>
                </div>
                <div className='flex justify-center items-center sm:mt-36 mt-12'>
                    <Image
                        alt="squadronLogo"
                        width={isMobile ? 20 : 20}
                        height={isMobile ? 20 : 20}
                        src="/images/rideStats/centerLogo.png"
                    />
                </div>

                {/* Fuel Section */}
                <div className='sm:py-16 py-8 mt-16'>
                    <p className='disketMono sm:text-[24px] text-[18px] text-[#FFF]'>fuel savings</p>
                </div>
                <div className='text-[#E2AF59] eurostile sm:-mt-20 -mt-8'>
                    <p className='text-[13vw]'>₹ 32,235</p>
                </div>
                <div className='flex justify-between'>
                    <p className='disketMono sm:text-[24px] text-[18px] text-[#FFF]'>SAVED</p>
                    <p className='sm:w-1/2 w-3/4 text-[#666]'>* Fuel prices calculated at an average of 100 INR/L
                        ** Mileage calculated for an average performance motorcycle of 30 kmpl.</p>
                </div>
                <div className='flex justify-center items-center sm:mt-36 mt-12'>
                    <Image
                        alt="squadronLogo"
                        width={isMobile ? 20 : 20}
                        height={isMobile ? 20 : 20}
                        src="/images/rideStats/centerLogo.png"
                    />
                </div>

                {/* Trip Section */}
                <div className='flex justify-between text-[#FFF] sm:py-16 py-8 mt-16'>
                    <div>
                        <p>Total trip count</p>
                        <p>92</p>
                    </div>
                    <div>
                        <p>Average distance per trip</p>
                        <p>38 km</p>
                    </div>
                    <div>
                        <p>Average EFFICIENCY</p>
                        <p>55 WH/KM</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EnergyFuelCarbon