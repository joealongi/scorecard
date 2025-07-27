import * as React from "react";

import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";

export default function HandicapPage() {
  return (
    <React.Fragment>
      <section>
        <HeadingOneComponent text={"Handicap"} />
        <IntroductionComponent
          text={"See your golf handicap and how it affects your game."}
        />
      </section>
    </React.Fragment>
  );
}
