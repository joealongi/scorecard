import * as React from "react";
import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";

export default function AboutPage() {
  return (
    <React.Fragment>
      <section>
        <HeadingOneComponent text={"About"} />
        <IntroductionComponent
          text={
            "Pinpointscore is a golf application through and through, designed to help you keep track of your golf game from tee box to green. Whether you're a seasoned golfer or just starting out, this app is your perfect companion on the course. With its user-friendly interface and powerful features, Pinpointscore makes it easy to record your scores, analyze your performance, and improve your game. Say goodbye to paper scorecards and hello to a smarter way to play golf!"
          }
        />
      </section>
    </React.Fragment>
  );
}
