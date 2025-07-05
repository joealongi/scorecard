import * as React from "react";

export default function About() {
  return (
    <React.Fragment>
      <section>
        <h1 className="mx-auto text-3xl md:text-6xl font-bold subpixel-antialiased text-neutral-300">
          Dashboard
        </h1>
        <p className="my-3 md:my-9 mx-auto text-xl md:text-3xl font-extralight subpixel-antialiased">
          You will see your golf game here soon, including your scores, stats,
          and course information.
        </p>
      </section>
    </React.Fragment>
  );
}
