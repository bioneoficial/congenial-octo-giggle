import {CustomError} from "./customError";

export class DatabaseError extends CustomError {
    constructor(message = 'An error occurred in Database') {
        super(message);
    }
}