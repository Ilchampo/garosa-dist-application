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
        const users = await User.findAll({ where: { deleted: false }, attributes: { exclude: ['password'] } });
        if (!users) {
            return new Response(204, 'Users not found', null);
        }
        return new Response(200, 'Retrieved user successfully', users);
    } catch (error) {
        return new Response(500, 'Failed to retrieve users', error);
    }
}

export async function GetAllUsersByRole(request: any): Promise<Response> {
    const roleId = vf.IsNumeric(request.role) ? parseInt(request.role) : null;
    if (roleId) {
        if (
            roleId === enums.Roles.ADMINISTRATOR ||
            roleId === enums.Roles.SUPERVISOR ||
            roleId === enums.Roles.DISTRIBUTOR
        ) {
            try {
                // TODO - Query User Access to then get user data
                const users = await User.findAll({ where: { deleted: false }, attributes: { exclude: ['password'] } });
                if (!users) {
                    return new Response(204, 'Users not found', null);
                }
                return new Response(200, 'Retrieved user successfully', users);
            } catch (error) {
                return new Response(500, 'Failed to retrieve users', error);
            }
        }
    }
    return new Response(404, 'Failed to retrieve user', null);
}

export async function GetUserById(request: any): Promise<Response> {
    const userId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (userId) {
        try {
            const user = await User.findOne({
                where: { id: userId, deleted: false },
                attributes: { exclude: ['password'] },
            });
            if (!user) {
                return new Response(204, 'User not found', null);
            }
            return new Response(200, 'Retrieved user successfully', user);
        } catch (error) {
            return new Response(500, 'Failed to retrieve user', error);
        }
    }
    return new Response(404, 'Failed to retrieve user', null);
}

export async function CreateUser(request: { role: any; data: IUser }): Promise<Response> {
    const roleId = vf.IsNumeric(request.role) ? parseInt(request.role) : null;
    if (roleId) {
        if (roleId === enums.Roles.SUPERVISOR || roleId === enums.Roles.DISTRIBUTOR) {
            if (
                vf.IsAlpha(request.data.firstName) &&
                vf.IsAlpha(request.data.lastName) &&
                vf.IsEmail(request.data.email)
            ) {
                try {
                    const user = await User.findOne({
                        where: { email: request.data.email },
                        attributes: { exclude: ['password'] },
                    });
                    if (user === null) {
                        const password = gen.GeneratePassword();
                        const salt = await bcrypt.genSalt();
                        const encrypted = await bcrypt.hash(password, salt);

                        const newUser = await User.create({
                            firstName: request.data.firstName,
                            lastName: request.data.lastName,
                            email: request.data.email,
                            password: request.data.password,
                            updatedOn: Date.now(),
                            createdOn: Date.now(),
                            deleted: false,
                        });

                        const userAccess: IUserAccess = {
                            userId: newUser.dataValues.id,
                            roleId: roleId,
                        };

                        const linkedUserAccess = await UserAccess.CreateUserAccess(userAccess);
                        if (linkedUserAccess.status !== 200) {
                            return new Response(
                                linkedUserAccess.status,
                                linkedUserAccess.message,
                                linkedUserAccess.payload
                            );
                        }
                        return new Response(200, 'Created user successfully', {
                            email: newUser.dataValues.email,
                            password: password,
                        });
                    }
                } catch (error) {
                    return new Response(500, 'Failed to create user', error);
                }
            }
        }
    }
    return new Response(404, 'Failed to create user', null);
}

export async function EditUser(request: { id: any; data: IUser }): Promise<Response> {
    const userId = vf.IsNumeric(request.id) ? parseInt(request.id) : null;
    if (userId) {
        try {
            const user = await User.findOne({
                where: { id: userId, deleted: false },
                attributes: { exclude: ['password'] },
            });
            if (user) {
                user.set({
                    firstName: request.data.firstName,
                    lastName: request.data.lastName,
                    updatedOn: Date.now(),
                });
                await user.save();
                return new Response(200, 'Updated user successfully', user);
            }
        } catch (error) {
            return new Response(500, 'Failed to update user', error);
        }
    }
    return new Response(404, 'Failed to update user', null);
}

export async function ChangePassword(request: {
    id: any;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}): Promise<Response> {
    const userId = vf.IsNumeric(request.id) ? parseInt(request.id) : null;
    if (userId) {
        if (request.newPassword === request.confirmPassword) {
            try {
                const user = await User.findOne({ where: { id: userId, deleted: false } });
                if (user) {
                    const isMatch = await bcrypt.compare(request.currentPassword, user.dataValues.password);
                    if (isMatch) {
                        const salt = await bcrypt.genSalt();
                        const encrypted = await bcrypt.hash(request.newPassword, salt);
                        user.set({
                            password: encrypted,
                            updatedOn: Date.now(),
                        });
                        await user.save();
                        return new Response(200, 'Updated user successfully', user);
                    }
                }
            } catch (error) {
                return new Response(500, 'Failed to update user', error);
            }
        }
    }
    return new Response(404, 'Failed to update user', null);
}

export async function RecoverPassword(request: any): Promise<Response> {
    const userId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (userId) {
        try {
            const user = await User.findOne({
                where: { id: userId, deleted: false },
                attributes: { exclude: ['password'] },
            });
            if (user) {
                const password = gen.GeneratePassword();
                const salt = await bcrypt.genSalt();
                const encrypted = await bcrypt.hash(password, salt);
                user.set({
                    password: encrypted,
                    updatedOn: Date.now(),
                });
                await user.save();
                return new Response(200, 'Updated user successfully', {
                    email: user.dataValues.email,
                    password: password,
                });
            }
        } catch (error) {
            return new Response(500, 'Failed to update user', error);
        }
    }
    return new Response(404, 'Failed to update user', null);
}

export async function DeleteUser(request: any): Promise<Response> {
    const userId = vf.IsNumeric(request) ? parseInt(request) : null;
    if (userId) {
        try {
            const user = await User.findOne({
                where: { id: userId, deleted: false },
                attributes: { exclude: ['password'] },
            });
            if (user) {
                // TODO - Delete Log, User Access and Route where FK is user id
                user.set({
                    updatedOn: Date.now(),
                    deleted: false,
                });
                await user.save();
                return new Response(200, 'Deleted user successfully', user);
            }
        } catch (error) {
            return new Response(500, 'Failed to delete user', error);
        }
    }
    return new Response(404, 'Failed to delete user', null);
}
