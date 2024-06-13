import Image from "next/image";
import Link from "next/link";

function ThankyouManageData() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#ECECEC]">
      <div className="w-full h-full max-w-[80%] max-sm:max-w-[90%] flex flex-col">
        <div className=" flex justify-between items-center w-full mt-[6.063rem]">
          <h1 className="eurostile text-[#414141] text-[40px] max-sm:text-[24px] font-normal leading-normal text-custom-gray">
            THANK YOU!
          </h1>{" "}
          <div className="w-[137px] h-[32px] opacity-80 max-sm:hidden">
            <Image
              src={"/images/consent/dotssquare.svg"}
              alt="arrow"
              width={100}
              height={100}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <div className="mt-[3.125rem] max-sm:mt-5">
          <hr
            className="w-full h-0 flex-shrink-0"
            style={{ borderWidth: "1.486px", borderColor: "#ED1C24" }}
          />
        </div>
        <div className="mt-[3.125rem] max-sm:mt-10">
          <p className="text-custom-gray brutal text-[16px] font-normal leading-normal">
            We have sent you an email with your access details
          </p>
        </div>
        <Link href="/">
          <button className="w-[20%] max-sm:w-full mb-[8.313rem] max-sm:mb-[24.125rem] flex justify-start mt-5  items-start gap-[10px]   text-black brutal text-[16px] font-medium leading-[28px] tracking-[0.2px]">
            GO BACK HOME
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ThankyouManageData;
