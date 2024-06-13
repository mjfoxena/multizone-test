/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState } from "react";
import Style from "../../../pages/squadron/squadron.module.scss";
import { API_CONSTANTS } from "../../../services/constants";
import SlickSlider from "../../molecules/Home/SlickSlider";
import { ScrollMobile } from "../../molecules/Home/ScrollMobile";

const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/`;

const SquadronImage = ({isMobile}) => {

  const imagesList = [
    {
      id: 1,
      src: `${imageUrl}squadron/2.jpg`,
      alt: "UV SQUADRON PILOTS",
    },
    {
      id: 2,
      src: `${imageUrl}squadron/3.jpg`,
      alt: "UV SQUADRON PILOTS",
    },
    {
      id: 3,
      src: `${imageUrl}squadron/4.jpg`,
      alt: "UV SQUADRON PILOTS",
    },
    {
      id: 4,
      src: `${imageUrl}squadron/5.jpg`,
      alt: "UV SQUADRON PILOTS",
    },
  ];

  const lastSlideClassName = "last-image-slide";
  const [scrollImages, setScrollImages] = useState(
    imagesList.map((image, i) => (
      <div
        key={i}
        className={`${Style.carouselSlide} sm:w-full sm:mr-5`}
        style={{ cursor: "url('/images/icons/drag-arrow.svg'), auto" }}
      >
        <Image
          width={isMobile ? 296 : 700}
          height={isMobile ? 296 : 645}
          alt={image.alt}
          src={image.src}
          style={{ objectFit: "cover" }}
        />
        <div className={Style.extraIntake}>{image.alt}</div>
      </div>
    ))
  );

  return (
    <>
      {" "}
      <div>
        {!isMobile && (
          <div className={Style.otherHorizontal}>
            <div className="sm:ml-[95px] flex flex-row">
              <SlickSlider
                slides={scrollImages}
                lastSlideClassName={lastSlideClassName}
                variableWidth={true}
                slideToShowCount={1}
                slideToShowCountMobile={1}
                slideToScrollCountMobile={1}
                showArrow={false}
              />
            </div>
          </div>
        )}
        {isMobile && (
          <div className="pl-12">
            <ScrollMobile>
              {imagesList.map((image, i) => (
                <div key={i} className={`${Style.selectedImage} sliderMobileImage -ml-3`}>
                  <img
                    key={i}
                    alt={image.alt}
                    src={image.src}
                    style={{
                      objectFit: "cover",
                      height: "276px",
                      // width: `${100 / imagesList.length}%`,
                    }}
                  />
                </div>
              ))}
            </ScrollMobile>
          </div>
        )}
      </div>
    </>
  );
};

export default SquadronImage;