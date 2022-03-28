interface ILeaderBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export default class ClubLeaderBoard implements ILeaderBoard {
  name: string;

  filterType: string;

  totalPoints: number;

  totalGames: number;

  totalVictories: number;

  totalDraws: number;

  totalLosses: number;

  goalsFavor: number;

  goalsOwn: number;

  goalsBalance: number;

  efficiency: number;

  constructor(name: string, filterType: string) {
    this.name = name;
    this.filterType = filterType;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  public addTotalPoints = (pt: number) => {
    this.totalPoints += pt;
  };

  public addTotalGames = (pt: number) => {
    this.totalGames += pt;
  };

  public addTotalVictories = (pt: number) => {
    this.totalVictories += pt;
  };

  public addTotalDraws = (pt: number) => {
    this.totalDraws += pt;
  };

  public addTotalLosses = (pt: number) => {
    this.totalLosses += pt;
  };

  public addGoalsFavor = (homeTeamGoals: number, awayTeamGoals: number) => {
    if (this.filterType === 'home') this.goalsFavor += homeTeamGoals;
    if (this.filterType === 'away') this.goalsFavor += awayTeamGoals;
  };

  public addGoalsOwn = (homeTeamGoals: number, awayTeamGoals: number) => {
    if (this.filterType === 'home') this.goalsOwn += awayTeamGoals;
    if (this.filterType === 'away') this.goalsOwn += homeTeamGoals;
  };

  public addGoalsBalance = () => {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  };

  public addEfficiency = () => {
    this.efficiency = Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  };

  public setFilterType = (type: string) => {
    this.filterType = type;
  };

  public getObj() {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }
}
