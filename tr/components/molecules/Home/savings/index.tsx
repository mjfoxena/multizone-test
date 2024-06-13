import React from 'react'
import Savings from './savings'
import { GetClientAndReferrer, toTitleCase } from "../../../../utils/utils";
import { BikeLabelMap } from "../../../../constants/configSelectionImageMap";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Style from './savings.module.scss'




const SavingsPage = ({open,country}) => {

  return (
    <div className={Style.savings}>
      <Savings step={open} country={country}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const country = context?.query?.country;
  const { query } = context;
  const { variant, open } = query;
  
  if (
    !Object.keys(BikeLabelMap).includes(variant as string) &&
    variant !== "limited"
    ) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        variant,
        open: open || "",
        country: country,
        ...GetClientAndReferrer(context),
    },
  };
};

export default SavingsPage
