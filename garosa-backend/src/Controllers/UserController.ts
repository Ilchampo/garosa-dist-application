import { Request, Response } from 'express';
import { IUser } from '../DAL/User';
import * as User from '../BAL/bUser';

export async function GetAllUsers(req: Request, res: Response): Promise<Response> {
    const result = await User.GetAllUsers();
    return res.status(result.status).json({msg: result.message, payload: result.payload});
}

// export async function GetAllUsersByRole(req: Request, res: Response): Promise<Response> {
//     const roleId = req.query.roleId;
//     const result = await User.GetAllUsersByRole(roleId);
//     return res.status(result.status).json({msg: result.message, payload: result.payload});
// }

export async function GetUserById(req: Request, res: Response): Promise<Response> {
    const userId = req.query.id;
    const result = await User.GetUserById(userId);
    return res.status(result.status).json({msg: result.message, payload: result.payload});
}

export async function CreateUser(req: Request, res: Response): Promise<Response> {
    const user: IUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    };
    const roleId = req.body.roleId;
    const result = await User.CreateUser(user);
    return res.status(result.status).json({msg: result.message, payload: result.payload});
}
