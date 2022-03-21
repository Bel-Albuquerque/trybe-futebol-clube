import express from 'express';
import { postLoginController } from './database/controller/login-controller';
import { postLoginValidation } from './database/middlewares/login-validations';

const router = express.Router();

router
  .route('/login')
  .post(postLoginValidation, postLoginController);

// router
// .route('/login/validate')

export default router;
