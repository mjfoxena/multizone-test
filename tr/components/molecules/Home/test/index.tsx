import React from 'react'
import Image from 'next/image';
import { API_CONSTANTS } from "../../../../services/constants";
const imageUrl = `${API_CONSTANTS.HOMEPAGE_BASE2_URL}/images`;
import SpotIcon from '../smartTech/hotSpotImage/spotIcon';


const Smart = () => {
  return (
    <div className='w-fit h-fit bg-slate-500 relative p-[10%] pt-0 pb-0'>
      <Image
            width={2000}
            height={2000}
            alt="f77"
            src={`${imageUrl}/f77_dark_silhoutte_side_3.webp`}
            style={{objectFit:'cover'}}
            className="border "
          />
      <div className='absolute top-[18%] left-[20%]'>
      <SpotIcon title=' Remote Lockdown'/>
        </div>
    </div>
  )
}

export default Smart
