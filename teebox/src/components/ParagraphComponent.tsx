import * as React from "react";

export default function ParagraphComponent({
  text,
}: {
  readonly text: string;
}) {
  return (
    <React.Fragment>
      <p className="my-3 text-base md:text-xl font-light text-neutral-300 text-left subpixel-antialiased">
        {text}
      </p>
    </React.Fragment>
  );
}
