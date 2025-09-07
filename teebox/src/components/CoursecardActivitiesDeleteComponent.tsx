import * as React from "react";

import { Field, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CoursecardEditorComponent from "./CoursecardEditorComponent";

import type { Coursecard, SubmitCoursecard } from "../types/CoursecardTypes";

export default function CoursecardActivitiesDeleteComponent({
  handleSubmitCoursecard,
  activity,
  text,
  coursecards,
}: Readonly<{
  handleSubmitCoursecard?: (
    submitCoursecard: SubmitCoursecard
  ) => Promise<unknown>;
  activity?: string;
  text?: string;
  coursecards?: Coursecard[];
}>) {
  const [selectedCoursecard, setSelectedCoursecard] = React.useState<
    Coursecard | undefined
  >(coursecards?.[0]);

  // Handle selecting coursecards from the list
  const handleSelectCoursecard = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event?.target?.value) {
      setSelectedCoursecard(coursecards?.[parseInt(event?.target?.value)]);
    }
  };

  return (
    <React.Fragment>
      <Field className="relative">
        <Select
          className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased appearance-none"
          name="coursecards"
          aria-label="List of coursecards"
          onChange={handleSelectCoursecard}
        >
          {Array?.isArray(coursecards) && coursecards?.length > 0 ? (
            coursecards.map((item, index) => (
              <option
                key={`coursecard-${item?.golfCourseId}-${index}`}
                value={index}
              >
                {item?.golfCourseName}
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
      <CoursecardEditorComponent
        handleSubmitCoursecard={handleSubmitCoursecard}
        activity={activity}
        text={text}
        golfCourseId={selectedCoursecard?.golfCourseId}
        golfCourseName={selectedCoursecard?.golfCourseName}
        golfCoursePars={selectedCoursecard?.golfCoursePars}
      />
    </React.Fragment>
  );
}
