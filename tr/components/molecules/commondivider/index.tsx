const CommonDivider = ({ className = "", borderColor = "#2D2D2D" }) => {
  return (
    <div className={className}>
      <div
        className={`sm:w-[100%]  sm:mx-0 my-[20px] border-b-[1px] sm:my-[32px] sm:border-b-[2px] border-[#9E9E9E]`}
      ></div>
    </div>
  );
};

export default CommonDivider;
