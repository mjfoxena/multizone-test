import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const SlickSlider = ({
  slides,
  lastSlideClassName,
  slideToShowCount = 1,
  slideToScrollCount = 1,
  centerMode = false,
  infiniteScroll = false,
  variableWidth = false,
  slideToShowCountMobile = 1,
  slideToScrollCountMobile = 1,
  slideItemClass = "h-screen",
  showArrow = true,
  prevArrow = "",
  nextArrow = "",
}) => {

  const arrowImage = (image) => (
    <Image
      alt="testimonial_arrow"
      width={120}
      height={120}
      src={image}
      className={""}
    />
  );

  const settings = {
    dots: false,
    infinite: infiniteScroll,
    speed: 500,
    slidesToShow: slideToShowCount,
    slidesToScroll: slideToScrollCount,
    centerMode: centerMode,
    variableWidth: variableWidth,
    arrows: showArrow,
    prevArrow: prevArrow.length === 0 ? undefined : arrowImage(prevArrow),
    nextArrow: nextArrow.length === 0 ? undefined : arrowImage(nextArrow),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: slideToShowCountMobile,
          slidesToScroll: slideToScrollCountMobile,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <Slider {...settings} >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={` ${slideItemClass} ${
              index + 1 === slides.length ? lastSlideClassName : ""
            }`}
          >
            {slide}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickSlider;