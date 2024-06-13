import ApiService from "./ApiService";
import { API_CONSTANTS } from "./constants";

const configClient = new ApiService(API_CONSTANTS.BASE_URL);
// const configClient = new ApiService(process.env.NEXT_PUBLIC_API_ENDPOINT as string)

export const GetPricingDetails = () => {
  return configClient
    .post("/prod/getpricingdetails", {})
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};
export const GetFaqList = () => {
  return configClient
    .post("getfaqpagecontent", {})
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};
export const GetNewFaqList = () => {
  return configClient
    .post("getfaq", {})
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const GetFaqQsAndAns = ({ cat, subCat }) => {
  return configClient
    .post("getfaq", {
      category: cat,
      sub_category: subCat,
    })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export { API_CONSTANTS };
