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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApplicationConfiguration = exports.GetApplicationConfiguration = void 0;
const vf = __importStar(require("../Helpers/ValidateFields"));
const ApplicationConfiguration_1 = require("../DAL/ApplicationConfiguration");
const Response_1 = require("../DAL/Response");
function GetApplicationConfiguration() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const appConfig = yield ApplicationConfiguration_1.ApplicationConfiguration.findOne({
                where: { id: 1 },
            });
            if (!appConfig) {
                return new Response_1.Response(400, 'Application configuration not found', null);
            }
            return new Response_1.Response(200, 'Application configuration retrieved successfully', appConfig);
        }
        catch (error) {
            return new Response_1.Response(500, 'Error while retrieving application configuration', error);
        }
    });
}
exports.GetApplicationConfiguration = GetApplicationConfiguration;
function UpdateApplicationConfiguration(request) {
    return __awaiter(this, void 0, void 0, function* () {
        if (vf.IsAlpha(request.language)) {
            if (vf.IsNumeric(request.maxRadius) && vf.IsNumeric(request.maxPointsPerRoute)) {
                const appConfig = yield ApplicationConfiguration_1.ApplicationConfiguration.findOne({
                    where: { id: 1 },
                });
                if (!appConfig) {
                    return new Response_1.Response(400, 'Application configuration not found', null);
                }
                appConfig.set({
                    language: request.language,
                    maxRadius: request.maxRadius,
                    maxPointsPerRoute: request.maxPointsPerRoute,
                    updatedOn: Date.now(),
                });
                yield appConfig.save();
                return new Response_1.Response(200, 'Application configuration saved successfully', appConfig);
            }
        }
        return new Response_1.Response(400, 'Failed to update application configuration due invalid fields', request);
    });
}
exports.UpdateApplicationConfiguration = UpdateApplicationConfiguration;
