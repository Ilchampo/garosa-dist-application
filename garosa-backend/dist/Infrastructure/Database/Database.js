"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const Database_config_1 = require("./Database.config");
const databaseConfiguration = (0, Database_config_1.DatabaseConfiguration)();
const sequelizeConfiguration = {
    username: databaseConfiguration.GetUsername(),
    password: databaseConfiguration.GetPassword(),
    database: databaseConfiguration.GetDatabase(),
    host: databaseConfiguration.GetHost(),
    port: databaseConfiguration.GetPort(),
    dialect: databaseConfiguration.GetDialect(),
    logging: false,
};
exports.sequelize = new sequelize_1.Sequelize(sequelizeConfiguration);
