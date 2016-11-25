"use strict";
const BaseController_1 = require('./BaseController');
const Schema_1 = require('../Models/Schema');
class ClientController extends BaseController_1.default {
    constructor() {
        super(Schema_1.default.clients, []);
    }
    getByDevice(model, serial) {
        return this.schema.findOne({ "device.model": model, "device.serial": serial }).exec();
    }
    createParameter(query) {
        var parameter = {};
        if (query['firstName'])
            parameter['firstName'] = new RegExp(query['firstName'], 'i');
        if (query['lastName'])
            parameter['lastName'] = new RegExp(query['lastName'], 'i');
        if (query['model'])
            parameter['device.model'] = new RegExp(query['model'], 'i');
        if (query['serial'])
            parameter['device.serial'] = new RegExp(query['serial'], 'i');
        return parameter;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new ClientController();
//# sourceMappingURL=ClientController.js.map