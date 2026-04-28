import * as React from "react";

import { AuthenticationContext } from "../context/AuthenticationProvider";

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
  const [selectableCoursecards, setSelectableCoursecards] = React.useState<
    Coursecard[]
  >([]);

  const { user } = React.useContext(AuthenticationContext);

  // Get Coursecards from API
  const getCoursecards = async (): Promise<Coursecard[]> => {
    try {
      const response = await getRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        endpoints.COURSECARD
      );
      const data = Array.isArray(response) ? response as Coursecard[] : [];
      return data;
    } catch (error) {
      console.error("Error getting coursecards");
      return [] as Coursecard[];
    }
  };

  // Handle submission of coursecards and type of activity
  const handleSubmitCoursecard = async (submitCoursecard: SubmitCoursecard) => {
    const { activity, coursecardId, coursecardName, coursecardPars } =
      submitCoursecard;
    try {
      if (activity === "add") {
        // Handle adding a new coursecard
        const response = await postRequest(
          import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
          endpoints.COURSECARD,
          {
            coursecardName: coursecardName ?? "Golf Course Unknown",
            coursecardPars: coursecardPars ?? [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          }
        );
        if (response) {
          // Handle successful response
          console.log("Coursecard added successfully");
          await handleLoadingCoursecards();
          await handleFilteringSelectableCoursecards();
        }
      } else if (activity === "update") {
        // Handle updating a coursecard
        const response = await patchRequest(
          import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
          endpoints.COURSECARD + coursecardId,
          {
            coursecardPars: coursecardPars ?? [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          }
        );
        if (response) {
          console.log("Coursecard updated successfully");
          await handleLoadingCoursecards();
          await handleFilteringSelectableCoursecards();
        }
      } else if (activity === "delete") {
        // Handle deleting a coursecard
        const response = await deleteRequest(
          import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
          endpoints.COURSECARD + coursecardId,
          {}
        );
        if (response) {
          console.log("Coursecard deleted successfully");
          await handleLoadingCoursecards();
          await handleFilteringSelectableCoursecards();
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
          coursecardId: 0,
          coursecardName: "TBD",
          coursecardPars: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
          coursecardTotalPar: 0,
        });
      }
      // Placeholder Load
      if (coursecards?.length > 0) setCoursecards([...coursecards]);
      // Call API and load data
      const response = await getCoursecards();
      if (response?.length > 0) {
        response.forEach((item: Coursecard, index: number) => {
          coursecards.splice(index, 1, item);
        });
      }
      // Data Load
      if (coursecards?.length > 0) setCoursecards([...coursecards]);
    } catch (error) {
      console.error("Error loading coursecards");
      return error;
    }
  };

  // Handle filtering coursecards of the results versus ten blank coursecards
  const handleFilteringSelectableCoursecards = async () => {
    try {
      const courses = [] as Coursecard[];
      coursecards?.forEach((item) => {
        if (item?.submitted && item?.updated) {
          courses.push(item);
        }
      });
      setSelectableCoursecards(courses);
    } catch (error) {
      console.error("Error filtering selectable coursecards");
      return error;
    }
  };

  // Load on refresh / reload
  React.useEffect(() => {
    const load = async () => {
      await handleLoadingCoursecards();
      await handleFilteringSelectableCoursecards();
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
              key={`golfcourse-${item?.coursecardId}-${index}`}
              coursecardName={item?.coursecardName}
              coursecardPars={item?.coursecardPars}
              coursecardTotalPar={item?.coursecardTotalPar}
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
              key={`golfcourse-${item?.coursecardId}-${index}`}
              coursecardName={item?.coursecardName}
              coursecardPars={item?.coursecardPars}
              coursecardTotalPar={item?.coursecardTotalPar}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
      {user ? (
        <section className="active my-3 border-1 border-neutral-950">
          <div className="my-3">
            <HeadingTwoComponent text="Coursecard Activities" />
            <ParagraphComponent text="Manage your scorecards effectively by using the options below." />
          </div>
          <CoursecardActivitiesComponent
            handleSubmitCoursecard={handleSubmitCoursecard}
            selectableCoursecards={selectableCoursecards}
          />
        </section>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}
