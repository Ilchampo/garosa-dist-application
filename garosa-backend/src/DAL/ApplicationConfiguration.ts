import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

export interface IApplicationConfiguration {
    id?: number;
    language?: string;
    maxRadius?: number;
    maxPointsPerRoute?: number;
    updatedOn?: Date;
}

export const ApplicationConfiguration = sequelize.define(
    'ApplicationConfiguration',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        maxRadius: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        maxPointsPerRoute: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        updatedOn: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'application_configuration',
        timestamps: false,
    }
);
