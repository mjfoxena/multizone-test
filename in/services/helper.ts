import { NextRouter } from "next/router";

const setValinLocalStorage = (_key, _val?) => {
  localStorage.setItem(_key, _val);
};

const getValFromLocalStorage = (_key) => {
  return localStorage.getItem(_key);
};

// new configure setup for save the mail
export const setEmail = (_val) => {
  localStorage.setItem("email", JSON.stringify(_val));
};

export const getEmail = () => {
  return localStorage.getItem("email");
};

export const removeEmail= () => {
  return localStorage.removeItem("email");
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
export const getCognitoInfo = () => {
  //@ts-ignore
  return JSON.parse(getValFromLocalStorage("cognito_details"))?.Credentials;
};

export const removeCognito = () => {
 localStorage.removeItem('cognito_details')
};

export const getUserIds = () => {
  //@ts-ignore
  return JSON.parse(getValFromLocalStorage("user_ids"))||{};
};
export const setUserIds = (details) => {
  setValinLocalStorage('user_ids', JSON.stringify(details));
}
export const getAccessToken = () => {
  return getValFromLocalStorage("access_token");
};
export const getEmailTokens = () => {
  return getValFromLocalStorage("email_tokens");
};
export const deleteEmailTokens = () => {
  return localStorage.removeItem("email_tokens");
};
export const setCognitoInfo = (details) => {
  setValinLocalStorage("cognito_details", JSON.stringify(details));
};

export const setAccessToken = (details) => {
  setValinLocalStorage("access_token", details);
};
export const removeAccessToken = () => {
  localStorage.removeItem('access_token')
};
export const setEmailTokens = (details) => {
  setValinLocalStorage("email_tokens", JSON.stringify(details));
};
export const setUserMetadata = (details) => {
  setValinLocalStorage("user_metadata", JSON.stringify(details));
};
export const getUserMetaData = () => {
  // @ts-ignore
 return JSON.parse(getValFromLocalStorage("user_metadata"));
}
export const getPhoneTokens = () => {
  // @ts-ignore
  return JSON.parse(getValFromLocalStorage('phone_tokens'));
}
export const setPhoneTokens = (details) => {
  setValinLocalStorage('phone_tokens', JSON.stringify(details));
}

export const getBookingConfig = () => {
    // @ts-ignore
  return JSON.parse(getValFromLocalStorage('booking_config'));
}

export const setBookingConfig = (details) => {
  
  setValinLocalStorage('booking_config', JSON.stringify(details));
}

export const delBookingConfig = () => {
  
  localStorage.removeItem('booking_config')
}


export const getBookingSelection = () => {
  // @ts-ignore
return JSON.parse(getValFromLocalStorage('booking_selection'));
}

export const setBookingSelection = (details) => {

setValinLocalStorage('booking_selection', JSON.stringify(details));
}

export const delBookingSelection= () => {

localStorage.removeItem('booking_selection')
}

export const GetCookie = (key) => {
  const escape = (s) => s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1');
  const match = document.cookie?.match(RegExp('(?:^|;\\s*)' + escape(key) + '=([^;]*)'));
  return match ? match[1] : null;
};

export const setCookie = (key, value, days:number=0, secure:boolean=false) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days as unknown as number) * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${key}=${value || ''}${expires}; path=/${secure ? '; secure' : ''}`;
}

export const  deleteCookie = (name) => {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const getRefPage = () => {
  return GetCookie('authRef') || ''
}

export const removeRefPage = () => {
  deleteCookie('authRef')
}

export const SetRefPage = (url:NextRouter) => {
  setCookie('authRef', url.pathname)
}

export const filterResponse = (response) => {
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
