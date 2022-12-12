import { Router } from 'express';
import * as UserController from '../Controllers/UserController';

const userRouter = Router();

// @routes  GET /users/all
// @descri  Get all the users of the application
// @params  None
// @access  Administrator, Supervisor, Distributor
userRouter.get('/all', UserController.GetAllUsers);

// @routes  GET /users/user?id
// @descri  Get user by Id
// @params  {id}: User Id
// @access  Administrator, Supervisor, Distributor
userRouter.get('/user', UserController.GetUserById);

// @routes  POST /users/create/
// @descri  Create an user
// @params  None
// @access  Administrator
userRouter.post('/create', UserController.CreateUser);

export default userRouter;
