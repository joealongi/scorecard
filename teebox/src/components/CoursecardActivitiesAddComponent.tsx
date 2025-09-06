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
  const [golfCourseName, setGolfCourseName] =
    React.useState<Coursecard["golfCourseName"]>("");

  // Handle naming golf course for adding a new coursecard
  const handleGolfCourseName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.value) {
      setGolfCourseName(event.target.value);
    }
  };

  return (
    <React.Fragment>
      <Field className="relative">
        <Input
          className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased appearance-none"
          name="golfCourseName"
          aria-label="Name of the golf course"
          type="text"
          onChange={handleGolfCourseName}
        />
      </Field>
      <CoursecardEditorComponent
        handleSubmitCoursecard={handleSubmitCoursecard}
        activity={activity}
        text={text}
        golfCourseName={golfCourseName}
      />
    </React.Fragment>
  );
}
