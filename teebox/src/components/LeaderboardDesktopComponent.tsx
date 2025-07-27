import * as React from "react";

import type { Leaderboard } from "../types/LeaderboardTypes";

export default function LeaderboardDesktopComponent({
  userName,
  userRank,
  userTotalScore,
  golfCourseName,
  golfCourseTotalPar,
}: Readonly<Leaderboard>) {
  return (
    <React.Fragment>
      <div className="border-1 border-neutral-950">
        <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased">
            {userRank}
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {userName}
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {golfCourseName}
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {(userTotalScore ?? 0) - (golfCourseTotalPar ?? 0)}
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}
