import Head from 'next/head';

const GraphTags = ({ title, description, image, url }) => (
    <Head>
        <meta property="og:image" content={image} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
    </Head>
);

export default GraphTags;
