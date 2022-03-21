import express from 'express';
import { getValidateLogin, postLoginController } from './database/controller/login-controller';
import { postLoginValidation } from './database/middlewares/login-validations';

const router = express.Router();

router
  .route('/login/validate')
  .get(getValidateLogin);

router
  .route('/login')
  .post(postLoginValidation, postLoginController);

export default router;
