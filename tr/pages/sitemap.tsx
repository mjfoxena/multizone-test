/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Layout from '../components/Layout';
import { originURL } from '../services/constants';
import { GetServerSidePropsContext } from 'next';

const Sitemap = () => {
    const sitemapLinks = [
        { url: '/sitemap', label: 'Sitemap Link' },
    ];

    return (
        <Layout>
            <Head>
                <title>Sitemap | Ultraviolette</title>
                <meta
                    name="description"
                    content="Discover Ultraviolette's revolutionary electric vehicles and sustainable mobility solutions. Schedule your Test Ride today!"
                />
                {/* Add other meta tags as needed */}
            </Head>
            <div className='px-4 sm:px-12 py-5 brutal'>
                <h1 className='pb-3'>Sitemap</h1>
                <p className='pb-3'>
                    Discover Ultraviolette's revolutionary electric vehicles and sustainable mobility solutions. Schedule your Test Ride today!
                </p>
                {sitemapLinks.map((link, index) => (
                    <a key={index} href={`${originURL}${link.url}`} className='underline'>
                        {link.label}
                    </a>
                ))}
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const country = context?.query?.country;

    return {
        props: {
            country: country
        },
    };
}

export default Sitemap;