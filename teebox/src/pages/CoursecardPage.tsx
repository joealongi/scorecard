import * as React from "react";

import HeadingOneComponent from "../components/HeadingOneComponent";
import HeadingTwoComponent from "../components/HeadingTwoComponent";
import IntroductionComponent from "../components/IntroductionComponent";
import ParagraphComponent from "../components/ParagraphComponent";
import CoursecardDesktopComponent from "../components/CoursecardDesktopComponent";
import CoursecardMobileComponent from "../components/CoursecardMobileComponent";
import CoursecardActivitiesComponent from "../components/CoursecardActivitiesComponent";

import type { Coursecard, SubmitCoursecard } from "../types/CoursecardTypes";
import { endpoints } from "../configurations/constants";

import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "../functions/request";

export default function CoursecardPage() {
  const [coursecards, setCoursecards] = React.useState<Coursecard[]>([]);

  // Get Coursecards from API
  const getCoursecards = async () => {
    try {
      const response = await getRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        endpoints.COURSECARD
      );
      if (response) return response;
      else return null;
    } catch (error) {
      console.error("Error getting coursecards");
      return error;
    }
  };

  // Handle submission of coursecards and type of activity
  const handleSubmitCoursecard = async (submitCoursecard: SubmitCoursecard) => {
    const { activity, golfCourseId, golfCourseName, golfCoursePars } =
      submitCoursecard;
    try {
      if (activity === "add") {
        // Handle adding a new coursecard
        const response = await postRequest(
          import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
          endpoints.COURSECARD,
          {
            golfCourseName: golfCourseName,
            golfCoursePars: golfCoursePars,
          }
        );
        if (response) {
          // Handle successful response
          console.log("Coursecard added successfully");
        }
      } else if (activity === "update") {
        // Handle updating a coursecard
        const response = await patchRequest(
          import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
          endpoints.COURSECARD,
          {
            golfCourseId: golfCourseId,
            golfCoursePars: golfCoursePars,
          }
        );
        if (response) {
          console.log("Coursecard updated successfully");
        }
      } else if (activity === "delete") {
        // Handle deleting a coursecard
        const response = await deleteRequest(
          import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
          endpoints.COURSECARD + golfCourseId,
          {}
        );
        if (response) {
          console.log("Coursecard deleted successfully");
        }
      }
    } catch (error) {
      console.error("Error performing activity on coursecard");
      return error;
    }
  };

  // Handle loading ten blank coursecards or results +/- coursecards
  const handleLoadingCoursecards = async () => {
    try {
      while (coursecards.length < 10) {
        coursecards.push({
          submitted: "",
          updated: "",
          golfCourseId: 0,
          golfCourseName: "TBD",
          golfCoursePars: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
          golfCourseTotalPar: 0,
        });
      }
      const response = await getCoursecards();
      if (response?.length > 0) {
        response.forEach((item: Coursecard, index: number) => {
          coursecards.splice(index, 1, item);
        });
      }
      if (coursecards?.length > 0) setCoursecards([...coursecards]);
    } catch (error) {
      console.error("Error loading coursecards");
      return error;
    }
  };

  // Load on refresh / reload
  React.useEffect(() => {
    const load = async () => {
      await handleLoadingCoursecards();
    };
    load();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <section>
        <HeadingOneComponent text={"Coursecard"} />
        <IntroductionComponent
          text={
            "Add your golf course and track your rounds by submitting your coursecard!"
          }
        />
      </section>
      <section className="invisible lg:visible hidden lg:block my-3">
        <div className="border-1 border-neutral-950">
          <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Course
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Par
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
              +
            </li>
          </ul>
        </div>
        {Array?.isArray(coursecards) && coursecards?.length > 0 ? (
          coursecards?.map((item, index) => (
            <CoursecardDesktopComponent
              key={`golfcourse-${item?.golfCourseId}-${index}`}
              golfCourseName={item?.golfCourseName}
              golfCoursePars={item?.golfCoursePars}
              golfCourseTotalPar={item?.golfCourseTotalPar}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
      <section className="block lg:hidden visible lg:invisible my-3 border-1 border-neutral-950">
        {Array?.isArray(coursecards) && coursecards?.length > 0 ? (
          coursecards?.map((item, index) => (
            <CoursecardMobileComponent
              key={`golfcourse-${item?.golfCourseId}-${index}`}
              golfCourseName={item?.golfCourseName}
              golfCoursePars={item?.golfCoursePars}
              golfCourseTotalPar={item?.golfCourseTotalPar}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
      <section className="active my-3 border-1 border-neutral-950">
        <div className="my-3">
          <HeadingTwoComponent text="Coursecard Activities" />
          <ParagraphComponent text="Manage your scorecards effectively by using the options below." />
        </div>
        <CoursecardActivitiesComponent
          handleSubmitCoursecard={handleSubmitCoursecard}
          coursecards={coursecards}
        />
      </section>
    </React.Fragment>
  );
}
