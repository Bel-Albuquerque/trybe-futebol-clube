import Clubs from '../models/club';
import Match from '../models/match';
import LeaderBoard from './classLeaderBoard';

const getName = (objClub: Clubs) => objClub.clubName;

const homeTeamWins = (objMatch: Match, leaderBoardClub: LeaderBoard) => {
  const { homeTeamGoals, awayTeamGoals } = objMatch;

  leaderBoardClub.addTotalPoints(3);
  leaderBoardClub.addTotalGames(1);
  leaderBoardClub.addTotalVictories(1);
  leaderBoardClub.addGoalsFavor(homeTeamGoals);
  leaderBoardClub.addGoalsOwn(awayTeamGoals);
};

const homeTeamDraws = (objMatch: Match, leaderBoardClub: LeaderBoard) => {
  const { homeTeamGoals, awayTeamGoals } = objMatch;

  leaderBoardClub.addTotalPoints(1);
  leaderBoardClub.addTotalGames(1);
  leaderBoardClub.addTotalDraws(1);
  leaderBoardClub.addGoalsFavor(homeTeamGoals);
  leaderBoardClub.addGoalsOwn(awayTeamGoals);
};

const homeTeamLosses = (objMatch: Match, leaderBoardClub: LeaderBoard) => {
  const { homeTeamGoals, awayTeamGoals } = objMatch;

  leaderBoardClub.addTotalGames(1);
  leaderBoardClub.addTotalLosses(1);
  leaderBoardClub.addGoalsFavor(homeTeamGoals);
  leaderBoardClub.addGoalsOwn(awayTeamGoals);
};

const getHomePoints = (clubId: number, objMatch: Match, leaderBoardClub: LeaderBoard) => {
  const { homeTeam, homeTeamGoals, awayTeamGoals } = objMatch;

  if (clubId === homeTeam) {
    if (homeTeamGoals > awayTeamGoals) homeTeamWins(objMatch, leaderBoardClub);
    if (homeTeamGoals === awayTeamGoals) homeTeamDraws(objMatch, leaderBoardClub);
    if (homeTeamGoals < awayTeamGoals) homeTeamLosses(objMatch, leaderBoardClub);
  }
};

const forEachMatch = (clubId: number, allMatches: Match[], leaderBoardClub: LeaderBoard) => {
  allMatches.forEach((objMatch) => (
    getHomePoints(clubId, objMatch, leaderBoardClub)));
};

export const makeObjectForClub = (
  objClub: Clubs,
  allMatches: Match[],
  array: any,
) => {
  const leaderBoardClub = new LeaderBoard(getName(objClub));

  forEachMatch(objClub.id, allMatches, leaderBoardClub);
  leaderBoardClub.addGoalsBalance();
  leaderBoardClub.addEfficiency();
  array.push(leaderBoardClub.getObj());
};

const sortgeneric = (a: number, b: number) => {
  if (a < b) return 1;
  if (b < a) return -1;
};

const sortReverse = (a: number, b: number) => {
  if (a > b) return 1;
  if (b > a) return -1;
};

const sortArray = (array: any[]) => {
  array.sort((a: any, b: any) => sortgeneric(a.totalPoints, b.totalPoints) || (
    sortgeneric(a.totalVictories, b.totalVictories)) || (
    sortgeneric(a.goalsBalance, b.goalsBalance)) || (
    sortgeneric(a.goalsFavor, b.goalsFavor)) || (
    sortReverse(a.goalsOwn, b.goalsOwn)) || 0);

  return array;
};

export async function settingUpLeaderbord() {
  const array: [] | LeaderBoard[] = [];

  const allClubs = await Clubs.findAll();
  const allMatches = await Match.findAll({ where: { inProgress: false } });
  allClubs.forEach((objClub) => makeObjectForClub(objClub, allMatches, array));
  return sortArray(array);
  // return array;
}
