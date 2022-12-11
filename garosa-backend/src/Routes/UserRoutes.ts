import { Router } from 'express';
import * as UserController from '../Controllers/UserController';

const userRouter = Router();

userRouter.get('/all', UserController.GetAllUsers);

userRouter.get('/user', UserController.GetUserById);

userRouter.post('/create', UserController.CreateUser);

export default userRouter;