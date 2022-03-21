import * as jwt from 'jsonwebtoken';
import fs from 'fs';

export interface MessageErro {
  error: string,
}

const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

interface Data { id: number, username: string, role: string }

// type Decoded = MessageErro | Data | boolean | string;

export const generateToken = (data: Data | string) => {
  const token = jwt.sign(data, JWT_SECRET, { algorithm: 'HS256' });
  return token;
};

export const decoder = async (token: string): Promise<any> => {
  try {
    const decoded: any = await jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return false;
  }
};
