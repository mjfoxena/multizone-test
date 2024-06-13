import { API_CONSTANTS } from "../services/constants";

const pdfUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/pdf/`;
const homePageRefresh = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/refresh/`;
const testRideUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/testride/`;
export class DocumentConstants {
  static uvBookingAgreement = `${pdfUrl}UV-Booking-Agreement-Apr2024.pdf`;
  static privacyPolicy = `${pdfUrl}privacy_policy.pdf`;   
  static saleTermsAndConditions = `${pdfUrl}sale.pdf`;
  static termsOfUse = `${pdfUrl}WebsiteTermsofUse.pdf`;

  // Sign In
  static signIn = `${homePageRefresh}signin/signin_ds.webp`;
  static signInMobile = `${homePageRefresh}signin/signin_mobile.webp`;

  //  enquiry
  static enquiry = `${homePageRefresh}enquiry/enquiry_desktop.webp`;
  static enquiryMobile = `${homePageRefresh}enquiry/enquiry_mobile.webp`;

  //  test ride
  static testRide = `${testRideUrl}test_ride_desktop.jpg`;
  static testRideMobile = `${testRideUrl}test_ride_mobile.jpg`;

  static legalData = [
    {
      name: "PRIVACY POLICY",
      url: this.privacyPolicy,
      local: true,
    },
    { name: "TERMS OF USE", url: this.termsOfUse },
    { name: "SALE TERMS AND CONDITIONS", url: this.saleTermsAndConditions },
    {
      name: "BOOKING AGREEMENT",
      url: this.uvBookingAgreement,
    },
  ];
}
