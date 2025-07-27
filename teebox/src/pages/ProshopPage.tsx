import * as React from "react";
import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";

export default function ProshopPage() {
  return (
    <React.Fragment>
      <section>
        <HeadingOneComponent text={"Proshop"} />
        <IntroductionComponent
          text={
            "Welcome to the Proshop! Find all the latest apparel, and accessories to enhance your game. Whether you're looking for stylish golf wear, or essential gear, our Proshop has everything you need to play your best."
          }
        />
      </section>
    </React.Fragment>
  );
}
