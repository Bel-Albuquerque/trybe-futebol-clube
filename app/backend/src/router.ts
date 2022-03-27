import express from 'express';
import { getValidateLogin, postLoginController } from './database/controller/login-controller';
import { postLoginValidation } from './database/middlewares/login-validations';
import {
  getAllClubsController,
  getByIdClubController,
} from './database/controller/clubs-controller';
import {
  getAllMatchsController,
  addMatchController,
} from './database/controller/matchs-controller';

const router = express.Router();

router
  .route('/login/validate')
  .get(getValidateLogin);

router
  .route('/login')
  .post(postLoginValidation, postLoginController);

router
  .route('/clubs/:id')
  .get(getByIdClubController);

router
  .route('/clubs')
  .get(getAllClubsController);

router
  .route('/matchs')
  .get(getAllMatchsController)
  .post(addMatchController);

export default router;
