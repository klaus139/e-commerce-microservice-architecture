"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.BadRequestError = exports.APIError = exports.AppError = exports.STATUS_CODES = void 0;
exports.STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};
class AppError extends Error {
    statusCode;
    isOperational;
    logError;
    errorStack;
    constructor(name, statusCode, description, isOperational, errorStack, logingErrorResponse) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errorStack = errorStack;
        this.logError = logingErrorResponse;
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
//api Specific Errors
class APIError extends AppError {
    constructor(name, statusCode = exports.STATUS_CODES.INTERNAL_ERROR, description = 'Internal Server Error', isOperational = true, errorStack, logingErrorResponse) {
        super(name, statusCode, description, isOperational, errorStack, logingErrorResponse);
    }
}
exports.APIError = APIError;
//400
class BadRequestError extends AppError {
    constructor(description = 'Bad request', logingErrorResponse) {
        super('NOT FOUND', exports.STATUS_CODES.BAD_REQUEST, description, true, false, logingErrorResponse);
    }
}
exports.BadRequestError = BadRequestError;
//400
class ValidationError extends AppError {
    constructor(description = 'Validation Error', errorStack, logingErrorResponse) {
        super('BAD REQUEST', exports.STATUS_CODES.BAD_REQUEST, description, true, errorStack, logingErrorResponse);
    }
}
exports.ValidationError = ValidationError;
