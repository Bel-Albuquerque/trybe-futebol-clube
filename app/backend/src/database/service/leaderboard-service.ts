import Clubs from '../models/club';
import Match from '../models/match';
import ClubLeaderBoard from './classLeaderBoard';

const sortBigest = (a: number, b: number) => {
  if (a < b) return 1;
  if (b < a) return -1;
};

const sortSmaller = (a: number, b: number) => {
  if (a > b) return 1;
  if (b > a) return -1;
};

const sortArray = (array: any[]) => {
  array.sort((a: any, b: any) => sortBigest(a.totalPoints, b.totalPoints) || (
    sortBigest(a.totalVictories, b.totalVictories)) || (
      sortBigest(a.goalsBalance, b.goalsBalance)) || (
      sortBigest(a.goalsFavor, b.goalsFavor)) || (
      sortSmaller(a.goalsOwn, b.goalsOwn)) || 0);

  return array;
};

const teamWins = (objMatch: Match, clubLeaderBoard: ClubLeaderBoard) => {
  const { homeTeamGoals, awayTeamGoals } = objMatch;

  clubLeaderBoard.addTotalPoints(3);
  clubLeaderBoard.addTotalGames(1);
  clubLeaderBoard.addTotalVictories(1);
  clubLeaderBoard.addGoalsFavor(homeTeamGoals);
  clubLeaderBoard.addGoalsOwn(awayTeamGoals);
};

const teamDraws = (objMatch: Match, clubLeaderBoard: ClubLeaderBoard) => {
  const { homeTeamGoals, awayTeamGoals } = objMatch;

  clubLeaderBoard.addTotalPoints(1);
  clubLeaderBoard.addTotalGames(1);
  clubLeaderBoard.addTotalDraws(1);
  clubLeaderBoard.addGoalsFavor(homeTeamGoals);
  clubLeaderBoard.addGoalsOwn(awayTeamGoals);
};

const teamLosses = (objMatch: Match, clubLeaderBoard: ClubLeaderBoard) => {
  const { homeTeamGoals, awayTeamGoals } = objMatch;

  clubLeaderBoard.addTotalGames(1);
  clubLeaderBoard.addTotalLosses(1);
  clubLeaderBoard.addGoalsFavor(homeTeamGoals);
  clubLeaderBoard.addGoalsOwn(awayTeamGoals);
};

const getHomeTeamPoints = (clubId: number, objMatch: Match, clubLeaderBoard: ClubLeaderBoard) => {
  const { homeTeam, homeTeamGoals, awayTeamGoals } = objMatch;

  if (clubId === homeTeam) {
    if (homeTeamGoals > awayTeamGoals) teamWins(objMatch, clubLeaderBoard);
    if (homeTeamGoals === awayTeamGoals) teamDraws(objMatch, clubLeaderBoard);
    if (homeTeamGoals < awayTeamGoals) teamLosses(objMatch, clubLeaderBoard);
  }
};

const getAwayTeamPoints = (clubId: number, objMatch: Match, clubLeaderBoard: ClubLeaderBoard) => {
  const { awayTeam, homeTeamGoals, awayTeamGoals } = objMatch;

  if (clubId === awayTeam) {
    if (awayTeamGoals > homeTeamGoals) teamWins(objMatch, clubLeaderBoard);
    if (awayTeamGoals === homeTeamGoals) teamDraws(objMatch, clubLeaderBoard);
    if (awayTeamGoals < homeTeamGoals) teamLosses(objMatch, clubLeaderBoard);
  }
};

const getAllTeamPoints = (clubId: number, objMatch: Match, clubLeaderBoard: ClubLeaderBoard) => {
  getHomeTeamPoints(clubId, objMatch, clubLeaderBoard);
  getAwayTeamPoints(clubId, objMatch, clubLeaderBoard);
};

const forEachMatch = (clubId: number, allMatches: Match[], clubLeaderBoard: ClubLeaderBoard) => {
  allMatches.forEach((objMatch) => (
    getHomeTeamPoints(clubId, objMatch, clubLeaderBoard)));
};

const getName = (objClub: Clubs) => objClub.clubName;

export const makeObjectForClub = (objClub: Clubs, allMatches: Match[]) => {
  const clubLeaderBoard = new ClubLeaderBoard(getName(objClub));

  forEachMatch(objClub.id, allMatches, clubLeaderBoard);
  clubLeaderBoard.addGoalsBalance();
  clubLeaderBoard.addEfficiency();

  return clubLeaderBoard.getObj();
};

const makeLeaderboard = (objClub: Clubs, allMatches: Match[], array: any) => {
  const obj = makeObjectForClub(objClub, allMatches);
  array.push(obj);
};

export async function settingUpLeaderbord() {
  const array: [] | ClubLeaderBoard[] = [];

  const allClubs = await Clubs.findAll();
  const allMatches = await Match.findAll({ where: { inProgress: false } });

  allClubs.forEach((objClub) => makeLeaderboard(objClub, allMatches, array));
  return sortArray(array);
}
