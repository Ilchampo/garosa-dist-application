import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

export interface ILog {
    id?: number;
    userId?: number;
    logName?: string;
    logDescription?: string;
    logSource?: string;
    logStatus?: number;
    createdOn?: Date;
    updatedOn?: Date;
    deleted?: boolean;
}

export const Log = sequelize.define(
    'Log',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        logName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logSource: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logStatus: {
            type: DataTypes.INTEGER,
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
        tableName: 'log',
        timestamps: false,
    }
);
