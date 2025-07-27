import * as React from "react";

import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";

export default function CoursePage() {
  return (
    <React.Fragment>
      <section>
        <HeadingOneComponent text={"Course"} />
        <IntroductionComponent
          text={"Add your golf course and track your rounds."}
        />
      </section>
    </React.Fragment>
  );
}
