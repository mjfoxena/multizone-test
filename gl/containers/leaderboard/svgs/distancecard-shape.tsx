import Image from "next/image";
import Style from "../../../pages/leaderboard/leaderboard.module.scss";
const DistanceCardShape = ({
  height,
  width,
  className = "",
  isTop = false,
}) => {
  return (
    <div className={Style.distanceCardShape}>
      {isTop ? (
        <svg
          width="489"
          height="489"
          viewBox="0 0 489 489"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.75 0H50.3038L59.8073 8.48524H332.602L345.5 0L488.25 0V47.5174H0.75V0Z"
            fill="url(#paint0_linear_1370_9494)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1370_9494"
              x1="244.5"
              y1="0"
              x2="244.5"
              y2="47.5174"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ED3248" />
              <stop offset="1" stopColor="#B8002C" />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg
          width="462"
          height="48"
          viewBox="0 0 462 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.75 0H50.3038L60.8221 9.5H309.088L323 0L461.75 0V47.5174H0.75V0Z"
            fill="url(#paint0_linear_1370_9501)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1370_9501"
              x1="143.75"
              y1="-62"
              x2="129.918"
              y2="72.9819"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#616161" />
              <stop offset="1" stopColor="#272727" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default DistanceCardShape;