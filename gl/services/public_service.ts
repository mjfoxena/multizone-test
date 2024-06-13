import ApiService from "./ApiService";
import { API_CONSTANTS } from "./constants";
import { filterResponse } from "./helper";

const profileClient = new ApiService(API_CONSTANTS.STARTING_PRICE_URL);

// home page starting price
export const getStartingPrice = async () => {
  const response = await profileClient.post("/gethomescreenpricedata", {});
  return filterResponse(response);
};
