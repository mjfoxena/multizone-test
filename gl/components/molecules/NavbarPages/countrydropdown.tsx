import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Country, getCountry } from "../../../services/LocationServices";

interface CountryDropdownProps {
  theme: string;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({ theme }) => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onPageLoaded = async () => {
    try {
      const fetchedCountries = await getCountry();
      setIsLoading(false);
      setCountries(fetchedCountries);
      setSelectedCountry(fetchedCountries[0]); // Set the first country as selected
    } catch (error) {
      setIsLoading(false);
      console.error("🚀 ~ onPageLoaded ~ error:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    onPageLoaded();
  }, []);

  if (isLoading) {
    return (
      <div>
        <SkeletonTheme baseColor="#FFF" highlightColor="#888">
          <p>
            <Skeleton count={10} />
          </p>
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center pr-5">
      <Menu as="div" className="relative z-50">
        <Menu.Button className="flex items-center">
          {selectedCountry && (
            <>
              <div
                className={`w-[28.8px] h-[20.8px] mr-1 ${
                  (theme === "dark" || router.pathname.length === 1) &&
                  selectedCountry.name === "Global"
                    ? "filter invert"
                    : ""
                }`}
              >
                <Image
                  width={100}
                  height={100}
                  alt={selectedCountry.name}
                  src={selectedCountry.flag_link}
                  className=""
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div className="w-[9px] ">
                {theme === "dark" || router.pathname.length === 1 ? (
                  <Image
                    width={100}
                    height={100}
                    alt="dropdown icon"
                    src={"/images/home/newhome/dropdowniconwhite.svg"}
                    className=""
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <Image
                    width={100}
                    height={100}
                    alt="dropdown icon"
                    src={"/images/home/newhome/dropdowniconblack.svg"}
                    className=""
                    style={{ objectFit: "contain" }}
                  />
                )}
              </div>
            </>
          )}
        </Menu.Button>

        <Menu.Items
          className={`absolute mt-4 w-[15rem] z-50 ${
            theme === "dark" || router.pathname.length === 1
              ? " bg-[#151618]"
              : "bg-white"
          } shadow-lg py-1 z-10 right-[-50%]`}
        >
          {countries.map((country) => (
            <Menu.Item key={country.name}>
              {({ active }) => (
                <button
                  onClick={() => setSelectedCountry(country)}
                  className="flex justify-between items-center w-full px-4 py-2 text-sm text-left"
                >
                  <h2
                    className={`text-base uppercase ${
                      theme === "dark" || router.pathname.length === 1
                        ? "text-white"
                        : "text-black"
                    } ${
                      country.name === selectedCountry?.name ? "font-bold" : ""
                    }`}
                  >
                    {country.name}
                  </h2>

                  {country.name === "Global" ? (
                    <div className="w-[28.8px] h-[20.8px]">
                      <Image
                        width={100}
                        height={100}
                        alt={country.name}
                        src={country.flag_link}
                        className={`${
                          theme === "dark" || router.pathname.length === 1
                            ? "filter invert"
                            : ""
                        }`}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ) : (
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
                  )}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default CountryDropdown;
