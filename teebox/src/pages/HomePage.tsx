import * as React from "react";
import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";

export default function HomePage() {
  return (
    <React.Fragment>
      <section>
        <HeadingOneComponent text={"Pinpointscore"} />
        <IntroductionComponent
          text={"Tee box to green, track your golf game with ease."}
        />
      </section>
    </React.Fragment>
  );
}
