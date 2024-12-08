"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type Props = {
  loop?: boolean;
  autoPlay?: boolean;
};
export default function Animated404(props: Props) {
  return (
    <DotLottieReact
      src="/404-animate.lottie"
      loop={props.loop}
      autoplay={props.autoPlay}
    />
  );
}
