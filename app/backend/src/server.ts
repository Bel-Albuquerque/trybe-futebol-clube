import { Request, Response } from 'express';
import Joi from 'joi';
import { App } from './app';
import 'dotenv/config';
import { generateToken } from './database/middlewares/tokenValidation';
import User from './database/models/user';

const PORT = process.env.PORT || 3001;

const newApp = new App();
newApp.start(PORT);
const { app } = newApp;

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

app.route('/login')
  .post(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(400).json({ message: 'Email or password invalid' });
    }
    const { id, username, role } = user;
    const token = generateToken({ id, username, role });
    return res.status(200).json({ user: { id, username, role, email }, token });
  });
