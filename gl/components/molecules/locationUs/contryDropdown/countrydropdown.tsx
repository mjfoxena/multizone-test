import { useState } from "react";
import { Menu } from "@headlessui/react";
import Image from "next/image";

export default function CountryDropdownOnLocationUs({
  selectedCountry,
  setSelectedCountry,
  countries,
}) {
  return (
    <div className="flex  justify-center items-center ">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center justify-between w-[32vh] 2xl:w-[16rem] max-sm:w-[35vh] ">
          <div>
            <h2 className="text-white uppercase max-sm:text-black">
              {selectedCountry.name}
            </h2>
          </div>
          <div className="w-[15px] h-[15px] mr-3 flex justify-center items-center max-sm:hidden">
            <Image
              width={100}
              height={100}
              alt="dropdown icon"
              src={"/images/home/newhome/dropdowniconwhite.svg"}
              className=""
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="w-[15px] h-[15px] mr-3 flex justify-center items-center md:hidden">
            <Image
              width={100}
              height={100}
              alt="dropdown icon"
              src={"/images/home/newhome/dropdowniconblack.svg"}
              className=""
              style={{ objectFit: "contain" }}
            />
          </div>
        </Menu.Button>

        <Menu.Items className="absolute mt-5 max-sm:mt-6 w-[15.8rem] max-sm:w-[21rem] 2xl:w-[16rem] right-[0px] max-md:right-[-6%] bg-white shadow-lg py-1 z-10 ">
          {countries.map((country) => (
            <Menu.Item key={country.name}>
              {({ active }) => (
                <button
                  onClick={() => setSelectedCountry(country)}
                  className="flex justify-between items-center w-full px-4 py-2 text-sm text-left"
                >
                  <h2
                    className={`text-base uppercase ${
                      country.name === selectedCountry.name
                        ? "font-bold text-black"
                        : "text-[#464646] font-normal"
                    }`}
                  >
                    {country.name}
                  </h2>
                  <div className="w-[28.8px] h-[20.8px]">
                    <Image
                      width={100}
                      height={100}
                      alt={country.name}
                      src={country.flag_link}
                      className=""
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}
