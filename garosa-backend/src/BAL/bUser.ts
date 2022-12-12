import bcrypt from 'bcrypt';

import { Response } from '../DAL/Response';
import { User, IUser } from '../DAL/User';
import { IUserAccess } from '../DAL/UserAccess';

import * as vf from '../Helpers/ValidateFields';
import * as gen from '../Helpers/Generators';
import * as enums from '../Helpers/StaticEnums';
import * as UserAccess from './bUserAccess';

export async function GetAllUsers(): Promise<Response> {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password', 'hash'] },
            where: { deleted: false },
        });
        if (!users) {
            return new Response(200, 'Users not found', null);
        }
        return new Response(200, 'All users retrieved successfully', users);
    } catch (error) {
        return new Response(500, 'Error while retrieving all users', error);
    }
}

// export async function GetAllUsersByRole(request: any): Promise<Response> {
//     if (vf.IsNumeric(request)) {
//         try {
//             const users = await User.findAll({
//                 attributes: { exclude: ['password', 'hash'] },
//                 where: { roleId: request, deleted: false },
//             });
//             if (!users) {
//                 return new Response(200, 'Users not found', null);
//             }
//             return new Response(200, 'All users retrieved successfully', users);
//         } catch (error) {
//             return new Response(500, 'Error while retrieving all users by role', error);
//         }
//     }
//     return new Response(400, 'Failed to retrieved users by role due invalid field', null);
// }

export async function GetUserById(request: any): Promise<Response> {
    if (typeof request === 'string') {
        if (vf.IsNumeric(request)) {
            try {
                const user = await User.findOne({
                    attributes: { exclude: ['password', 'hash'] },
                    where: { id: request, deleted: false },
                });
                if (!user) {
                    return new Response(200, 'User not found', null);
                }
                return new Response(200, 'User retrieved successfully', user);
            } catch (error) {
                return new Response(500, 'Error while retrieving an user by id', error);
            }
        }
    }
    return new Response(400, 'Failed to retrieved user by id due invalid field', null);
}

export async function CreateUser(request: { user: IUser; role: any }): Promise<Response> {
    const sendRole = typeof request.role === 'string' ? parseInt(request.role) : enums.Roles.INVALID;
    if (sendRole === enums.Roles.SUPERVISOR || sendRole === enums.Roles.DISTRIBUTOR) {
        if (vf.IsAlpha(request.user.firstName) && vf.IsAlpha(request.user.lastName)) {
            if (vf.IsEmail(request.user.email)) {
                try {
                    const user = await User.findOne({
                        attributes: { exclude: ['password', 'hash'] },
                        where: { email: request.user.email, deleted: false },
                    });
                    if (user) {
                        return new Response(400, 'User already exists!', user);
                    }

                    const password = gen.GeneratePassword();
                    const hash = await bcrypt.genSalt(10);
                    const encryptedPassword = await bcrypt.hash(password, hash);

                    const newUser = await User.create({
                        firstName: request.user.firstName,
                        lastName: request.user.lastName,
                        email: request.user.email,
                        password: encryptedPassword,
                        deleted: false,
                    });

                    const userAccess: IUserAccess = {
                        userId: newUser.dataValues.id,
                        roleId: sendRole,
                    };

                    const newUserAccess = await UserAccess.CreateUserAccess(userAccess);
                    if (newUserAccess.status !== 200) {
                        return new Response(newUserAccess.status, newUserAccess.message, newUserAccess.payload);
                    }

                    return new Response(200, 'User created successfully', {
                        email: request.user.email,
                        password: password,
                    });
                } catch (error) {
                    console.log(error);
                    return new Response(500, 'Error while creating an user', error);
                }
            }
        }
    }
    return new Response(400, 'Failed to create user due invalid field', null);
}

// export async function EditUser(request: {id: any, data: IUser}): Promise<Response> {
//     try {

//     } catch (error) {
//         return new Response(500, 'Error while editing an user', error);
//     }
// }

// export async function ChangePassword(request: {
//     id: any;
//     currentPassword: string;
//     newPassword: string;
//     confirmPassword: string;
// }): Promise<Response> {
//     if (vf.IsNumeric(request.id)) {
//         if (
//             vf.IsPassword(request.currentPassword) &&
//             vf.IsPassword(request.newPassword) &&
//             vf.IsPassword(request.confirmPassword)
//         ) {
//             let user = await User.findOne({ where: { id: request.id, deleted: false } });
//             if(user) {
//                 if (request.newPassword === request.confirmPassword) {
//                     const isPasswordCorrect = await bcrypt.compare(request.currentPassword, user.hash);
//                 }
//             }
//         }
//     }
// }

// export async function RecoverPassword(request: IUser): Promise<Response> {
//     try {
//     } catch (error) {
//         return new Response(500, 'Error while recovering password', error);
//     }
// }

// export async function DeleteUser(request: any): Promise<Response> {
//     try {
//     } catch (error) {
//         return new Response(500, 'Error while deleting an user', error);
//     }
// }
