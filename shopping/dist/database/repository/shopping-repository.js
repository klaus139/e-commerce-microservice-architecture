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
            const orders = await models_1.OrderModel.find({ customerId });
            return orders;
        }
        catch (err) {
            throw new app_errors_2.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Orders', true, '', true);
        }
    }
    async AddCartItem(customerId, item, qty, isRemove) {
        try {
            const cart = await models_1.CartModel.findOne({ customerId: customerId });
            const { _id } = item;
            if (cart) {
                let isExist = false;
                let cartItems = cart.items;
                if (cartItems.length > 0) {
                    cartItems.map((item) => {
                        if (item.product._id.toString() === _id.toString()) {
                            if (isRemove) {
                                cartItems.splice(cartItems.indexOf(item), 1);
                            }
                            else {
                                item.unit = qty;
                            }
                            isExist = true;
                        }
                    });
                }
                if (!isExist && !isRemove) {
                    cartItems.push({ product: { ...item }, unit: qty });
                }
                cart.items = cartItems;
                return cart.save();
            }
            else {
                return await models_1.CartModel.create({
                    customerId,
                    items: [{ product: { ...item }, unit: qty }]
                });
            }
        }
        catch (err) {
            throw new app_errors_2.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer', true, '', true);
        }
    }
    async CreateNewOrder(customerId, txnId) {
        //check transaction for payment Status
        try {
            const cart = await models_1.CartModel.findOne({ customerId: customerId });
            if (cart) {
                let amount = 0;
                let cartItems = cart.items;
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
                    cart.items = [];
                    const orderResult = await order.save();
                    await cart.save();
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
