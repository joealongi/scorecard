import * as React from "react";

import { NavLink } from "react-router";

interface LeaderboardComponentProps {
  userRank: number;
  userName: string;
  golfCourse: string;
  totalScore: number;
  userScores: number[];
}

export default function LeaderboardMobileComponent({
  userRank,
  userName,
  golfCourse,
  totalScore,
  userScores,
}: Readonly<LeaderboardComponentProps>) {
  const [expand, setExpand] = React.useState<boolean>(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <React.Fragment>
      <section className="block lg:hidden visible lg:invisible my-1 border-1 border-neutral-950">
        <ul className="flex flex-row flex-auto justify-center items-center">
          <li className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            Rank
          </li>
          <li className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-b-1 border-neutral-950 subpixel-antialiased">
            {userRank}
          </li>
        </ul>
        <ul className="flex flex-row flex-auto justify-center items-center">
          <li className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            Username
          </li>
          <li className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-b-1 border-neutral-950 subpixel-antialiased">
            {userName}
          </li>
        </ul>
        <ul className="flex flex-row flex-auto justify-center items-center">
          <li className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            Course
          </li>
          <li className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-b-1 border-neutral-950 subpixel-antialiased">
            {golfCourse}
          </li>
        </ul>
        <ul className="flex flex-row flex-auto justify-center items-center">
          <li className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            Total
          </li>
          <li className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-b-1 border-neutral-950 subpixel-antialiased">
            {totalScore}
          </li>
        </ul>
        <ul className="flex flex-row flex-auto justify-center items-center">
          <li className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-b-1 border-neutral-950 subpixel-antialiased">
            +
          </li>
          <li className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] text-xl text-neutral-950 bg-neutral-300 text-center border-b-1 border-neutral-950 subpixel-antialiased">
            <NavLink
              className="p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 text-center subpixel-antialiased transition-all cursor-pointer"
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
          <section className="border-1 border-neutral-950">
            <ul className="flex flex-row flex-auto justify-center items-center">
              <li className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
                Holes
              </li>
              <li className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-left border-b-1 border-neutral-950 subpixel-antialiased">
                Score
              </li>
            </ul>
            {userScores?.map((item, index) => (
              <ul className="flex flex-row flex-auto justify-center items-center">
                <li
                  key={`hole-${item}-${index}`}
                  className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-b-1 border-neutral-950 subpixel-antialiased"
                >
                  {index + 1}
                </li>
                <li
                  key={`score-${item}-${index}`}
                  className="flex flex-col flex-auto justify-self-start min-w-[50%] max-w-[50%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-b-1 border-neutral-950 subpixel-antialiased"
                >
                  {item}
                </li>
              </ul>
            ))}
          </section>
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
