"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customer = void 0;
const customer_service_1 = __importDefault(require("../services/customer-service"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const customer = (app) => {
    const service = new customer_service_1.default();
    app.post("/signup", async (req, res, next) => {
        try {
            const { email, password, phone } = req.body;
            const { data } = await service.SignUp({ email, password, phone });
            return res.json(data);
        }
        catch (err) {
            next(err);
        }
    });
    app.post("/login", async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const { data } = await service.SignIn({ email, password });
            return res.json(data);
        }
        catch (err) {
            next(err);
        }
    });
    app.post("/address", auth_1.default, async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { street, postalCode, city, country } = req.body;
            const { data } = await service.AddNewAddress(_id, {
                street,
                postalCode,
                city,
                country,
            });
            return res.json(data);
        }
        catch (err) {
            next(err);
        }
    });
    app.get("/profile", auth_1.default, async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { data } = await service.GetProfile({ _id });
            return res.json(data);
        }
        catch (err) {
            next(err);
        }
    });
    app.get("/shoping-details", auth_1.default, async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { data } = await service.GetShopingDetails(_id);
            return res.json(data);
        }
        catch (err) {
            next(err);
        }
    });
    app.get("/wishlist", auth_1.default, async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { data } = await service.GetWishList(_id);
            return res.status(200).json(data);
        }
        catch (err) {
            next(err);
        }
    });
};
exports.customer = customer;
