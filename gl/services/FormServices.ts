import axios from "axios";

import ApiService from "./ApiService";
import { API_CONSTANTS } from "./constants";
import { filterResponse } from "./helper";
import { BotRequestMessage } from "../utils/interface/types";

const profileClient = new ApiService(API_CONSTANTS.BASE_URL);

export const bookTestRideClient = async (body) => {
  const response = await profileClient.post(API_CONSTANTS.BOOK_TEST_RIDE, body);
  return filterResponse(response);
};

export const subscribeNewsLetter = async (body) => {
  const response = await profileClient.post(API_CONSTANTS.SUBSCRIBE_NEWSLETTER_URL, body);
  return filterResponse(response);
};

export const saveEnquiryFormClient = async (body) => {
  const response = await profileClient.post(
    API_CONSTANTS.SAVE_ENQUIRY_FORM_URL,
    body
  );
  return filterResponse(response);
};

export const sendUserQueryToOpenAI = async (messages: Array<Object>) => {
  const response = await axios.post("/api/uvbot", { messages });
  return filterResponse(response);
};

export const saveChatSessionAPI = async (session: string) => {
  const response = await profileClient.post(API_CONSTANTS.SAVE_CHAT_SESSION, {
    session,
  });
  return filterResponse(response);
};

export const saveSpaceInterests = async (body) => {
  const response = await profileClient.post(API_CONSTANTS.SAVE_SPACE_INTERESTS, body);
  return filterResponse(response);
};

export const savemach2Interest = async (body) => {
  const response = await profileClient.post(API_CONSTANTS.SAVE_MACH2_INTERESTS, body);
  return filterResponse(response);
};


export const saveRefundDetails = async (body) => {
 
  
  const response = await profileClient.post('saverefunddetails', body);
  return filterResponse(response);
};
