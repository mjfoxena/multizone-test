import React from "react";
import HeaderOfLoactionUs from "../../components/molecules/locationUs/header/header";
import Places from "../../components/molecules/locationUs/places/locationUs";
import CommonFooter from "../../components/molecules/CommonFooter";
import { GetServerSidePropsContext } from "next";

export default function LocationUs() {
  return (
    <div className="bg-[#ECECEC]">
      <HeaderOfLoactionUs />
      <Places />
      <CommonFooter />
    </div>
  );

 
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const country = context?.query?.country;

  return {
      props: {
          country: country
      },
  };
}

