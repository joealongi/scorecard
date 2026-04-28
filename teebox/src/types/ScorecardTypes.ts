export type Scorecard = {
  id?: number;
  submitted?: string;
  updated?: string;
  scorecardId?: string;
  userId?: string;
  userName?: string;
  userRank?: number;
  userHandicap?: number;
  userScores?: number[];
  userTotalScore?: number;
  coursecardId?: number;
  coursecardName?: string;
  coursecardPars?: number[];
  coursecardTotalPar?: number;
  coursecardHolesPlayed?: number;
};

export type SubmitScorecard = {
  activity?: string;
  scorecardId?: string;
  userId?: string;
  userScores?: number[];
  coursecardId?: number;
};
