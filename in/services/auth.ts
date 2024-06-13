import axios from "axios";
import { CLIENT_ID } from "../utils/constants/index";
import { CredentialsPayload, IdentityPayload } from "../utils/constants";
import ApiService from "./ApiService";
import { awsSignHandler } from "./AwsHelpers";
import { API_CONSTANTS } from "./constants";
import { getAccessToken, getUserIds, setCognitoInfo } from "./helper";
const baseURL = "https://ultraviolette.us.auth0.com/";
const authClient = new ApiService(baseURL);

export const GetOtp = (email) => {
  return authClient
    .post("passwordless/start", email)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const verifyOtp = (verification) => {
  return authClient
    .post("oauth/token", verification)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const RefreshToken = ({ accessToken, refreshToken }) => {
  const payload = {
    grant_type: "refresh_token",
    client_id: CLIENT_ID,
    refresh_token: refreshToken,
  };
  return axios.post(`${baseURL}oauth/token`, payload, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: `Basic ${accessToken}`,
    },
  });
};

const getCognitoHeaders = (type) => {
  if (type === "id") {
    return new Headers({
      "Content-Type": "application/x-amz-json-1.1",
      "X-AMZ-TARGET": API_CONSTANTS.COGNITO_ID_XMZ_TARGET,
    });
  } else if (type === "credential") {
    return {
      "Content-Type": "application/x-amz-json-1.1",
      "X-AMZ-TARGET": API_CONSTANTS.COGNITO_CRED_XMZ_TARGET,
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
};

const cognitoFetchApi = async (url, method, data, headerType) => {
  const payload: any = {
    method,
    headers: getCognitoHeaders(headerType),
    body: JSON.stringify(data),
  };
  return fetch(API_CONSTANTS.COGNITO_BASE_URL + url, payload)
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {});
};
export const getAwsIdentity = async () => {
  let payload: any = IdentityPayload;
  payload.Logins["ultraviolette.us.auth0.com"] = getAccessToken();
  const res = payload
    ? await cognitoFetchApi(
        API_CONSTANTS.COGNITO_GET_IDENTITY,
        "POST",
        payload,
        "id"
      )
    : false;
  return getAwsCredentials(res.IdentityId);
};
export const getAwsCredentials = async (identityID) => {
  let payload: any = CredentialsPayload;
  payload.IdentityId = identityID;
  payload.Logins["ultraviolette.us.auth0.com"] = getAccessToken();
  const res = payload
    ? await cognitoFetchApi(
        API_CONSTANTS.COGNITO_GET_CREDENTIALS,
        "POST",
        payload,
        "credential"
      )
    : false;
  setCognitoInfo(res);
  return getOldUserInfo();
};

export const getOldUserInfo = async (creds = null) => {
  let email = getUserIds()?.email?.email;
  const API_URL = API_CONSTANTS.BASE_URL + API_CONSTANTS.AWS_GET_USER_INFO;
  let payload: any = {
    email: email,
  };
  return email && payload
    ? await awsSignHandler(API_URL, payload, creds)
    : false;
};

export const saveUserInfo = async (body, creds) => {
  let email = body.email || getUserIds().email.email;
  const API_URL = API_CONSTANTS.BASE_URL + API_CONSTANTS.AWS_POST_USER_INFO;
  let payload: any = {
    email: email,
    ...body,
  };
  return payload ? await awsSignHandler(API_URL, payload, creds) : false;
};

export const saveConfigUserInfo = async (body, creds) => {
  let email = body.email || getUserIds().email.email;
  const API_URL = API_CONSTANTS.BASE_URL + API_CONSTANTS.SAVE_USER_INFO;
  let payload: any = {
    email: email,
    ...body,
  };
  return payload ? await awsSignHandler(API_URL, payload, creds) : false;
};

export const updateUserInfo = async (body, creds) => {
  let email = body.email || getUserIds().email.email;
  const API_URL = API_CONSTANTS.BASE_URL + API_CONSTANTS.AWS_PUT_USER_INFO;
  let payload: any = {
    email: email,
    ...body,
  };
  return payload ? await awsSignHandler(API_URL, payload, creds) : false;
};

export const linkUser = async (payload) => {
  const API_URL = API_CONSTANTS.BASE_URL + API_CONSTANTS.AUTH0_LINK_USER;
  payload.auth_user_id = getUserIds().email.id;
  payload.access_token = getAccessToken();
  return payload ? await awsSignHandler(API_URL, payload) : false;
};
