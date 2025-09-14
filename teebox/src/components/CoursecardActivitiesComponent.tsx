import * as React from "react";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import HeadingThreeComponent from "./HeadingThreeComponent";
import ParagraphComponent from "./ParagraphComponent";
import CoursecardActivitiesAddComponent from "./CoursecardActivitiesAddComponent";
import CoursecardActivitiesUpdateComponent from "./CoursecardActivitiesUpdateComponent";
import CoursecardActivitiesDeleteComponent from "./CoursecardActivitiesDeleteComponent";

import type { Coursecard, SubmitCoursecard } from "../types/CoursecardTypes";

export default function CoursecardActivitiesComponent({
  handleSubmitCoursecard,
  selectableCoursecards,
}: Readonly<{
  handleSubmitCoursecard?: (
    submitCoursecard: SubmitCoursecard
  ) => Promise<unknown>;
  selectableCoursecards?: Coursecard[];
}>) {
  return (
    <React.Fragment>
      <TabGroup>
        <TabList className="flex flex-col md:flex-row md:justify-between md:items-center">
          <Tab className="active flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 aria-selected:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer">
            Add coursecard
          </Tab>
          <Tab className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 aria-selected:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer">
            Update coursecard
          </Tab>
          <Tab className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 aria-selected:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer">
            Delete coursecard
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="">
            <HeadingThreeComponent text="Add a coursecard" />
            <ParagraphComponent text="Fill out the form below to add a coursecard." />
            <CoursecardActivitiesAddComponent
              handleSubmitCoursecard={handleSubmitCoursecard}
              activity={"add"}
              text={"Add coursecard"}
            />
          </TabPanel>
          <TabPanel className="">
            <HeadingThreeComponent text="Update a coursecard" />
            <ParagraphComponent text="Select the coursecard you want to update and fill out the form below." />
            <CoursecardActivitiesUpdateComponent
              handleSubmitCoursecard={handleSubmitCoursecard}
              activity={"update"}
              text={"Update coursecard"}
              selectableCoursecards={selectableCoursecards}
            />
          </TabPanel>
          <TabPanel className="">
            <HeadingThreeComponent text="Delete a coursecard" />
            <ParagraphComponent text="Select the coursecard you want to delete and review the form below." />
            <CoursecardActivitiesDeleteComponent
              handleSubmitCoursecard={handleSubmitCoursecard}
              activity={"delete"}
              text={"Delete coursecard"}
              selectableCoursecards={selectableCoursecards}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </React.Fragment>
  );
}
