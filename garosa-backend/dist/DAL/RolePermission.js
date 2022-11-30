"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermission = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../Infrastructure/Database/Database");
exports.RolePermission = Database_1.sequelize.define('RolePermission', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    permissionName: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    permissionDefault: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    tableName: 'role_permission',
    timestamps: false,
});
