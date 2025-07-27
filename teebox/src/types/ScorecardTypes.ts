export type Scorecard = {
  submitted?: string;
  updated?: string;
  userId?: number;
  userName?: string;
  userRank?: number;
  userHandicap?: number;
  userScores?: number[];
  userTotalScore?: number;
  golfCourseId?: number;
  golfCourseName?: string;
  golfCoursePars?: number[];
  golfCourseTotalPar?: number;
  golfCourseHolesPlayed?: number;
};

export type SubmitScorecard = {
  activity?: string;
  userId?: number;
  userScores?: number[];
  golfCourseId?: number;
};
