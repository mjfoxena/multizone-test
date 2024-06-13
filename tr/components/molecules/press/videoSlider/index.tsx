import React, { useState } from "react";
import { ScrollMobile } from "../../Home/ScrollMobile";
import styled from "styled-components";

const CarouselContainer = styled.div`
  .carousel * {
    width: 101%;
    height: auto;
    flex-direction: column;
  }
  .carousel .slide iframe{
    height: 280px !important;
  }
`;

const PressVideos = ({ isMobile }) => {
  const videoList = [
    {
      title: "Video1",
      videoId: "N8rudhdqv-Y",
    },
    {
      title: "Video2",
      videoId: "QFPlwHnzHFo",
    },
    {
      title: "Video3",
      videoId: "RajB-JQJsQQ",
    },
    {
      title: "Video4",
      videoId: "tnzONU2Lon0",
    }
    // {
    //   title: "Video5",
    //   videoId: "szFEWC1czKs ",
    // },
  ];

  const [scrollItems, setScrollItems] = useState(
    videoList.map((video) => (
      <div
        key={video.title}
        className="sm:mr-[125px] flex flex-row w-[100vw] sm:w-auto"
        style={{ cursor: "url('/images/icons/drag-arrow.svg'), auto" }}
      >
        <iframe
          title={video.title}
          width="100%"
          height="300%"
          src={`https://www.youtube.com/embed/${video.videoId}?mute=1&loop=1&playlist=${video.videoId}`}
          allowFullScreen
        ></iframe>
      </div>
    ))
  );

  return (
    <div className="-ml-12">
      {!isMobile && (
        <div className="flex col-3 ml-[139px] mr-[58px]">
          {videoList.map((video) => (
            <div
              key={video.title}
              className="w-full sm:mr-8 mb-[400px]"
              style={{ cursor: "url('/images/icons/drag-arrow.svg'), auto" }}
            >
              <iframe
                title={video.title}
                width="100%"
                height="300%"
                src={`https://www.youtube.com/embed/${video.videoId}?mute=1&loop=1&playlist=${video.videoId}`}
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      )}
      {isMobile && (
        <CarouselContainer>
          <div className="ml-7 flex-col">
            <ScrollMobile>{scrollItems.map((video) => video)}</ScrollMobile>
          </div>
        </CarouselContainer>
      )}
    </div>
  );
};

export default PressVideos;