"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = require("./api");
const error_handler_1 = __importDefault(require("./utils/error-handler"));
const expressApp = async (app) => {
    app.use(express_1.default.json({ limit: '1mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '1mb' }));
    app.use((0, cors_1.default)());
    app.use(express_1.default.static(__dirname + '/public'));
    //listen to event
    (0, api_1.appEvents)(app);
    //api
    (0, api_1.products)(app);
    // error handling
    app.use(error_handler_1.default);
};
exports.expressApp = expressApp;
