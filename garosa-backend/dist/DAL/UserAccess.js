"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccess = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../Infrastructure/Database/Database");
exports.UserAccess = Database_1.sequelize.define('UserAccess', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    tableName: 'user_access',
    timestamps: false,
});
