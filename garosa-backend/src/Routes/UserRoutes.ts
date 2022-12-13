import { Router } from 'express';
import * as UserController from '../Controllers/UserController';

const userRouter = Router();

// @routes  GET /users/get/all
// @descri  Get all the users
// @params  None
// @access  Administrator, Supervisor, Distributor
userRouter.get('/get/all', UserController.GetAllUsers);

// @routes  GET /users/get/role?id
// @descri  Get all the users within a role
// @params  {id}: Role Id
// @access  Administrator, Supervisor, Distributor
userRouter.get('/get/role', UserController.GetAllUsersByRole);

// @routes  GET /users/get/user?id
// @descri  Get user
// @params  {id}: User Id
// @access  Administrator, Supervisor, Distributor
userRouter.get('/get/user', UserController.GetUserById);

// @routes  POST /users/create/
// @descri  Create a user
// @params  None
// @access  Administrator
userRouter.post('/create', UserController.CreateUser);

// @routes  POST /users/edit/user?id
// @descri  Edit a user
// @params  {id}: User Id
// @access  Administrator
userRouter.post('/edit/user', UserController.EditUser);

// @routes  POST /users/edit/password?id
// @descri  Update user password
// @params  {id}: User Id
// @access  Administrator, Supervisor, Distributor
userRouter.post('/edit/password', UserController.ChangePassword);

// @routes  POST /users/edit/recover?id
// @descri  Create new user password and update user
// @params  {id}: User Id
// @access  Administrator
userRouter.post('/edit/recover', UserController.RecoverPassword);

// @routes  POST /users/delete/user?id
// @descri  Delete a user
// @params  {id}: User Id
// @access  Administrator
userRouter.post('/delete/user', UserController.DeleteUser);

export default userRouter;
