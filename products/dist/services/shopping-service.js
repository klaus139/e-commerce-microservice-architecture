"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_errors_1 = require("../utils/app-errors");
const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");
// All Business logic will be here
class ShoppingService {
    repository;
    constructor() {
        this.repository = new ShoppingRepository();
    }
    async PlaceOrder(userInput) {
        const { _id, txnNumber } = userInput;
        // Verify the txn number with payment logs
        try {
            const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
            return FormateData(orderResult);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async GetOrders(customerId) {
        try {
            const orders = await this.repository.Orders(customerId);
            return FormateData(orders);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
}
exports.default = ShoppingService;
