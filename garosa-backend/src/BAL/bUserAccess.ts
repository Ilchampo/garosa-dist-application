import { UserAccess, IUserAccess } from '../DAL/UserAccess';
import { Response } from '../DAL/Response';

import * as enums from '../Helpers/StaticEnums';

export async function CreateUserAccess(request: IUserAccess): Promise<Response> {
    try {
        const newUserAccess = await UserAccess.create({
            userId: request.userId,
            roleId: request.roleId,
            deleted: false,
        });
        return new Response(200, 'User Access created successfully', newUserAccess);
    } catch (error) {
        return new Response(500, 'Error while creating user access', error);
    }
}

export async function AddUserAccess(request: IUserAccess): Promise<Response> {
    const sendRole = typeof request.roleId === 'string' ? parseInt(request.roleId) : enums.Roles.INVALID;
    if (sendRole === enums.Roles.SUPERVISOR || sendRole === enums.Roles.DISTRIBUTOR) {
        try {
            const userAccess = await UserAccess.findOne({ where: {} });
            return new Response(200, 'User Access added successfully', null);
        } catch (error) {
            return new Response(500, 'Error while creating user access', error);
        }
    }
    return new Response(400, 'Failed to create user due invalid field', null);
}
