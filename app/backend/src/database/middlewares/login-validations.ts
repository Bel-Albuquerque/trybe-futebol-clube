import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { fildsMustBeFilled, incorrectEmailOrPassword } from '../utils-validations/erroMessages';

const userSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(7),
});

const errorMessage = () => (incorrectEmailOrPassword);

const postLoginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).json(fildsMustBeFilled);

  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(401).json(errorMessage());
  }
  next();
};

export default postLoginValidation;
