import * as React from "react";

import LeaderboardComponent from "../components/LeaderboardComponent";
import LeaderboardMobileComponent from "../components/LeaderboarMobileComponent";

import { getRequest } from "../functions/request";

import initialLeaderboardData from "../data/leaderboard.json";
import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";

type LeaderboardRow = {
  userId: number;
  submitted: string;
  userName: string;
  userHandicap: number;
  golfCourse: string;
  holesPlayed: number;
  totalScore: number;
  scoreboardScore: number;
};

type LeaderboardRowAdjusted = {
  userId: number;
  userName: string;
  userRank: number;
  userHandicap: number;
  userTotalScore: number;
  userScores: number[];
  golfCourse: string;
  golfCoursePars: number[];
  golfCourseHolesPlayed: number;
  submitted: string;
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = React.useState<
    LeaderboardRowAdjusted[]
  >([]);

  // Handle leaderboard
  const handleLeaderboard = async () => {
    try {
      // Request initial
      const initial = initialLeaderboardData;

      // Set base url
      const base = import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "";

      // Request response
      const response = await getRequest(base, `/scoreboard/`);
      if (initial?.length > 0 && response?.length > 0) {
        // Create leaderboard rows
        response.forEach((item: LeaderboardRow, index: number) => {
          // Create temporary row
          const row: LeaderboardRowAdjusted = {
            userRank: 0,
            userTotalScore: 0,
            userScores: [],
            golfCoursePars: [],
            golfCourseHolesPlayed: 0,
            ...item,
          };

          // Fake user scores
          row.userScores = [
            4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
          ];

          // Fake golf course pars
          row.golfCoursePars = [
            4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
          ];

          // Update row if less than or equal to 10 or add a new row if greater than 10 rows
          if (initial?.[index]) {
            initial[index] = row;
          } else {
            initial.push(row);
          }
        });
      }

      // Sort the leaderboard by userRank
      const sorted = initial.slice().sort((a, b) => a.userRank - b.userRank);
      if (sorted?.length > 0) {
        // Set the leaderboard
        setLeaderboard(sorted);
      } else if (initial?.length > 0) {
        // Set the placeholder leaderboard
        setLeaderboard(initial);
      }
    } catch (error) {
      console.error("Error loading leaderboard");
      return error;
    }
  };

  React.useEffect(() => {
    const loadLeaderboard = async () => {
      await handleLeaderboard();
    };
    loadLeaderboard();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <section>
        <HeadingOneComponent text="Leaderboard" />
        <IntroductionComponent text="Our leaderboard displays the top users based on their scores. Check out the rankings and see how you stack up against others!" />
      </section>
      <section className="invisible lg:visible hidden lg:block">
        <div className="border-1 border-neutral-950">
          <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left subpixel-antialiased">
              Rank
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Username
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Course
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[26.6666666667%] max-w-[26.6666666667%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Total
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
              +
            </li>
          </ul>
        </div>
        {leaderboard?.length > 0 ? (
          leaderboard.map((item, index) => (
            <LeaderboardComponent
              key={`leaderboard-${item?.userId}-${index}`}
              userName={item?.userName}
              userRank={item?.userRank}
              userScores={item?.userScores}
              userTotalScore={item?.userTotalScore}
              golfCourse={item?.golfCourse}
              golfCoursePars={item?.golfCoursePars}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
      <section className="block lg:hidden visible lg:invisible my-1 border-1 border-neutral-950">
        {leaderboard?.length > 0 ? (
          leaderboard.map((item, index) => (
            <LeaderboardMobileComponent
              key={`leaderboard-${item?.userId}-${index}`}
              userName={item?.userName}
              userRank={item?.userRank}
              userScores={item?.userScores}
              userTotalScore={item?.userTotalScore}
              golfCourse={item?.golfCourse}
              golfCoursePars={item?.golfCoursePars}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
    </React.Fragment>
  );
}
