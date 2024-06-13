import ApiService from "./ApiService";
import { awsSignHandler } from "./AwsHelpers";
import { API_CONSTANTS } from "./constants";

const configClient = new ApiService(API_CONSTANTS.BASE_URL);

export const GetPricingDetails = (country) => {
  return configClient
    .post("getpricingdetails", { country })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const GetPricingFactor = () => {
  return configClient
    .post("getpricingfactor", {})
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

export const GetSpecSheet = () => {
  return configClient
    .post("getspecsheet", {})
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const UpdateUserBooking = (body: {
  email: string;
  booking_configuration: Array<number>;
  pay_option: string;
  model: string;
  limited_type: string;
  country: string;
}) => {
  const API_URL = API_CONSTANTS.BASE_URL + "updateuserbookingconfiguration";

  // @ts-ignore
  return awsSignHandler(API_URL, body);
};

export const UpdateUserReconfigure = (body: {
  email: string;
  booking_configuration: Array<number>;
  pay_option: string;
  model: string;
  variant: string;
}) => {
  const API_URL = API_CONSTANTS.BASE_URL + "updateuserreconfiguration";

  // @ts-ignore
  return awsSignHandler(API_URL, body);
};

export const GetUserBooking = (body: { email: string }) => {
  const API_URL = API_CONSTANTS.BASE_URL + "getconfiguratorsummary";

  // @ts-ignore
  return awsSignHandler(API_URL, body);
};

export const GetUserReBookingSummary = (body: { email: string }) => {
  const API_URL = API_CONSTANTS.BASE_URL + "getreconfigurationsummary";

  // @ts-ignore
  return awsSignHandler(API_URL, body);

  // return configClient
  //   .post("prod/updateuserbookingconfiguration", {})
  //   .then((res) => res)
  //   .catch((err) => {
  //     throw err;
  //   });
};

export const CreateOrder = (body: { name; email; phone; is_se }) => {
  const API_URL = API_CONSTANTS.BASE_URL + "createordersessionidmach2";
  // @ts-ignore
  return awsSignHandler(API_URL, body);
};

export const CreateTestOrder = (body: { name; email; phone; is_se }) => {
  const API_URL = API_CONSTANTS.BASE_URL + "testcreateordersessionid";
  // @ts-ignore
  return awsSignHandler(API_URL, body);
};

export const confirmReconfiguration = ({ email }) => {
  const API_URL = API_CONSTANTS.BASE_URL + "confirmconfiguration";
  // @ts-ignore
  return awsSignHandler(API_URL, { email });
};
export const GetLimitedPricingDetails = () => {
  return configClient
    .post("getsepricingdetails", {})
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const GetSpaceLimitedPricingDetails = () => {
  return configClient
    .post("getsepricingdetails", {})
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const GetLimitedAvailableStatus = () => {
  return configClient
    .post("sespaceavailablestatus", {})
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const GetLimitedSpaceAvailableStatus = () => {
  return configClient
    .post("sespaceavailablestatus", {})
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

// New Config API Services
export const GetChoseVarient = ({ country, model, request_type, version }) => {
  return configClient
    .post("getconfigoptions", { country, model, request_type, version })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

// Updated Pricing APIs
export const Getupdatedpricing = ({ selected_items }) => {
  return configClient
    .post("getupdatedpricing", { selected_items })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

// // summary Page API
// export const GetSummary = ({ email }) => {
//   return configClient
//     .post("getusersummary", { email })
//     .then((res) => res.data)
//     .catch((err) => {
//       throw err;
//     });
// };

export const GetSummary = (body: { email: string }) => {
  const API_URL = API_CONSTANTS.BASE_URL + "getusersummary";

  // @ts-ignore
  return awsSignHandler(API_URL, body);
};
