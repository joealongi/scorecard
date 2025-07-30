import * as React from "react";

import { Field, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
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
      <Field className="relative">
        <Select
          className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased appearance-none"
          name="scorecards"
          aria-label="List of user scorecards"
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
        <ChevronDownIcon
          className="group pointer-events-none absolute top-[10%] right-[0%] size-10 fill-neutral-900"
          aria-hidden="true"
        />
      </Field>
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
