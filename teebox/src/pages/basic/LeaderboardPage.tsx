import * as React from "react";

import LeaderboardComponent from "../../components/LeaderboardComponent";
import LeaderboardMobileComponent from "../../components/LeaderboarMobileComponent";

import { getRequest } from "../../functions/request";

import initialLeaderboardData from "../../data/leaderboard.json";

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
  submitted: string;
  userName: string;
  userHandicap: number;
  golfCourse: string;
  holesPlayed: number;
  totalScore: number;
  scoreboardScore: number;
  userRank: number;
  userScores: number[];
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
          // Handle current object differentiation
          const row: LeaderboardRowAdjusted = {
            userRank: 0,
            userScores: [],
            ...item,
          };
          if (item?.scoreboardScore > 0) {
            row.userRank = item?.scoreboardScore;
          } else {
            row.userRank = index + 1;
          }
          row.userScores = [
            4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
          ];

          // Update or add row to initial
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
        <h1 className="mx-auto text-3xl md:text-6xl font-bold subpixel-antialiased text-neutral-300">
          Leaderboard
        </h1>
        <p className="my-3 md:my-9 mx-auto text-xl md:text-3xl font-extralight subpixel-antialiased">
          You will see your golf game here soon, including your scores, stats,
          and course information.
        </p>
        {leaderboard?.length > 0 ? (
          leaderboard.map((item, index) => (
            <LeaderboardComponent
              key={`leaderboard-${item?.userId}-${index}`}
              userRank={item?.userRank}
              userName={item?.userName}
              golfCourse={item?.golfCourse}
              totalScore={item?.totalScore}
              userScores={item?.userScores}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {leaderboard?.length > 0 ? (
          leaderboard.map((item, index) => (
            <LeaderboardMobileComponent
              key={`leaderboard-${item?.userId}-${index}`}
              userRank={item?.userRank}
              userName={item?.userName}
              golfCourse={item?.golfCourse}
              totalScore={item?.totalScore}
              userScores={item?.userScores}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
    </React.Fragment>
  );
}
