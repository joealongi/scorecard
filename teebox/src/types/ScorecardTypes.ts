export type Scorecard = {
  id?: number;
  scorecardId?: number;
  submitted?: string;
  updated?: string;
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
  scorecardId?: number;
  userId?: string;
  userScores?: number[];
  coursecardId?: number;
};
