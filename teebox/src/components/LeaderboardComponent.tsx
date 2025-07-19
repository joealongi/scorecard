import * as React from "react";

export default function LeaderboardComponent() {
  return (
    <React.Fragment>
      <section class="my-1 border-1 border-neutral-950">
        <ul class="z-0 flex flex-row flex-auto justify-center items-center">
          <li class="flex flex-col flex-auto justify-self-start min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left subpixel-antialiased">
            Rank
          </li>
          <li class="flex flex-col flex-auto justify-self-start min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            Username
          </li>
          <li class="flex flex-col flex-auto justify-self-start min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            Course
          </li>
          <li class="flex flex-col flex-auto justify-self-start min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            Total
          </li>
          <li class="flex flex-col flex-auto justify-self-start min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
            &nbsp;
          </li>
        </ul>
      </section>
    </React.Fragment>
  );
}
