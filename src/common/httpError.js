export class HttpError extends Error {
    constructor(statusCode, message, url, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }

        this.statusCode = statusCode;
        this.message = message;
        this.url = url;
    }
}