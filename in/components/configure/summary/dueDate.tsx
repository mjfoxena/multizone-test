import React, { useState } from 'react'

const DueDate = ({bookPrice}) => {
    const [checkbox, setCheckbox] = useState(false);

    return (
        <div>
            <div className="flex flex-row w-full justify-between mt-5 sm:mb-1">
                <div className="">
                    <div className="flex flex-row items-center gap-4">
                        <div className='brutal text-xs sm:text-xl'>
                            DUE TODAY
                        </div>
                    </div>
                    <div className="brutal leading-7 text-xs font-normal hidden sm:inline-block">
                        BOOKING AMOUNT FOR YOUR F77
                    </div>
                </div>
                <div className="">
                    <div className="text-xs sm:text-xl text-[#ED1C24] brutal font-medium cursor text-right">
                    ₹ {bookPrice}
                    </div>
                    <div className='brutal brutal leading-7 text-[13px] sm:text-[14px] font-normal'>
                        ( Inclusive of GST )
                    </div>
                </div>
            </div>
            <div className='text-[#656565] text-[13px] sm:text-[14px] brutal leading-2 tracking-[0.2px] my-2'>Your booking amount is fully refundable and adjustable against your final payment for the order.</div>
        </div>
    )
}

export default DueDate