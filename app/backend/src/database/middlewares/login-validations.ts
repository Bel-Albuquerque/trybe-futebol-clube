import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { joiMessageErro } from '../erros.ts/erroMessages';

const userSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(7),
});

const errorMessage = () => ({ message: 'All fields must be filled' });

export const postLoginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(401).json(errorMessage());
  }
  next();
};

export const xablau = 'xablau';
