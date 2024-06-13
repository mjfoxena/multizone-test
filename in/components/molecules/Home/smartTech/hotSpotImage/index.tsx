import Image from "next/image";
import Style from "./index.module.scss";
import SpotIcon from "./spotIcon";
import SpotIconM from "./spotIconM";
import { useState } from "react";
import { API_CONSTANTS } from "../../../../../services/constants";
const imageUrl = `${API_CONSTANTS.HOMEPAGE_BASE2_URL}/images`;

const ImageHotSpot = () => {
  const [specMob, setSpecMob] = useState("New Console Themes");

  return (
    <div className={`${Style.bike}`}>
      <div className=" hidden  xl:flex  w-full  h-fit justify-center items-center ">
        <div className="xl:relative w-[80%] md:w-[100%] xl:w-[80%] flex justify-center items-center  -mt-12">
          <Image
            width={2000}
            height={2000}
            alt="f77"
            src={`${imageUrl}/f77_dark_silhoutte_side_3.webp`}
            style={{ objectFit: "contain" }}
            className=" w-full h-full  "
          />

          <div className="absolute top-[34%] left-[3%] md:left-[12%] xl:left-[3%] z-50">
            <SpotIcon title="Anti-Collision Warning System" />
          </div>
          {/* <div className='absolute top-[18%] left-[4%] z-50 '>
                <SpotIcon title=' '/>
          </div> */}
          <div className="absolute top-[63%] left-[16%] z-50 ">
            <SpotIcon title="Remote Lockdown" />
          </div>
          <div className="absolute top-[58%] left-[82%] md:left-[80%] xl:left-[82%] z-50">
            <SpotIcon title="Low Tyre Pressure Alerts" />
          </div>
          <div className="absolute top-[26%] left-[50%] z-50">
            <SpotIcon title="Delta Watch" />
          </div>
          <div className="absolute top-[20%] left-[64%] z-50">
            <SpotIcon title="New Console Themes" />
          </div>
          <div className="absolute top-[54%] left-[55%] z-50">
            <SpotIcon title="Crash Alert" />
          </div>
        </div>
      </div>

      <div className=" xl:hidden relative w-full h-fit  ">
        <div
          className={`${Style.mobIcon} absolute -top-[10%] md:top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-fit backdrop-filter backdrop-blur-lg bg-opacity-30 firefox:bg-opacity-90 px-4 py-2 text-[#fff]`}
        >
          {specMob}
        </div>
        <div className="w-full h-full ">
          <Image
            width={2000}
            height={2000}
            alt="f77Mob"
            // src={"/images/home/newhome/smartTech/darkBikeMob.png"}
            src={`${imageUrl}/f77_dark_silhoutte_side_3.webp`}
            className="w-full h-full object-cover"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="absolute top-[20%] left-[44%] xl:top-[20%] xl:left-[44%] md:top-[22%] md:left-[47%]">
          <SpotIconM
            title={"Delta Watch"}
            setSpecMob={setSpecMob}
            specMob={specMob}
          />
        </div>
        <div className="absolute top-[47%] left-[52%]">
          <SpotIconM
            title={"Crash Alert"}
            setSpecMob={setSpecMob}
            specMob={specMob}
          />
        </div>
        <div className="absolute top-[15%] left-[63%]">
          <SpotIconM
            title={"New Console Themes"}
            setSpecMob={setSpecMob}
            specMob={specMob}
          />
        </div>
        <div className="absolute top-[60%] md:top-[55%] md:left-[85%] left-[79%]">
          <SpotIconM
            title="Low Tyre pressure alerts"
            setSpecMob={setSpecMob}
            specMob={specMob}
          />
        </div>
        <div className="absolute top-[15%] md:top-[30%] left-[10%] md:left-[2%]">
          <SpotIconM
            title="Anti-Collision Warning System"
            setSpecMob={setSpecMob}
            specMob={specMob}
          />
        </div>
        <div className="absolute top-[58%] left-[16%]">
          <SpotIconM
            title="Remote lockdown"
            setSpecMob={setSpecMob}
            specMob={specMob}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageHotSpot;

// import Image from 'next/image';
// import Style from './index.module.scss';
// import SpotIcon from './spotIcon';
// import SpotIconM from './spotIconM';
// import { useState } from 'react';

// const ImageHotSpot = () => {

// const [specMob,setSpecMob] = useState('New Console Themes');

//   return (
//     <div className={Style.bike}>
//       <div className='sm:relative hidden sm:flex'>
//       <Image
//             width={2000}
//             height={2000}
//             alt="f77"
//             // src={"/images/home/newhome/smartTech/f77.png"}
//             src={"/images/home/newhome/smartTech/F77Dark Silhouette.png"}
//             style={{objectFit:'contain'}}
//             className=" w-full h-full border "
//           />
//                {/* <div className='absolute top-[5%] left-[14%] z-50'>
//                 <SpotIcon title=''/>
//           </div> */}
//           <div className='absolute top-[30%] left-[0%] z-50 '>
//                 <SpotIcon title=' Anti-Collision Warning System'/>
//           </div>
//           <div className='absolute top-[60%] left-[15%] z-50 '>
//                 <SpotIcon title=' Lockdown mode'/>
//           </div>
//           <div className='absolute top-[56%] left-[80%] z-50'>
//                 <SpotIcon title='Low Tyre pressure alerts'/>
//           </div>
//           <div className='absolute top-[20%] left-[49%] z-50'>
//                 <SpotIcon title='Tamper Alerts'/>
//           </div>
//           <div className='absolute top-[17%] left-[62%] z-50'>
//                 <SpotIcon title='New Console Themes'/>
//           </div>
//           <div className='absolute top-[49%] left-[52%] z-50'>
//                 <SpotIcon title='Crash Alerts'/>
//           </div>

//       </div>

//       <div className=' sm:hidden relative '>
//       <div className={`${Style.mobIcon} absolute  -top-[5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-fit backdrop-filter backdrop-blur-lg bg-opacity-30 firefox:bg-opacity-90 px-4 py-2 text-[#fff]`}>{specMob}</div>
//       <Image
//             width={2000}
//             height={2000}
//             alt="f77Mob"
//             // src={"/images/home/newhome/smartTech/f77Mob.png"}
//             src={"/images/home/newhome/smartTech/darkBikeMob.png"}
//             className=""
//             style={{objectFit:'contain'}}
//           />
//           <div className='absolute top-[8%] left-[47%]'>
//           <SpotIconM title={'Delta Watch'} setSpecMob={setSpecMob}/>
//           </div>
//           <div className='absolute top-[46%] left-[54%]'>
//           <SpotIconM title={'Crash Alert'} setSpecMob={setSpecMob}/>
//           </div>
//           <div className='absolute top-[5%] left-[68%]'>
//           <SpotIconM title={'New Console Themes'} setSpecMob={setSpecMob}/>
//           </div>
//           <div className='absolute top-[67%] left-[86%]'>
//           <SpotIconM title='Low Tyre Pressure Alerts' setSpecMob={setSpecMob}/>
//           </div>
//           <div className='absolute top-[10%] left-[0%]'>
//           <SpotIconM title='Anti-Collision Warning System' setSpecMob={setSpecMob}/>
//           </div>
//           <div className='absolute top-[60%] left-[4%]'>
//           <SpotIconM title='Remote Lockdown' setSpecMob={setSpecMob}/>
//           </div>

//       </div>
//       </div>
//   );
// };

// export default ImageHotSpot;
