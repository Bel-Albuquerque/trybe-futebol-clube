import { compareSync } from 'bcryptjs';
import { generateToken } from '../middlewares/tokenValidation';
import User from '../models/user';

export const postLoginService = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return false;
  }
  if (!compareSync(password, user?.password)) return false;
  const { id, username, role } = user;

  const token = generateToken({ id, username, role });
  return { user: { id, username, role, email }, token };
};

export const xablau = 'xablau';
