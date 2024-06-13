import { useState, useEffect } from "react";
import HLSVideo from "./hls";

const VideoComponent = ({ videosDesk, videosMob }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to update isMobile state based on screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // Set isMobile state initially and add event listener for window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="embla__container">
      {isMobile
        ? videosMob.map((item, index) => (
            <div className="embla__slide" key={index}>
              <HLSVideo src={item.src} description={item.description} />
            </div>
          ))
        : videosDesk.map((item, index) => (
            <div className="embla__slide" key={index}>
              <HLSVideo src={item.src} description={item.description} />
            </div>
          ))}
    </div>
  );
};

export default VideoComponent;
