import React, { useState, createContext, useEffect, useContext } from "react";
import router, { useRouter } from "next/router";
import { IUser } from "../services/ProfileService";
import { getOldUserInfo } from "../services/auth";
import { BookingFlow, ReferrerFlow } from "../utils/CookieManagement";
import { sidebarSteps } from "../containers/variants";
import {
  delBookingConfig,
  getAccessToken,
  getBookingConfig,
} from "../services/helper";
import { UpdateUserBooking } from "../services/configuratorService";
import {
  handleReactiveResize,
  mobileAndTabletCheck,
  defaultResponsive,
} from "../utils/utils";
import { DefaultResponsive } from "../utils/interface/types";
import { originURL } from "../services/constants";

type NavBarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  userData: Partial<IUser>;
  setUserData: React.Dispatch<React.SetStateAction<IUser>>;
  allUserDetailsFilled: (user?: IUser) => boolean;
  IsInternational: (user?: IUser) => boolean;
  reqCountry: string;
  flows: {
    BookingFlowPostInternationalCheck: (user?: IUser) => void;
    configurator: {
      RolloutFlowPostLogin: (user?: IUser) => void;
      ConfigFlowPostLogin: (user?: IUser) => void;
    };
  };
  tempAuth;
  setTempAuth;

  isUserInfoLoading: boolean;
  showNavbar: boolean;
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  responsive: DefaultResponsive;
};

export const NavbarContext = createContext<NavBarProps>({
  reqCountry: "",
  sidebarOpen: false,
  setSidebarOpen: () => {},
  isMobile: false,
  setUserData: () => {},
  userData: {},
  allUserDetailsFilled: () => false,
  IsInternational: () => false,
  flows: {
    BookingFlowPostInternationalCheck: () => {},
    configurator: {
      RolloutFlowPostLogin: () => {},
      ConfigFlowPostLogin: () => {},
    },
  },
  tempAuth: null,
  setTempAuth: () => {},

  isUserInfoLoading: false,
  showNavbar: false,
  setShowNavbar: () => {},
  responsive: defaultResponsive,
});

export default function NavbarContextProvider({
  deviceType,
  children,
  referrer,
  country,
}: {
  deviceType;
  children: React.ReactNode;
  referrer?: string;
  country: string;
}) {  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(deviceType === "mobile");
  const [responsive, setResponsive] = useState<any>(defaultResponsive);
  const [userData, setUserData] = useState<Partial<IUser>>({});
  const [tempAuth, setTempAuth] = useState<any>();

  const [reqCountry, setReqCountry] = useState<string>(country);
  
  // Added By @Mrutyunjaya
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const route = useRouter();

  const allUserDetailsFilled = (user?: IUser) => {
    const UD = user || userData;
    return Boolean(
      UD.name && UD.country && UD.email && UD.pincode && UD.phone
    );
  };

  const IsInternational = (user: IUser | undefined = undefined) => {
    return (user || userData).country
      ? (user || userData).country !== "IN"
      : false;
  };

  const UpdateBookingPostSignin = async (email = "") => {
    try {
      const bookings = getBookingConfig();
      if (bookings?.booking_configuration) {
        await UpdateUserBooking({
          model: bookings.model,
          email: email || (userData?.email as string),
          limited_type: "",
          booking_configuration: bookings?.booking_configuration?.map(
            (each) => each.id
          ),
          pay_option: bookings.payment_mode,
          country: country,
        });
        delBookingConfig();
        return bookings;
      } else {
      }
    } catch (err) {
      delBookingConfig();
    }
  };

  const BookingFlowPostInternationalCheck = (user?: IUser) => {
    // if international
    if (IsInternational(user)) {
      router.push(`${originURL}/thankyou`);
    } else {
      router.push(`${originURL}/profile`);
      BookingFlow.clearCookie();
    }
  };

  const RolloutFlowPostLogin = (user?: IUser) => {
    if (IsInternational(user)) {
      router.push(`${originURL}/thankyou`);
    } else {
      router.push(`${ReferrerFlow.getValue()}?open=${sidebarSteps.rolloutCal}`);
      ReferrerFlow.clearCookie();
    }
  };

  const ConfigFlowPostLogin = async (user?: IUser) => {
    if (IsInternational(user as any)) {
      router.push(`${originURL}/thankyou`);
    } else {
      if (user?.booking_paid || userData?.booking_paid) {
        // uh oh page
        router.push(`${originURL}/uhoh`);
      } else {
        const bookings = await UpdateBookingPostSignin(user?.email);
        router.push(`${originURL}/summary`);
        delBookingConfig();
      }
    }
  };

  // if apis has to be called on every page. we can make calls inside router.events
  useEffect(() => {
    (async () => {
      if (getAccessToken()) {
        // Added By Mrutyunjaya
        setIsUserInfoLoading(true);

        const userInfo = await getOldUserInfo();
        if (userData) {
          setUserData(userInfo);
          setIsUserInfoLoading(false);
        }
        if (route.asPath.includes("deliverydetails")) {
          if (allUserDetailsFilled(userInfo)) {
            BookingFlowPostInternationalCheck(userInfo);
          }
        }
      } else {
        setUserData({});
      }
    })();
  }, [route.asPath]);

  // Reactive responsive
  const handleResize = () => {
    const responsive = handleReactiveResize();
    setIsMobile(responsive.isMobileWindow);
    setResponsive(responsive);
  };

  useEffect(() => {
    setIsMobile(mobileAndTabletCheck(navigator));
    // Initial Load
    handleResize();
    // reactive resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <NavbarContext.Provider
      value={{
        tempAuth,
        reqCountry,
        setTempAuth,
        IsInternational,
        allUserDetailsFilled,
        userData,
        // @ts-ignore
        setUserData,
        isMobile,
        sidebarOpen,
        setSidebarOpen,
        showNavbar,
        setShowNavbar,
        flows: {
          BookingFlowPostInternationalCheck,
          configurator: {
            RolloutFlowPostLogin,
            ConfigFlowPostLogin,
          },
        },

        isUserInfoLoading,
        responsive,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}