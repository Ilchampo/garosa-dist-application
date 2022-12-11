import { UserAccess, IUserAccess } from "../DAL/UserAccess";
import { Response } from "../DAL/Response";

export async function CreateUserAccess(request: IUserAccess): Promise<Response> {
    try {
        const newUserAccess = await UserAccess.create({
            userId: request.userId,
            roleId: request.roleId,
            deleted: false
        });
        return new Response(200, 'User Access created successfully', newUserAccess);
    } catch (error) {
        return new Response(500, 'Error while creating user access', error);
    }
}