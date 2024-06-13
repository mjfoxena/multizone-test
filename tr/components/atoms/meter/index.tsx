import { TextElement } from "../Texts";
import Styles from "./meter.module.scss";

const Meter = ({ label, value, progressValue }) => {
  return (
    <div className="w-full lg:w-54">
      <div className="flex justify-between w-full">
        {TextElement({ fontSize: 12, text: label }).BOLD.BLACK}
        {TextElement({ fontSize: 16, text: value }).BOLD.BLACKSECONDARY}
      </div>
      <div className={Styles.meterBase}>
        <div
          className={Styles.meterValue}
          style={{ width: `${progressValue}%` }}
        />
      </div>
    </div>
  );
};

export default Meter;
