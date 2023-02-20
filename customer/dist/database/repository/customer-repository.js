"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const models_1 = require("../models");
const app_errors_1 = require("../../utils/app-errors");
//Dealing with data base operations
class CustomerRepository {
    async CreateCustomer({ email, password, phone, salt }) {
        try {
            const customer = new models_1.CustomerModel({
                email,
                password,
                salt,
                phone,
                address: []
            });
            const customerResult = await customer.save();
            return customerResult;
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer', true, '', true);
        }
    }
    async CreateAddress({ _id, street, postalCode, city, country }) {
        try {
            const profile = await models_1.CustomerModel.findById(_id);
            if (profile) {
                const newAddress = new models_1.AddressModel({
                    street,
                    postalCode,
                    city,
                    country
                });
                await newAddress.save();
                profile.address.push(newAddress);
            }
            return await profile.save();
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Error on Create Address', true, '', true);
        }
    }
    async FindCustomer({ email }) {
        try {
            const existingCustomer = await models_1.CustomerModel.findOne({ email: email });
            return existingCustomer;
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer', true, '', true);
        }
    }
    async FindCustomerById({ id }) {
        try {
            const existingCustomer = await models_1.CustomerModel.findById(id)
                .populate('address');
            return existingCustomer;
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer', true, '', true);
        }
    }
    async Wishlist(customerId) {
        try {
            const profile = await models_1.CustomerModel.findById(customerId).populate('wishlist');
            return profile.wishlist;
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Wishlist', true, '', true);
        }
    }
    async AddWishlistItem(customerId, { _id, name, desc, price, available, banner }) {
        const product = {
            _id, name, desc, price, available, banner
        };
        try {
            const profile = await models_1.CustomerModel.findById(customerId).populate('wishlist');
            if (profile) {
                let wishlist = profile.wishlist;
                if (wishlist.length > 0) {
                    let isExist = false;
                    wishlist.map((item) => {
                        if (item._id.toString() === product._id.toString()) {
                            const index = wishlist.indexOf(item);
                            wishlist.splice(index, 1);
                            isExist = true;
                        }
                    });
                    if (!isExist) {
                        wishlist.push(product);
                    }
                }
                else {
                    wishlist.push(product);
                }
                profile.wishlist = wishlist;
            }
            const profileResult = await profile.save();
            return profileResult.wishlist;
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Add to WishList', true, '', true);
        }
    }
    async AddCartItem(customerId, { _id, name, price, banner }, qty, isRemove) {
        try {
            const profile = await models_1.CustomerModel.findById(customerId).populate('cart');
            if (profile) {
                const cartItem = {
                    product: { _id, name, price, banner },
                    unit: qty,
                };
                let cartItems = profile.cart;
                if (cartItems.length > 0) {
                    let isExist = false;
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
                    if (!isExist) {
                        cartItems.push(cartItem);
                    }
                }
                else {
                    cartItems.push(cartItem);
                }
                profile.cart = cartItems;
                const cartSaveResult = await profile.save();
                return cartSaveResult.cart;
            }
            throw new Error('Unable to add to cart!');
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer', true, '', true);
        }
    }
    async AddOrderToProfile(customerId, order) {
        try {
            const profile = await models_1.CustomerModel.findById(customerId);
            if (profile) {
                if (profile.orders == undefined) {
                    profile.orders = [];
                }
                profile.orders.push(order);
                profile.cart = [];
                const profileResult = await profile.save();
                return profileResult;
            }
            throw new Error('Unable to add to order!');
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer', true, '', true);
        }
    }
}
exports.CustomerRepository = CustomerRepository;
