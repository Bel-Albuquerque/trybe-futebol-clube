import { Request, Response } from 'express';
import { emailOrPasswodInvalid } from '../erros.ts/erroMessages';
import { decoder } from '../middlewares/tokenValidation';
import { postLoginService } from '../service/login-service';

export const postLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);

  const userLoged = await postLoginService(email, password);

  if (userLoged) return res.status(200).json(userLoged);

  return res.status(401).json(emailOrPasswodInvalid);
};

export const getValidateLogin = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (authorization) {
    const userData = await decoder(authorization);
    if (userData) return res.status(200).json(userData.role);
  }
  return res.status(401).end();
};
