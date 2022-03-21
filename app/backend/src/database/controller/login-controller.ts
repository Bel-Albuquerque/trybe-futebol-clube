import { Request, Response } from 'express';
import { emailOrPasswodInvalid } from '../erros.ts/erroMessages';
import { decoder } from '../middlewares/tokenValidation';
import { postLoginService } from '../service/login-service';

export const postLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);

  const token = await postLoginService(email, password);

  if (token) return res.status(200).json(token);

  return res.status(400).json(emailOrPasswodInvalid);
};

export const getValidateLogin = async (req: Request, res: Response) => {
  const { authorization } = req.params;
  const userData = await decoder(authorization);
  if (userData) return res.status(200).json(userData.role);
};
