import ApiService from "./ApiService";
import { awsSignHandler } from "./AwsHelpers";
import { API_CONSTANTS } from "./constants";

const locationClient = new ApiService(API_CONSTANTS.STARTING_PRICE_URL);

// interfaces.ts
export interface Country {
  configurator_code: string;
  flag_link: string;
  iso_code: string;
  name: string;
}

// Define the Location interface
interface Location {
  latitude: string;
  longitude: string;
}

// Define the OperatingTimings interface
interface OperatingTimings {
  days?: string;
  hours?: string;
}

// Define the Dealer interface
export interface DealerLocation {
  address: string;
  contact: string;
  dealer_type: string;
  directions_link: string;
  location: Location;
  name: string;
  operating_timings: OperatingTimings;
  operational: boolean;
  operational_tag: string;
  order: number;
}

export const getLocationsAsperCountry = async (body) => {
  console.log("🚀 ~ getLocationsAsperCountry ~ body:", body);

  return locationClient
    .post("/getdealerlocations", body)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};
export const getCountry = async () => {
  console.log("🚀 ~ getLocationsAsperCountry ~ body:");

  return locationClient
    .post("/getcountries", {})
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};