import Image from "next/image";
import Style from "./rightsidepanel.module.scss";

const SideBarPanel = ({
  rightImageSrc,
}: {
  rightImageSrc?: string | undefined;
}) => {
  return (
    <>
      <div className="sm:h-full w-full bg-[#E2E2E2] bottom-0">
        <Image
          alt="Ultraviolette Electric Motorcycle"
          fill
          className={Style.image1}
          src={rightImageSrc || "/images/rightSideBar/right-bike.jpg"}
        />
        <Image
          alt="Ultraviolette Electric Motorcycle"
          fill
          className={Style.image}
          src={rightImageSrc || "/images/rightSideBar/right-bike.jpg"}
        />
      </div>
    </>
  );
};

export default SideBarPanel;
