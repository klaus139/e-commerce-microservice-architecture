"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appEvents = void 0;
const customer_service_1 = __importDefault(require("../services/customer-service"));
const appEvents = (app) => {
    const service = new customer_service_1.default();
    app.use('/app-event', async (req, res, next) => {
        const { payload } = req.body;
        service.SubscribeEvents(payload);
        console.log('**========= shopping service received event =======**');
        console.log(payload);
        return res.status(200).json(payload);
    });
};
exports.appEvents = appEvents;
