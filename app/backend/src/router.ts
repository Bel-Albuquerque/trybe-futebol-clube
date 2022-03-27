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
  editMatchGoals,
} from './database/controller/matchs-controller';
import { tokenValidation } from './database/middlewares/tokenValidation';
import { postMatchValidation } from './database/middlewares/matchs-validations';

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
  .patch(editMatchController);

router
  .route('/matchs/:id')
  .patch(editMatchGoals);

router
  .route('/matchs')
  .get(getAllMatchsController)
  .post(tokenValidation, postMatchValidation, addMatchController);

export default router;
