import Clubs from '../models/club';

export const getAllClubsService = async () => {
  try {
    const getAll = await Clubs.findAll();
    return getAll;
  } catch {
    return false;
  }
};

export const getByIdClubService = async (id: number) => {
  try {
    const getAll = await Clubs.findByPk(id);
    return getAll;
  } catch {
    return false;
  }
};

export const getClubsById = async (id: number) => {
  const trueId = await Clubs.findByPk(id);
  return trueId || false;
};
