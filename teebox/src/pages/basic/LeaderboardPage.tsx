import * as React from "react";

import LeaderboardComponent from "../../components/LeaderboardComponent";
import LeaderboardMobileComponent from "../../components/LeaderboarMobileComponent";

import { getRequest } from "../../functions/request";

type LeaderboardItemAdjusted = {
  userId: number;
  submitted: EpochTimeStamp;
  userName: string;
  userHandicap: 0;
  golfCourse: string;
  holesPlayed: number;
  totalScore: number;
  scoreboardScore: number;
  userRank: number;
  userScores: number[];
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = React.useState<
    LeaderboardItemAdjusted[]
  >([]);

  // Handle leaderboard
  const handleLeaderboard = async () => {
    try {
      const obj: { scoreboard?: LeaderboardItemAdjusted[] } = {};
      const base = import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "";
      obj["scoreboard"] = await getRequest(base, `/scoreboard/`);
      if (obj?.scoreboard) {
        if (Array?.isArray(obj?.scoreboard)) {
          obj.scoreboard?.forEach((item, index) => {
            if (item?.scoreboardScore > 0) {
              obj.scoreboard![index]["userRank"] = item?.scoreboardScore;
            } else {
              obj.scoreboard![index]["userRank"] = index + 1;
            }
            obj.scoreboard![index]["userScores"] = [
              4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
            ];
          });
        }
        setLeaderboard(obj?.scoreboard);
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
