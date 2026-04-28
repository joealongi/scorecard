export type Coursecard = {
  id?: number;
  coursecardId?: number;
  submitted?: string;
  updated?: string;
  coursecardName?: string;
  coursecardPars?: number[];
  coursecardTotalPar?: number;
};

export type SubmitCoursecard = {
  activity?: string;
  coursecardId?: number;
  coursecardName?: string;
  coursecardPars?: number[];
};

export type CoursecardHole = {
  hole?: string;
};
