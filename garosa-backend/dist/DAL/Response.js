"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
class Response {
    constructor(status, message, payload) {
        this.status = status;
        this.message = message;
        this.payload = payload || null;
    }
}
exports.Response = Response;
