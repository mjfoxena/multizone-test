import ApiService from "./ApiService";
import { awsSignHandler } from "./AwsHelpers";
import { API_CONSTANTS } from "./constants";

const preferenceClient = new ApiService(API_CONSTANTS.STARTING_PRICE_URL);

export const saveConsentConfiguration = async () => {
  console.log("🚀 ~ getLocationsAsperCountry ~ body:");

  return preferenceClient
    .post("/saveconsentconfiguration", {})
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};
