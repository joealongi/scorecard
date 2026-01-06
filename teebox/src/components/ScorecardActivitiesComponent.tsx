import * as React from "react";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import HeadingThreeComponent from "./HeadingThreeComponent";
import ParagraphComponent from "./ParagraphComponent";
import ScorecardActivitiesAddComponent from "./ScorecardActivitiesAddComponent";
import ScorecardActivitiesUpdateComponent from "./ScorecardActivitiesUpdateComponent";
import ScorecardActivitiesDeleteComponent from "./ScorecardActivitiesDeleteComponent";

import type { Scorecard, SubmitScorecard } from "../types/ScorecardTypes";
import type { Coursecard } from "../types/CoursecardTypes";

export default function ScorecardActivitiesComponent({
  handleSubmitScorecard,
  userId,
  selectableScorecards,
  selectableGolfCourses,
}: Readonly<{
  handleSubmitScorecard?: (
    submitScorecard: SubmitScorecard
  ) => Promise<unknown>;
  userId: string;
  selectableScorecards?: Scorecard[];
  selectableGolfCourses?: Coursecard[];
}>) {
  return (
    <React.Fragment>
      <TabGroup>
        <TabList className="flex flex-col md:flex-row md:justify-between md:items-center">
          <Tab className="active flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 aria-selected:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer">
            Add scorecard
          </Tab>
          <Tab className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 aria-selected:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer">
            Update scorecard
          </Tab>
          <Tab className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 aria-selected:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer">
            Delete scorecard
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="">
            <HeadingThreeComponent text="Add a scorecard" />
            <ParagraphComponent text="Fill out the form below to add a scorecard." />
            <ScorecardActivitiesAddComponent
              handleSubmitScorecard={handleSubmitScorecard}
              activity={"add"}
              text={"Add scorecard"}
              userId={userId}
              selectableGolfCourses={selectableGolfCourses}
            />
          </TabPanel>
          <TabPanel className="">
            <HeadingThreeComponent text="Update a scorecard" />
            <ParagraphComponent text="Select the scorecard you want to update and fill out the form below." />
            <ScorecardActivitiesUpdateComponent
              handleSubmitScorecard={handleSubmitScorecard}
              activity={"update"}
              text={"Update scorecard"}
              userId={userId}
              selectableScorecards={selectableScorecards}
            />
          </TabPanel>
          <TabPanel className="">
            <HeadingThreeComponent text="Delete a scorecard" />
            <ParagraphComponent text="Select the scorecard you want to delete and review the form below." />
            <ScorecardActivitiesDeleteComponent
              handleSubmitScorecard={handleSubmitScorecard}
              activity={"delete"}
              text={"Delete scorecard"}
              userId={userId}
              selectableScorecards={selectableScorecards}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </React.Fragment>
  );
}
