import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import { NextFunction, Request, Response } from 'express';

export interface MessageErro {
  error: string,
}

const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

interface Data { id: number, username: string, role: string }

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

export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization) {
    const userData = await decoder(authorization);
    if (userData) {
      req.headers = userData;
      return next();
    }
  }
  return res.status(401).end();
};
