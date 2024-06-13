/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext, useRef } from "react";
import Image from "next/image";
import Slider from "./index";
import Style from "./slider.module.scss";
import { NavbarContext } from "../../../../contexts/NavbarContext";
import {motion} from 'framer-motion'

const SliderPage = ({ slideData, title }) => {
  const { isMobile } = useContext(NavbarContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    const cardElement = document.getElementsByClassName("cards")[0] as HTMLElement;
    const cardWidth = cardElement.offsetWidth;
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slideData.data.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    const cardElement = document.getElementsByClassName("cards")[0] as HTMLElement;
    const cardWidth = cardElement.offsetWidth;
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
    setCurrentSlide((prevSlide) =>
      prevSlide === slideData.data.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="relative flex flex-col  h-screen max-h-[650px] sm:h-screen sm:max-h-[750px] 2xl:max-h-[850px] w-full p-6 sm:p-0 sm:mt-0">
      <div className="sm:pl-[10%]  flex justify-between ">
        { title === 'ADVANCED 5 LEVELS OF SAFETY' ? <motion.p initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }} viewport={{ once: true }} className={`${Style.headingP}`}>ADVANCED <span className="text-[#ED1C24] font-extrabold">5 LEVELS OF SAFETY</span></motion.p>: <motion.p initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }} viewport={{ once: true }} className={`${Style.headingP}`}>take <span className="text-[#ED1C24] font-extrabold">charge</span></motion.p> }
       

        <div className={`absolute ${ title === 'ADVANCED 5 LEVELS OF SAFETY' ? 'bottom-12' : 'bottom-24' } right-12 sm:static flex gap-3 sm:pr-[120px]`}>
          <div className="w-[35px] h-[35px] rounded-full cursor-pointer ">
            {currentSlide !== 0 ? (
              <Image
                width={2000}
                height={2000}
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
          <div className="hidden sm:flex w-[35px] h-[35px] rounded-full cursor-pointer">
            {!(currentSlide >= slideData.data.length - 2) ? (
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
          <div className="sm:hidden w-[35px] h-[35px] rounded-full cursor-pointer">
            {!(currentSlide >= slideData.data.length - 1) ? (
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
      <div className=" h-full sm:h-[90%] 2xl:mt-0 ">
        <div
          ref={containerRef}
          className={`sm:pr-[120px] sm:pl-[10%] gap-0 sm:gap-0 flex flex-row w-full h-full ${Style.newsArticleHorizontal}`}
        >
          {slideData.data.map((data, index) => (
            <Slider
              key={index}
              id={data.id}
              src={data.src}
              alt={data.alt}
              videoUrl={data.videoUrl}
              isMobile={isMobile}
              desc={data.desc}
              title={data.title}
            />
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default SliderPage;

