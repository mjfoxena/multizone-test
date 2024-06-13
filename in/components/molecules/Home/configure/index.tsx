import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Style from "../index.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";
const ConfigureHead = ({
  isMobile,
  imageUrl,
  videoUrl,
  mobileVideoUrl,
  overlay,
}) => {
  const router = useRouter();

  const videoRef = useRef(null);

  const [ref, inView] = useInView();

  useEffect(() => {
    const test: any = document.getElementById("landing_video");
    if (test)
      test.onmouseover = function () {
        test.play();
      };
  }, [videoRef]);

  return (
    <div>
      {/* <Image
        className={Style.mainBike}
        alt="arrow-right"
        width={isMobile ? 1440 : 1440}
        height={isMobile ? 381 : 870}
        style={{ objectFit: "cover" }}
        src={`${imageUrl}${isMobile ? "mobile/main.jpg" : "main.png"}`}
      /> */}

      <video
        id={"landing_video"}
        autoPlay={true}
        playsInline
        muted
        loop
        style={{
          objectFit: "cover",
          height: isMobile ? "381px" : "870px",
          width: isMobile ? "100%" : "100%",
        }}
      >
        <source
          src={
            isMobile
              ? `${videoUrl}mobile/landing.mp4`
              : `${videoUrl}landing.mp4`
          }
        />
      </video>
      {!overlay && (
        <div
          ref={ref}
          className={Style.configureNameWrapper}
          onClick={() => router.push("/configure")}
        >
          <div className={Style.configureName}> configure your</div>
          <div className="mr-[11px] sm:mr-[36px] ">
            <Image
              alt="f77"
              width={isMobile ? 36 : 109}
              height={isMobile ? 8 : 25}
              src={"/images/limited/f77.svg"}
            />
          </div>
          <div>
            <Image
              alt="arrow"
              width={isMobile ? 19 : 58}
              height={isMobile ? 19 : 58}
              style={{ objectFit: "cover" }}
              src={"/images/home/whiteRoundedArrow.svg"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigureHead;
