import * as React from "react";

import { NavLink } from "react-router";

export default function LeaderboardItem({
  rank,
  username,
  course,
  total,
  scores,
}) {
  const [expand, setExpand] = React.useState<boolean>(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <React.Fragment>
      <section class="my-1 border-1 border-neutral-950">
        <ul class="z-0 flex flex-row flex-auto justify-center items-center">
          <li class="flex flex-col flex-auto justify-self-start min-w-[10%] max-w-[10%] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased">
            {rank}
          </li>
          <li class="flex flex-col flex-auto justify-self-start min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {username}
          </li>
          <li class="flex flex-col flex-auto justify-self-start min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {course}
          </li>
          <li class="flex flex-col flex-auto justify-self-start min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {total}
          </li>
          <li class="flex flex-col flex-auto justify-self-start min-w-[10%] max-w-[10%]">
            <NavLink
              className=" p-3 text-base font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased transition-all cursor-pointer"
              rel="noopener noreferrer"
              target="_self"
              to="#"
              onClick={() => handleExpand()}
            >
              Scorecard
            </NavLink>
          </li>
        </ul>
      </section>
      {expand ? (
        <React.Fragment></React.Fragment>
      ) : (
        <React.Fragment>
          <section class="border-1 border-neutral-950">
            <ul class="z-0 flex flex-row flex-auto justify-center items-center">
              <li class="flex flex-col flex-auto justify-self-start min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-neutral-950 subpixel-antialiased">
                Holes
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                1
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1  border-neutral-950 subpixel-antialiased">
                2
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                3
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                5
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                6
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                7
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                8
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                9
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                10
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                11
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                12
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                13
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                14
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                15
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                16
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                17
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                18
              </li>
            </ul>
            <ul class="avalinginc-theme-container z-0 flex flex-row flex-auto justify-center items-center">
              <li class="flex flex-col flex-auto justify-self-start min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-left  subpixel-antialiased">
                Score
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
              <li class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased">
                4
              </li>
            </ul>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
// <React.Fragment>
//   <ul class="avalinginc-theme-container z-0 flex flex-row flex-auto justify-center items-center mt-3">
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl font-bold text-neutral-300 bg-lime-600 text-left border-1 border-neutral-950 subpixel-antialiased">
//       Hole
//     </li>
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl font-bold text-neutral-300 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
//       Score
//     </li>
//   </ul>
//   <ul class="avalinginc-theme-container z-0 flex flex-row flex-auto justify-center items-center">
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-center border-1 border-t-0  border-neutral-950 subpixel-antialiased">
//       1
//     </li>
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-center border-1 border-t-0 border-l-0 border-neutral-950 subpixel-antialiased">
//       4
//     </li>
//   </ul>
//   <ul class="avalinginc-theme-container z-0 flex flex-row flex-auto justify-center items-center">
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-center border-1 border-t-0  border-neutral-950 subpixel-antialiased">
//       2
//     </li>
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-center border-1 border-t-0 border-l-0 border-neutral-950 subpixel-antialiased">
//       4
//     </li>
//   </ul>
//   <ul class="avalinginc-theme-container z-0 flex flex-row flex-auto justify-center items-center">
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-center border-1 border-t-0  border-neutral-950 subpixel-antialiased">
//       3
//     </li>
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-center border-1 border-t-0 border-l-0 border-neutral-950 subpixel-antialiased">
//       4
//     </li>
//   </ul>
//   <ul class="avalinginc-theme-container z-0 flex flex-row flex-auto justify-center items-center">
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-center border-1 border-t-0  border-neutral-950 subpixel-antialiased">
//       4
//     </li>
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-center border-1 border-t-0 border-l-0 border-neutral-950 subpixel-antialiased">
//       4
//     </li>
//   </ul>
//   <ul class="avalinginc-theme-container z-0 flex flex-row flex-auto justify-center items-center">
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-center border-1 border-t-0  border-neutral-950 subpixel-antialiased">
//       5
//     </li>
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-center border-1 border-t-0 border-l-0 border-neutral-950 subpixel-antialiased">
//       4
//     </li>
//   </ul>
//   <ul class="avalinginc-theme-container z-0 flex flex-row flex-auto justify-center items-center">
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-center border-1 border-t-0  border-neutral-950 subpixel-antialiased">
//       1
//     </li>
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-center border-1 border-t-0 border-l-0 border-neutral-950 subpixel-antialiased">
//       6
//     </li>
//   </ul>
//   <ul class="avalinginc-theme-container z-0 flex flex-row flex-auto justify-center items-center">
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-center border-1 border-t-0  border-neutral-950 subpixel-antialiased">
//       7
//     </li>
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-center border-1 border-t-0 border-l-0 border-neutral-950 subpixel-antialiased">
//       4
//     </li>
//   </ul>
//   <ul class="avalinginc-theme-container z-0 flex flex-row flex-auto justify-center items-center">
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-center border-1 border-t-0  border-neutral-950 subpixel-antialiased">
//       8
//     </li>
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-center border-1 border-t-0 border-l-0 border-neutral-950 subpixel-antialiased">
//       4
//     </li>
//   </ul>
//   <ul class="avalinginc-theme-container z-0 flex flex-row flex-auto justify-center items-center">
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-center border-1 border-t-0  border-neutral-950 subpixel-antialiased">
//       9
//     </li>
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-center border-1 border-t-0 border-l-0 border-neutral-950 subpixel-antialiased">
//       4
//     </li>
//   </ul>
//   <ul class="avalinginc-theme-container z-0 flex flex-row flex-auto justify-center items-center">
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-center border-1 border-t-0  border-neutral-950 subpixel-antialiased">
//       10
//     </li>
//     <li class="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-center border-1 border-t-0 border-l-0 border-neutral-950 subpixel-antialiased">
//       4
//     </li>
//   </ul>
// </React.Fragment>
