/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { MapCss } from '../../../utils/utils'
import { ProfileCard } from '../ProfileCard'
import Style from './newvipuser.module.scss'
import Image from "next/image";
import { useRouter } from 'next/router';
import { clearLocalStorage } from '../../../services/helper';
import { BookingFlow, ConfigFlow, ReferrerFlow } from '../../../utils/CookieManagement';
import { originURL } from '../../../services/constants';

const NewVipUser = ({name,id,vip,order_date,model,booking,email}) => {
    const router = useRouter();
    const covertDate = (date) => {   
      try{
        let res= new Date(date).toLocaleString("en-gb", { day:'numeric',month: "long" , year:'numeric'});
        return res
      }catch(err){
        return '--'
      }
     
    }
      const openCalander = () => {
        router.push(`configure/${model}?open=rolloutCal`);
      }
      const signOut = ()=>{
        clearLocalStorage();
        ReferrerFlow.clearCookie();
        BookingFlow.clearCookie();
        ConfigFlow.clearCookie();
        router.push('/');
      }
  return (
   <div className={MapCss(Style, "background")}>
      {/* top div */}
      <div className='w-full  h-full flex flex-row'>
        {/*---------------------- Account details---------- */}
        <div className='w-full   h-full  flex-flex-col sm:ml-20 sm:mr-20 sm:w-2/3'>
          {/* account details header */}
          <div className={MapCss(Style, "eurostile color border", 'mt-5 pb-5  text-xl mx-6 font-normal sm:mt-16 sm:text-2xl sm:mx-0')}>
            ACCOUNT DETAILS
          </div>
          {/*hello pilot*/}
          <div className={MapCss(Style,"color-white brutal",'mt-8 font-normal mx-6 text-sm sm:text-2xl sm:mx-0')}>
              Hello <span className='capitalize'>{name}</span>,
            <div className={MapCss(Style, "color-grey", "font-normal text-xs mt-3 sm:mt-5 sm:text-lg")}>
            Congratulations on pre-booking your F77. Please <span className='font-medium cursor-pointer'>Check Rollout Calendar</span> to know the estimated time
              of delivery in your city. For the next stage of confirming your order, please configure your F77.
            </div>
          </div>
          {/* -------------vip card for mobile only-------------------*/} 
          <div className={`w-2/3  sm:hidden mt-11`}>
                <ProfileCard name={name} id={id} vip={vip} model={model} booking={booking}/>    
                </div>
          {/* ----------------progress bar----------------- */}
          
           {/*-----------------top border mobile view--------- */}
           <div className={MapCss(Style, "", "mt-1 ml-6 mr-6 sm:hidden sm:ml-0 sm:mr-0")}>
          </div>
          {/* order id */}
          <div className={MapCss(Style, "brutal color-white", "mt-4 font-normal uppercase px-6 text-xs sm:text-2xl sm:mt-32 sm:px-0")}>
            Order ID: <span>{id}</span>
          </div>
          {/* order date */}
          <div className=' flex-row px-6 gap-14 mt-8 flex sm:px-0 sm:mt-4'>
            {/* date */}
            <div className={MapCss(Style, "color-grey brutal", "font-normal text-xl hidden sm:flex")}>
            Order date: {` ${covertDate(order_date)}`}
            </div>
            {/* invoice */}
            <div className={MapCss(Style, "color-grey border brutal", "hidden cursor-pointer font-normal text-xs sm:text-base")}>
              Download payment invoice
            </div>
            {/* cancel booking */}
            <div className={MapCss(Style, "color-grey border brutal", "cursor-pointer font-normal text-xs sm:text-base")}>
            {/* <a href={`https://ultraviolette.typeform.com/to/wcWUxSWi#email=${email}&order_id=${id}`} target="_blank">Refund Process</a> */}
            <a href={`${originURL}/refund`} target="_blank" hrefLang="en-in">Refund Process</a>
            </div>
          </div>
          {/*-----------------top border--------- */}
          <div className={MapCss(Style, "border", "mt-7 hidden sm:flex")}>
          </div>
          {/* ----------------product div-------------- */}
          <div className='mt-10 px-6 sm:mt-10 sm:px-0 '>
              <div className='flex  flex-row gap-10 items-center sm:gap-32 w-full'>
                <div className={MapCss(Style,"brutal color-prebook","font-medium text-xs sm:text-base")}>
                PRE-BOOKING PAID
                </div>
                <div className={MapCss(Style,"color-prebook disketMono","text-xs sm:text-base font-normal")}>
                INR 10,000
                </div>
              </div>
            <div>

            </div>
          </div>
          {/* configure f77 */}
          <div className='flex flex-row items-center mt-20 ml-7 sm:ml-0 sm:mt-44'>
            <div className={MapCss(Style,'eurostile color-white',"font-normal text-sm sm:text-lg")}>
            CONFIGURE YOUR
            </div>
            {/* f77 */}
            <div className={MapCss(Style,"f77-text",'ml-2 mr-4')}> 
            <Image src={'/images/profile/f77.png'} className={Style.f77Img} fill alt='product' />
            </div>
            {/* button */}
            <div className={MapCss(Style,"btn-text",'cursor-pointer')}onClick={()=>router.push('/configure')}>
            <Image src={'/images/profile/btn.png'} fill className={Style.btnImg} alt='product' />
            </div>
          </div>
          {/*-----------------bottom border--------- */}
          <div className={MapCss(Style, "border", "hidden ")}>
          </div>
          {/* delivery address */}
          
        </div>
        
        {/* ----------------------vip card for desktop only----------------- */}
        <div className={`w-1/3 hidden sm:flex flex-col`} >
        <div className='mt-[66px] hidden  sm:flex text-end justify-end  cursor-pointer' onClick={()=>signOut()}>
            <div className={MapCss(Style,"color-white brutal","text-sm w-full")}>SIGN OUT
            </div>
            <div className={MapCss(Style,"signout-arrow","ml-1 ")}><Image src="/images/profile/signout-arrow.png" width={8} height={8}  alt='arrow' /></div>

          </div>
          {/* ----------------vip card------- */}
         <ProfileCard name={name} id={id} vip={vip} model={model} booking={booking}/>    
        </div>
      </div>


      {/* bottom div */}
      <div className={MapCss(Style,"color-grey brutal",'ml-0 px-6 w-full  hidden sm:flex flex-col font-normal text-xs mt-10 pb-12 sm:ml-20 sm:w-5/6 sm:text-sm sm:px-0 sm:mt-40')}>
      Please note that free cancellation is only applicable till vehicle allotment.
       <div> For any queries regarding your booking, please contact bookings@ultraviolette.com</div>
      </div>
      {/* bottom div mobile */}
      <div className={MapCss(Style,"color-grey brutal",'sm:hidden ml-0 px-6 w-full font-normal text-xs mt-10  sm:ml-20 sm:w-5/6 sm:text-sm sm:px-0 sm:mt-40')}>
      Please note that free cancellation is only applicable till vehicle allotment.
        <div className='mt-5'>For any queries regarding your booking, please contact bookings@ultraviolette.com</div>
      </div>
      <div className='pb-56 pl-6 pr-6 sm:hidden'>
            <div className={MapCss(Style,"border","mt-7")}>
            </div>
            <div className='mt-5 flex  sm:hidden   cursor-pointer' onClick={()=>signOut()}>
            <div className={MapCss(Style,"color-white brutal","text-sm")}>SIGN OUT
            </div>
            <div className={MapCss(Style,"signout-arrow","ml-1 ")}><Image src="/images/profile/signout-arrow.png"  width={8} height={8} alt='arrow' />
            </div>
          </div>
         </div>
    </div>
  )
}

export default NewVipUser;
