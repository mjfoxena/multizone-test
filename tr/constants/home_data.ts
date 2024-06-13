// Performance
import { API_CONSTANTS } from "../services/constants";
const imageUrl = `${API_CONSTANTS.HOMEPAGE_BASE_URL}/performance/without_numbers`;
const imageUrlSmart = `${API_CONSTANTS.HOMEPAGE_BASE_URL}/smart_ride`;

export const PerformanceRawData = 
  [
    {
      id:0,
      category: "PEAK POWER",
      stat: "40.2",
      statUnit:"HP",
      description: "Armed with an aviation derived electric drivetrain the F77 MACH 2 assures uncompromising performance across all riding conditions",
      image:{
        src:`${imageUrl}/power.jpg`,
        alt: "power",
      },
      videoUrl:``,
      videoRef:'',
       disclaimer:'Armed with an aviation derived electric drivetrain the'
    },
    {
      id:1,
      category: "TORQUE",
      stat: "100",
      statUnit:"NM",
      description: " An absolute torque monster that can move objects 70x it’s own weight with ease. Experience the thrill of instant torque like never before.",
      image:{
        src:`${imageUrl}/power.jpg`,
        alt: "torque",
      }
      ,
      videoUrl:`https://player.vimeo.com/external/937685791.m3u8?s=e3418629a3f4b009bfbec8f21e77edf3768857b4&logging=false`,
      videoRef:'refTorque',
       disclaimer:'Armed with an aviation derived electric drivetrain the'
     
    },
    {
      id:2,
      category: "RANGE",
      stat: "323",
      statUnit:"KM",
      description: "The proprietary SRB 10 battery technology, in sync with the highly energy efficient on-board systems catapults the F77 MACH 2 miles ahead of the industry - making no trip too far.",
      image:{
            src: `${imageUrl}/range.jpg`,
            alt: "range",
          },
      videoUrl:'',
      videoRef:'',
       disclaimer:'Armed with an aviation derived electric drivetrain the'
    },
    {
      id:3,
      category: "TOP SPEED",
      stat: "155",
      statUnit:"KM/H",
      description: "This motorcycle is designed to go fast while inspiring utmost confidence in the rider. Be in complete control with a wide range of new tech that helps you attain truly ballistic acceleration and speed!",
      image:{
        src: `${imageUrl}/range.jpg`,
        alt: "topspeed",
      },
      videoUrl:`https://player.vimeo.com/external/938251070.m3u8?s=25c935d15fd88011b87452105fd310d833855d28&logging=false`,
      videoRef:'refTopSpeed',
       disclaimer:'motorcycle is designed to go fastdrivetrain the'
      
    },
    
  ];



  export const PerformanceRawDataSection2 = 
  [
    {
      id:0,
      category: "TRACTION CONTROL",
      stat: "",
      statUnit:"",
      description: "4 levels of traction control ensures the tyres always stick well to any terrain when you go ballistic.",
      image:{
        // src: `/images/home/newhome/smartDrive/tractionControl.jpg`,
        src:`${imageUrlSmart}/traction_control.jpg`,
        alt: "TRACTION CONTROL",
      }
      ,
      videoUrl:''
    },
    {
      id:1,
      category: "DYNAMIC REGEN",
      stat: "",
      statUnit:"",
      description: "Handle 10 levels of regenerative braking on the fly with a touch of a button.",
      image:{
        // src: `/images/home/newhome/smartDrive/dynamic.jpg`,
        src:`${imageUrlSmart}/dynamic_regen.jpg`,
        alt: "dynamic regen",
      }
      ,
      videoUrl:''
    },
    {
      id:2,
      category: "DELTA WATCH",
      stat: "",
      statUnit:"",
      description: "With Violette watching over, you will be alerted if anyone seems to tamper with your F77 MACH 2.",
      image:{
        // src: `/images/home/newhome/smartDrive/deltaWatch.jpg`,
        src:`${imageUrlSmart}/delta_watch.jpg`,
        alt: "DELTA WATCH",
      }
      ,
      videoUrl:''
    },
    {
      id:3,
      category: "HILL HOLD",
      stat: "",
      statUnit:"",
      description: "No matter the incline, the F77 MACH 2 remains steady and in place without engaging the brakes.",
      image:{
        // src: `/images/home/newhome/smartDrive/hillHold.jpg`,
        src:`${imageUrlSmart}/hill_hold.jpg`,
        alt: "hillhold",
      }
      ,
      videoUrl:''
    },
    {
      id:4,
      category: "PARK ASSIST",
      stat: "",
      statUnit:"",
      description: "Gone are the days of pushing/pulling your motorcycle for parking duties. Ease in and out of tight areas with complete control",
      image:{
            // src: `/images/home/newhome/smartDrive/parkAssist.jpg`,
            src:`${imageUrlSmart}/park_assist.jpg`,
            alt: "park assist",
          }
          ,
      videoUrl:''
    },
    
   
    
    
  ];




  