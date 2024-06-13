// product-schema.ts
const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "Ultraviolette F77 Electric Bike",
    image:
      "https://www.ultraviolette.com/_next/image?url=https%3A%2F%2Fd2atk76x06g5eh.cloudfront.net%2Fhomepage%2Fimages%2Flanding-page-image.png&w=3840&q=75",
    description:
      "he F77 powertrain is as much a work of art, as it is advanced engineering. The motor, the transmission, the drive systems and the controllers have been put through thousands of kilometers of testing and fine-tuning to give you an elevated riding experience. This Machine Outputs 30.2Kw Of Peak Power & 100 Nm Of Peak Torque At The Motor. All Of This, Available On Demand, With Throttle Mapping At Its Best",
    brand: {
      "@type": "Brand",
      name: "Ultraviolette",
    },
  };
  
  export default productSchema;
  