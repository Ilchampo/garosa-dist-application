import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

import { RoutePoint } from './RoutePoint';

export interface IPoint {
    id?: number;
    pointName?: string;
    pointDescription?: string;
    createdOn: Date;
    updatedOn: Date;
    deleted: boolean;
}

export const Point = sequelize.define(
    'Point',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        pointCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        pointName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pointDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pointImage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DECIMAL,
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
        tableName: 'point',
        timestamps: false,
    }
);

Point.hasMany(RoutePoint, {
    foreignKey: 'pointId',
    sourceKey: 'id'
});
RoutePoint.belongsTo(Point, { foreignKey: 'pointId', targetKey: 'id' });