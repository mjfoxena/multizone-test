import DistanceBoardShape from "./svgs/distancecovered-shape";

const LeaderBoardFolderSVG = ({
  children,
  height = "720",
  width = "608",
  folderClassName = "",
  category,
}) => {
  return (
    <>
      <div className="relative w-full h-full">
        <div
          className="absolute w-full h-full"
          // style={{
          //   height: height,
          // }}
        >
          {children}
        </div>
        <div>
          {category === "distance" && (
            <DistanceBoardShape height={height} width={width} />
          )}
        </div>
      </div>
    </>
  );
};

export default LeaderBoardFolderSVG;