"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appEvents = void 0;
const shopping_service_1 = __importDefault(require("../services/shopping-service"));
const appEvents = (app) => {
    const service = new shopping_service_1.default();
    app.use('/app-events', async (req, res, next) => {
        const { payload } = req.body;
        service.SubscribeEvents(payload);
        console.log("========= Shopping service recieved Events===========");
        return res.status(200).json(payload);
    });
};
exports.appEvents = appEvents;
