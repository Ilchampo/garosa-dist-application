"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBetweenDates = exports.IsNumeric = exports.IsAlphanumeric = exports.IsAlpha = void 0;
const validator_1 = __importDefault(require("validator"));
const IsAlpha = (value) => {
    if (value) {
        const trimmed = value.trim();
        const words = trimmed.split(' ');
        let isValid = true;
        for (let i = 0; i < words.length; i++) {
            isValid = isValid && validator_1.default.isAlpha(words[i]);
        }
        return isValid;
    }
    return false;
};
exports.IsAlpha = IsAlpha;
const IsAlphanumeric = (value) => {
    if (value) {
        const trimmed = value.trim();
        const words = trimmed.split(' ');
        let isValid = true;
        for (let i = 0; i < words.length; i++) {
            isValid = isValid && validator_1.default.isAlphanumeric(words[i]);
        }
        return isValid;
    }
    return false;
};
exports.IsAlphanumeric = IsAlphanumeric;
const IsNumeric = (value) => {
    return value ? validator_1.default.isNumeric(value) : false;
};
exports.IsNumeric = IsNumeric;
const IsBetweenDates = (value) => {
    const startDate = new Date('2009-12-31');
    const endDate = new Date('2022-01-01');
    return value ? new Date(`${value}-01-01`) < endDate && new Date(`${value}-01-01`) > startDate : false;
};
exports.IsBetweenDates = IsBetweenDates;
