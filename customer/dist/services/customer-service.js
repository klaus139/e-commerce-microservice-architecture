"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const utils_1 = require("../utils");
const app_errors_1 = require("../utils/app-errors");
// All Business logic will be here
class CustomerService {
    repository;
    constructor() {
        this.repository = new database_1.CustomerRepository();
    }
    async SignIn(userInputs) {
        const { email, password } = userInputs;
        try {
            const existingCustomer = await this.repository.FindCustomer({ email });
            if (existingCustomer) {
                const validPassword = await (0, utils_1.ValidatePassword)(password, existingCustomer.password, existingCustomer.salt);
                if (validPassword) {
                    const token = await (0, utils_1.GenerateSignature)({ email: existingCustomer.email, _id: existingCustomer._id });
                    return (0, utils_1.FormateData)({ id: existingCustomer._id, token });
                }
            }
            return (0, utils_1.FormateData)(null);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async SignUp(userInputs) {
        const { email, password, phone } = userInputs;
        try {
            // create salt
            let salt = await (0, utils_1.GenerateSalt)();
            let userPassword = await (0, utils_1.GeneratePassword)(password, salt);
            const existingCustomer = await this.repository.CreateCustomer({ email, password: userPassword, phone, salt });
            const token = await (0, utils_1.GenerateSignature)({ email: email, _id: existingCustomer._id });
            return (0, utils_1.FormateData)({ id: existingCustomer._id, token });
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async AddNewAddress(_id, userInputs) {
        const { street, postalCode, city, country } = userInputs;
        try {
            const addressResult = await this.repository.CreateAddress({ _id, street, postalCode, city, country });
            return (0, utils_1.FormateData)(addressResult);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async GetProfile(id) {
        try {
            const existingCustomer = await this.repository.FindCustomerById({ id });
            return (0, utils_1.FormateData)(existingCustomer);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async GetShopingDetails(id) {
        try {
            const existingCustomer = await this.repository.FindCustomerById({ id });
            if (existingCustomer) {
                return (0, utils_1.FormateData)(existingCustomer);
            }
            return (0, utils_1.FormateData)({ msg: 'Error' });
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async GetWishList(customerId) {
        try {
            const wishListItems = await this.repository.Wishlist(customerId);
            return (0, utils_1.FormateData)(wishListItems);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async AddToWishlist(customerId, product) {
        try {
            const wishlistResult = await this.repository.AddWishlistItem(customerId, product);
            return (0, utils_1.FormateData)(wishlistResult);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async ManageCart(customerId, product, qty, isRemove) {
        try {
            const cartResult = await this.repository.AddCartItem(customerId, product, qty, isRemove);
            return (0, utils_1.FormateData)(cartResult);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async ManageOrder(customerId, order) {
        try {
            const orderResult = await this.repository.AddOrderToProfile(customerId, order);
            return (0, utils_1.FormateData)(orderResult);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async SubscribeEvents(payload) {
        const { event, data } = payload;
        const { userId, product, order, qty } = data;
        switch (event) {
            case 'ADD_TO_WISHLIST':
            case 'REMOVE_FROM_WISHLIST':
                this.AddToWishlist(userId, product);
                break;
            case 'ADD_TO_CART':
                this.ManageCart(userId, product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId, product, qty, true);
                break;
            case 'CREATE_ORDER':
                this.ManageOrder(userId, order);
                break;
            default:
                break;
        }
    }
}
exports.default = CustomerService;
