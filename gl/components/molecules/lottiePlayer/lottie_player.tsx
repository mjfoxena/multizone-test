import dynamic from "next/dynamic";

const Player = dynamic(
  () =>
    import("react-lottie-player"),
  { ssr: false }
);

interface ILottieVideoPlayerProps {
  autoplay?: boolean;
  loop?: boolean;
  src: string | object;
}

const LottiePlayer = ({ src, autoplay, loop }: ILottieVideoPlayerProps) => {
  if (typeof window !== 'undefined') {
    return <Player loop={loop} />;
  } else {
    return null; 
  }
};

export default LottiePlayer;


// import React from 'react';
// import Lottie from 'react-lottie-player';

// interface ILottieVideoPlayerProps {
//   autoplay?: boolean;
//   loop?: boolean;
//   src: string | object;
// }

// const LottiePlayer = ({ src, autoplay, loop }: ILottieVideoPlayerProps) => {
//   // @ts-ignore
//   return <Lottie loop={loop} autoplay={autoplay} animationData={src} />;
// };

// export default LottiePlayer;

