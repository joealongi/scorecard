import * as React from "react";

import { Select } from "@headlessui/react";
import ScorecardEditorComponent from "./ScorecardEditorComponent";

import type { SubmitScorecard } from "../types/ScorecardTypes";
import type { GolfCourse } from "../types/GolfCourseTypes";

export default function ScorecardActivitiesAddComponent({
  handleSubmitScorecard,
  activity,
  text,
  userId,
  selectableGolfCourses,
}: Readonly<{
  handleSubmitScorecard?: (
    submitScorecard: SubmitScorecard
  ) => Promise<unknown>;
  activity?: string;
  text?: string;
  userId?: number;
  selectableGolfCourses?: GolfCourse[];
}>) {
  const [selectedGolfCourse, setSelectedGolfCourse] =
    React.useState<GolfCourse>(selectableGolfCourses?.[0] ?? {});

  // Handle selecting golf course from the list
  const handleSelectingGolfCourse = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedGolfCourse =
      selectableGolfCourses?.[parseInt(event?.target?.value)];
    if (selectedGolfCourse) {
      setSelectedGolfCourse(selectedGolfCourse);
    }
  };

  return (
    <React.Fragment>
      <Select
        className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
        name="golfcourses"
        aria-label="List of golf courses"
        onChange={handleSelectingGolfCourse}
      >
        {Array?.isArray(selectableGolfCourses) &&
        selectableGolfCourses?.length > 0 ? (
          selectableGolfCourses.map((item, index) => (
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
