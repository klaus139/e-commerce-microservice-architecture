"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const product_service_1 = __importDefault(require("../services/product-service"));
const customer_service_1 = __importDefault(require("../services/customer-service"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const products = (app) => {
    const service = new product_service_1.default();
    const customerService = new customer_service_1.default();
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
        try {
            const product = await service.GetProductById(req.body._id);
            const wishList = await customerService.AddToWishlist(_id, product);
            return res.status(200).json(wishList);
        }
        catch (err) {
        }
    });
    app.delete('/wishlist/:id', auth_1.default, async (req, res, next) => {
        const { _id } = req.user;
        const productId = req.params.id;
        try {
            const product = await service.GetProductById(productId);
            const wishlist = await customerService.AddToWishlist(_id, product);
            return res.status(200).json(wishlist);
        }
        catch (err) {
            next(err);
        }
    });
    app.put('/cart', auth_1.default, async (req, res, next) => {
        const { _id, qty } = req.body;
        try {
            const product = await service.GetProductById(_id);
            const result = await customerService.ManageCart(req.user._id, product, qty, false);
            return res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    });
    app.delete('/cart/:id', auth_1.default, async (req, res, next) => {
        const { _id } = req.user;
        try {
            const product = await service.GetProductById(req.params.id);
            const result = await customerService.ManageCart(_id, product, 0, true);
            return res.status(200).json(result);
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
