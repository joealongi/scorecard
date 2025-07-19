import * as React from "react";

import { NavLink } from "react-router";

interface LeaderboardItemComponentProps {
  userRank: number;
  userName: string;
  golfCourse: string;
  totalScore: number;
  userScores: number[];
}

export default function LeaderboardItemComponent({
  userRank,
  userName,
  golfCourse,
  totalScore,
  userScores,
}: LeaderboardItemComponentProps) {
  const [expand, setExpand] = React.useState<boolean>(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <React.Fragment>
      <section class="my-1 border-1 border-neutral-950">
        <ul class="z-0 flex flex-row flex-auto justify-center items-center">
          <li class="flex flex-col flex-auto justify-self-start min-w-[10%] max-w-[10%] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased">
            {userRank}
          </li>
          <li class="flex flex-col flex-auto justify-self-start min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {userName}
          </li>
          <li class="flex flex-col flex-auto justify-self-start min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {golfCourse}
          </li>
          <li class="flex flex-col flex-auto justify-self-start min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {totalScore}
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
        <React.Fragment>
          <section class="border-1 border-neutral-950">
            <ul class="z-0 flex flex-row flex-auto justify-center items-center">
              <li class="flex flex-col flex-auto justify-self-start min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-neutral-950 subpixel-antialiased">
                Holes
              </li>
              {userScores?.map((item, index) => (
                <li
                  key={index}
                  class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased"
                >
                  {index + 1}
                </li>
              ))}
            </ul>
            <ul class="avalinginc-theme-container z-0 flex flex-row flex-auto justify-center items-center">
              <li class="flex flex-col flex-auto justify-self-start min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-left  subpixel-antialiased">
                Score
              </li>
              {userScores?.map((item, index) => (
                <li
                  key={index}
                  class="flex flex-col flex-auto justify-self-start min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
