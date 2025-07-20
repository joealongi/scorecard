import * as React from "react";

export default function IntroductionComponent({
  text,
}: {
  readonly text: string;
}) {
  return (
    <React.Fragment>
      <p className="my-9 text-2xl md:text-3xl font-light text-lime-600 text-left subpixel-antialiased">
        {text}
      </p>
    </React.Fragment>
  );
}
