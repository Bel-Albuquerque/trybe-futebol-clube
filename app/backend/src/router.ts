import express from 'express';
import { postLogin } from './database/controller/login';

const router = express.Router();

router
  .route('/login')
  .post(postLogin);

export default router;
