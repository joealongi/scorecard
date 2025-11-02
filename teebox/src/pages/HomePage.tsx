import * as React from "react";

import { AuthenticationContext } from "../context/AuthenticationProvider";

import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";

export default function HomePage() {
  const { user } = React.useContext(AuthenticationContext);

  React.useEffect(() => {
    console.log("HomePage user after load", user);
    return () => {};
  }, []);

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
