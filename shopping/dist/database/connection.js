"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const databaseConnection = async () => {
    try {
        mongoose_1.default.set("strictQuery", false);
        await mongoose_1.default.connect(config_1.DB_URL);
        console.log('Db Connected');
    }
    catch (error) {
        console.log('Error ============');
        console.log(error);
        process.exit(1);
    }
};
exports.databaseConnection = databaseConnection;
