"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../Infrastructure/Database/Database");
const UserAccess_1 = require("./UserAccess");
const Log_1 = require("./Log");
exports.User = Database_1.sequelize.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hash: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
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
    tableName: 'user',
    timestamps: false,
});
exports.User.hasMany(UserAccess_1.UserAccess, {
    foreignKey: 'userId',
    sourceKey: 'id',
});
UserAccess_1.UserAccess.belongsTo(exports.User, { foreignKey: 'userId', targetKey: 'id' });
exports.User.hasMany(Log_1.Log, {
    foreignKey: 'userId',
    sourceKey: 'id',
});
Log_1.Log.belongsTo(exports.User, { foreignKey: 'userId', targetKey: 'id' });
