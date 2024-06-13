import Image from "next/image";
import LeaderBoardCoveredSVGFolder from "./svgs/distancecovered-shape";

const LeaderBoardFolderImage = ({
  image,
  children,
  folderHeight = "100%",
  folderWidth = "100%",
  
}) => {
  return (
    <>
      <div className="relative w-full">
        <div
          className="absolute w-full"
          style={{
            height: folderHeight,
            width: folderWidth,
          }}
        >
          {children}
        </div>
        <div>
          <Image
            alt="leaderboard_folder"
            width={900}
            height={920}
            src={image}
            style={{
              height: folderHeight,
              minWidth: folderWidth,
              // objectFit: "cover",
            }}
            // className={"w-full"}
          />
        </div>
      </div>
    </>
  );
};

export default LeaderBoardFolderImage;