"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormateData = exports.ValidateSignature = exports.GenerateSignature = exports.ValidatePassword = exports.GeneratePassword = exports.GenerateSalt = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
//Utility functions
async function GenerateSalt() {
    return await (0, bcrypt_1.genSalt)();
}
exports.GenerateSalt = GenerateSalt;
async function GeneratePassword(password, salt) {
    return await (0, bcrypt_1.hash)(password, salt);
}
exports.GeneratePassword = GeneratePassword;
async function ValidatePassword(enteredPassword, savedPassword, salt) {
    return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
}
exports.ValidatePassword = ValidatePassword;
async function GenerateSignature(payload) {
    try {
        return (0, jsonwebtoken_1.sign)(payload, config_1.APP_SECRET, { expiresIn: "30d" });
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
exports.GenerateSignature = GenerateSignature;
async function ValidateSignature(req) {
    try {
        const signature = req.get("Authorization");
        console.log(signature);
        const payload = (0, jsonwebtoken_1.verify)(signature.split(" ")[1], config_1.APP_SECRET);
        req.user = payload;
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.ValidateSignature = ValidateSignature;
function FormateData(data) {
    if (data) {
        return { data };
    }
    else {
        throw new Error("Data Not found!");
    }
}
exports.FormateData = FormateData;
