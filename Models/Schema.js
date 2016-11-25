"use strict";
const mongoose = require('mongoose');
const create = (schemaName, collectionName, document) => {
    return mongoose.model(schemaName, new mongoose.Schema(document, { "versionKey": null, "collection": collectionName }));
};
const userSchema = {
    "userName": { type: String, required: true },
    "name": { type: String, required: true },
    "salt": { type: String, required: true },
    "hash": { type: String, required: true }
};
const clientSchema = {
    "firstName": { type: String, required: true },
    "lastName": { type: String, required: true },
    "device": {
        "model": { type: String, required: true },
        "serial": { type: String, required: true },
    },
    "address": { type: String, required: true },
    "contact": { type: String, required: true },
    "passport": { type: String, required: true },
    "birthDate": { type: Date, required: true },
    "birthPlace": { type: String, required: true },
    "registrationDate": { type: Date, required: true }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "users": create('User', 'users', userSchema),
    "clients": create('Client', 'clients', clientSchema)
};
//# sourceMappingURL=Schema.js.map