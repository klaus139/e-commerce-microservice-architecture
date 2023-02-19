"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const database_1 = require("./database");
const express_app_1 = require("./express-app");
const StartServer = async () => {
    const app = (0, express_1.default)();
    await (0, database_1.databaseConnection)();
    await (0, express_app_1.expressApp)(app);
    app.listen(config_1.PORT, () => {
        console.log(`listening to port ${config_1.PORT}`);
    })
        .on('error', (err) => {
        console.log(err);
        process.exit();
    });
};
StartServer();
