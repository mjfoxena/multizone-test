import axios from "axios";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-js";
import { getCognitoInfo, getEmailTokens, setAccessToken } from "./helper";
import { getAwsIdentity, RefreshToken } from "./auth";
import { MustAuthenticatePages } from "../constants";

export const awsSignHandler = async (
  API_URL,
  payload = "",
  creds: any = null
) => {
  const region = "ap-south-1";
  const service = "execute-api";

  if (creds && creds.access_token) {
    setAccessToken(creds.access_token);
    await getAwsIdentity();
  }
  const credentials = getCognitoInfo();

  const apiUrl = new URL(API_URL);
  const sigv4 = new SignatureV4({
    service: service,
    region: region,
    credentials: {
      accessKeyId: credentials?.AccessKeyId,
      secretAccessKey: credentials?.SecretKey,
      sessionToken: credentials?.SessionToken,
    },
    sha256: Sha256,
  });

  const signed = await sigv4.sign({
    method: "POST",
    hostname: apiUrl.host,
    path: apiUrl.pathname,
    protocol: apiUrl.protocol,
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      host: apiUrl.hostname, // compulsory
    },
  });

  try {
    const { data } = await axios({
      ...signed,
      url: API_URL,
      data: payload, // compulsory
    });
    return data;
  } catch (error) {
    console.log("Error Occured: ", error);

    let tokens: any = getEmailTokens();
    tokens = tokens && JSON.parse(tokens);
    // @ts-ignore
    const errorCode = error?.code;

    // @ts-ignore
    const errorResponseStatus = error?.response?.status;
    // @ts-ignore
    if (
      tokens &&
      tokens.access_token &&
      (["ERR_NETWORK", "ERR_BAD_REQUEST"].includes(errorCode) ||
        [403, 401].includes(errorResponseStatus)) &&
      window.location.pathname !== "/signin"
    ) {
      localStorage.clear();

      // to sign in if its from authenticated pages
      if (MustAuthenticatePages.includes(window.location.pathname)) {
        window.location.href = window.location.origin + "/signin";
      } else {
        window.location.reload();
      }
    }
    throw error;
  }
};