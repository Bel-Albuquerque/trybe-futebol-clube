import express from 'express';
import { getValidateLogin, postLoginController } from './database/controller/login-controller';
import postLoginValidation from './database/middlewares/login-validations';
import {
  getAllClubsController,
  getByIdClubController,
} from './database/controller/clubs-controller';
import {
  getAllMatchsController,
  addMatchController,
  editMatchController,
  editMatchGoalsController,
} from './database/controller/matchs-controller';
import { tokenValidation } from './database/utils-validations/tokenValidation';
import postMatchValidation from './database/middlewares/matchs-validations';
import {
  getHomeLeaderBoardController,
  getAwayLeaderBoardController,
  getAllLeaderBoardController,
} from './database/controller/leaderboard-controller';

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
  .patch(editMatchGoalsController);

router
  .route('/matchs')
  .get(getAllMatchsController)
  .post(tokenValidation, postMatchValidation, addMatchController);

router
  .route('/leaderboard/home')
  .get(getHomeLeaderBoardController);

router
  .route('/leaderboard/away')
  .get(getAwayLeaderBoardController);

router
  .route('/leaderboard')
  .get(getAllLeaderBoardController);

export default router;
