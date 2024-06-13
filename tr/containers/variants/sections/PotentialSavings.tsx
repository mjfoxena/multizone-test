import { sidebarSteps } from "..";
import { ClosableGridSidePanel } from "../../../components/molecules/ClosableGridPanel";
import { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { useRouter } from "next/router";
import NumberCounter from "../UI/numberCounter";
import RangeInput from "../UI/slider";

const PotentitalSavings = ({ setSidebarTab, finalModal, isConfigurator = true, country, }) => {
  const { isMobile } = useContext(NavbarContext);
  const router = useRouter();

  const [distanceTravelled, setDistanceTravelled] = useState(50);
  const [mileage, setMileage] = useState(25);
  const [fuelCost, setFuelCost] = useState(100);
  const [year, setYears] = useState(4);
  const [result, setResult] = useState("");

  useEffect(() => {
    const days = year * 365;
    const litrePerDay = distanceTravelled / mileage;
    const costPerDay = litrePerDay * fuelCost;
    const total = `IN ${parseInt(
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
    <div className={`h-full ${isConfigurator ? 'sm:-mt-6' : 'sm:-mt-8'}`}>
      <ClosableGridSidePanel
        title={<p className={`${isConfigurator ? '' : 'text-[16px] sm:text-[24px]'}`}>POTENTIAL SAVINGS</p>}
        onClose={isConfigurator ? () => {
          if (router.asPath.includes("summary")) {
            setSidebarTab(sidebarSteps.summary);
          } else if (finalModal === "limited") {
            setSidebarTab(sidebarSteps.limited);
          } else {
            setSidebarTab(sidebarSteps.sidebarStep1);
          }
        } : () => {
          // from Calculatesaving we are passing a boolean 
          setSidebarTab(false)
        }}
      >
        {/* result */}
        <div>
          <p className={`uppercase brutal text-[32px] mt-[35px] sm:mt-[45px] sm:text-[40px] ${isConfigurator ? 'font-medium' : 'font-normal'}`}>
            {result}
          </p>
          <p className={`pt-3 font-normal uppercase text-[#2E2E2E] opacity-50 brutal ${isConfigurator ? 'text-xl' : 'text-base'}`}>
            Estimated fuel cost savings in next {year} Years
          </p>
          {/* Divider */}
          <div className=" w-full sm:flex mt-[43px] sm:mt-[55px] border-b-[1px] border-[#2D2D2D]"></div>
        </div>

        <div className="overflow-x-hidden">
          <div>
            {/* Travelled Distance */}
            {isMobile ? (
              <div className="mt-10">
                <div className="flex flex-row justify-between items-center">
                  <div className="self-center text-sm brutal">
                    Daily distance travelled (kms)
                  </div>
                  <div className="w-20  self-center text-right">
                    {distanceTravelled}
                  </div>
                </div>
                <div className="mt-4">
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
              <div className="flex mt-12">
                <div className={`flex-initial w-[270px] self-center font-normal brutal ${isConfigurator ? 'sm:text-xl' : 'sm:text-[16px]'}`}>
                  Daily distance travelled (kms)
                </div>
                <div className="flex-initial w-20  self-center text-center text-base sm:text-[22px]">
                  {distanceTravelled}
                </div>
                <div className="flex-auto mt-2">
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
                  <div className="self-center text-sm brutal">
                    Mileage of the bike (kms/ltr)
                  </div>
                  <div className="w-20  self-center text-right">{mileage}</div>
                </div>

                <div className="mt-4">
                  {/* <RangeInput
                    max={50}
                    min={mileage < 5 ? 1 : 0}
                    step={mileage < 5 ? 4 : 5}
                    value={mileage}
                    onChange={onMileageChanged}
                  /> */}
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
                <div className={`flex-initial w-[270px] self-center font-normal brutal ${isConfigurator ? 'sm:text-xl' : 'sm:text-[16px]'}`}>
                  Mileage of the bike (kms/ltr)
                </div>
                <div className="flex-initial w-20  self-center text-center text-base sm:text-[22px]">
                  {mileage}
                </div>
                <div className="flex-auto mt-2">
                  {/* <RangeInput
                    max={50}
                    min={mileage < 5 ? 1 : 0}
                    step={mileage < 5 ? 4 : 5}
                    value={mileage}
                    onChange={onMileageChanged}
                  /> */}
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
              <div className={`sm:flex-initial w-[248px] self-center text-sm sm:font-normal brutal ${isConfigurator ? 'sm:text-xl' : 'sm:text-[16px]'}`}>
                Cost of fuel (₹/ltr)
              </div>
              <div className="sm:flex-initial sm:w-20  self-center text-center">
                <NumberCounter
                  min={90}
                  max={180}
                  onEventChanged={onFuelChanged}
                  value={fuelCost}
                />
              </div>
            </div>

            {/* Number of years */}
            <div className="flex mt-7 justify-between sm:justify-start">
              <div className={`sm:flex-initial w-[248px] self-center text-sm sm:font-normal brutal ${isConfigurator ? 'sm:text-xl' : 'sm:text-[16px]'}`}>
                Number of years
              </div>
              <div className="sm:flex-initial sm:w-20  self-center text-center">
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
          {/* <div className=" w-full  sm:flex mt-[50px] sm:mt-[64px] border-b-[1px] border-[#2D2D2D]"></div> */}

          {/* Calender footer */}
          <div className="mt-10">

            <p className={`pt-10 text-[#AEAEAE] font-normal ${isConfigurator ? 'text-base' : 'text-[14px]'}`}>
            *The mentioned values are approximate values.
            </p>
          </div>

          <div className="mt-16">
            <div className="mt-8 flex items-center space-x-8"></div>
          </div>
        </div>
      </ClosableGridSidePanel>
    </div>
  );
};

export default PotentitalSavings;