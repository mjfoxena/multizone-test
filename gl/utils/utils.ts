export const MapCss = (styles: any, classes: string, utilities: any = "") =>
  `${classes
    .split(" ")
    .map((each) => `${styles[each]}`)
    .join(" ")} ${utilities}`
    .replace("undefined", "")
    .trim();

export const mobileAndTabletCheck = (navigator: Navigator) => {
  let check = false;
  (function (a) {
    // eslint-disable-next-line no-useless-escape
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a?.substr(0, 4)
      )
    ) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor);
  return check;
};

export const toTitleCase = (s) => s && s[0].toUpperCase() + s.slice(1);

export const GetClientAndReferrer = (context) => {
  let isClientMobile = true;
  let referrer = "";
  let cloudFrontUAHeader =
    context.req?.headers?.["cloudfront-is-desktop-viewer"];

  if (cloudFrontUAHeader) {
    if (cloudFrontUAHeader === "true") {
      isClientMobile = false;
    }
  } else {
    const UA = context.req?.headers["user-agent"];
    isClientMobile = mobileAndTabletCheck(UA);
  }
  if (context?.req?.headers?.referer) {
    referrer = context.req?.headers?.referer;
  }
  return {
    deviceType: isClientMobile ? "mobile" : "desktop",
    referrer: referrer,
  };
};

// Added By Mrutyunjaya
/// For Filter Tooltip
export const getItoolTip = (e: any) => {
  let tooltip = { header: "", description: "", list: [] };
  if (e.tooltip) {
    if (typeof e.tooltip === "string") {
      tooltip.description = e.tooltip;
    } else {
      tooltip = { ...e.tooltip };
    }
    return tooltip;
  } else if (e.tooltip_text && e.tooltip_text.length !== 0) {
    tooltip.description = e.tooltip_text;
    return tooltip;
  } else return undefined;
};
export const defaultResponsive = {
  isMobileWindow: false,
  isDesktopWindow: true,
  isXtraLargeWindow: false,
  is2XlLargeWindow: false,
  isTabWindow: false,

  breakpoint: "xs",
  width: 576,
  height: 690,
};
export const handleReactiveResize = () => {
  const responsive = defaultResponsive;
  const innerWidth = window.innerWidth;
  responsive.width = innerWidth;
  responsive.height = window.innerHeight;
  if (innerWidth <= 576) {
    // Xtra Small
    responsive.breakpoint = "xs";
    responsive.isMobileWindow = true;

    responsive.isDesktopWindow = false;
    responsive.isTabWindow = false;
    responsive.is2XlLargeWindow = false;
    responsive.isXtraLargeWindow = false;
  } else if (innerWidth > 576 && innerWidth <= 800) {
    // Mobile
    responsive.breakpoint = "sm";
    responsive.isDesktopWindow = false;
    responsive.isTabWindow = false;
    responsive.is2XlLargeWindow = false;
    responsive.isXtraLargeWindow = false;
    responsive.isMobileWindow = true;
  }
  // else if (innerWidth > 640 && innerWidth <= 800) {
  //   // 800 instead of 768
  //   // Tab
  //   responsive.breakpoint = "sm";
  //   responsive.isDesktopWindow = false;
  //   responsive.isTabWindow = true;
  //   responsive.isMobileWindow = false;
  // }
  else if (innerWidth > 800 && innerWidth <= 1024) {
    // md
    responsive.breakpoint = "md";
    responsive.isDesktopWindow = false;
    responsive.isTabWindow = true;
    responsive.isMobileWindow = false;
    responsive.is2XlLargeWindow = false;
    responsive.isXtraLargeWindow = false;
  } else if (innerWidth > 1024 && innerWidth <= 1280) {
    // lag
    responsive.breakpoint = "lg";
    responsive.isDesktopWindow = true;
    responsive.isTabWindow = false;
    responsive.isMobileWindow = false;
    responsive.is2XlLargeWindow = false;
    responsive.isXtraLargeWindow = false;
  } else if (innerWidth > 1280 && innerWidth <= 1536) {
    // lag
    responsive.breakpoint = "xl";
    responsive.isDesktopWindow = false;
    responsive.isXtraLargeWindow = true;
    responsive.isTabWindow = false;
    responsive.isMobileWindow = false;
    responsive.is2XlLargeWindow = false;
  } else {
    // Desktop [ 2xl]
    responsive.breakpoint = "2xl";
    responsive.isDesktopWindow = false;
    responsive.is2XlLargeWindow = true;
    responsive.isXtraLargeWindow = false;
    responsive.isTabWindow = false;
    responsive.isMobileWindow = false;
  }

  return responsive;
};

export const covertToLocaleDateString = (dateString) => {
  try {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    // @ts-ignore
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  } catch (err) {
    return "--";
  }
};

// Function to format date on on New Porile
export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);

  // List of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get day, month, and year
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Format the date
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  return formattedDate;
};

// Function to format number with commas on on New Porile
export const formatPriceStringWithCommas = (priceString: string): string => {
  // Parse string to number
  const price = parseFloat(priceString);

  // Check if parsing was successful
  if (isNaN(price)) {
    return priceString; // Return original string if parsing failed
  }

  // Format number with commas as a price
  const formattedPrice = price
    .toLocaleString("en-IN", { style: "currency", currency: "INR" })
    .replace("₹", "");

  // Remove trailing .00 if present
  const trimmedPrice = formattedPrice.replace(/\.00$/, "");

  return trimmedPrice;
};
export const formatPriceStringWithCommasWithNumber = (
  price: number
): string => {
  // Format number with commas as a price
  const formattedPrice = price
    .toLocaleString("en-IN", { style: "currency", currency: "INR" })
    .replace("₹", "");

  // Remove trailing .00 if present
  const trimmedPrice = formattedPrice.replace(/\.00$/, "");

  return trimmedPrice;
};

/// Format Price
interface IFormatPrice {
  price?: any;
  defaultPrice?: number;
  locale?: string;
}

export const formatPrice = (data: IFormatPrice): string => {
  const formatter = new Intl.NumberFormat(data.locale || "en-IN");
  const value = data.price || data.defaultPrice;
  return formatter.format(value);
};

// emi
export const calculateMonthlyEmi = (
  principle: any,
  tenure: number,
  annualRateOfIterest: number,
  downPaymentPercentage: number
): string => {
  try {
    if (!downPaymentPercentage) downPaymentPercentage = 20;
    const downPayment = (principle * downPaymentPercentage) / 100;
    principle = principle - downPayment;
    const monthlyRateOfInterest = annualRateOfIterest / 12 / 100;
    const EMI =
      (principle *
        monthlyRateOfInterest *
        (1 + monthlyRateOfInterest) ** tenure) /
      ((1 + monthlyRateOfInterest) ** tenure - 1);
    return EMI.toFixed(2).toString();
  } catch (error) {
    return "";
  }
};
