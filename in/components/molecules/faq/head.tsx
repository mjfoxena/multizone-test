import Image from "next/image";

function FaqHead() {
  return (
    <div className="w-full h-full flex relative justify-center items-center">
      <div className="w-full h-[22.688rem] max-sm:h-[17.500rem] relative">
        <div className="absolute inset-0 z-10 max-sm:opacity-50">
          <Image
            style={{
              flexShrink: 0,
              opacity: 0.09,
              mixBlendMode: "overlay",
            }}
            src={"/images/faq/topBG.png"}
            alt="shade"
            layout="fill"
          />
        </div>
      </div>

      <div className="flex flex-col absolute top-0 w-full max-w-[87%] pt-[3.625rem] max-sm:pt-[1rem]">
        <div className="flex justify-between items-center ">
          <div>
            <h1 className="text-gray-700 eurostile text-[3.000rem]  max-sm:text-[24px]">
              FAQ’s
            </h1>
          </div>
          <div className="w-[8.563rem] h-[2.000rem] max-sm:h-[2.875rem]">
            <Image
              src={"/images/faq/theshadeicon.svg"}
              alt="shade"
              width={100}
              height={100}
              className="w-full h-full object-contain"
            ></Image>
          </div>
        </div>
        <hr className=" flex-shrink-0 border-[1px] border-red-600 mt-[2.500rem] max-sm:mt-[1.563rem]" />
        <div>
          <h1 className="mt-[2.125rem] max-sm:mt-[1.750rem] text-[#404040] brutal text-xl font-normal leading-normal capitalize max-sm:text-[18px]">
            Got questions? We've got answers!
          </h1>
          <p className="w-full max-w-[41.375rem] max-sm:w-full max-sm:text-[14px] mt-[0.813rem] max-sm:mt-[1.250rem] text-[#404040] brutal  text-base font-normal leading-normal">
            Browse our FAQ section for quick solutions to common enquiries.
            Can't find what you're looking for? Reach out to our friendly
            support team for personalized assistance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FaqHead;
