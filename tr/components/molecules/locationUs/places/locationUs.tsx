import Image from "next/image";
import Link from "next/link";
import { DealerLocation } from "../../../../services/LocationServices";

// const placeItems = [
//   {
//     cordinate1: "12°57'22.788''N",
//     cordinate2: "77°38'27.996''E",
//     shoroom: "UV HANGAR 1.O",
//     city: "BENGALURU - INDIRANAGAR",
//     dec: "529/530, Krishna Reddy Layout, Amarjyoti Layout, Domlur, Bengaluru, Karnataka 560071",
//     date: "Mon - Sun  ",
//     time: "10:00 - 20.30",
//     contact: "Contact",
//     cNumber: "080-69453322",
//     getDiirection: "",
//     opening: "",
//   },
//   {
//     cordinate1: "13°1'14.6604''N",
//     cordinate2: "80°13'30.76''E",
//     shoroom: "UV SPACESTATION",
//     city: "CHENNAI - SAIDAPET",
//     dec: "No. 375, Mount Road, Saidapet, Chennai, Tamil Nadu - 600015 Landmark : Next to Saidapet Metro",
//     date: "Mon - Sun  ",
//     time: "10:00 - 20.30",
//     contact: "Contact",
//     cNumber: "080-69453322",
//     getDiirection: "",
//     opening: "openingsoon",
//   },
//   {
//     cordinate1: "18°32'7.8648''N",
//     cordinate2: "73°51'4.7304''E",
//     shoroom: "UV SPACE POD",
//     city: "PUNE - SHIVAJI NAGAR",
//     dec: "Showroom No. - S3, Epicentre 64-C1, Old Mumbai - Pune Highway, Wakdewadi, Shivajinagar, Pune, Maharashtra - 411005. Landmark : Next to Punjab & Sind Bank",
//     date: "Mon - Sun  ",
//     time: "10:00 - 20.30",
//     contact: "Contact",
//     cNumber: "080-69453322",
//     getDiirection: "",
//     opening: "openingsoon",
//   },
//   {
//     cordinate1: "10°0'34.074''N",
//     cordinate2: "76°18'43.4664''E",
//     shoroom: "UV SPACESTATION",
//     city: "KOCHI - PADIVATTOM",
//     dec: "Near 40/2808A, PipeLine Junction, NH Bye Pass, Sonia Nagar, Padivattom, Anjumana, Ernakulam, Kerala - 682024. Landmark : Next to QRS Home Appliances",
//     date: "Mon - Sun  ",
//     time: "10:00 - 20.30",
//     contact: "Contact",
//     cNumber: "080-69453322",
//     getDiirection: "",
//     opening: "openingsoon",
//   },
//   {
//     cordinate1: "23°0'23.7348''N",
//     cordinate2: "72°30'5.5836''E",
//     shoroom: "UV SPACESTATION",
//     city: "AHMEDABAD - MAKARBA",
//     dec: "Shop 2, Ground floor, Earth Arise, SG Highway Service Road, Makarba, Ahmedabad, Gujarat - 380015. Landmark : Near Gallops Hyundai",
//     date: "Mon - Sun  ",
//     time: "10:00 - 20.30",
//     contact: "Contact",
//     cNumber: "080-69453322",
//     getDiirection: "",
//     opening: "openingsoon",
//   },
//   {
//     cordinate1: "17°27'31.392''N",
//     cordinate2: "78°21'59.13''E",
//     shoroom: "UV SPACESTATION",
//     city: "HYDERABAD - HITECH CITY",
//     dec: "Lorven Tiara, Ground Floor, Survey No. 34, Kothaguda Junction, Kondapur, HITEC City, Hyderabad, Telangana - 500084. Landmark : Kotaguda X Road",
//     date: "Mon - Sun  ",
//     time: "10:00 - 20.30",
//     contact: "Contact",
//     cNumber: "080-69453322",
//     getDiirection: "",
//     opening: "openingsoon",
//   },
//   {
//     cordinate1: "21°9'10.0764''N",
//     cordinate2: "72°46'33.834''E",
//     shoroom: "UV SPACE POD",
//     city: "SURAT - VESU",
//     dec: "A-1, Ground Floor, Sai Kutir Society, University Road, Vesu, Surat, Gujarat-395007. Landmark : Opposite Reliance Foundation School",
//     date: "Mon - Sun  ",
//     time: "10:00 - 20.30",
//     contact: "Contact",
//     cNumber: "080-69453322",
//     getDiirection: "",
//     opening: "openingsoon",
//   },
//   {
//     cordinate1: "11°16'32.0628''N",
//     cordinate2: "75°46'21.6156''E",
//     shoroom: "UV SPACE POD",
//     city: "CALICUT - NADAKKAVE",
//     dec: "Survey No. 741/1, 742, Ace Centre Point, Fashion Factory Building, Kannur Rd, Nadakkave, West Hill, Kozhikode, Kerala - 673011. Landmark : Near to Westway Hotel",
//     date: "Mon - Sun  ",
//     time: "10:00 - 20.30",
//     contact: "Contact",
//     cNumber: "080-69453322",
//     getDiirection: "",
//     opening: "openingsoon",
//   },
//   {
//     cordinate1: "17°44'8.9448''N",
//     cordinate2: "83°18'15.5772''E",
//     shoroom: "UV SPACESTATION",
//     city: "VISAKHAPATNAM - DWARAKA NAGAR",
//     dec: "49-52-3, Ground Floor, S S N R Square, Shankar Matam Road, Visakhapatnam, Andhra Pradesh - 530016\nLandmark: Beside Karnataka Bank",
//     date: "Mon - Sun  ",
//     time: "10:00 - 20.30",
//     contact: "Contact",
//     cNumber: "080-69453322",
//     getDiirection: "",
//     opening: "openingsoon",
//   },
// ];

interface PlaceProps {
  dealerLocation: DealerLocation;
}

const PlaceCard: React.FC<PlaceProps> = ({ dealerLocation }) => {
  return (
    <div className="h-[19.688rem] w-[31.875rem] flex flex-col justify-start ">
      {/* cordinate and shoroom */}
      <div className="w-full h-[2.500rem] flex justify-start items-center">
        <div className="border border-[#B7B7B7] w-[5.938rem] h-full rounded-lg flex-col flex justify-center items-center">
          <h1 className="text-[#C7C7C7] font-medium brutal text-xs  tracking-tight">
            {`${dealerLocation.location.latitude}`}
          </h1>
          <h1 className="text-[#C7C7C7] font-medium brutal text-xs  tracking-tight">
            {`${dealerLocation.location.longitude}`}
          </h1>
        </div>
        <h1 className="text-[#9C9C9C] font-medium brutal text-base leading-25.6 pl-[0.688rem]">
          {`${dealerLocation.dealer_type}`}
        </h1>
      </div>
      {/* cit */}
      <div className="mt-[1.688rem]">
        <h1 className="text-[#404040] font-medium brutal text-[28px] max-md:text-[20px]">
          {`${dealerLocation.name}`}
        </h1>
      </div>
      {/* dec */}
      <div className="mt-[0.563rem] max-w-[31.875rem] max-md:max-w-[20.000rem]">
        <p className="text-[#404040] font-normal brutal text-base leading-[25.6px]">
          {`${dealerLocation.address}`}
        </p>
      </div>
      {/* date contact  */}
      <div className="mt-[3.188rem]">
        {dealerLocation.operational ? (
          <div className="w-[17.500rem] flex gap-5">
            {/* date time */}
            <div className="flex flex-col">
              <h1 className="text-[#5E5E5E] font-normal brutal text-base leading-[25.6px]">
                {`${dealerLocation.operating_timings.days}`}
              </h1>

              <h1 className="text-[#404040] font-medium brutal text-base leading-[25.6px]">
                {`${dealerLocation.operating_timings.hours}`}
              </h1>
            </div>

            {/* cotact */}

            <div className="flex flex-col justify-start">
              <h1 className="text-[#5E5E5E] font-normal brutal text-base leading-[25.6px]">
                Contact
              </h1>

              <h1 className="text-[#404040] font-medium brutal text-base leading-[25.6px]">
                {`${dealerLocation.contact}`}
              </h1>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {/* get direction */}

        <div className="mt-[1.875rem]">
          <div className="flex w-full gap-[1.625rem]">
            {dealerLocation.operational ? (
              <Link href={`${dealerLocation.directions_link}`} target="_blank">
                <div className="flex justify-center items-center">
                  <h1 className="text-[#343434] font-normal disketMono text-xs leading-normal tracking-[0.8px] underline">
                    GET DIRECTIONS
                  </h1>
                  <div className="pl-[0.313rem]">
                    <Image
                      src={"/images/locationUs/icons/arrow.svg"}
                      alt="arrow"
                      width={100}
                      height={100}
                      className="h-[9.6px] w-[9.6px]"
                    />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-md px-3 py-1 bg-[#313131] text-[#FFF] brutal -mt-8">
                <h1>OPENING SOON</h1>
              </div>
            )}
            {dealerLocation.address && dealerLocation.directions_link ? (
              <Link href={`testride`}>
                <div className="flex justify-center items-center">
                  <h1 className="text-[#343434] font-normal disketMono text-xs leading-normal tracking-[0.8px] underline">
                    BOOK TEST RIDE
                  </h1>
                  <div className="pl-[0.313rem]">
                    <Image
                      src={"/images/locationUs/icons/arrow.svg"}
                      alt="arrow"
                      width={100}
                      height={100}
                      className="h-[9.6px] w-[9.6px]"
                    />
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

interface DealerLocationsProps {
  dealerLocations: DealerLocation[];
}

const Places: React.FC<DealerLocationsProps> = ({ dealerLocations }) => {
  return (
    <div className="w-full h-full flex justify-center relative">
      <div className="w-full h-full flex flex-col justify-start items-start max-w-[77.813rem] max-md:max-w-[21.188rem] mt-[10.563rem] max-md:mt-[3.438rem] mb-[8.375rem]">
        {/* card */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-[14.188rem] gap-y-[7.500rem]">
          {dealerLocations?.map((dealerLocation, index) => (
            <PlaceCard key={index} dealerLocation={dealerLocation} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Places;