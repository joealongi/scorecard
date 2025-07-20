import * as React from "react";

export default function HeadingThreeComponent({
  text,
}: {
  readonly text: string;
}) {
  return (
    <React.Fragment>
      <h3 className="my-3 lg:my-6 text-3xl lg:text-4xl font-light text-lime-600 text-left subpixel-antialiased">
        {text}
      </h3>
    </React.Fragment>
  );
}
