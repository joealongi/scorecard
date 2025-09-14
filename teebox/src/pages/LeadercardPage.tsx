import * as React from "react";

import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";
import LeadercardDesktopComponent from "../components/LeadercardDesktopComponent";
import LeadercardMobileComponent from "../components/LeadercardMobileComponent";

import type { Leadercard } from "../types/LeadercardTypes";

import { getRequest } from "../functions/request";
import { endpoints } from "../configurations/constants";

export default function LeadercardPage() {
  const [leadercard, setLeadercard] = React.useState<Leadercard[]>([]);

  // Get Leadercard from API
  const getLeaderboard = async () => {
    try {
      const response = await getRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        endpoints.LEADERCARD
      );
      if (response) return response;
      else return null;
    } catch (error) {
      console.error("Error getting leadercard");
      return error;
    }
  };

  // Handle loading ten blank leadercard entries or results +/- leadercard entries
  const handleLoadingLeadercard = async () => {
    try {
      while (leadercard.length < 10) {
        leadercard.push({
          submitted: "",
          updated: "",
          userId: 0,
          userName: "TBD",
          userRank: 10,
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
      // Placeholder Load
      if (leadercard?.length > 0) setLeadercard([...leadercard]);
      // Call API and load data
      const response = await getLeaderboard();
      const leaders = [...leadercard];
      if (response?.length > 0) {
        response.forEach((item: Leadercard, index: number) => {
          leadercard.splice(index, 1, item);
        });
      }
      // Data Load
      if (leaders?.length > 0) setLeadercard(leaders);
      const sorted = leadercard
        .slice()
        .sort((a, b) => (a?.userRank ?? 0) - (b?.userRank ?? 0));
      // Sorted Load
      if (sorted?.length === leadercard?.length) setLeadercard(sorted);
    } catch (error) {
      console.error("Error loading leadercard");
      return error;
    }
  };

  // Load on refresh / reload
  React.useEffect(() => {
    const load = async () => {
      await handleLoadingLeadercard();
    };
    load();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <section>
        <HeadingOneComponent text="Leadercard" />
        <IntroductionComponent text="Our leadercard displays the top users based on their scores!" />
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
        {leadercard?.length > 0 ? (
          leadercard.map((item, index) => (
            <LeadercardDesktopComponent
              key={`leadercard-${item?.userName}-${index}`}
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
        {leadercard?.length > 0 ? (
          leadercard.map((item, index) => (
            <LeadercardMobileComponent
              key={`leadercard-${item?.userName}-${index}`}
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
