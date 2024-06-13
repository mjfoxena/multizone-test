import Style from "./slider.module.scss";
interface RangeProps {
  value: number;
  onChange: (event) => void;
  min: number;
  max: number;
  step?: number;
}

const RangeInput = ({
  value,
  onChange,
  min = 0,
  max = 10,
  step = 5,
}: RangeProps) => {
  return (
    <div className={`${Style["rangeContainer"]} `}>
      <input
        id="range"
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        style={{
          background: `linear-gradient(to right, #fff ${
            ((value - min) * 100) / (max - min)
          }%, #292C2D 0px`,
        }}
        className={`${Style["input"]} absolute w-full h-2 appearance-none cursor-pointer `}
      ></input>
    </div>
  );
};

export default RangeInput;
