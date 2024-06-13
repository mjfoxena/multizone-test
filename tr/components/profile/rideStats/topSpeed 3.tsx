import Image from 'next/image'
import React from 'react'

const TopSpeed = ({ isMobile }) => {
    return (
        <>
            <div className='flex justify-between sm:mt-20 my-12'>
                <div className='text-[#FFF] disketMono sm:text-[18px] lg:text-[22px] text-[13px]'>
                    <p>Top speed achieved</p>
                    <div className='flex items-center justify-between mt-8 ml-4 sm:ml-8'>
                        <div>
                            <Image
                                src={"/images/rideStats/leftred.jpg"}
                                width={isMobile ? 50 : 80}
                                height={isMobile ? 50 : 80}
                                alt="left-arrow"
                                className=''
                            />
                        </div>
                        <div className="flex-1 text-center">
                            <p className='font-bold sm:text-[30vw] text-[34vw]'>220</p>
                        </div>
                        <div>
                            <Image
                                src={"/images/rideStats/rightred.jpg"}
                                width={isMobile ? 50 : 80}
                                height={isMobile ? 50 : 80}
                                alt="right-arrow"
                                className=''
                            />
                        </div>
                    </div>
                    <div className='flex sm:w-[55%] w-[60%] sm:mt-16 sm:text-[40px] text-[25px] font-normal'>
                        <p className='ml-auto eurostile sm:-mt-24'>km/h</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center sm:mt-36 mt-20'>
                <Image
                    alt="squadronLogo"
                    width={isMobile ? 20 : 20}
                    height={isMobile ? 20 : 20}
                    src="/images/rideStats/centerLogo.png"
                />
            </div>

            {/* bike image */}
            <div className="py-6 mt-12 sm:mt-20">
                <Image
                    alt="bike"
                    width={3000}
                    height={3000}
                    src="/images/rideStats/bike.png"
                    style={{ width: '100%', height: "100%" }}
                />
            </div>

            {/* braking section */}
            <div className="sm:py-12 py-6">
                <h2 className='text-[#FFF] disketMono sm:text-[24px] text-[16px]'>braking distribution</h2>
                <div className='flex'>
                    <div className='h-[73px] w-[30%] bg-[#297FBD] mt-6 text-[#FFF] text-[16px] sm:text-[20px]'>
                        <p className='mt-5 ml-6'>30%</p>
                    </div>
                    <div className='h-[73px] w-[70%] bg-[#2AC0E0] mt-6 text-[#FFF] flex justify-end text-[16px] sm:text-[20px]'>
                        <p className='mt-5 mr-6'>70%</p>
                    </div>
                </div>
                <div className='flex justify-between uppercase text-[#FFF] eurostile sm:text-[32px] text-[18px] mt-6'>
                    <p>front</p>
                    <p>REAR</p>
                </div>
                <div className='flex justify-center items-center sm:mt-12 mt-8 brutal text-[#FFF] uppercase text-[18px] sm:text-[32px] font-medium	'>
                    <p className=''>RECOMENDED PERCENTAGE From vinayak</p>
                </div>
                <div className='flex justify-center items-center sm:mt-36 mt-12'>
                    <Image
                        alt="squadronLogo"
                        width={isMobile ? 20 : 20}
                        height={isMobile ? 20 : 20}
                        src="/images/rideStats/centerLogo.png"
                    />
                </div>

                {/* efficient Section */}
                <div className='text-[#FFF] eurostile sm:mt-36 mt-20 uppercase'>
                    <p className='text-[6.5vw]'>Your most efficient Sortie</p>
                </div>
                <div className='flex justify-between sm:justify-start text-[#FFF] uppercase sm:mt-12 mt-8'>
                    <div>
                        <p className='disketMono sm:text-[24px] text-[16px]'>MOST EFFICIENT RIDE</p>
                    </div>
                    <div className='sm:ml-[10%]'>
                        <p className='disketMono sm:text-[24px] text-[16px]'>Predicted full range of the ride</p>
                    </div>
                </div>
                <div className='flex justify-between sm:justify-start text-[#FFF] uppercase eurostile'>
                    <div className='flex eurostile'>
                        <p className='text-[35px] sm:text-[48px]'>47</p>
                        <p className='sm:ml-4 ml-1 sm:mt-9 mt-5 text-[12px] sm:text-[18px]'>WH/KM</p>
                    </div>
                    <div className='flex eurostile mr-[10%] sm:mr-0  sm:ml-[23%]'>
                        <p className='text-[35px] sm:text-[48px]'>251</p>
                        <p className='sm:ml-4 ml-1 sm:mt-9 mt-5 text-[12px] sm:text-[18px]'>KM</p>
                    </div>
                </div>

                <div className='flex justify-center items-center sm:mt-36 mt-12'>
                    <Image
                        alt="squadronLogo"
                        width={isMobile ? 20 : 20}
                        height={isMobile ? 20 : 20}
                        src="/images/rideStats/centerLogo.png"
                    />
                </div>
            </div>
        </>
    )
}

export default TopSpeed