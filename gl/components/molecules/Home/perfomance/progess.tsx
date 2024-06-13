import React, { useState, useEffect, useContext } from "react";
import Style from "./style.module.scss";
import { ProgressBarContext } from "../../../../contexts/progressBar";

export const LinearProgressBar = () => {
  const { progress, setProgress } = useContext(ProgressBarContext);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number = performance.now();

    const animate = (timestamp: number) => {
      const elapsedTime = timestamp - startTime;
      const percentage = Math.min((elapsedTime / progress) * 100, 100);
      setPercent(percentage);
      if (elapsedTime < progress) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Animation complete, reset progress
        setProgress(0);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [progress, setProgress]);

  return (
    <div className={` bg-black w-full flex h-[2px] z-50`}>
      {percent < 100 && (
        <>
          <div className="w-full bg-black h-full">
            <div className="h-full bg-[#DA4F46]" style={{ width: `${percent}%` }}></div>
          </div>
          {/* <div className="w-1/2 bg-black h-full flex justify-end">
            <div className="h-full bg-[#DA4F46]" style={{ width: `${percent}%` }}></div>
          </div> */}
        </>
      )}
    </div>
  );
};