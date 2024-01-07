import {CustomError} from "./customError";

export class ValidationError extends CustomError {
    constructor(message = 'Input validation failed') {
        super(message, 400);
    }
}