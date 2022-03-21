import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { joiMessageErro } from '../erros.ts/erroMessages';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

export const postLoginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json(joiMessageErro(error));
  }
  next();
};

export const xablau = 'xablau';
