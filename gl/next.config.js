require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/gl",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {}, // Remove the invalid option 'appDir'
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    minimumCacheTTL: 60000,
    domains: [
      "d2vja53fwrfp9f.cloudfront.net",
      "s3.ap-south-1.amazonaws.com",
      "d2atk76x06g5eh.cloudfront.net",
      // "images.unsplash.com",
      // "plus.unsplash.com",
    ],
  },

  // output: "export",
  // distDir: "out",

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ||
      process.env.ENVRONMENT === "production",
  },
  serverRuntimeConfig: {}, // only available on server
  publicRuntimeConfig: {
    // Will be available on both server and client
    environment: process.env.ENVIRONMENT,
    paymentMode: process.env.PAYMENT_MODE,

    publicBaseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    previewBaseUrl: process.env.NEXT_PREVIEW_BASE_URL,

    prodBaseURL: process.env.PROD_BASE_URL,
    vbaPaymentBaseURL: process.env.VBA_PAYMENT_BASE_URL,
    devBaseURL: process.env.DEV_BASE_URL,
    authOBaseURL: process.env.AUTH0_BASE_URL,
    cognitoBaseURL: process.env.COGNITO_BASE_URL,
  },
  async redirects() {
    return [
      {
        source: "/space-edition",
        destination: "/limited",
        permanent: true,
      },
      {
        source: "/corporate/:path*",
        destination:
          "https://s3.ap-south-1.amazonaws.com/www.ultraviolette.com/corporate/:path*",
        permanent: false,
      },
      {
        source: "/campaigns/:path*",
        destination:
          "https://s3.ap-south-1.amazonaws.com/www.ultraviolette.com/campaigns/:path*",
        permanent: false,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/f77.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pre_order_signup.html",
        destination: "/signin",
        permanent: true,
      },
      {
        source: "/faq.html",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/faq.html",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/smart_connect.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/support.html",
        destination: "/support",
        permanent: true,
      },
      {
        source: "/careers.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/F77_specs.pdf",
        destination: "/",
        permanent: true,
      },
      // {
      //   source: "/img/f77_hero_2_alt.pngΩΩΩhttps://www.webbikeworld.com/wp-content/uploads/2021/07/f77_hero_2_alt.pngΩΩΩ",
      //   destination: "https://www.ultraviolette.com/_next/image?url=https%3A%2F%2Fd2atk76x06g5eh.cloudfront.net%2Fhomepage%2Fimages%2Flanding-page-image.png&w=2048&q=75",
      //   permanent: true,
      // },
      // {
      //   source: "/2013/01/31/ce-que-lon-apprend-sur-zahia-dans-zahia-de-z-a-a/zahia-atelier/",
      //   destination: "/",
      //   permanent: true,
      // },
      // {
      //   source: "https://fwtrack.ultraviolette.com/",
      //   destination: "/",
      //   permanent: true,
      // },
      // {
      //   source: "https://wiki.ultraviolette.com/",
      //   destination: "/",
      //   permanent: true,
      // },
      // {
      //   source: "/2013/01/31/ce-que-lon-apprend-sur-zahia-dans-zahia-de-z-a-a/",
      //   destination: "/",
      //   permanent: true,
      // },
      // {
      //   source: "/f77_hero_2_alt.pngΩΩΩhttps://www.ultraviolette.com/_next/image?url=https://d2atk76x06g5eh.cloudfront.net/homepage/images/landing-page-image.png&w=3840&q=75%CE%A9%CE%A9%CE%A9https://static.tnn.in/thumb/msid-94955859,updatedat-1666155288890,width-1280,height-720,resizemode-75/94955859.jpg",
      //   destination: "/_next/image?url=https%3A%2F%2Fd2atk76x06g5eh.cloudfront.net%2Fhomepage%2Fimages%2Flanding-page-image.png&w=2048&q=75",
      //   permanent: true,
      // },
      // {
      //   source: "/Youtube",
      //   destination: "https://www.youtube.com/channel/UCWWTQuQdiYZNW2HncFFbHrg/featured",
      //   permanent: true,
      // },
      // {
      //   source: "/Youtube::!",
      //   destination: "https://www.youtube.com/channel/UCWWTQuQdiYZNW2HncFFbHrg/featured",
      //   permanent: true,
      // },

      {
        source: "/product.html",
        destination: "/configure",
        permanent: true,
      },
      {
        source: "/configure/variant",
        destination: "/configure",
        permanent: true,
      },
      {
        source: "/vault.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/technology.html",
        destination: "/configure",
        permanent: true,
      },

      {
        source: "/ready-for-takeoff.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pressroom.html",
        destination: "/press",
        permanent: true,
      },
      {
        source: "/pressroom.html",
        destination: "/press",
        permanent: true,
      },
      {
        source: "/f77.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/hangar.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/energy.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/support.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/privacy.html",
        destination: "/legal",
        permanent: true,
      },
      {
        source: "/hangar",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
