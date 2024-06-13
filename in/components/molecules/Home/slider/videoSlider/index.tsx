/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext, useRef } from "react";
import Slider from "./slider";
import Style from "./index.module.scss";
import { NavbarContext } from "../../../../../contexts/NavbarContext";
import { motion } from "framer-motion";

const VideoSlider = () => {
  const { isMobile } = useContext(NavbarContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const videoCards = [
    {
      desc: "The Hit List | Ultraviolette F77 | Sagar Sheldekar Official",
      title: "Video1",
      videoId: "IEPcUb3WI5w",
      duration: "10:22",
    },
    {
      desc: "The Ultraviolette F77 goes touring | Chennai to Leh | PowerDrift",
      title: "Video4",
      videoId: "FR1XkdUPll4",
      duration: "13:59",
    },
    {
      desc: "Chennai-Leh ride in just ₹400 | Bike With Girl",
      title: "Video3",
      videoId: "yyx0SEbF_2A",
      duration: "10:27",
    },
    {
      desc: "Meet The Leaders: Narayan and Niraj | Ultraviolette Automotive | PowerDrift",
      title: "Video2",
      videoId: "AtzXlUM8Tpc",
      duration: "30:02",
    },
  ];

  const handlePrevSlide = () => {
    const cardElement = document.getElementsByClassName(
      "cards"
    )[0] as HTMLElement;
    const cardWidth = cardElement.offsetWidth;
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? videoCards.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    const cardElement = document.getElementsByClassName(
      "cards"
    )[0] as HTMLElement;
    const cardWidth = cardElement.offsetWidth;
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
    setCurrentSlide((prevSlide) =>
      prevSlide === videoCards.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="relative flex flex-col  h-[85vh] xl:h-screen xl:max-h-[750px] md:max-h-[900px] w-full p-6 sm:p-0 xl:mt-36 md:mt-20">
      <div className="sm:pl-[10%]   flex justify-between">
        <div className=" sm:pl-0 flex flex-col gap-1 ">
          <motion.p
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 1 } },
              hidden: { opacity: 0, y: 40 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={Style.subTitle}
          >
            SOME INTERESTING{" "}
          </motion.p>
          <motion.p
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 1 } },
              hidden: { opacity: 0, y: 40 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={Style.title}
          >
            F77 videos
          </motion.p>
        </div>
        <div className="absolute bottom-24 md:bottom-[23%] max-sm:bottom-[20%]   right-12 xl:static flex gap-2 xl:mt-7 xl:pr-[120px]">
          <div className="w-[30px] h-[30px] rounded-full cursor-pointer">
            {currentSlide !== 0 ? (
              <img
                src="/images/home/newhome/slides/leftArrow.png"
                alt="leftArrow"
                onClick={handlePrevSlide}
              />
            ) : (
              <img
                src="/images/home/newhome/slides/leftArrow.png"
                alt="leftArrow"
                className="opacity-25"
              />
            )}
          </div>
          <div className="hidden xl:flex w-[30px] h-[30px] rounded-full cursor-pointer">
            {!(currentSlide >= videoCards.length - 2) ? (
              <img
                src="/images/home/newhome/slides/rigthArrow.png"
                alt="rightArrow"
                onClick={handleNextSlide}
              />
            ) : (
              <img
                src="/images/home/newhome/slides/rigthArrow.png"
                alt="rightArrow"
                className="opacity-25"
              />
            )}
          </div>
          <div className="xl:hidden w-[30px] h-[30px] rounded-full cursor-pointer">
            {!(currentSlide >= videoCards.length - 1) ? (
              <img
                src="/images/home/newhome/slides/rigthArrow.png"
                alt="rightArrow"
                onClick={handleNextSlide}
              />
            ) : (
              <img
                src="/images/home/newhome/slides/rigthArrow.png"
                alt="rightArrow"
                className="opacity-25"
              />
            )}
          </div>
        </div>
      </div>
      <div className=" h-full xl:h-[90%]">
        <div
          ref={containerRef}
          className={`sm:pr-[10%] sm:pl-[10%]  gap-0 sm:gap-0 flex flex-row w-full h-full ${Style.newsArticleHorizontal}`}
        >
          {videoCards.map((data, index) => (
            <Slider
              key={index}
              desc={data.desc}
              title={data.title}
              videoId={data.videoId}
              duration={data.duration}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;
