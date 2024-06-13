import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CommonFooter from "../../components/molecules/CommonFooter";
import { AccountDetails } from "../../components/molecules/NewProfile/AccountDetails";
import PricingSection from "../../components/molecules/NewProfile/PricingSection";
import NewUser from "../../components/molecules/newUser";
import ExistingProfile from "../../components/profile/existingprofile";
import { NavbarContext } from "../../contexts/NavbarContext";
import { getOldUserInfo } from "../../services/auth";
import { getCognitoInfo } from "../../services/helper";
import { getusersummary } from "../../services/ProfileService";
import { BookingFlow } from "../../utils/CookieManagement";
import { IBookingInfo } from "../../utils/interface/user_booking_type";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

export default function NewProfile({ country }) {
  const { userData } = useContext(NavbarContext);
  const [profileDetails, setProfileDetails] = useState<IBookingInfo | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const onPageLoaded = async () => {
    try {
      const user = await getOldUserInfo();
      const reqpayload = {
        email: user?.email,
      };

      const fetchedProfileDetails: IBookingInfo = await getusersummary(
        reqpayload
      );

      setProfileDetails(fetchedProfileDetails);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    setIsLoading(true);
    if (!getCognitoInfo()) {
      router.push("/");
      return;
    }

    BookingFlow.clearCookie();

    if (userData?.email !== undefined) {
      onPageLoaded();
    }
  }, [userData?.email]);

  if (isLoading) {
    return (
      <div>
        <SkeletonTheme baseColor="#FFF" highlightColor="#888">
          <p>
            <Skeleton count={10} />
          </p>
        </SkeletonTheme>
        <CommonFooter />
      </div>
    );
  }

  return profileDetails?.mach2_customer ? (
    <div className="bg-black w-full h-full">
      <div>
        {/* Check the booking_paid value to decide which component to render */}
        {!profileDetails ? (
          <div className="bg-black h-full w-full">
            <div className="bg-black h-5 w-full"></div>
            {/* common footer */}
            <CommonFooter />
          </div>
        ) : profileDetails.booking_paid ? (
          <div>
            {/* Account Details */}

            <AccountDetails profileDetails={profileDetails} />

            {/* Pricing Section */}

            <PricingSection profileDetails={profileDetails} />
          </div>
        ) : (
          <NewUser name={profileDetails.name} />
        )}

        {/* common footer */}
        <CommonFooter />
      </div>
    </div>
  ) : (
    <ExistingProfile country={country} />
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const country = context?.query?.country;

  return {
    props: {
      country: country,
    },
  };
}
