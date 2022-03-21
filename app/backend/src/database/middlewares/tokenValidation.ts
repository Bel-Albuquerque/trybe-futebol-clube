import * as jwt from 'jsonwebtoken';
import fs from 'fs';

export interface MessageErro {
  error: string,
}

const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

interface Data { id: number, username: string, role: string }

export const generateToken = (data: Data | string) => {
  const token = jwt.sign(data, JWT_SECRET, { algorithm: 'HS256' });
  return token;
};

export const decoder = async (token: string): Promise<MessageErro | string | jwt.JwtPayload> => {
  try {
    const decoded: jwt.JwtPayload | string = await jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return 'token inválido';
  }
};
