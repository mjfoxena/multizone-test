import Image from "next/image";
import { MapCss } from "../../../utils/utils";
import Style from "./progressbar.module.scss";
interface progressbarProps {
  ind: number;
  stage: number;
  vip: boolean;
  ele: {
    step: string;
    status: string;
    desc: string;
  };
  orangebar: boolean;
}
export const ProgressBar = ({
  vip,
  stage,
  ind,
  ele,
  orangebar,
}: progressbarProps) => {
  return (
    <div className="w-full mb-6 sm:mb-0">
      {/* --------pbar----- */}
      <div className="w-full  flex flex-row  items-center">
        {/* cross */}
        <div className="mb-2 sm:mx-3 sm:mb-0">
          <Image
            src={`/images/profile/${ind <= stage ? "plus.png" : "cross.png"}`}
            width={18}
            height={89}
            alt="product"
          />
        </div>
        {/* bar */}
        <div className="hidden sm:flex">
          {ind <= 2 && (
            <Image
              src={"/images/profile/border.png"}
              width={150}
              height={10}
              alt="product"
            />
          )}
        </div>
      </div>
      {/* ------stages------ */}
      <div
        className={MapCss(
          Style,
          `brutal ${
            (vip && ind <= stage) || (orangebar && ind <= stage)
              ? "color-orange"
              : !vip && ind <= stage
              ? "color-red"
              : "color-dark-grey"
          }`,
          "w-full mt-1 font-normal text-sm sm:text-xl"
        )}
      >
        {ele.step}
        <div
          className={MapCss(
            Style,
            `brutal ${ind <= stage ? "color-grey" : "color-dark-grey"}`,
            "font-normal text-xs sm:text-sm"
          )}
        >
          {ele.status}
          <div
            className={MapCss(
              Style,
              `brutal ${ind <= stage ? "color-grey" : "color-dark-grey"}`,
              `mt-4 normal-case ${
                ind == 2 ? "w-3/5" : "w-fit"
              } leading-7 hidden sm:flex`
            )}
          >
            {ele.desc}
          </div>
        </div>
      </div>
    </div>
  );
};
