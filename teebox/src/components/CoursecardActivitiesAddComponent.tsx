import * as React from "react";

import { Field, Input } from "@headlessui/react";
import CoursecardEditorComponent from "./CoursecardEditorComponent";

import type { Coursecard, SubmitCoursecard } from "../types/CoursecardTypes";

export default function CoursecardActivitiesAddComponent({
  handleSubmitCoursecard,
  activity,
  text,
}: Readonly<{
  handleSubmitCoursecard?: (
    submitCoursecard: SubmitCoursecard
  ) => Promise<unknown>;
  activity?: string;
  text?: string;
}>) {
  const [coursecardName, setCoursecardName] =
    React.useState<Coursecard["coursecardName"]>("");

  // Handle naming golf course for adding a new coursecard
  const handleCoursecardName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.value) {
      setCoursecardName(event.target.value);
    }
  };

  return (
    <React.Fragment>
      <Field className="relative">
        <Input
          className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased appearance-none"
          name="coursecardName"
          aria-label="Name of the golf course"
          type="text"
          onChange={handleCoursecardName}
        />
      </Field>
      <CoursecardEditorComponent
        handleSubmitCoursecard={handleSubmitCoursecard}
        activity={activity}
        text={text}
        coursecardName={coursecardName}
      />
    </React.Fragment>
  );
}
