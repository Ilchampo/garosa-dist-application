import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

import { RoutePoint } from './RoutePoint';

export interface IRoute {
    id?: number;
    supervisorId?: number;
    distributorId?: number;
    routeTitle?: string;
    routeDescription?: string;
    startTime?: Date;
    endTime?: Date;
    createdOn?: Date;
    updatedOn?: Date;
    deleted?: boolean;
}

export const Route = sequelize.define(
    'Route',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        routeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        routeDescription: {
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
        tableName: 'route',
        timestamps: false,
    }
);

Route.hasMany(RoutePoint, {
    foreignKey: 'routeId',
    sourceKey: 'id',
});
RoutePoint.belongsTo(Route, { foreignKey: 'routeId', targetKey: 'id' });
