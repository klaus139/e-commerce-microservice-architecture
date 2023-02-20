"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appEvents = void 0;
const product_service_1 = __importDefault(require("../services/product-service"));
const appEvents = (app) => {
    const service = new product_service_1.default();
    app.use('/app-event', async (req, res, next) => {
        const { payload } = req.body;
        console.log('**========= Product service received event =======**');
        //console.log(payload)
        return res.status(200).json(payload);
    });
};
exports.appEvents = appEvents;
