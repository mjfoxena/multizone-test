import { GetCookie } from "../services/helper";
import { GetServerSidePropsContext, NextApiResponse } from "next";
// import { CookieSerializeOptions } from "next/dist/server/web/types";

export const shouldSecureCookie =
  process.env.NEXT_PUBLIC_WORKINDIA_ENV === "production";

class CookieManagement {
  cookieKey: string;

  constructor(name: string) {
    this.cookieKey = name;
  }

  exists(): boolean {
    return this.getValue().length > 0;
  }

  getValue(): string {
    const value: string = `; ${document.cookie}`;
    const parts = value.split(`; ${this.cookieKey}=`);
    if (parts.length === 2)
      return JSON.parse(
        JSON.stringify((parts as any).pop().split(";").shift())
      );
    return "";
  }

  getValueFromStr(cookie): string {
    const value: string = `; ${cookie}`;
    const parts = value.split(`; ${this.cookieKey}=`);
    if (parts.length === 2)
      return JSON.parse(
        JSON.stringify((parts as any).pop().split(";").shift())
      );
    return "";
  }

  isKeyPresent(cookie: string): boolean {
    return cookie.includes(this.cookieKey);
  }
  getFromContext({ req, res }: GetServerSidePropsContext) {
    try {
      // if cookie is present in request headers
      const escape = (s) => s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
      const match = req?.headers?.cookie?.match(
        RegExp("(?:^|;\\s*)" + escape(this.cookieKey) + "=([^;]*)")
      );
      return match ? match[1] : null;
    } catch (err) {
      return null;
    }
  }

  setCookie(
    value,
    days: number | null = null,
    response: any | null = null,
    secure: boolean = false
  ) {
    if (response) {
      const maxAge = 60 * 60 * 24 * 1000;
      const opts = { maxAge };
      if (days) opts.maxAge = maxAge * days;
      response.cookie(this.cookieKey, value, { ...opts });
      return response;
    }
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(
        date.getTime() + (days as unknown as number) * 24 * 60 * 60 * 1000
      );
      expires = `; expires=${date.toUTCString()}`;
    }
    secure = secure && shouldSecureCookie;
    document.cookie = `${this.cookieKey}=${value || ""}${expires}; path=/${
      secure ? "; secure" : ""
    }`;
  }

  clearCookie() {
    document.cookie = `${this.cookieKey}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
}

const BookingFlow = new CookieManagement("booking_flow");
const ConfigFlow = new CookieManagement("config_flow");
const ReferrerFlow = new CookieManagement("referrer_flow");
const ReconfigureFlow = new CookieManagement("reconfigure");

export {
  CookieManagement,
  ConfigFlow,
  ReferrerFlow,
  BookingFlow,
  ReconfigureFlow,
};
