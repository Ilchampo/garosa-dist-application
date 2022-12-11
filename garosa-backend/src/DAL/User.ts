import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

import { UserAccess } from './UserAccess';
import { Log } from './Log';
import { Route } from './Route';

export interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    createdOn?: Date;
    updatedOn?: Date;
    deleted?: boolean;
}

export const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdOn: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedOn: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: 'user',
        timestamps: false,
    }
);

User.hasMany(UserAccess, {
    foreignKey: 'userId',
    sourceKey: 'id',
});
UserAccess.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

User.hasMany(Log, {
    foreignKey: 'userId',
    sourceKey: 'id',
});
Log.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

User.hasMany(Route, {
    foreignKey: 'supervisorId',
    sourceKey: 'id',
});
Route.belongsTo(User, { foreignKey: 'supervisorId', targetKey: 'id' });

User.hasMany(Route, {
    foreignKey: 'distributorId',
    sourceKey: 'id',
});
Route.belongsTo(User, { foreignKey: 'distributorId', targetKey: 'id' });
