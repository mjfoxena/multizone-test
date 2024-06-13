import ApiService from "./ApiService";
import { awsSignHandler } from "./AwsHelpers";
import { API_CONSTANTS } from "./constants";

const profileClient = new ApiService(API_CONSTANTS.BASE_URL);

const filterResponse = (response) => {
  let result = { error: undefined, payload: undefined };
  if (!response || response.errorType) {
    // @ts-ignore
    result.error = "Something went wrong";
    result.payload = undefined;
  } else if (response.message && response.status === false) {
    result.error = response.message;
    result.payload = undefined;
  } else {
    // @ts-ignore
    result.payload = response;
    result.error = undefined;
  }
  return result;
};

// Get Initial Payment Configuration Info
export const getPaymentConfigurationInfo = async (email?: string) => {
  const API_URL =
    API_CONSTANTS.BASE_URL + API_CONSTANTS.GET_PAYMENT_CONFIGURATION;
  // @ts-ignore
  const response = await awsSignHandler(API_URL, { email });
  return filterResponse(response);
};

// Get Payment Selection Details
export const getPaymentSelectionDetails = async (email?: string) => {
  const API_URL =
    API_CONSTANTS.BASE_URL + API_CONSTANTS.GET_PAYMENT_SELECTION_DETAILS;

  // @ts-ignore
  const response = await awsSignHandler(API_URL, { email });
  return filterResponse(response);
};

// Update Kyc Data
export const saveKYCInfo = async (body) => {
  const API_URL = API_CONSTANTS.BASE_URL + API_CONSTANTS.SAVE_KYC_INFO;
  // @ts-ignore
  return await awsSignHandler(API_URL, body);
};

// Save Insurance info
export const saveInsuranceSelection = async (body) => {
  const API_URL =
    API_CONSTANTS.BASE_URL + API_CONSTANTS.SAVE_INSURANCE_SELECTION;
  const response = await awsSignHandler(API_URL, body);
  return filterResponse(response);
};

// Get Total Amount
export const getTotalAmount = async (email?: string) => {
  const API_URL = API_CONSTANTS.BASE_URL + API_CONSTANTS.GET_TOTAL_AMOUNT;
  // @ts-ignore
  const response = await awsSignHandler(API_URL, { email });
  return filterResponse(response);
};

// Save finance info
export const saveFinanceSelection = async (body) => {
  const API_URL = API_CONSTANTS.BASE_URL + API_CONSTANTS.SAVE_FINANCE_SELECTION;
  const response = await awsSignHandler(API_URL, body);
  return filterResponse(response);
};

// Get getpaymentsummary
export const getpaymentsummary = async (body) => {
  const API_URL = API_CONSTANTS.BASE_URL + API_CONSTANTS.GET_PAYMENT_SUMMARY;
  const response = await awsSignHandler(API_URL, body);
  return filterResponse(response);
};

// Create PaymentSessionId
export const createPaymentSessionId = async (body) => {
  const API_URL = API_CONSTANTS.BASE_URL + API_CONSTANTS.CREATE_PAYMENT_SESSION;
  const response = await awsSignHandler(API_URL, body);
  return filterResponse(response);
};

// Create TEST PaymentSessionId
export const createTestPaymentSessionId = async (body) => {
  const API_URL =
    API_CONSTANTS.BASE_URL + API_CONSTANTS.CREATE_TEST_PAYMENT_SESSION;
  const response = await awsSignHandler(API_URL, body);
  return filterResponse(response);
};

// Get Payment History
export const getPaymentTranscationHistory = async (body) => {
  const API_URL = API_CONSTANTS.BASE_URL + API_CONSTANTS.GET_PAYMENT_HISTORY;
  const response = await awsSignHandler(API_URL, body);
  return filterResponse(response);
};

//  Virtual Bank Account Set up
export const userVBASetUp = async (isSandbox: boolean, body: any) => {
  // const BASEURL = API_CONSTANTS.VBA_BASE_URL || API_CONSTANTS.BASE_URL;

  const API_URL = `${API_CONSTANTS.BASE_URL}${
    isSandbox
      ? API_CONSTANTS.SETUP_SANDBOX_VBA_ACCOUNT
      : API_CONSTANTS.SETUP_PROD_VBA_ACCOUNT
  }`;

  const response = await awsSignHandler(API_URL, body);
  return filterResponse(response);
};

export const bookTestRide = async (body) => {
  const response = await profileClient.post(API_CONSTANTS.BOOK_TEST_RIDE, body);
  return filterResponse(response);
};

// check payment status using orderId
/// [staging] - boolean value to check if the request is for staging or production
export const checkPaymentStatus = async (orderId: string, staging: boolean) => {
  const body: any = { order_id: orderId };

  const API_URL = `${API_CONSTANTS.BASE_URL}${
    staging ? API_CONSTANTS.TESTING_ORDER_STATUS : API_CONSTANTS.ORDER_STATUS
  }`;

  console.log("API_URL", API_URL);

  const response = await awsSignHandler(API_URL, body);
  return filterResponse(response);
};
