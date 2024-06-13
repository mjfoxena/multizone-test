// business-schema.ts
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ultraviolette Automotive",
  alternateName: "Ultraviolette Electric Bike",
  description:
    "Explore Ultraviolette's cutting-edge electric vehicles and sustainable mobility solutions. Developing India’s first ecosystem of high-performance electric vehicles",
  url: "https://www.ultraviolette.com/",
  logo: "https://www.ultraviolette.com/images/icons/uv-white.svg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "080-694-53322",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: "en",
  },
  sameAs: [
    "https://www.instagram.com/ultraviolette_automotive/",
    "https://www.youtube.com/channel/UCWWTQuQdiYZNW2HncFFbHrg/featured",
    "https://www.linkedin.com/company/ultraviolette-automotive/",
    "https://en.wikipedia.org/wiki/Ultraviolette_Automotive",
    "https://twitter.com/UltravioletteEV",
  ],
};

export default businessSchema;
