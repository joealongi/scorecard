import * as React from "react";

export default function HeadingSixComponent({
  text,
}: {
  readonly text: string;
}) {
  return (
    <React.Fragment>
      <h2 className="my-3 lg:my-6 text-lg lg:text-xl font-normal text-lime-600 text-left uppercase subpixel-antialiased">
        {text}
      </h2>
    </React.Fragment>
  );
}
