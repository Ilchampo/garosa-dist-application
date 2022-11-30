"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../Infrastructure/Database/Database");
exports.Log = Database_1.sequelize.define('Log', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    logName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    logDescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    logStatus: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    createdOn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'log',
    timestamps: false,
});
