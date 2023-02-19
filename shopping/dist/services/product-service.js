"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const utils_1 = require("../utils");
const app_errors_1 = require("../utils/app-errors");
// All Business logic will be here
class ProductService {
    repository;
    constructor() {
        this.repository = new database_1.ProductRepository();
    }
    async CreateProduct(productInputs) {
        try {
            const productResult = await this.repository.CreateProduct(productInputs);
            return (0, utils_1.FormateData)(productResult);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async GetProducts() {
        try {
            const products = await this.repository.Products();
            let categories = {};
            products.map(({ type }) => {
                categories[type] = type;
            });
            return (0, utils_1.FormateData)({
                products,
                categories: Object.keys(categories),
            });
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async GetProductDescription(productId) {
        try {
            const product = await this.repository.FindById(productId);
            return (0, utils_1.FormateData)(product);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async GetProductsByCategory(category) {
        try {
            const products = await this.repository.FindByCategory(category);
            return (0, utils_1.FormateData)(products);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async GetSelectedProducts(selectedIds) {
        try {
            const products = await this.repository.FindSelectedProducts(selectedIds);
            return (0, utils_1.FormateData)(products);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async GetProductById(productId) {
        try {
            return await this.repository.FindById(productId);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
}
exports.default = ProductService;
