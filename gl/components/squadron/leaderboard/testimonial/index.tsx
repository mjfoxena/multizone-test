/* eslint-disable @next/next/no-img-element */
import { ScrollMobile } from "../../../molecules/Home/ScrollMobile";
import SlickSlider from "../../../molecules/Home/SlickSlider";
import { leaderboardRawData } from "../../../../constants/raw_data";
import TestimonialCard from "./testimonialcard";
import styled from "styled-components";
import React, { useEffect } from "react";

const CarouselContainer = styled.div`
  .carousel .slider {
    margin-left: 5% !important;
    width: 86% !important;
  }
  .slick-current {
    width: none !important;
  }
`;


const PilotTestimonials = ({ isMobile }) => {
  const { testimonials } = leaderboardRawData;
   useEffect(() => {
      const elements = document.getElementsByClassName('slick-current');
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('slick-current');
      }
  })

  // useEffect(() => {
  //   setTimeout(() => {
  //     const elements = document.getElementsByClassName('slick-current');
  //     for (let i = 0; i < elements.length; i++) {
  //       elements[i].classList.remove('slick-current');
  //     }
  //   }, 500);
  // }, [])

  const renderTestimonialsCard = testimonials.map((testimonial, index) => (
    <div key={index} className={index == 0 ? "" : "pl-5 sm:pl-0"}>
      <TestimonialCard
        comment={testimonial.comment}
        image={testimonial.image}
        index={index}
        isMobile={isMobile}
        location={testimonial.location}
        rider={testimonial.rider}
        link={testimonial.link}
      />
    </div>
  ));

  const renderSlider = (show = 3, count = 4) => (
    <SlickSlider
      slides={renderTestimonialsCard}
      lastSlideClassName={""}
      slideToShowCount={show}
      slideToScrollCount={count}
      slideItemClass=""
      showArrow={true}
      nextArrow={"/images/leaderboard/key-right-arrow.svg"}
      prevArrow={"/images/leaderboard/key-left-arrow.svg"}
    // variableWidth={true}
    />
  );

  return (
    <div className="mt-14">
      <div className="mt-10">
        {isMobile ? (
          <div className="">
            <CarouselContainer>
              <ScrollMobile>{renderTestimonialsCard}</ScrollMobile>
            </CarouselContainer>
          </div>
        ) : (
          <div>
            <div className="xl:hidden 2xl:hidden block lg:block">{renderSlider(2, 3)}</div>
            <div className="xl:block md:hidden 2xl:block">{renderSlider(3, 3)}</div>
            {/* <div className="hidden 2xl:block">{renderSlider(3, 3)}</div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PilotTestimonials;