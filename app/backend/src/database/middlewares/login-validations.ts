import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(7),
});

const errorMessage = () => ({ message: 'Incorrect email or password' });

export const postLoginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(401).json(errorMessage());
  }
  next();
};

export const xablau = 'xablau';
