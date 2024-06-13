import { Carousel } from "react-responsive-carousel";
export function ScrollMobile({ children }) {
  return (
    <Carousel
      // dynamicHeight={true}
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      // infiniteLoop={true}
      showIndicators={false}
      // autoPlay={true}
      stopOnHover={false}
      interval={3000}
      swipeable={true}
      emulateTouch={true}
    >
      {children}
    </Carousel>
  );
}