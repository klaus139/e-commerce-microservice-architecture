"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopping = void 0;
const shopping_service_1 = __importDefault(require("../services/shopping-service"));
const customer_service_1 = __importDefault(require("../services/customer-service"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const shopping = (app) => {
    const service = new shopping_service_1.default();
    const userService = new customer_service_1.default();
    app.post('/shopping/order', auth_1.default, async (req, res, next) => {
        const { _id } = req.user;
        const { txnNumber } = req.body;
        try {
            const { data } = await service.PlaceOrder({ _id, txnNumber });
            return res.status(200).json(data);
        }
        catch (err) {
            next(err);
        }
    });
    app.get('/shopping/orders', auth_1.default, async (req, res, next) => {
        const { _id } = req.user;
        try {
            const { data } = await userService.GetShopingDetails(_id);
            return res.status(200).json(data.orders);
        }
        catch (err) {
            next(err);
        }
    });
    app.get('/shopping/cart', auth_1.default, async (req, res, next) => {
        const { _id } = req.user;
        try {
            const { data } = await userService.GetShopingDetails(_id);
            return res.status(200).json(data.cart);
        }
        catch (err) {
            next(err);
        }
    });
};
exports.shopping = shopping;
