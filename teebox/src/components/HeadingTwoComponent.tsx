import * as React from "react";

export default function HeadingTwoComponent({
  text,
}: {
  readonly text: string;
}) {
  return (
    <React.Fragment>
      <h2 className="my-3 lg:my-6 text-4xl lg:text-5xl font-bold text-neutral-300 text-left subpixel-antialiased">
        {text}
      </h2>
    </React.Fragment>
  );
}
