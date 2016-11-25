import BaseController from './BaseController';
import schema from '../Models/Schema';

class ClientController extends BaseController {
    constructor() {
        super(schema.clients, []);
    }

    getByDevice(model: string, serial: string): Promise<any> {
        return this.schema.findOne({ "device.model": model, "device.serial": serial }).exec();
    }

    createParameter(query: any): any {
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

export default new ClientController();