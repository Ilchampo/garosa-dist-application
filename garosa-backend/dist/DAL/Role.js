"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../Infrastructure/Database/Database");
const RolePermission_1 = require("./RolePermission");
const UserAccess_1 = require("./UserAccess");
exports.Role = Database_1.sequelize.define('Role', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    roleName: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    roleDescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdOn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedOn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'role',
    timestamps: false,
});
exports.Role.hasMany(RolePermission_1.RolePermission, {
    foreignKey: 'roleId',
    sourceKey: 'id',
});
RolePermission_1.RolePermission.belongsTo(exports.Role, { foreignKey: 'roleId', targetKey: 'id' });
exports.Role.hasMany(UserAccess_1.UserAccess, {
    foreignKey: 'roleId',
    sourceKey: 'id',
});
UserAccess_1.UserAccess.belongsTo(exports.Role, { foreignKey: 'roleId', targetKey: 'id' });
