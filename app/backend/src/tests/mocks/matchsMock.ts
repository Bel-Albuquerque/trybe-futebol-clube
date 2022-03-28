export const allMatchs = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: {
      clubName: "São Paulo"
    },
    awayClub: {
      clubName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: {
      clubName: "Internacional"
    },
    awayClub: {
      clubName: "Santos"
    }
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeClub: {
      clubName: "São Paulo"
    },
    awayClub: {
      clubName: "Internacional"
    }
  },
  {
    id: 42,
    homeTeam: 6,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeClub: {
      clubName: "Ferroviária"
    },
    awayClub: {
      clubName: "Avaí/Kindermann"
    }
  }
]

export const inProgressTrueMatchs = [
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeClub: {
      clubName: "São Paulo"
    },
    awayClub: {
      clubName: "Internacional"
    }
  },
  {
    id: 42,
    homeTeam: 6,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeClub: {
      clubName: "Ferroviária"
    },
    awayClub: {
      clubName: "Avaí/Kindermann"
    }
  }
]

export const inProgressFalseMatchs = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: {
      clubName: "São Paulo"
    },
    awayClub: {
      clubName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: {
      clubName: "Internacional"
    },
    awayClub: {
      clubName: "Santos"
    }
  }
]

export const addMatch = {
  "homeTeam": 16,
  "awayTeam": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}

export const createMatchs = {
  id: 5,
  homeTeam: 16,
  awayTeam: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: false
}

export const updateMatchs = {
  id: 5,
  homeTeam: 16,
  awayTeam: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: false
}

export const updatedGoalsMatchs = {
  id: 5,
  homeTeam: 16,
  awayTeam: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: false
}

export const updateGoals = {
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}
