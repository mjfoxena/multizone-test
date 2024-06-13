const LeaderBoardCssCard = ({
    children,
    Height = "100%",
    Width = "100%",
    classNames = ""  
    
  }) => {
    return (
      <>
        <div className={classNames}>
          <div
            style={{
              height: Height,
              width: Width,
            }}
          >
            {children}
          </div>
        </div>
      </>
    );
  };
  
  export default LeaderBoardCssCard;