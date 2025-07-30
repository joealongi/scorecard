import * as React from "react";

import dayjs from "dayjs";

import { Field, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ScorecardEditorComponent from "./ScorecardEditorComponent";

import type { Scorecard, SubmitScorecard } from "../types/ScorecardTypes";

export default function ScorecardActivitiesUpdateComponent({
  handleSubmitScorecard,
  activity,
  text,
  userId,
  selectableScorecards,
}: Readonly<{
  handleSubmitScorecard?: (
    submitScorecard: SubmitScorecard
  ) => Promise<unknown>;
  activity?: string;
  text?: string;
  userId?: number;
  selectableScorecards?: Scorecard[];
}>) {
  const [selectedScorecard, setSelectedScorecard] = React.useState<
    Scorecard | undefined
  >(selectableScorecards?.[0]);

  // Handle selecting scorecards from the list
  const handleSelectScorecard = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedScorecard =
      selectableScorecards?.[parseInt(event?.target?.value)];
    if (selectedScorecard) {
      setSelectedScorecard(selectedScorecard);
    }
  };

  return (
    <React.Fragment>
      <Field className="relative">
        <Select
          className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased appearance-none"
          name="scorecards"
          aria-label="List of user scorecards"
          onChange={handleSelectScorecard}
        >
          {Array?.isArray(selectableScorecards) &&
          selectableScorecards?.length > 0 ? (
            selectableScorecards.map((item, index) => (
              <option key={`scorecard-${item?.userId}-${index}`} value={index}>
                {dayjs(item?.updated)
                  .format("MM/DD/YYYY - hh:mm:ss A")
                  .toString()}
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
        userScores={selectedScorecard?.userScores}
      />
    </React.Fragment>
  );
}
