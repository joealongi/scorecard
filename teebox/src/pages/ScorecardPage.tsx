import * as React from "react";

import HeadingOneComponent from "../components/HeadingOneComponent";
import HeadingTwoComponent from "../components/HeadingTwoComponent";
import IntroductionComponent from "../components/IntroductionComponent";
import ParagraphComponent from "../components/ParagraphComponent";
import ScorecardDesktopComponent from "../components/ScorecardDesktopComponent";
import ScorecardMobileComponent from "../components/ScorecardMobileComponent";
import ScorecardActivitiesComponent from "../components/ScorecardActivitiesComponent";

import type { Scorecard, SubmitScorecard } from "../types/ScorecardTypes";
import type { GolfCourse } from "../types/GolfCourseTypes";
import { endpoints } from "../configurations/constants";

import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "../functions/request";

export default function ScorecardPage() {
  const [scorecards, setScorecards] = React.useState<Scorecard[]>([]);
  const [selectableScorecards, setSelectableScorecards] = React.useState<
    Scorecard[]
  >([]);
  const [golfCourses, setGolfCourses] = React.useState<GolfCourse[]>([]);
  const [selectableGolfCourses, setSelectableGolfCourses] = React.useState<
    GolfCourse[]
  >([]);

  // Get Scorecards from API
  const getScorecards = async () => {
    try {
      const userId = 1; // TODO: Replace with actual user ID logic
      const response = await getRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        endpoints.SCORECARD + userId
      );
      if (response) return response;
      else return null;
    } catch (error) {
      console.error("Error getting scorecards");
      return error;
    }
  };

  // Get Golf Courses from API
  const getGolfCourses = async () => {
    try {
      const response = await getRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        endpoints.GOLFCOURSE
      );
      if (response) return response;
      else return null;
    } catch (error) {
      console.error("Error getting golf courses");
      return error;
    }
  };

  // Handle submission of scorecards and type of activity
  const handleSubmitScorecard = async (submitScorecard: SubmitScorecard) => {
    const { activity, userId, userScores, golfCourseId } = submitScorecard;
    try {
      if (activity === "add") {
        // Handle adding a new scorecard
        const response = await postRequest(
          import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
          endpoints.SCORECARD,
          {
            userId: userId,
            userScores: userScores,
            golfCourseId: golfCourseId,
          }
        );
        if (response) {
          // Handle successful response
          console.log("Scorecard added successfully");
        }
      } else if (activity === "update") {
        // Handle updating a scorecard
        const response = await patchRequest(
          import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
          endpoints.SCORECARD,
          {}
        );
        if (response) {
          console.log("Scorecard updated successfully");
        }
      } else if (activity === "delete") {
        // Handle deleting a scorecard
        const response = await deleteRequest(
          import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
          endpoints.SCORECARD + userId,
          {}
        );
        if (response) {
          console.log("Scorecard deleted successfully");
        }
      }
    } catch (error) {
      console.error("Error performing activity on scorecard");
      return error;
    }
  };

  // Handle loading ten blank scorecards or results +/- scorecards
  const handleLoadingScorecards = async () => {
    try {
      while (scorecards.length < 10) {
        scorecards.push({
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
      const response = await getScorecards();
      const cards = [...scorecards];
      if (response?.length > 0) {
        response.forEach((item: Scorecard, index: number) => {
          cards.splice(index, 1, item);
        });
        setScorecards(cards);
      }
    } catch (error) {
      console.error("Error loading scorecards");
      return error;
    }
  };

  // Handle filtering scorecards of the results versus ten blank scorecards
  const handleFilteringSelectableScorecards = () => {
    try {
      const scores = [] as Scorecard[];
      scorecards?.forEach((item) => {
        if (item?.userId && item?.updated) {
          scores.push(item);
        }
      });
      setSelectableScorecards(scores);
    } catch (error) {
      console.error("Error filtering selectable scorecards");
      return error;
    }
  };

  // Handle loading ten blank golf courses or results +/- golf courses
  const handleLoadingGolfCourses = async () => {
    try {
      while (golfCourses.length < 10) {
        golfCourses.push({
          golfCourseId: 0,
          golfCourseName: "TBD",
          golfCoursePars: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
          golfCourseTotalPar: 0,
        });
      }
      const courses = [...golfCourses];
      const response = await getGolfCourses();
      if (response?.length > 0) {
        response.forEach((item: GolfCourse, index: number) => {
          courses.splice(index, 1, item);
        });
        setGolfCourses(courses);
      }
    } catch (error) {
      console.error("Error loading golf courses");
      return error;
    }
  };

  // Handle filtering golf courses of the results versus ten blank golf courses
  const handleFilteringSelectableGolfCourses = () => {
    try {
      const courses = [] as GolfCourse[];
      golfCourses?.forEach((item) => {
        if (item?.golfCourseId && item?.golfCourseName) {
          courses.push(item);
        }
      });
      setSelectableGolfCourses(courses);
    } catch (error) {
      console.error("Error filtering selectable golf courses");
      return error;
    }
  };

  // Load on refresh / reload
  React.useEffect(() => {
    const load = async () => {
      await handleLoadingScorecards();
      await handleLoadingGolfCourses();
      await handleFilteringSelectableScorecards();
      await handleFilteringSelectableGolfCourses();
    };
    load();
    return () => {};
  }, [scorecards, golfCourses]);

  return (
    <React.Fragment>
      <section>
        <HeadingOneComponent text=" Scorecard" />
        <IntroductionComponent text="Add your scores and track your season progress by submitting your scorecard!" />
      </section>
      <section className="invisible lg:visible hidden lg:block my-3">
        <div className="border-1 border-neutral-950">
          <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Course
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Total
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
              +
            </li>
          </ul>
        </div>
        {Array?.isArray(scorecards) && scorecards?.length > 0 ? (
          scorecards?.map((item, index) => (
            <ScorecardDesktopComponent
              key={`scorecard-${item?.userId}-${index}`}
              userScores={item?.userScores}
              userTotalScore={item?.userTotalScore}
              golfCourseName={item?.golfCourseName}
              golfCoursePars={item?.golfCoursePars}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
      <section className="block lg:hidden visible lg:invisible my-3 border-1 border-neutral-950">
        {Array?.isArray(scorecards) && scorecards?.length > 0 ? (
          scorecards?.map((item, index) => (
            <ScorecardMobileComponent
              key={`scorecard-${item?.userId}-${index}`}
              userScores={item?.userScores}
              userTotalScore={item?.userTotalScore}
              golfCourseName={item?.golfCourseName}
              golfCoursePars={item?.golfCoursePars}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
      <section className="active my-3 border-1 border-neutral-950">
        <div className="my-3">
          <HeadingTwoComponent text=" Scorecard activities" />
          <ParagraphComponent text="Manage your scorecards effectively by using the options below." />
        </div>
        <ScorecardActivitiesComponent
          handleSubmitScorecard={handleSubmitScorecard}
          userId={1} // Replace with actual user ID logic
          selectableScorecards={selectableScorecards}
          selectableGolfCourses={selectableGolfCourses}
        />
      </section>
    </React.Fragment>
  );
}
