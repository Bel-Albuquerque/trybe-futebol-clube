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
  editMatchController,
} from './database/controller/matchs-controller';
import { tokenValidation } from './database/middlewares/tokenValidation';

const router = express.Router();

router
  .route('/login/validate')
  .get(tokenValidation, getValidateLogin);

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
  .route('/matchs/:id/finish')
  .patch(tokenValidation, editMatchController);

router
  .route('/matchs')
  .get(getAllMatchsController)
  .post(tokenValidation, addMatchController);

export default router;
