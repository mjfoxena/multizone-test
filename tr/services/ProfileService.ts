import ApiService from "./ApiService";
import { awsSignHandler } from "./AwsHelpers";
import { API_CONSTANTS } from "./constants";

const profileClient = new ApiService(API_CONSTANTS.BASE_URL);

export interface IUser {
  order_id: boolean;
  email: string;
  country: string;
  gender: string;
  name: string;
  phone: string;
  pincode: string;
  state: string;
  age: number;
  mobile_verified?: boolean;
  options: any;

  booking_configuration: number[];
  booking_paid: boolean;
  is_se: boolean;
  is_vip: boolean;
  model: string;
  pre_booking_paid: boolean;
  is_kyc_verified: boolean;
  variant: string;
  reconfigured?: boolean;
}

export const getUserDetails = (): Promise<IUser> => {
  return profileClient
    .post("getuserdetails", {})
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const saveUserDetails = ({ body }: { body: IUser }) => {
  return profileClient
    .post("saveuserdetails", {})
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const updateUserDetails = ({ body }: { body: Partial<IUser> }) => {
  return profileClient
    .post("updateuserdetails", {})
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};
export const getcompleteUserProfile = (body) => {
  const API_URL = API_CONSTANTS.BASE_URL + "getusersummary";

  // @ts-ignore
  return awsSignHandler(API_URL, body);
};

// Added by Mrutyunjaya
export const updateBookingStage = async (stage: number, email: string) => {
  const endPoint = stage == 2 ? "unlockstagetwo" : "";
  const API_URL = API_CONSTANTS.BASE_URL + endPoint;
  console.log(
    "Calling to the URL: [",
    API_URL,
    "] and Stage: ",
    stage,
    " and Email: ",
    email
  );

  // @ts-ignore
  return await awsSignHandler(API_URL, {
    email,
  });
};

// getusersummary

export const getusersummary = (body) => {
  const API_URL = API_CONSTANTS.BASE_URL + "getusersummary";

  // @ts-ignore
  return awsSignHandler(API_URL, body);
};

// leaderboard date api call
export const getLeaderboardData = () =>
  profileClient.post(API_CONSTANTS.GET_LEADERBOARD_DATA, {});

