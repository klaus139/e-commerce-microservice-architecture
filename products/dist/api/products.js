"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const product_service_1 = __importDefault(require("../services/product-service"));
const utils_1 = require("../utils");
const auth_1 = __importDefault(require("./middlewares/auth"));
const products = (app) => {
    const service = new product_service_1.default();
    app.post('/product/create', async (req, res, next) => {
        try {
            const { name, desc, type, unit, price, available, suplier, banner } = req.body;
            // validation
            const { data } = await service.CreateProduct({ name, desc, type, unit, price, available, suplier, banner });
            return res.json(data);
        }
        catch (err) {
            next(err);
        }
    });
    app.get('/category/:type', async (req, res, next) => {
        const type = req.params.type;
        try {
            const { data } = await service.GetProductsByCategory(type);
            return res.status(200).json(data);
        }
        catch (err) {
            next(err);
        }
    });
    app.get('/:id', async (req, res, next) => {
        const productId = req.params.id;
        try {
            const { data } = await service.GetProductDescription(productId);
            return res.status(200).json(data);
        }
        catch (err) {
            next(err);
        }
    });
    app.post('/ids', async (req, res, next) => {
        try {
            const { ids } = req.body;
            const products = await service.GetSelectedProducts(ids);
            return res.status(200).json(products);
        }
        catch (err) {
            next(err);
        }
    });
    app.put('/wishlist', auth_1.default, async (req, res, next) => {
        const { _id } = req.user;
        //get payload to send to customer service
        const { data } = await service.GetProductPayload(_id, { productId: req.body._id, qty: 1 }, 'ADD_TO_WISHLIST');
        try {
            (0, utils_1.PublishCustomerEvent)(data);
            return res.status(200).json(data.data.product);
        }
        catch (err) {
        }
    });
    app.delete('/wishlist/:id', auth_1.default, async (req, res, next) => {
        const { _id } = req.user;
        const productId = req.params.id;
        //get payload to send to customer service
        const { data } = await service.GetProductPayload(_id, { productId, qty: 1 }, 'REMOVE_FROM_WISHLIST');
        try {
            (0, utils_1.PublishCustomerEvent)(data);
            return res.status(200).json(data.data.product);
        }
        catch (err) {
            next(err);
        }
    });
    app.put('/cart', auth_1.default, async (req, res, next) => {
        const { _id } = req.user;
        try {
            const { data } = await service.GetProductPayload(_id, { productId: req.body._id, qty: 1 }, 'ADD_TO_CART');
            (0, utils_1.PublishCustomerEvent)(data);
            (0, utils_1.PublishShoppingEvent)(data);
            const response = {
                product: data.data.product,
                unit: data.data.qty
            };
            return res.status(200).json(response);
        }
        catch (err) {
            next(err);
        }
    });
    app.delete('/cart/:id', auth_1.default, async (req, res, next) => {
        const { _id } = req.user;
        const { productId } = req.params.id;
        try {
            const { data } = await service.GetProductPayload(_id, { productId: req.body._id, qty: 1 }, 'REMOVE_FROM_WISHLIST');
            (0, utils_1.PublishCustomerEvent)(data);
            (0, utils_1.PublishShoppingEvent)(data);
            const response = {
                product: data.data.product,
                unit: data.data.qty
            };
            return res.status(200).json(response);
        }
        catch (err) {
            next(err);
        }
    });
    //get Top products and category
    app.get('/', async (req, res, next) => {
        //check validation
        try {
            const { data } = await service.GetProducts();
            return res.status(200).json(data);
        }
        catch (err) {
            next(err);
        }
    });
};
exports.products = products;
