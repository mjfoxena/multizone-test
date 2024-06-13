// import { sidebarSteps } from "../../../../containers/variants";
// import { ClosableGridSidePanel } from "../../../../components/molecules/ClosableGridPanel";
import { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../../../contexts/NavbarContext";
import { useRouter } from "next/router";
import NumberCounter from "./numberCounter";
import RangeInput from "./slider";
import Style from "./savings.module.scss";
import { ST } from "next/dist/shared/lib/utils";
import {motion} from 'framer-motion'

const PotentitalSavings = ({
  setSidebarTab,
  finalModal,
  isConfigurator = true,
  country,
}) => {
  const { isMobile } = useContext(NavbarContext);
  const router = useRouter();

  const [distanceTravelled, setDistanceTravelled] = useState(5);
  const [mileage, setMileage] = useState(40);
  const [fuelCost, setFuelCost] = useState(42);
  const [year, setYears] = useState(3);
  const [result, setResult] = useState("");

  useEffect(() => {
    const days = year * 365;
    const litrePerDay = distanceTravelled / mileage;
    const costPerDay = litrePerDay * fuelCost;
    const total = `TRY ${parseInt(
      (days * costPerDay).toFixed(0)
    ).toLocaleString("en-IN")}`; //
    setResult(total);
  }, [distanceTravelled, mileage, fuelCost, year]);

  const onDistanceChanged = (event) => {
    const value = parseInt(event.target.value);
    if (value === 0) {
      setDistanceTravelled(15);
      return;
    }
    setDistanceTravelled(value);
  };

  const onMileageChanged = (event) => {
    const value = parseInt(event.target.value);
    if (value === 0) {
      setMileage(10);
      return;
    }
    setMileage(event.target.value);
  };
  const onFuelChanged = (type = "increment") => {
    if (type == "decrement") {
      setFuelCost(fuelCost - 1);
    } else {
      setFuelCost(fuelCost + 1);
    }
  };
  const onYearChanged = (type = "increment") => {
    if (type == "decrement") {
      setYears(year - 1);
    } else {
      setYears(year + 1);
    }
  };

  return (
    <div
      className={` sm:h-full  flex  flex-col gap-3 sm:gap-8  ${
        isConfigurator ? "sm:-mt-6" : "sm:-mt-8"
      }`}
    >
      {/* result */}
      <motion.div initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }} 
          viewport={{ once: true }} 
          className="text-white flex justify-between items-start">
        <p className={`${Style.savingsH} sm:hidden`}>SAVINGS</p>
        <p className={`${Style.savingsH} hidden  sm:block`}>
          CALCULATE YOUR 
           <span className="ml-2 font-extrabold">SAVINGS</span>
        </p>
        <p className={Style.rate}>{result}</p>
      </motion.div>

      <div className=" overflow-x-hidden overflow-y-hidden text-white relative  ">
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Travelled Distance */}
          {isMobile ? (
            <div className="mt-10">
              <div className="flex flex-row justify-between items-center">
                <div className={Style.sideTitleMob}>
                  Daily distance travelled (km)
                </div>
                <div className={Style.distanceTravelled}>
                  {distanceTravelled}
                </div>
              </div>
              <div className="mt-8">
                <RangeInput
                  min={15}
                  step={distanceTravelled < 5 ? 5 : 5}
                  max={300}
                  value={distanceTravelled}
                  onChange={onDistanceChanged}
                />
              </div>
            </div>
          ) : (
            <div className="flex mt-12 ">
              <div className={Style.sideTitle}>
                Daily distance travelled (km)
              </div>
              <div className="flex-initial w-[25%] font-medium   self-center text-center text-base sm:text-[30px]">
                {distanceTravelled}
              </div>
              <div className="flex-auto mt-4 w-[45%] ">
                <RangeInput
                  min={15}
                  step={distanceTravelled < 5 ? 5 : 5}
                  max={300}
                  value={distanceTravelled}
                  onChange={onDistanceChanged}
                />
              </div>
            </div>
          )}

          {/* Mileage of the bike */}
          {isMobile ? (
            <div className=" mt-10">
              <div className="flex flex-row justify-between items-center">
                <div className={Style.sideTitleMob}>
                  Mileage of the bike (km/L)
                </div>
                <div className={Style.distanceTravelled}>{mileage}</div>
              </div>

              <div className="mt-8">
                <RangeInput
                  max={50}
                  min={10}
                  step={mileage < 5 ? 4 : 5}
                  value={mileage < 10 ? 10 : mileage}
                  onChange={onMileageChanged}
                />
              </div>
            </div>
          ) : (
            <div className="flex mt-10">
              <div className={Style.sideTitle}>Mileage of the bike (km/L)</div>
              <div className="flex-initial w-[25%]  self-center text-center font-medium text-base sm:text-[30px]">
                {mileage}
              </div>
              <div className="flex-auto mt-2 w-[45%]">
                <RangeInput
                  max={50}
                  min={10}
                  step={mileage < 5 ? 4 : 5}
                  value={mileage < 10 ? 10 : mileage}
                  onChange={onMileageChanged}
                />
              </div>
            </div>
          )}

          {/* Cost Of Fuel */}
          <div className="flex mt-8 justify-between sm:justify-start">
            <div
              className={`sm:flex-initial w-fit sm:w-[30%] self-center text-sm sm:font-normal brutal ${
                isConfigurator ? "sm:text-[18px]" : "sm:text-[18px]"
              }`}
            >
              Cost of fuel (₺/L)
            </div>
            <div className="sm:flex sm:w-[25%]  justify-center items-center">
              <NumberCounter
                min={90}
                max={180}
                onEventChanged={onFuelChanged}
                value={fuelCost}
              />
            </div>
          </div>

          {/* Number of years */}
          <div className="flex mt-0  sm:mt-7 justify-between sm:justify-start">
            <div
              className={`sm:flex-initial w-fit sm:w-[30%] self-center text-sm sm:font-normal brutal ${
                isConfigurator ? "sm:text-[18px]" : "sm:text-[18px]"
              }`}
            >
              Number of years
            </div>
            <div className="sm:flex sm:w-[25%] justify-center  ">
              <NumberCounter
                min={1}
                max={10}
                onEventChanged={onYearChanged}
                value={year}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        {/* Calender footer */}
        <div className="sm:absolute bottom-0 right-0 sm:w-fit mt-4 sm:mt-0 ">
          <div className={Style.desc}>
            <p>
              {" "}
              *The mentioned values are approximate.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PotentitalSavings;
