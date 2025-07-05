import * as React from "react";

export default function About() {
  return (
    <React.Fragment>
      <section>
        {/* Todo: Make this a component */}
        <h1 className="mx-auto text-3xl md:text-6xl font-bold subpixel-antialiased text-neutral-300">
          About
        </h1>
        {/* Todo: Make this a component */}
        <p className="my-3 md:my-9 mx-auto text-xl md:text-3xl font-extralight subpixel-antialiased">
          Pinpointscore is a golf application through and through, designed to
          help you keep track of your golf game from tee box to green. Whether
          you&apos;re a seasoned golfer or just starting out, this app is your
          perfect companion on the course. With its user-friendly interface and
          powerful features, Pinpointscore makes it easy to record your scores,
          analyze your performance, and improve your game. Say goodbye to paper
          scorecards and hello to a smarter way to play golf!
        </p>
      </section>
    </React.Fragment>
  );
}
