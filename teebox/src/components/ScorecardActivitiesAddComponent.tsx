import * as React from "react";

import { Select } from "@headlessui/react";
import ScorecardEditorComponent from "./ScorecardEditorComponent";

import type { SubmitScorecard } from "../types/ScorecardTypes";
import type { GolfCourse } from "../types/GolfCourseTypes";
import { endpoints } from "../configurations/constants";
import initialGolfCourseData from "../configurations/golfcourse.json";

import { getRequest } from "../functions/request";

export default function ScorecardActivitiesAddComponent({
  handleSubmitScorecard,
  activity,
  text,
  userId,
}: Readonly<{
  handleSubmitScorecard?: (submitScorecard: SubmitScorecard) => Promise<void>;
  activity?: string;
  text?: string;
  userId?: number;
}>) {
  const [golfcourses, setGolfCourses] = React.useState<GolfCourse[]>([]);
  const [selectedGolfCourse, setSelectedGolfCourse] =
    React.useState<GolfCourse>(golfcourses?.[0] ?? {});

  const handleSelectGolfCourse = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedGolfCourse = golfcourses?.[parseInt(event?.target?.value)];
    if (selectedGolfCourse) {
      setSelectedGolfCourse(selectedGolfCourse);
    }
  };

  const handleLoadGolfCourses = async () => {
    try {
      const initial = initialGolfCourseData as GolfCourse[];
      if (initial?.length > 0) {
        setGolfCourses(initial);
      }
      const response = await getRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        endpoints.GOLFCOURSE
      );
      if (response?.length > 0) {
        response.forEach((item: GolfCourse, index: number) => {
          const golfCourse: GolfCourse = {
            ...item,
          };
          if (initial?.[index]) {
            initial[index] = golfCourse;
          } else {
            initial.push(golfCourse);
          }
        });
      }
      if (initial?.length > 0) {
        setGolfCourses(initial);
      }
    } catch (error) {
      console.error("Error loading leaderboard");
      return error;
    }
  };

  React.useEffect(() => {
    const loadGolfCourses = async () => {
      await handleLoadGolfCourses();
    };
    loadGolfCourses();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <Select
        className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
        name="golfcourses"
        aria-label="List of golf courses"
        onChange={handleSelectGolfCourse}
      >
        {Array?.isArray(golfcourses) && golfcourses?.length > 0 ? (
          golfcourses.map((item, index) => (
            <option
              key={`scorecard-${item?.golfCourseId}-${index}`}
              value={index}
            >
              {item?.golfCourseName ?? "Golf Course Unknown"}
            </option>
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Select>
      <ScorecardEditorComponent
        handleSubmitScorecard={handleSubmitScorecard}
        activity={activity}
        text={text}
        userId={userId}
        golfCourseId={selectedGolfCourse?.golfCourseId}
      />
    </React.Fragment>
  );
}
