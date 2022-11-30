import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

import { RolePermission } from './RolePermission';
import { UserAccess } from './UserAccess';

export interface IRole {
    id?: number;
    roleName?: string;
    roleDescription?: string;
    createdOn?: Date;
    updatedOn?: Date;
    deleted?: boolean;
}

export const Role = sequelize.define(
    'Role',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        roleName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        roleDescription: {
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
        tableName: 'role',
        timestamps: false,
    }
);

Role.hasMany(RolePermission, {
    foreignKey: 'roleId',
    sourceKey: 'id',
});
RolePermission.belongsTo(Role, { foreignKey: 'roleId', targetKey: 'id' });

Role.hasMany(UserAccess, {
    foreignKey: 'roleId',
    sourceKey: 'id',
});
UserAccess.belongsTo(Role, { foreignKey: 'roleId', targetKey: 'id' });
