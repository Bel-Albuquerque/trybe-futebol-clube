import { Request, Response } from 'express';
import { emailOrPasswodInvalid } from '../utils-validations/erroMessages';
import { postLoginService } from '../service/login-service';

export const postLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userLoged = await postLoginService(email, password);

  if (userLoged) return res.status(200).json(userLoged);

  return res.status(401).json(emailOrPasswodInvalid);
};

export const getValidateLogin = async (req: Request, res: Response) => {
  const { role } = req.headers;

  return res.status(200).json(role);
};
