import * as vf from '../Helpers/ValidateFields';
import { User, IUser } from '../DAL/User';
import { Response } from '../DAL/Response';

export async function GetAllUsers(): Promise<Response> {
    try {
        const users = await User.findAll({ where: { deleted: false } });
        if (!users) {
            return new Response(200, 'Users not found', null);
        }
        return new Response(200, 'All users retrieved successfully', users);
    } catch (error) {
        return new Response(500, 'Error while retrieving all users', error);
    }
}

export async function GetAllUsersByRole(request: number): Promise<Response> {
    if (vf.IsNumeric(request)) {
        try {
            const users = await User.findAll({ where: { deleted: false, roleId: request } });
            if (!users) {
                return new Response(200, 'Users not found', null);
            }
            return new Response(200, 'All users retrieved successfully', users);
        } catch (error) {
            return new Response(500, 'Error while retrieving all users by role', error);
        }
    }
    return new Response(400, 'Failed to retrieved users by role due invalid field', null);
}

export async function GetUserById(request: number): Promise<Response> {
    if (vf.IsAlpha(request)) {
        try {
            const user = await User.findOne({ where: { deleted: false, id: request } });
            if (!user) {
                return new Response(200, 'User not found', null);
            }
            return new Response(200, 'User retrieved successfully', user);
        } catch (error) {
            return new Response(500, 'Error while retrieving an user by id', error);
        }
    }
    return new Response(400, 'Failed to retrieved user by id due invalid field', null);
}

export async function CreateUser(request: IUser): Promise<Response> {
    if (vf.IsAlpha(request.firstName) && vf.IsAlpha(request.lastName)) {
        if (vf.IsEmail(request.email)) {

        }
    }
    return new Response(400, 'Failed to create user due invalid field', null);
}

export async function EditUser(request: number): Promise<Response> {
    try {
    } catch (error) {
        return new Response(500, 'Error while editing an user', error);
    }
}

export async function DeleteUser(request: number): Promise<Response> {
    try {
    } catch (error) {
        return new Response(500, 'Error while deleting an user', error);
    }
}
