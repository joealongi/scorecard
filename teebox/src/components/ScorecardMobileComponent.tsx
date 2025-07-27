import * as React from "react";

import { NavLink } from "react-router";

import type { Scorecard } from "../types/ScorecardTypes";

export default function ScorecardMobileComponent({
  userScores,
  userTotalScore,
  golfCourseName,
  golfCoursePars,
}: Readonly<Scorecard>) {
  const [expand, setExpand] = React.useState<boolean>(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <React.Fragment>
      <div className="border-1 border-neutral-950">
        <ul className="flex flex-row flex-auto justify-center content-evenly items-stretch">
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            Course
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            {golfCourseName}
          </li>
        </ul>
        <ul className="flex flex-row flex-auto justify-center content-evenly items-stretch">
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            Total
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            {userTotalScore}
          </li>
        </ul>
        <ul className="flex flex-row flex-auto justify-center content-evenly items-stretch">
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            +
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] text-base text-neutral-950 bg-neutral-300 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            <NavLink
              className="p-3 text-base font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 text-left subpixel-antialiased transition-all cursor-pointer"
              rel="noopener noreferrer"
              target="_self"
              to="#"
              onClick={() => handleExpand()}
            >
              Scorecard
            </NavLink>
          </li>
        </ul>
      </div>
      {expand ? (
        <React.Fragment>
          <div className="border-1 border-neutral-950">
            <ul className="flex flex-row flex-auto justify-center content-evenly items-stretch">
              <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-base font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
                Hole
              </li>
              <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-base font-bold text-neutral-950 bg-neutral-400  text-left border-b-1 border-neutral-950 subpixel-antialiased">
                Par
              </li>
              <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-left border-b-1 border-neutral-950 subpixel-antialiased">
                Score
              </li>
            </ul>
            {userScores?.map((item, index) => (
              <ul
                key={`row-${item}-${index}`}
                className="flex flex-row flex-auto justify-center content-evenly items-stretch"
              >
                <li
                  key={`hole-${item}-${index}`}
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-base font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased"
                >
                  {index + 1}
                </li>
                <li
                  key={`par-${item}-${index}`}
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-base font-bold text-neutral-950 bg-neutral-400 text-left border-b-1 border-neutral-950 subpixel-antialiased"
                >
                  {golfCoursePars?.[index] ? golfCoursePars[index] : 0}
                </li>
                <li
                  key={`score-${item}-${index}`}
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-base font-bold text-neutral-950 bg-neutral-300 text-left border-b-1 border-neutral-950 subpixel-antialiased"
                >
                  {item}
                </li>
              </ul>
            ))}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
