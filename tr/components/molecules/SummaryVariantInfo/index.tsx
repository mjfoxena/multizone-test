import { useContext, useEffect, useState } from 'react'
import Style from './summaryvarientinfo.module.scss'
import { DOMIDMAPPINGS } from '../../../constants'

import { NavbarContext } from "../../../contexts/NavbarContext";
import { TextElement } from "../../../components/atoms/Texts";
import Link from 'next/link';

const SummaryVarientInfo = () => {
    const { setSidebarOpen } = useContext(NavbarContext)
    const info = [
        {value: '2.4LSC',label:'Potential Saving'},
        {value: 'F77 Original',label:'Spec Sheet'},
        {value: '3 year',label:'Warranty'},
    ]
    const deliveryStartDate = 'JAN 2023'

    const [variantInfoWidth, setWidth] = useState(0);
    
    return (
        <div className='w-[60vw]'>
            <div className={Style.variantInfo}>
                <div>
                    {TextElement({text:'Delivery Starting from',fontSize:12}).REGULAR.WHITE}
                    {TextElement({text:deliveryStartDate, fontSize:24}).BOLD.WHITE}

                    <div onClick={()=>{
                        setSidebarOpen(true)
                    }}>
                        {TextElement({text:'Rollout Calendar', fontSize:14,className:'underline cursor-pointer'}).MEDUIM.WHITE}
                    </div>
                </div>
                <div className='flex space-x-20'>
                    {info.map((e,i)=>
                        <div key={i} className='text-center'>
                            {TextElement({text:e.value}).BOLD.WHITE}
                            <Link href={'/'}>
                                {TextElement({text:e.label, fontSize:14, className:'mt-1 underline'}).REGULAR.WHITE}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SummaryVarientInfo
