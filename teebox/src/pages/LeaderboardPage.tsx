import * as React from "react";

import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";
import LeaderboardDesktopComponent from "../components/LeaderboardDesktopComponent";
import LeaderboardMobileComponent from "../components/LeaderboardMobileComponent";

import type { Leaderboard } from "../types/LeaderboardTypes";

import { getRequest } from "../functions/request";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = React.useState<Leaderboard[]>([]);

  // Get Leaderboard from API
  const getLeaderboard = async () => {
    try {
      const response = await getRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        `/leaderboard/`
      );
      if (response) return response;
      else return null;
    } catch (error) {
      console.error("Error getting leaderboard");
      return error;
    }
  };

  // Handle loading ten blank leaderboard entries or results +/- leaderboard entries
  const handleLoadingLeaderboard = async () => {
    try {
      while (leaderboard.length < 10) {
        leaderboard.push({
          submitted: "",
          updated: "",
          userId: 0,
          userName: "TBD",
          userRank: 0,
          userHandicap: 0,
          userScores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          userTotalScore: 0,
          golfCourseId: 0,
          golfCourseName: "TBD",
          golfCoursePars: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
          golfCourseTotalPar: 0,
          golfCourseHolesPlayed: 0,
        });
      }
      const response = await getLeaderboard();
      const leaders = [...leaderboard];
      if (response?.length > 0) {
        response.forEach((item: Leaderboard, index: number) => {
          leaders.splice(index, 1, item);
        });
        setLeaderboard(leaders);
      }
      const sorted = leaderboard
        .slice()
        .sort((a, b) => (a?.userRank ?? 0) - (b?.userRank ?? 0));
      if (sorted?.length === leaderboard?.length) {
        setLeaderboard(sorted);
      }
    } catch (error) {
      console.error("Error loading leaderboard");
      return error;
    }
  };

  // Load on refresh / reload
  React.useEffect(() => {
    const load = async () => {
      await handleLoadingLeaderboard();
    };
    load();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <section>
        <HeadingOneComponent text="Leaderboard" />
        <IntroductionComponent text="Our leaderboard displays the top users based on their scores. Check out the leaderboard and see how you stack up against others!" />
      </section>
      <section className="invisible lg:visible hidden lg:block">
        <div className="border-1 border-neutral-950">
          <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left subpixel-antialiased">
              Rank
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Username
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Course
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Total
            </li>
          </ul>
        </div>
        {leaderboard?.length > 0 ? (
          leaderboard.map((item, index) => (
            <LeaderboardDesktopComponent
              key={`leaderboard-${item?.userName}-${index}`}
              userName={item?.userName}
              userRank={item?.userRank}
              userTotalScore={item?.userTotalScore}
              golfCourseName={item?.golfCourseName}
              golfCourseTotalPar={item?.golfCourseTotalPar}
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
              key={`leaderboard-${item?.userName}-${index}`}
              userName={item?.userName}
              userRank={item?.userRank}
              userTotalScore={item?.userTotalScore}
              golfCourseName={item?.golfCourseName}
              golfCourseTotalPar={item?.golfCourseTotalPar}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
    </React.Fragment>
  );
}
