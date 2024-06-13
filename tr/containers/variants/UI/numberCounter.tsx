import Style from "./numberCounter.module.scss";

const NumberCounter = ({ value, onEventChanged, min = 1, max = 100 }) => {
  return (
    <>
      <div className={`${Style["custom-number-input"]} h-10 w-32`}>
        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
          <button
            data-action="decrement"
            onClick={() => {
              if (value > min) {
                onEventChanged("decrement");
              }
            }}
            className="pb-1  text-[#DA4F46] hover:text-white hover:bg-[#DA4F46] h-full w-20 rounded-l cursor-pointer outline-none"
          >
            <span className="m-auto text-3xl font-thin">−</span>
          </button>

          {/* Counter */}
          <div className="text-center  w-full  font-medium text-base sm:text-[22px] self-center text-[#2E2E2E]">
            {value}
          </div>

          <button
            data-action="increment"
            onClick={() => {
              if (value < max) {
                onEventChanged("increment");
              }
            }}
            className="pb-1 text-[#DA4F46] hover:text-white hover:bg-[#DA4F46] h-full w-20 text-center  rounded-r cursor-pointer"
          >
            <span className="m-auto text-3xl font-thin">+</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NumberCounter;
