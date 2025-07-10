import * as React from "react";

export default function Scoreboard() {
  return (
    <React.Fragment>
      <section>
        {/* Todo: Make this a component */}
        <h1 className="mx-auto text-3xl md:text-6xl font-bold subpixel-antialiased text-neutral-300 text-neutral-300">
          Scoreboard
        </h1>
        {/* Todo: Make this a component */}
        <p className="my-3 md:my-9 mx-auto text-xl md:text-3xl font-extralight subpixel-antialiased">
          You will see your golf game here soon, including your scores, stats,
          and course information.
        </p>
      </section>
    </React.Fragment>
  );
}
