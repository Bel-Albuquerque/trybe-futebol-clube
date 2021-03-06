import Clubs from '../models/club';
import Match from '../models/match';
import ClubLeaderBoard from './utils/classLeaderBoard';

const sortBiggest = (a: number, b: number) => {
  if (a < b) return 1;
  if (b < a) return -1;
};

const sortSmallest = (a: number, b: number) => {
  if (a > b) return 1;
  if (b > a) return -1;
};

const sortArray = (array: any[]) => {
  array.sort((a: any, b: any) => sortBiggest(a.totalPoints, b.totalPoints) || (
    sortBiggest(a.totalVictories, b.totalVictories)) || (
    sortBiggest(a.goalsBalance, b.goalsBalance)) || (
    sortBiggest(a.goalsFavor, b.goalsFavor)) || (
    sortSmallest(a.goalsOwn, b.goalsOwn)) || 0);

  return array;
};

const teamWins = (objMatch: Match, clubLeaderBoard: ClubLeaderBoard) => {
  const { homeTeamGoals, awayTeamGoals } = objMatch;
  clubLeaderBoard.addTotalPoints(3);
  clubLeaderBoard.addTotalGames(1);
  clubLeaderBoard.addTotalVictories(1);
  clubLeaderBoard.addGoalsFavor(homeTeamGoals, awayTeamGoals);
  clubLeaderBoard.addGoalsOwn(homeTeamGoals, awayTeamGoals);
};

const teamDraws = (objMatch: Match, clubLeaderBoard: ClubLeaderBoard) => {
  const { homeTeamGoals, awayTeamGoals } = objMatch;

  clubLeaderBoard.addTotalPoints(1);
  clubLeaderBoard.addTotalGames(1);
  clubLeaderBoard.addTotalDraws(1);
  clubLeaderBoard.addGoalsFavor(homeTeamGoals, awayTeamGoals);
  clubLeaderBoard.addGoalsOwn(homeTeamGoals, awayTeamGoals);
};

const teamLoses = (objMatch: Match, clubLeaderBoard: ClubLeaderBoard) => {
  const { homeTeamGoals, awayTeamGoals } = objMatch;

  clubLeaderBoard.addTotalGames(1);
  clubLeaderBoard.addTotalLosses(1);
  clubLeaderBoard.addGoalsFavor(homeTeamGoals, awayTeamGoals);
  clubLeaderBoard.addGoalsOwn(homeTeamGoals, awayTeamGoals);
};

const getHomeTeamPoints = (clubId: number, objMatch: Match, clubLeaderBoard: ClubLeaderBoard) => {
  const { homeTeam, homeTeamGoals, awayTeamGoals } = objMatch;

  if (clubId === homeTeam) {
    if (homeTeamGoals > awayTeamGoals) teamWins(objMatch, clubLeaderBoard);
    if (homeTeamGoals === awayTeamGoals) teamDraws(objMatch, clubLeaderBoard);
    if (homeTeamGoals < awayTeamGoals) teamLoses(objMatch, clubLeaderBoard);
  }
};

const getAwayTeamPoints = (clubId: number, objMatch: Match, clubLeaderBoard: ClubLeaderBoard) => {
  const { awayTeam, homeTeamGoals, awayTeamGoals } = objMatch;

  if (clubId === awayTeam) {
    if (awayTeamGoals > homeTeamGoals) teamWins(objMatch, clubLeaderBoard);
    if (awayTeamGoals === homeTeamGoals) teamDraws(objMatch, clubLeaderBoard);
    if (awayTeamGoals < homeTeamGoals) teamLoses(objMatch, clubLeaderBoard);
  }
};

const getAllTeamPoints = (clubId: number, objMatch: Match, clubLeaderBoard: ClubLeaderBoard) => {
  clubLeaderBoard.setFilterType('home');
  getHomeTeamPoints(clubId, objMatch, clubLeaderBoard);
  clubLeaderBoard.setFilterType('away');
  getAwayTeamPoints(clubId, objMatch, clubLeaderBoard);
  clubLeaderBoard.setFilterType('all');
};

const forEachMatch = (clubId: number, allMatches: Match[], clubLeaderBoard: ClubLeaderBoard) => {
  allMatches.forEach((objMatch) => {
    if (clubLeaderBoard.filterType === 'home') getHomeTeamPoints(clubId, objMatch, clubLeaderBoard);
    if (clubLeaderBoard.filterType === 'away') getAwayTeamPoints(clubId, objMatch, clubLeaderBoard);
    if (clubLeaderBoard.filterType === 'all') getAllTeamPoints(clubId, objMatch, clubLeaderBoard);
  });
};

const getName = (objClub: Clubs) => objClub.clubName;

const makeObjectForClub = (objClub: Clubs, allMatches: Match[], filterType: string) => {
  const clubLeaderBoard = new ClubLeaderBoard(getName(objClub), filterType);

  forEachMatch(objClub.id, allMatches, clubLeaderBoard);
  clubLeaderBoard.addGoalsBalance();
  clubLeaderBoard.addEfficiency();

  return clubLeaderBoard.getObj();
};

const makeLeaderboard = (objClub: Clubs, allMatches: Match[], array: any, filterType: string) => {
  const obj = makeObjectForClub(objClub, allMatches, filterType);
  array.push(obj);
};

export default async function settingUpLeaderboard(filterType = 'home') {
  const array: [] | ClubLeaderBoard[] = [];

  const allClubs = await Clubs.findAll();
  const allMatches = await Match.findAll({ where: { inProgress: false } });

  allClubs.forEach((objClub) => makeLeaderboard(objClub, allMatches, array, filterType));

  return sortArray(array);
}
