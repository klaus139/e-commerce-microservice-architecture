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
    async GetCart(_id) {
        try {
            const cartItems = await this.repository.Cart(_id);
            return FormateData(cartItems);
        }
        catch (err) {
            throw err;
        }
    }
    async PlaceOrder(userInput) {
        const { _id, txnNumber } = userInput;
        // Verify the txn number with payment logs
        try {
            const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
            return FormateData(orderResult);
        }
        catch (err) {
            throw new app_errors_1.APIError("API Error", app_errors_1.STATUS_CODES.INTERNAL_ERROR, "Data Not found", true, "", true);
        }
    }
    async GetOrders(customerId) {
        try {
            const orders = await this.repository.Orders(customerId);
            return FormateData(orders);
        }
        catch (err) {
            throw new app_errors_1.APIError("API Error", app_errors_1.STATUS_CODES.INTERNAL_ERROR, "Data Not found", true, "", true);
        }
    }
    async ManageCart(customerId, item, qty, isRemove) {
        try {
            const cartResult = await this.repository.AddCartItem(customerId, item, qty, isRemove);
            return FormateData(cartResult);
        }
        catch (err) {
            throw err;
        }
    }
    async SubscribeEvents(payload) {
        // payload = JSON.parse(JSON.stringify(payload));
        payload = JSON.parse(payload);
        const { event, data } = payload;
        const { userId, product, qty } = data;
        switch (event) {
            case "ADD_TO_CART":
                this.ManageCart(userId, product, qty, false);
                break;
            case "REMOVE_FROM_CART":
                this.ManageCart(userId, product, qty, true);
                break;
            default:
                break;
        }
    }
    async GetOrderPayload(userId, order, event) {
        if (order) {
            const payload = {
                event: event,
                data: { userId, order },
            };
            return payload;
        }
        else {
            return FormateData({ error: "No Order is avalilable" });
        }
    }
}
exports.default = ShoppingService;
