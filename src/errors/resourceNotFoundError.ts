import {CustomError} from "./customError";

export class ResourceNotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}