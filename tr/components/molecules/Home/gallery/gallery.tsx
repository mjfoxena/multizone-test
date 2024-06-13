import React from 'react'
import Style from './gallery.module.scss'
import Image from 'next/image'
import { API_CONSTANTS } from "../../../../services/constants";
const imageUrl = `${API_CONSTANTS.HOMEPAGE_BASE_URL}`;


const Gallery = () => {
  return (
    <div className={Style.gallery}>
      <div className={Style.content}>
        <Image 
         src={`${imageUrl}/hero_image.webp`}
        alt='actionShort'
        width={2000}
        height={2000}
        className='hidden sm:flex'
        />
        <Image
        src={`${imageUrl}/hero_image_mobile.webp`}
        alt='actionShort'
        width={2000}
        height={2000}
        className='sm:hidden'
        />
      </div>
    </div>
  )
}

export default Gallery