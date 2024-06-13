import Image from "next/image";

export const AlertItem = ({
  iconSrc,
  title,
  fontWeight,
  opacity,
  color,
  rotate,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-row items-center gap-3 cursor-pointer"
    >
      <Image
        src={iconSrc}
        alt="icon"
        width={25}
        priority
        height={25}
        objectFit="cover"
        className={`w-5 h-5 flex-shrink-0 transform transition-transform duration-300 ${rotate}`}
      />
      <h1
        className={`${color} text-base font-normal whitespace-nowrap uppercase brutal leading-normal ${fontWeight} ${
          opacity ? "opacity-60" : ""
        }`}
      >
        {title}
      </h1>
      <div className="pl-8 md:hidden"> </div>
    </div>
  );
};
