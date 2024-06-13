import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const originURL =
  process.env.NODE_ENV === "production"
    ? publicRuntimeConfig.publicBaseUrl
    : process.env.NODE_ENV === "development"
    ? ""
    : "";

const env = publicRuntimeConfig.environment;
export const baseURL =
  env === "production"
    ? publicRuntimeConfig.prodBaseURL
    : publicRuntimeConfig.devBaseURL;

/// ConfiguratorConstants is used for default price of mach2 and mach2 recon incase of error or while fetching the price
export const ConfiguratorConstants = {
  mach2DefaultPrice: 299000,
  mach2ReconDefaultPrice: 399000,
};

export const API_CONSTANTS = {
  BASE_URL: baseURL,
  AUTH0_BASE_URL: publicRuntimeConfig.authOBaseURL,
  COGNITO_BASE_URL: publicRuntimeConfig.cognitoBaseURL,

  AWS_GET_USER_INFO: "getuserdetails",
  AWS_POST_USER_INFO: "saveuserdetailsmach2",
  AWS_PUT_USER_INFO: "updateuserdetails",
  AUTH0_GET_USER_INFO: "auth0getuserinfo",
  AUTH0_LINK_USER: "auth0linkuser",
  AWS_GET_USER_STATUS: "seavailablestatus",
  COGNITO_ID_XMZ_TARGET:
    "com.amazonaws.cognito.identity.model.AWSCognitoIdentityService.GetId",
  COGNITO_CRED_XMZ_TARGET:
    "com.amazonaws.cognito.identity.model.AWSCognitoIdentityService.GetCredentialsForIdentity",
  COGNITO_GET_IDENTITY: "",
  COGNITO_GET_CREDENTIALS: "",
  BASE_IMAGE_URL_CDN_CONFIG: "https://d2vja53fwrfp9f.cloudfront.net",
  BASE_IMAGE_URL_CDN: "https://d2atk76x06g5eh.cloudfront.net",
  HOMEPAGE_BASE_URL: "https://d2atk76x06g5eh.cloudfront.net/homepage/refresh",
  HOMEPAGE_BASE2_URL: "https://d2atk76x06g5eh.cloudfront.net/homepage",
  STARTING_PRICE_URL:
    "https://0daefn5hgj.execute-api.ap-south-1.amazonaws.com/prod",

  // Addedby @Mrutyunjaya
  UNLOCK_STAGE_TWO: "unlockstagetwo",
  GET_PAYMENT_CONFIGURATION: "getpaymentinfo",
  SAVE_KYC_INFO: "saveaadhaardetails",
  GET_PAYMENT_SELECTION_DETAILS: "getpaymentselectiondetails",
  SAVE_INSURANCE_SELECTION: "saveinsuranceselection",
  SAVE_FINANCE_SELECTION: "savefinanceselection",
  GET_PAYMENT_SUMMARY: "getpaymentsummary",
  CREATE_PAYMENT_SESSION: "createpaymentsessionid",
  CREATE_TEST_PAYMENT_SESSION: "testcreatepaymentsessionid",
  GET_PAYMENT_HISTORY: "getpaymenthistory",
  SETUP_SANDBOX_VBA_ACCOUNT: "testcfcreateva",
  SETUP_PROD_VBA_ACCOUNT: "cfcreateva",
  BASE_URL_S3: "https://s3.ap-south-1.amazonaws.com/www.ultraviolette.com",
  GET_TOTAL_AMOUNT: "gettotalamount",

  // Test Ride
  BOOK_TEST_RIDE: "savetestridedetails",

  // Limited for Space edition
  SAVE_SPACE_INTERESTS: "savespaceinterests",

  // Leaderboard
  GET_LEADERBOARD_DATA: "getleaderboarddata",

  // Press page subscribeNewsLetter_api
  SUBSCRIBE_NEWSLETTER_URL: "subscribenewsletter",

  // enquiry form
  SAVE_ENQUIRY_FORM_URL: "saveenquirydetails",

  //  save chat
  SAVE_CHAT_SESSION: "savechatsession",

  SAVE_MACH2_INTERESTS: "savemach2interest",

  // save new config details
  SAVE_USER_INFO: "saveuserselections",

  // Order status
  ORDER_STATUS: "getorderstatus",

  // Testing order
  TESTING_ORDER_STATUS: "testgetorderstatus",
};
