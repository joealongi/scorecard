import * as React from "react";

import { NavLink } from "react-router";

interface LeaderboardComponentProps {
  userName: string;
  userRank: number;
  userScores: number[];
  userTotalScore: number;
  golfCourse: string;
  golfCoursePars: number[];
}

export default function LeaderboardComponent({
  userName,
  userRank,
  userScores,
  userTotalScore,
  golfCourse,
  golfCoursePars,
}: Readonly<LeaderboardComponentProps>) {
  const [expand, setExpand] = React.useState<boolean>(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <React.Fragment>
      <div className="border-1 border-neutral-950">
        <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased">
            {userRank}
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-xl text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {userName}
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-xl text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {golfCourse}
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-xl text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {userTotalScore}
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[10%] max-w-[10%]">
            <NavLink
              className=" p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased transition-all cursor-pointer"
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
            <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
              <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-neutral-950 subpixel-antialiased">
                Hole
              </li>
              {userScores?.map((item, index) => (
                <li
                  key={`hole-${item}-${index}`}
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased"
                >
                  {index + 1}
                </li>
              ))}
            </ul>
            <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
              <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 text-left border-neutral-950 subpixel-antialiased">
                Par
              </li>
              {golfCoursePars?.map((item, index) => (
                <li
                  key={`hole-${item}-${index}`}
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 text-center border-l-1 border-neutral-950 subpixel-antialiased"
                >
                  {item}
                </li>
              ))}
            </ul>
            <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
              <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-left  subpixel-antialiased">
                Score
              </li>
              {userScores?.map((item, index) => (
                <li
                  key={`score-${item}-${index}`}
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[5%] max-w-[5%] p-3 text-xl text-neutral-950 bg-neutral-300 text-center border-l-1 border-neutral-950 subpixel-antialiased"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
