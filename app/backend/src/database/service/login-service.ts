import { generateToken } from '../middlewares/tokenValidation';
import User from '../models/user';

export const postLoginService = async (email: string, password: string) => {
  const criptoPassword = generateToken(password);
  const user = await User.findOne({ where: { email, password: criptoPassword } });
  if (user) {
    const { id, username, role } = user;
    const token = generateToken({ id, username, role });
    return token;
  }
  return false;
};

export const xablau = 'xablau';
