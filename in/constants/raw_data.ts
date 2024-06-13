export const iConstants = {
  CHECK_IT_OUT: "checkitout",
  I_DONT_NEED_ONE: "one_time_direct_payment",
  ONLINE_PAYMENT: "online_payment",
  DIRECT_PAYMENT: "direct_payment",
  I_BRING_IT_OWN: "bring_my_own",
  ILL_ARRANGE_IT: "ill_arrange_it",
  LIMITED_EDITION: "limited",
};
// Direct go to payment Tab
export const iCustomPaymentIds = [
  iConstants.ILL_ARRANGE_IT,
  iConstants.I_BRING_IT_OWN,
  iConstants.I_DONT_NEED_ONE,
];
export const iContent = {
  insurance: {
    bringMyOwn: {
      tooltip:
        "By clicking on the option above, you are hereby giving your consent to receive call/communication from Kotak Mahindra Prime Ltd for marketing purposes through telephone/Mobile/SMS/Email for the above mentioned product/offer and that such consent shall prevail over any current or subsequent registration of your number in the National Do Not Call Registry.",

      modal:
        " By clicking on the option we would like to take your consent to have a phone call and help you bring your own insurance",
    },
  },
  payment: {
    title: "Payment Mode",
    description:
      "Any remaining payments can be done with either of the below options",
    modes: [
      {
        title: "ONLINE PAYMENT",
        id: iConstants.ONLINE_PAYMENT,
        tooltip: {
          header: "",
          list: [],
          description:
            "A convenient way to pay via a wide range of payment options (Cards, UPI, Netbanking). Additional charges and fees may apply.",
        },
        trailing: "Additional charges apply.",
        modal: {
          title: "ONLINE PAYMENT",
          description:
            "You have been redirected to the cashfree payments gateway. Please proceed if done with payments.",
        },
      },
      {
        title: "DIRECT PAYMENT",
        id: iConstants.DIRECT_PAYMENT,

        tooltip: {
          header: "",
          list: [],
          description:
            "Facilitates intra and inter-bank transfers. Additional charges and fees may apply.",
        },
        modal: {
          title: "DIRECT PAYMENT",
          description:
            "Use the following information for your payments.  Payment can be initiated through any mode - IMPS, NEFT, RTGS etc",
        },
      },
    ],
  },
};

export const dataSet = {
  variant: {},
  financeVariants: [
    {
      title: "EXPLORE FINANCING OPTIONS",
      id: iConstants.CHECK_IT_OUT,
    },
    {
      title: "ONE TIME DIRECT PAYMENT",
      id: iConstants.I_DONT_NEED_ONE,
      tooltip: {
        header: "",
        list: [],
        description:
          "Facilitates intra and inter-bank transfers. Additional charges and fees may apply.",
      },
    },
  ],

  loan_info: {
    loan_amount: 0,
    down_paymenr: 0,
    total_loan_amount: 0,
  },
  is_kyc_verified: false,
  kyc_info: {
    mobile_number: "",
    aadhar_number: "",
  },
};

export const getPaymentSummary = {
  insurance_partner_id: "", //
  insurance_plan_id: 0,
  finance_partner_id: "",
  finance_plan_id: 0,
};

export const rawCityList = [
  {
    id: 1,
    city_name: "Bengaluru",
    state: "Karnataka",
  },
  {
    id: 2,
    city_name: "Chennai",
    state: "Tamil Nadu",
  },
  {
    id: 3,
    city_name: "Mumbai",
    state: "Maharashtra",
  },
  {
    id: 4,
    city_name: "Pune",
    state: "Maharashtra",
  },
  {
    id: 5,
    city_name: "Kochi",
    state: "Kerala",
  },
  {
    id: 6,
    city_name: "Ahmedabad",
    state: "Gujarat",
  },
  {
    id: 7,
    city_name: "Hyderabad",
    state: "Telangana",
  },
  {
    id: 7,
    city_name: "Surat",
    state: "Gujarat",
  },
  {
    id: 8,
    city_name: "Calicut",
    state: "Kerala",
  },
  {
    id: 8,
    city_name: "Visakhapatnam",
    state: "Andhra Pradesh",
  },
];

export const testRideRawData = {
  title: "TEST RIDE",
  description:
    "Fill in the details below for your own F77 Test Ride Experience.",
  modal:
    "We are thrilled to inform you that your test ride experience for the F77 is confirmed! Here are the details of your test ride:",

  testrideLocationList: [
    {
      id: 1,
      value: "UV HANGER BANGALORE",
    },
    {
      id: 2,
      value: "UV BASE Chennai",
    },
    {
      id: 3,
      value: "UV Base MUMBAI",
    },
    {
      id: 4,
      value: "UV Base PUNE",
    },
    {
      id: 5,
      value: "UV Base COCHIN",
    },
  ],
};

export const rawStateList = [
  {
    id: 1,
    state: "Andhra Pradesh",
  },
  {
    id: 2,
    state: "Arunachal Pradesh",
  },
  {
    id: 3,
    state: "Assam",
  },
  {
    id: 4,
    state: "Bihar",
  },
  {
    id: 5,
    state: "Chhattisgarh",
  },
  {
    id: 6,
    state: "Goa",
  },
  {
    id: 7,
    state: "Gujarat",
  },
  {
    id: 8,
    state: "Haryanah",
  },
  {
    id: 9,
    state: "Himachal Pradesh",
  },
  {
    id: 10,
    state: "Jharkhandh",
  },
  {
    id: 11,
    state: "Karnataka",
  },
  {
    id: 12,
    state: "Kerala",
  },
  {
    id: 13,
    state: "Madhya Pradesh",
  },
  {
    id: 14,
    state: "Maharashtra",
  },
  {
    id: 15,
    state: "Manipur",
  },
  {
    id: 16,
    state: "Meghalaya",
  },
  {
    id: 17,
    state: "Mizoram",
  },
  {
    id: 18,
    state: "Nagaland",
  },
  {
    id: 19,
    state: "Odisha",
  },
  {
    id: 20,
    state: "Punjab",
  },
  {
    id: 21,
    state: "Rajasthan",
  },
  {
    id: 22,
    state: "Sikkim",
  },
  {
    id: 23,
    state: "Tamil Nadu",
  },
  {
    id: 24,
    state: "Telangana",
  },
  {
    id: 25,
    state: "Tripura",
  },
  {
    id: 26,
    state: "Uttar Pradesh	",
  },
  {
    id: 27,
    state: "Uttarakhand",
  },
  {
    id: 28,
    state: "West Bengal",
  },
];

// enquiryRawData
export const enquiryRawData = {
  title: "ENQUIRE HERE",
  title2: "F99 : REGISTER YOUR INTEREST",
  title3: "F77 : Fill in your details to register your interest",
  description: "Hello, Pilot ! Please fill the answers below to raise a query.",
  dealershipDescription:
    'Please click "next" below and fill our retail partnership form.',
  modal:
    "Your enguiry has been confirmed . You will be contacted by one of our representatives.",
  rawVehicle: [
    {
      id: 1,
      vehicle: "yes",
    },
    {
      id: 2,
      vehicle: "no",
    },
  ],
  dealershipOrF77QueryList: [
    {
      id: 1,
      text: "F77",
    },
    {
      id: 2,
      text: "Dealership / Distributorship",
    },
  ],
  rawHelpList: [
    {
      id: 1,
      text: "On road price",
    },
    {
      id: 2,
      text: "Financing",
    },
    {
      id: 3,
      text: "Request a callback from the UV team",
    },
    {
      id: 4,
      text: "Others..",
    },
  ],
  f99HelpList: [
    {
      id: 1,
      text: "F99",
    },
  ],
};

// wallpaerRawData
// wallpaerRawData
export const squadronRawData = {
  header: {
    title: "WALLPAPERS",
    trailing: "Ultraviolette",
  },
  gallery: {
    title: "Concept Art",
    subtitle: "WALLPAPERS",
    desc: "A tribute to the wonder of Science-Fiction and Cinema, that has left an indelible mark on generations of creators, inspiring them to think boldly, disrupt the status quo, and create a future that is as visionary as it is entertaining.",
  },
  images: [
    {
      src: `/k_d.jpg`,
      width: 0,
      height: 0,
      alt: "Uv Image Gallery Kylo Desktop",
    },

    {
      src: `/k_m.jpg`,
      width: 0,
      height: 0,
      alt: "Uv Image Gallery Kylo Mobile",
    },
    {
      src: `/s_d.jpg`,
      width: 0,
      height: 0,
      alt: "Uv Image Gallery Storm Desktop",
    },
    {
      src: `/y_m.jpg`,
      width: 0,
      height: 0,
      alt: "Uv Image Gallery Yoda Mobile",
    },

    {
      src: `/l_m.jpg`,
      width: 0,
      height: 0,
      alt: "Uv Image Gallery Luke Mobile",
    },

    {
      src: `/y_d.jpg`,
      width: 0,
      height: 0,
      alt: "Uv Image Gallery Yoda Desktop",
    },
    {
      src: `/s_m.jpg`,
      width: 0,
      height: 0,
      alt: "Uv Image Gallery Storm Mobile",
    },
    {
      src: `/l_d.jpg`,
      width: 0,
      height: 0,
      alt: "Uv Image Gallery Loda Desktop",
    },
  ],

  mach2airstrikeImages: [
    {
      src: `/f77_airstrike/1.jpg`,
      alt: "Mach2 airstrike",
      orientation: "auto",
    },
    {
      src: `/f77_airstrike/2.jpg`,
      alt: "Mach2 airstrike",
      orientation: "potrait",
    },
    {
      src: `/f77_airstrike/3.jpg`,
      alt: "Mach2 airstrike",
      orientation: "potrait",
    },
    {
      src: `/f77_airstrike/4.jpg`,
      alt: "Mach2 airstrike",
      orientation: "potrait",
    },
    {
      src: `/f77_airstrike/5.jpg`,
      alt: "Mach2 airstrike",
      orientation: "auto",
    },
    {
      src: `/f77_airstrike/6.jpg`,
      alt: "Mach2 airstrike",
      orientation: "potrait",
    },
    {
      src: `/f77_airstrike/7.jpg`,
      alt: "Mach2 airstrike",
      orientation: "landscape",
    },
    {
      src: `/f77_airstrike/8.jpg`,
      alt: "Mach2 airstrike",
      orientation: "potrait",
    },
    {
      src: `/f77_airstrike/9.jpg`,
      alt: "Mach2 airstrike",
      orientation: "auto",
    },
    {
      src: `/f77_airstrike/10.jpg`,
      alt: "Mach2 airstrike",
      orientation: "auto",
    },
    {
      src: `/f77_airstrike/11.jpg`,
      alt: "Mach2 airstrike",
      orientation: "potrait",
    },
    {
      src: `/f77_airstrike/12.jpg`,
      alt: "Mach2 airstrike",
      orientation: "potrait",
    },
    
  ],

  f99Images: [
    {
      src: `/f99/F991.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/f99/F998.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
    {
      src: `/f99/F992.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/f99/F993.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/f99/F994.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/f99/F995.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/f99/F9910.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/f99/F997.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
    {
      src: `/f99/F996.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/f99/F999.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/f99/F9911.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/f99/F9912.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/f99/F919.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
  ],

  f77Future: [
    {
      src: `/f77_future/1.png`,
      alt: "Uv Image Gallery",
      orientation: "landscape",
    },
    {
      src: `/f77_future/3.png`,
      alt: "Uv Image Gallery",
      orientation: "landscape",
    },
    {
      src: `/f77_future/2.png`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/f77_future/5.png`,
      alt: "Uv Image Gallery",
      orientation: "landscape",
    },
    {
      src: `/f77_future/8.png`,
      alt: "Uv Image Gallery",
      orientation: "landscape",
    },
    {
      src: `/f77_future/4.png`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/f77_future/6.png`,
      alt: "Uv Image Gallery",
      orientation: "landscape",
    },
    {
      src: `/f77_future/7.png`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
  ],

  spaceImages: [
    {
      src: `/space/2.jpg`,
      alt: "Uv Image Gallery",
      orientation: "landscape",
    },
    {
      src: `/space/8.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/space/6.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/space/space1.png`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/space/4.jpg`,
      alt: "Uv Image Gallery",
      orientation: "landscape",
    },
    {
      src: `/space/3.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/space/space4.png`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/space/space3.png`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/space/space5.png`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/space/9.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/space/10.jpg`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
    {
      src: `/space/space2.png`,
      alt: "Uv Image Gallery",
      orientation: "auto",
    },
  ],

  beyondAsphaltImages: [
    {
      src: `/beyond/Airy_Tails.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
    {
      src: `/beyond/All_Under_Control.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
    {
      src: `/beyond/Bring_It_On.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
    {
      src: `/beyond/Bringing_Dirty_Back.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
    {
      src: `/beyond/Golden_Moments_I.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
    {
      src: `/beyond/Golden_Moments_II.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
    {
      src: `/beyond/Head_Turner.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
    {
      src: `/beyond/Messy_Goals.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
    {
      src: `/beyond/Ready_To_Roll.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
    {
      src: `/beyond/Morning_Glide.jpg`,
      alt: "Uv Image Gallery",
      orientation: "landscape",
    },
    {
      src: `/beyond/Auburn_Haze.jpg`,
      alt: "Uv Image Gallery",
      orientation: "landscape",
    },
    {
      src: `/beyond/Kicking_Up_A_Storm.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
    {
      src: `/beyond/The_Future_Is_Now.jpg`,
      alt: "Uv Image Gallery",
      orientation: "potrait",
    },
    {
      src: `/beyond/Sniper_Alert.jpg`,
      alt: "Uv Image Gallery",
      orientation: "landscape",
    },
  ],
};

// pressRawData
export const pressRawData = {
  newsArticles: [
    {
      id: 1,
      imageLink: "/press/4.png",
      date: "MARCH  2023",
      title: "TopGear: Electric Motorcycle of the year",
      link: "https://www.topgearmag.in/news/industry/bbc-topgear-magzine-india-awards-2023-celebrating-the-best-of-automobiles",
      shortDescription:
        "The fun quotient of motorcycling has been redefined with an electrifying performance. The new-age startup brand - Ultraviolette has taken the motorcycling space seriously and intends to rule the space with F77 Recon. The product has been encouraged and honoured with the Electric Motorcycle of the Year.",
    },
    {
      id: 2,
      imageLink: "/press/5.png",
      date: "AUGUST 2023",
      title: "Ultraviolette space Edition series sold out in 90 seconds!",
      link: "https://auto.hindustantimes.com/auto/electric-vehicles/ultraviolette-f77-space-edition-series-sold-out-in-just-90-seconds-41692766529472.html",
      shortDescription:
        "The motorcycle has been built as a tribute to Chandrayaan-3 mission and the country's space odyssey. It makes use of advanced aircraft electronics based technology and interfaces such as real-time roll, pitch, yaw feedback, just like what is found in an aircraft. The bike's key has been developed using a single piece of metal, which is of aerospace grade, thus carrying forward...",
    },
    {
      id: 3,
      imageLink: "/press/1.jpg",
      date: " FEB 2023",
      title: "Ultraviolette Goes Ballistic With Its 200kmph E-Racer",
      link: "https://www.zigwheels.com/news-features/ev-news/ultraviolette-goes-ballistic-with-its-200kmph-e-racer/48447/#leadform",
      shortDescription:
        "Hot on the heels of the F77's debut, Bengaluru-based Ultraviolette Automotive has pulled the wraps off its F99 Factory Racing platform at the Auto Expo 2023. The EV maker has gone all ballistic with this program to build the country's first e-motorcycle race bike. The Ultraviolette F99 retains the sporty silhouette of the street-legal F77, but adds some serious aero bits to it.",
    },
    {
      id: 4,
      imageLink: "/press/3.jpg",
      date: " FEB 2023",
      title: "Ultraviolette F77 Deliveries Commence",
      link: "https://www.autocarindia.com/bike-news/ultraviolette-f77-deliveries-commence-427422",
      shortDescription:
        "Deliveries of the Ultraviolette F77 have commenced three months since its official launch. With the company's first dealership scheduled to open in March, deliveries are currently taking place directly from Ultraviolette's manufacturing facility in Ben..",
    },
    {
      id: 5,
      imageLink: "/press/2.jpg",
      date: "MARCH  2023",
      title: "Ultraviolette unveils India-made F77",
      link: "https://www.business-standard.com/article/automobile/ultraviolette-unveils-india-made-f77-electric-motorcycle-for-rs-3-8-lakh-122112400935_1.html",
      shortDescription:
        "F77 is designed and made in India and will be available in three forms: Airstrike, Shadow, and Laser. It is powered by an integrated 10.3 kWh (kilowatt-hours) lithium-ion battery architecture for the top variant. The company said the bike has the most advanced battery pack in the industry. It offers an Indian driving condition range of 307 km, the highest for any electric two-wheeler in the country.",
    },
  ],
  videos: [{}],
};

// leaderboardRawData
export const leaderboardRawData = {
  header: {
    title: "UV LEADERBOARD",
    trailing: "/images/about/aboutmobile.png",
  },
  distanceCovered: {
    title: "DISTANCE COVERED",
    subtitle: "AUGUST 2023",
    desc: "A tribute to the wonder of Science-Fiction and Cinema, that has left an indelible mark on generations of creators, inspiring them to think boldly, disrupt the status quo, and create a future that is as visionary as it is entertaining.",
    pilots: [
      {
        sl_no: 1,
        name: "NAVEEN KUMAR",
        km_covered: "9969",
      },
      {
        sl_no: 2,
        name: "BAALA MANIKANDAN",
        km_covered: "7911",
      },
      {
        sl_no: 3,
        name: "SOMANNA MM",
        km_covered: "4527",
      },
      {
        sl_no: 4,
        name: "KRISHNA MIRAJKAR",
        km_covered: "4285",
      },
      {
        sl_no: 5,
        name: "KESHAVA N",
        km_covered: "3417",
      },
    ],
  },
  rangeCovered: {
    title: "RANGE COVERED",
    subtitle: "AUGUST 2023",
    pilots: [
      {
        sl_no: 1,
        name: "NAVEEN KUMAR",
        range_covered: "298.15",
      },
      {
        sl_no: 2,
        name: "Santhakumariamma C",
        range_covered: "221.51",
      },
      {
        sl_no: 3,
        name: "BAALA MANIKANDAN",
        range_covered: "216.71",
      },
      {
        sl_no: 4,
        name: "SUHAS SEQUEIRA",
        range_covered: "214.21",
      },

      {
        sl_no: 5,
        name: "KRISHNA MIRAJKAR",
        range_covered: "199.25",
      },
    ],
  },
  pilotMilestone: {
    name: "BAALA MANIKANDAN",
    image: "/images/leaderboard/milestone-pilot-avatar.png",
    km_tarvelled: "7000+",
    variant: "F77 RECON",
    charge_cycles: "24",
    states_driven: "09",
    member: "BAALA IS A PART OF </br>UV SQUADRON SINCE April.",

    max_temprature: "46.4°",
    min_temprature: "-1.53°",
    total_energy_consumed: "331533 WH",
    total_energy_recovered: "10390 WH",
  },
  testimonials: [
    {
      rider: "NAVEEN KUMAR",
      image: "/naveen.jpg",
      comment:
        "It sounds so cool, I do feel like I'm taking a flight or like I'm sitting in a flight simulator… Even the button system is like a gaming console, the display, animation and everything… It's so appealing!",
      location: "BANGALORE, India",
      link: "https://www.youtube.com/watch?v=BlH6OWDB6E4",
    },
    {
      rider: "MOHAN n.s.",
      image: "/mohan.jpg",
      comment:
        "It's electrifying and absolutely thrilling! It's amazing… I'm a very young person, I just turned sixty, and after I sit on the bike, I'm 16.",
      location: "BANGALORE, India",
      link: "https://www.youtube.com/watch?v=sM3G7ZsKSXo",
    },
    {
      rider: "BALA MANIKANDAN",
      image: "/bala_1.jpg",
      comment:
        "I took my F77 from Chennai to Leh, Ladakh, Kargil, Kashmir, and many parts of India. It was one helluva trip with zero issues. I traveled through temperatures ranging from 44 degrees C to -15 degrees in the peak terrains. ",
      location: "CHENNAI, INDIA",
    },
  ],
};

// enquiryRawData
export const refundRawData = {
  title: "REFUND PROCESS",
  confirmDetailsDescription:
    "We understand that sometimes plans change, and we want to make the cancellation process as smooth as possible for you. Please confirm your booking details.",
  reasonDescription: "Please tell us why you'd like to cancel your booking?",
  retainDescription:
    "Cancelling your motorcycle booking could result in a significant waiting period if you decide to rebook in the future. We encourage you to consider the impact that cancelling may have.",
  calculatesavingsFormDescription:
    "Owning an electric vehicle can be up to 10x more economical than owning a petrol-powered vehicle, calculate your savings.",
  finalRefundFormDescription: "Do you still want to cancel ?",
};

// CONFIGURE
export const configure = {
  laser: [
    {
      category: "accessory",
      name: "STANDARD CHARGER",
      imagesList: ["sm/sm_1.jpg", "sm/sm_2.jpg"],
    },
    {
      category: "accessory",
      name: "BOOST CHARGER",
      imagesList: ["bm/bm_1.jpg", "bm/bm_2.jpg"],
    },
  ],
  airstrike: [],
  shadow: [],
};

// by default userProfile
export const UserRawData = {
  booking_paid: true,
  country: "IN",
  email: "dn.singh@foxena.com",
  is_se: false,
  is_vip: false,
  items: [
    {
      category: "VARIANT",
      id: 1,
      image_link:
        "https://d2atk76x06g5eh.cloudfront.net/config/thumb/<model>.png",
      included: false,
      included_on: 0,
      name: "Original / 206 km IDC range",
      price: 380000,
    },
    {
      category: "",
      id: 3,
      image_link:
        "https://d2atk76x06g5eh.cloudfront.net/config/thumb/charger.png",
      included: true,
      included_on: 0,
      name: "STANDARD CHARGER",
      price: 0,
    },
    {
      category: "UV CARE",
      id: 10,
      image_link:
        "https://d2atk76x06g5eh.cloudfront.net/config/thumb/uvcare.png",
      included: false,
      included_on: 2,
      name: "UVCARE PLUS",
      price: 21500,
    },
  ],
  model: "airstrike",
  name: "D N Singh",
  order_date: "",
  order_id: "",
  pincode: "212217",
  reconfigured: false,
  stage: [true, true, false, false],
  state: "UP",
};

export const homeSlideData = {
  data: [
    {
      id: 1,
      title: "THERMAL",
      alt: "THERMAL",
      src: `/images/home/newhome/slides/mechanical.png`,
      // videoUrl:'/images/home/newhome/battery/thermal.webm',
      videoUrl:
        "https://player.vimeo.com/external/938323372.m3u8?s=268b865b526988f47ac1cb98532db6df36752b8c&logging=false",
      desc: "The battery unit is meticulously designed to evenly dissipate heat from all cells across the package, to ensure the highest level of safety and an enhanced cycle life. ",
    },
    {
      id: 2,
      title: "ELECTRICAL",
      alt: "ELECTRICAL",
      src: `/images/home/newhome/slides/technical.png`,
      videoUrl:
        "https://player.vimeo.com/external/936962357.m3u8?s=8de5a2af66c3c6d54fb828aae426af3b6ea332b7&logging=false",
      desc: "The only battery pack in India that comes equipped with cell level fuse technology, to ensure rider and vehicle safety under all conditions.",
    },
    {
      id: 3,
      title: "MECHANICAL",
      alt: "MECHANICAL",
      src: `/images/home/newhome/slides/mechanical.png`,
      videoUrl:
        "https://player.vimeo.com/external/936962331.m3u8?s=57d83808999832664ae849ea42ea83580f37015a&logging=false",
      desc: "With an all aluminium casing, this IP67 rated power module can take on vibrations, shock and impact protection to a new industry leading benchmark.",
    },
    {
      id: 4,
      alt: "ELECTRONIC & SOFTWARE",
      title: "ELECTRONIC & SOFTWARE",
      src: `/images/home/newhome/slides/technical.png`,
      videoUrl:
        "https://player.vimeo.com/external/936962307.m3u8?s=4d333d69100f6f6225a9e88e77417d51e59f4e47&logging=false",
      desc: "Protection mechanisms and protocols kick-in in micro-seconds on the world’s most advanced Battery Management Systems",
    },
    // {
    //   id: 5,
    //   alt: "chargingNetwork",
    //   title:"MECHANICAL",
    //   src: `/images/home/newhome/slides/mechanical.png`,
    //   videoUrl:'/chikma.mp4',
    //   desc:"The proprietary battery technology, catapults the F77 miles ahead of the industry, with a category leading IDC range of 307 km on a single charge."
    // },
  ],
};

import { API_CONSTANTS } from "../services/constants";
const imageUrl = `${API_CONSTANTS.HOMEPAGE_BASE_URL}/charger`;

export const homeSlideData2 = {
  data: [
    {
      id: 1,
      title: "Charge anywhere",
      alt: "charge anywhere",
      src: `${imageUrl}/charge_anywhere.png`,
      videoUrl: "",
      // videoUrl:'https://player.vimeo.com/external/938091531.m3u8?s=413bac9a24de13ccfa18ab194c843dd955a11a7f&logging=false',
      desc: "Chargers work on standard 16amp sockets found almost everywhere you go.",
    },
    {
      id: 2,
      title: "Easy to carry",
      alt: "Easy to carry",
      src: `/images/home/newhome/slides/technical.png`,
      videoUrl:
        "https://player.vimeo.com/external/937017770.m3u8?s=ee8d46b3d1ca09e4c05879f2e22a0e061c2848ea&logging=false",
      desc: "Carrying your energy station with you, to embark on that spontaneous ride anytime, anywhere.",
    },
    {
      id: 3,
      title: "Charger Wall mounts",
      alt: "Charge anywhere",
      src: `${imageUrl}/3_WallMounts.webp`,
      videoUrl: "",
      desc: "Secure your portable chargers with these wall mounts. Safety and security ensured.",
    },
  ],
};
