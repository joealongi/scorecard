import * as React from "react";

import type { Leadercard } from "../types/LeadercardTypes";

export default function LeadercardMobileComponent({
  userName,
  userRank,
  userTotalScore,
  golfCourseName,
  golfCourseTotalPar,
}: Readonly<Leadercard>) {
  return (
    <React.Fragment>
      <div className="border-1 border-neutral-950">
        <ul className="flex flex-row flex-auto justify-center content-evenly items-stretch">
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            Rank
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            {userRank}
          </li>
        </ul>
        <ul className="flex flex-row flex-auto justify-center content-evenly items-stretch">
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            Username
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            {userName}
          </li>
        </ul>
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
            {(userTotalScore ?? 0) - (golfCourseTotalPar ?? 0)}
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}
