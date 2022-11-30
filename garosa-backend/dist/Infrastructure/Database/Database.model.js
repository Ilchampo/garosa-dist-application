"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
class Database {
    constructor(username, password, database, host, port, dialect) {
        this.username = username;
        this.password = password;
        this.database = database;
        this.host = host;
        this.port = port;
        this.dialect = dialect;
    }
    GetUsername() {
        return this.username;
    }
    GetPassword() {
        return this.password;
    }
    GetDatabase() {
        return this.database;
    }
    GetHost() {
        return this.host;
    }
    GetPort() {
        return this.port;
    }
    GetDialect() {
        return this.dialect;
    }
}
exports.Database = Database;
