"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import HLSVideo from "./hls";
import VideoComponent from "./videocomponent";

const videosDesk = [
  {
    src: "https://player.vimeo.com/external/938067126.m3u8?s=46299f6b37b0e2de36c28fc04fe1ccf1a82b4b86&logging=false",
    description:
      "4 levels of traction control ensure the tyres always stick well to any terrain when you go ballistic.",
  },
  {
    src: "https://player.vimeo.com/external/938067148.m3u8?s=d60e4805ab67df218ad12888f17553dacc47ce84&logging=false",
    description:
      "While decelerating with regen, A.C.W.S. ensures that the tail light blinks akin to aircraft beacon lights to alert other vehicles behind you.",
  },
  // {
  //   src: "https://player.vimeo.com/external/938067148.m3u8?s=d60e4805ab67df218ad12888f17553dacc47ce84&logging=false",
  //   description:
  //     "The only electric motorcycle that’s equipped with dual channel ABS. So you have full control over both wheels to secure yourself when braking.",
  // },
  {
    src: "https://player.vimeo.com/external/938067167.m3u8?s=5ebec2a52ec870733111c87b62714356d5ada5fc&logging=false",
    description:
      "No matter the incline, the F77 MACH 2 remains steady and in place without engaging the brakes.",
  },
];
const videosMob = [
  {
    src: "https://player.vimeo.com/external/944748423.m3u8?s=fe05bbb2725c9d1858553567136fe8ff603a0497&logging=false",
    description:
      "4 levels of traction control ensure the tyres always stick well to any terrain when you go ballistic.",
  },
  {
    src: "https://player.vimeo.com/external/944748388.m3u8?s=92f52d6426c4fd4586937f04a715320edbebec1c&logging=false",
    description:
      "While decelerating with regen, A.C.W.S. ensures that the tail light blinks akin to aircraft beacon lights to alert other vehicles behind you.",
  },
  // {
  //   src: "https://player.vimeo.com/external/938067148.m3u8?s=d60e4805ab67df218ad12888f17553dacc47ce84&logging=false",
  //   description:
  //     "The only electric motorcycle that’s equipped with dual channel ABS. So you have full control over both wheels to secure yourself when braking.",
  // },
  {
    src: "https://player.vimeo.com/external/944748357.m3u8?s=26593524f0f52e82823c58d90e3c9bd9706c578b&logging=false",
    description:
      "No matter the incline, the F77 MACH 2 remains steady and in place without engaging the brakes.",
  },
];

const EmblaCarousel = (props: {
  options: any;
  onSlideSelect: (index: number) => void;
}) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const handlePrevious = () => {
    emblaApi?.scrollPrev();
  };

  const handleNext = () => {
    emblaApi?.scrollNext();
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to update isMobile state based on screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023); // mobile is 767
    };

    // Set isMobile state initially and add event listener for window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      // Update active slide index
      const selectedIndex = emblaApi.selectedScrollSnap();
      props.onSlideSelect(selectedIndex);

      // Set height for center video and add padding to top for other videos
      const slides = document.querySelectorAll(".embla__slide");
      slides.forEach((slide, index) => {
        const video = slide.querySelector("video") as HTMLVideoElement;
        const slideNumber = slide.querySelector(
          ".embla__slide__number"
        ) as HTMLElement;

        if (index === selectedIndex) {
          slideNumber.setAttribute("style", "height: 38rem; margin-top: 0;");
          video.style.opacity = "1";
          video.play();
        } else {
          slideNumber.setAttribute(
            "style",
            "height: 35rem; margin-top: 1.5rem;"
          );
          video.style.opacity = "0.5";
          video.pause();
        }
      });
    };

    // Manually trigger onSelect when the component mounts
    onSelect();

    emblaApi.on("select", onSelect);

    // Cleanup
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, props]);

  return (
    <section className="embla  relative">
      <div className="embla__viewport " ref={emblaRef}>
        <VideoComponent videosDesk={videosDesk} videosMob={videosMob} />
        <div
          onClick={handlePrevious}
          className="absolute h-[38rem] w-[10rem]  top-0 left-0 cursor-pointer max-md:hidden"
        ></div>
        <div
          onClick={handleNext}
          className="absolute h-[38rem] w-[10rem]  top-0 cursor-pointer right-0 max-md:hidden"
        ></div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
