import SideBarPanel from "../RightSidePanel";
import Style from "./leftsidebar.module.scss";

const LeftSideBar = ({
  children,
  rightImageSrc,
}: {
  children: any;
  rightImageSrc?: any;
}) => {
  return (
    <div className={Style.root}>
      <div className={Style.subroot}>{children}</div>
      <div className="w-full sm:w-1/2 sm:h-full">
        <SideBarPanel rightImageSrc={rightImageSrc} />
      </div>
    </div>
  );
};

export default LeftSideBar;
