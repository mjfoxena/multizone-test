import React, { useEffect, useState } from "react";

import { GetServerSidePropsContext } from "next";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  Country,
  DealerLocation,
  getCountry,
  getLocationsAsperCountry,
} from "../../services/LocationServices";
import CommonFooter from "../../components/molecules/CommonFooter";
import HeaderOfLoactionUs from "../../components/molecules/locationUs/header/header";
import Places from "../../components/molecules/locationUs/places/locationUs";

export default function LocationUs() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [locations, setLocations] = useState<DealerLocation[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onPageLoaded = async () => {
    try {
      const fetchedCountries = await getCountry();
      setCountries(fetchedCountries);
      setSelectedCountry(fetchedCountries[0]); // Set the first country as selected
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("🚀 ~ onPageLoaded ~ error:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    onPageLoaded();
  }, []);

  useEffect(() => {
    if (selectedCountry !== null) {
      const fetchLocationData = async () => {
        try {
          const reqpayload = {
            country_code: selectedCountry.iso_code,
          };

          const fetchLocationsAsperCountries: DealerLocation[] =
            await getLocationsAsperCountry(reqpayload);
          console.log(
            "🚀 ~ onPageLoaded ~ fetchLocationsAsperCountries:",
            fetchLocationsAsperCountries
          );
          setLocations(fetchLocationsAsperCountries);
        } catch (error) {
          console.log("🚀 ~ fetchLocationData ~ error:", error);
        }
      };

      fetchLocationData();
    }
  }, [selectedCountry]);

  if (isLoading) {
    return (
      <div>
        <SkeletonTheme baseColor="#FFF" highlightColor="#888">
          <p>
            <Skeleton count={10} />
          </p>
        </SkeletonTheme>
        <CommonFooter />
      </div>
    );
  }

  return (
    <div className="bg-[#ECECEC]">
      <HeaderOfLoactionUs
        selectedCountry={selectedCountry}
        countries={countries}
        setSelectedCountry={setSelectedCountry}
      />
      <Places dealerLocations={locations} />
      <CommonFooter />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const country = context?.query?.country;

  return {
    props: {
      country: country,
    },
  };
}
