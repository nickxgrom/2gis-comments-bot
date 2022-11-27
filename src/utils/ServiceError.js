module.exports = class ServiceError extends Error {
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }
}