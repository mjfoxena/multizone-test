import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import VariantContainer from '../../../containers/variants';
import { GetClientAndReferrer } from '../../../utils/utils';
import Script from "next/script";

const Variants = ({variant, open, country}) => {
    return (
        <>
            <Script src="/js/hotjar.js" strategy="afterInteractive" />
            <VariantContainer step={open} country={country}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context:GetServerSidePropsContext) => {
    const { query } = context;
    const { variant, open } = query;
    const country = context?.query?.country;
    
    return {
        props: {
            variant: variant || "",
            open: open||'',
            country: country,
            ...GetClientAndReferrer(context),
        }
    }
}


export default Variants
