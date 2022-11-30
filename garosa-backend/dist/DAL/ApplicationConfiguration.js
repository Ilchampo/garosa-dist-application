"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationConfiguration = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../Infrastructure/Database/Database");
exports.ApplicationConfiguration = Database_1.sequelize.define('ApplicationConfiguration', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    language: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    maxRadius: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    maxPointsPerRoute: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    updatedOn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'application_configuration',
    timestamps: false,
});
