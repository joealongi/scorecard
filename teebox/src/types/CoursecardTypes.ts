export type Coursecard = {
  submitted?: string;
  updated?: string;
  golfCourseId?: number;
  golfCourseName?: string;
  golfCoursePars?: number[];
  golfCourseTotalPar?: number;
};

export type SubmitCoursecard = {
  activity?: string;
  golfCourseId?: number;
  golfCourseName?: string;
  golfCoursePars?: number[];
};

export type CoursecardHole = {
  hole?: string;
};
