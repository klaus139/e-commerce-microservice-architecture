"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRepository = void 0;
const app_errors_1 = require("../../utils/app-errors");
const models_1 = require("../models");
const uuid_1 = require("uuid");
const app_errors_2 = require("../../utils/app-errors");
//Dealing with data base operations
class ShoppingRepository {
    // payment
    async Orders(customerId) {
        try {
            const orders = await models_1.OrderModel.find({ customerId }).populate('items.product');
            return orders;
        }
        catch (err) {
            throw new app_errors_2.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Orders', true, '', true);
        }
    }
    async CreateNewOrder(customerId, txnId) {
        //check transaction for payment Status
        try {
            const profile = await models_1.CustomerModel.findById(customerId).populate('cart.product');
            if (profile) {
                let amount = 0;
                let cartItems = profile.cart;
                if (cartItems.length > 0) {
                    //process Order
                    cartItems.map((item) => {
                        amount += parseInt(item.product.price) * parseInt(item.unit);
                    });
                    const orderId = (0, uuid_1.v4)();
                    const order = new models_1.OrderModel({
                        orderId,
                        customerId,
                        amount,
                        txnId,
                        status: 'received',
                        items: cartItems
                    });
                    profile.cart = [];
                    order.populate('items.product');
                    const orderResult = await order.save();
                    profile.orders.push(orderResult);
                    await profile.save();
                    return orderResult;
                }
            }
            return {};
        }
        catch (err) {
            throw new app_errors_2.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Category', true, '', true);
        }
    }
}
exports.ShoppingRepository = ShoppingRepository;
