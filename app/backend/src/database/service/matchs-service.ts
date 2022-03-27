import Clubs from '../models/club';
import Match from '../models/match';

export const getAllMatchsService = async () => {
  try {
    const getAll = await Match.findAll(
      {
        attributes: ['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress'],

        include: [
          { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
          { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
        ],
      },
    );
    return getAll;
  } catch {
    return false;
  }
};

export const xablau = 'xablau';
