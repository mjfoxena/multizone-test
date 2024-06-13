import React from 'react'
import Style from './commonsidebar.module.scss'
import { MapCss } from '../../../utils/utils'

const CommonSideBar = ({Title}) => {
  return (
    <div className='w-screen flex-col h-full justify-center sm:w-1/3 sm:flex sm:h-screen sm:flex-row sm:justify-between '>
        <div className={MapCss(Style,'eurostile','w-full text-black mt-24 text-left eurostile text-4xl font-extrabold ml-5 sm:w-full sm:text-black sm:mt-32 sm:text-center sm:eurostile sm:text-6xl sm:font-extrabold')}>{Title}</div>
        <div className=' hidden h-auto border-r-2 border-grey mt-16 mb-16 sm:flex'></div>
        <div className=' flex ml-5 w-2/3 border-b-2 border-grey mt-8 mb-8 sm:hidden'></div>

    </div>
  )
}

export default CommonSideBar
