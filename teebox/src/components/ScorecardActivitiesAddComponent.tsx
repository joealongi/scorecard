import * as React from "react";

import { Field, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ScorecardEditorComponent from "./ScorecardEditorComponent";

import type { SubmitScorecard } from "../types/ScorecardTypes";
import type { Coursecard } from "../types/CoursecardTypes";

export default function ScorecardActivitiesAddComponent({
  handleSubmitScorecard,
  activity,
  text,
  userId,
  selectableCoursecards,
}: Readonly<{
  handleSubmitScorecard?: (
    submitScorecard: SubmitScorecard
  ) => Promise<unknown>;
  activity?: string;
  text?: string;
  userId?: string;
  selectableCoursecards?: Coursecard[];
}>) {
  const [selectedCoursecard, setSelectedCoursecard] =
    React.useState<Coursecard>(selectableCoursecards?.[0] ?? {});

  // Handle selecting golf course from the list
  const handleSelectingCoursecard = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCoursecard =
      selectableCoursecards?.[parseInt(event?.target?.value)];
    if (selectedCoursecard) {
      setSelectedCoursecard(selectedCoursecard);
    }
  };

  return (
    <React.Fragment>
      <Field className="relative">
        <Select
          className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased appearance-none"
          name="scorecards"
          aria-label="List of user scorecards"
          onChange={handleSelectingCoursecard}
        >
          {Array?.isArray(selectableCoursecards) &&
          selectableCoursecards?.length > 0 ? (
            selectableCoursecards.map((item, index) => (
              <option
                key={`scorecard-${item?.coursecardId}-${index}`}
                value={index}
              >
                {item?.coursecardName ?? "Golf Course Unknown"}
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
        coursecardId={selectedCoursecard?.coursecardId ?? 1}
      />
    </React.Fragment>
  );
}
