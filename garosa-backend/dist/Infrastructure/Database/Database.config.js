"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfiguration = void 0;
const dotenv = __importStar(require("dotenv"));
const Database_model_1 = require("./Database.model");
const Application_config_1 = require("../../Application.config");
dotenv.config();
const DatabaseConfiguration = () => {
    switch (Application_config_1.appConfiguration.app.environment) {
        case 'development':
            const databaseConfiguration = new Database_model_1.Database(process.env.DB_USERNAME || 'missingUsername', process.env.DB_PASSWORD || 'missingPassword', process.env.DB_DATABASE || 'missingDatabase', process.env.DB_HOST || 'missingHost', process.env.DB_PORT || 'missingPort', process.env.DB_DIALECT || 'missingDialect');
            return databaseConfiguration;
    }
    return new Database_model_1.Database('missingUsername', 'missingPassword', 'missingDatabase', 'missingHost', 'missingPort', 'missingDialect');
};
exports.DatabaseConfiguration = DatabaseConfiguration;
