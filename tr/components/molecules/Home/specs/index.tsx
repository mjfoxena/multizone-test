import Image from "next/image";
import { API_CONSTANTS } from "../../../../services/constants";
import Style from "../index.module.scss";
const specSHeetDownload = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/pdf/F77_specsheet.pdf`;
const Specs = ({ isMobile }) => {
  return (
    <div>
      <div className="pt-[40px] pb-[80px] sm:pt-[166px] sm:pb-[202px]">
        <div className="flex flex-col border-[#F2F2F2] border-[1px]">
          <div className="flex flex-row justify-between items-center py-[21px] sm:py-[73px] border-[#F2F2F2] border-b-[1px]">
            <div className={Style.specsText}>specs</div>
            <div className="flex flex-row pr-[27px] sm:pr-[72px]"></div>
          </div>
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-full sm:w-[796px] border-[#F2F2F2] border-r-[1px]">
              <div className="flex flex-row justify-around ml-[22px] mr-[10px] py-[35px] sm:ml-[82px] sm:py-[70px]">
                <div className="flex flex-col sm:mr-[143px]">
                  <div className={Style.specsSubhead}>2.9 sec</div>
                  <div className={Style.specsSubText}>0 - 60</div>
                </div>
                <div className="flex flex-col">
                  <div className={Style.specsSubhead}>152 kmph</div>
                  <div className={Style.specsSubText}>Top speed</div>
                </div>
              </div>
              <div className="h-[20px] sm:h-[48px] border-[#F2F2F2] border-y-[1px]"></div>
            </div>
            <div className="flex justify-center items-center w-[182px] sm:w-[364px] border-[#F2F2F2] sm:border-b-[1px]">
              <div className="flex flex-col ">
                <div className={Style.specsSubhead}>7.8 sec</div>
                <div className={Style.specsSubText}>0 - 100</div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="flex flex-col sm:flex-row sm:py-[65px] sm:pl-[82px] sm:pr-[63px] ">
            <div className="w-full sm:w-[796px] flex flex-row justify-between border-[#F2F2F2] border-b-[1px] sm:border-0">
              <div className="flex flex-row justify-around py-[20px] sm:py-0 sm:justify-between w-full sm:w-[340px] border-[#F2F2F2] border-r-[1px] sm:border-0">
                <div className="flex flex-col ">
                  <div className={Style.specsSubhead}>90 nm</div>
                  <div className={Style.specsSubText}>torque</div>
                </div>
                <div className="flex flex-col ">
                  <div className={Style.specsSubhead}>30.2 KW</div>
                  <div className={Style.specsSubText}>POWER</div>
                </div>
              </div>
              <div className="flex flex-col w-[147px] sm:w-[212px] my-[20px] sm:my-0  mx-[12px] sm:ml-0 sm:w-full">
                <div className={Style.specsSubhead}>upto 8 yrs*</div>
                <div className={Style.specsSubText}>warranty</div>
              </div>
            </div>
            <div className="flex flex-row cursor-pointer justify-center items-center py-[20px] sm:py-0 sm:justify-end sm:w-[364px] sm:items-end sm:mb-[20px]">
              <div
                className={Style.fullSpecs}
                onClick={() =>
                  fetch(specSHeetDownload).then((response) => {
                    response.blob().then((blob) => {
                      const fileURL = window.URL.createObjectURL(blob);
                      let alink = document.createElement("a");
                      alink.href = fileURL;
                      alink.download = "Specs_Sheet.pdf";
                      alink.click();
                    });
                  })
                }
              >
                DOWNLOAD FULL SPECS SHEET
              </div>
              <div className="ml-[9px]">
                <Image
                  alt="arrow"
                  width={22}
                  height={22}
                  style={{ objectFit: "cover" }}
                  src={"/images/home/whiteRoundedArrow.svg"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specs;
