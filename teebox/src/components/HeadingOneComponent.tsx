import * as React from "react";

export default function HeadingOneComponent({
  text,
}: {
  readonly text: string;
}) {
  return (
    <React.Fragment>
      <h3 className="mx-auto text-5xl md:text-6xl font-bold text-neutral-300 text-left subpixel-antialiased">
        {text}
      </h3>
    </React.Fragment>
  );
}
