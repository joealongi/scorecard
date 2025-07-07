import * as React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <section>
        {/* Todo: Make this a component */}
        <h1 className="mx-auto text-3xl md:text-6xl font-bold subpixel-antialiased text-neutral-300 text-neutral-300">
          <span className="text-lime-600">P</span>inpointscore
        </h1>
        {/* Todo: Make this a component */}
        <h3 className="my-3 md:my-9 width-half text-3xl md:text-6xl font-light subpixel-antialiased">
          Tee box to green, track your golf game with ease.
        </h3>
      </section>
    </React.Fragment>
  );
}
