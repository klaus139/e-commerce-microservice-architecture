"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const models_1 = require("../models");
const app_errors_1 = require("../../utils/app-errors");
//Dealing with data base operations
class ProductRepository {
    async CreateProduct({ name, desc, type, unit, price, available, suplier, banner }) {
        try {
            const product = new models_1.ProductModel({
                name, desc, type, unit, price, available, suplier, banner
            });
            const productResult = await product.save();
            return productResult;
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Product', true, '', true);
        }
    }
    async Products() {
        try {
            return await models_1.ProductModel.find();
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Products', true, '', true);
        }
    }
    async FindById(id) {
        try {
            return await models_1.ProductModel.findById(id);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product', true, '', true);
        }
    }
    async FindByCategory(category) {
        try {
            const products = await models_1.ProductModel.find({ type: category });
            return products;
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Category', true, '', true);
        }
    }
    async FindSelectedProducts(selectedIds) {
        try {
            const products = await models_1.ProductModel.find().where('_id').in(selectedIds.map((_id) => _id)).exec();
            return products;
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product', true, '', true);
        }
    }
}
exports.ProductRepository = ProductRepository;
