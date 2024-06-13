import { API_CONSTANTS } from "../../services/constants";
export const CLIENT_ID = "fQCu0lWxvqdgWPcPvmlY0RKuCqTw02WN";

export const SEND_EMAIL_OTP = {
  client_id: CLIENT_ID,
  connection: "email",
  email: "",
  send: "code",
};

export const SEND_SMS_OTP = {
  client_id: CLIENT_ID,
  connection: "sms",
  phone_number: "",
  send: "code",
};

export const VERIFY_EMAIL_OTP = {
  grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
  client_id: CLIENT_ID,
  audience: API_CONSTANTS.AUTH0_BASE_URL + "api/v2/",
  otp: "",
  realm: "email",
  username: "",
  scope: "openid profile email address phone offline_access read:current_user",
};
export const VERIFY_SMS_OTP = {
  grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
  client_id: CLIENT_ID,
  audience: API_CONSTANTS.AUTH0_BASE_URL + "api/v2/",
  otp: "",
  realm: "sms",
  username: "",
  scope: "openid profile email address phone offline_access read:current_user",
};




export const IdentityPayload = {
  IdentityPoolId: "ap-south-1:56ed9a6c-220e-44b6-9d7e-9c238d10c215",
  Logins: {
    "ultraviolette.us.auth0.com": "",
  },
};

export const CredentialsPayload = {
  IdentityId: "",
  Logins: {
    "ultraviolette.us.auth0.com": "",
  },
};
