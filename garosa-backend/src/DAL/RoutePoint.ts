import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

export interface IRoutePoint {
    id?: number;
    routeId?: number;
    pointId?: number;
    reportTitle?: string;
    reportDescription?: string;
    status?: number;
    imageOne?: string;
    imageTwo?: string;
    imageThree?: string;
    startTime?: Date;
    endTime?: Date;
    createdOn?: Date;
    updatedOn?: Date;
    deleted?: boolean;
}

export const RoutePoint = sequelize.define(
    'RoutePoint',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        reportTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reportDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imageOne: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageTwo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageThree: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
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
        tableName: 'route_point',
        timestamps: false,
    }
);
