import BaseController from './BaseController';
import db from '../Models/Db';
import schema from '../Models/Schema';
import * as crypto from 'crypto';
const co = require('co');

class UserController extends BaseController {
    constructor() {
        super(schema.users, []);
    }

    authenticate(userName: string, password: string): Promise<any> {
        var schema = this.schema;

        return co(function* () {
            var user = yield schema.findOne({ "userName": userName }).exec();

            if (!user)
                throw new Error('User is not found');

            var hash = user['hash'];
            var currentHash = crypto.createHmac('sha256', user['salt']).update(password).digest('hex');

            if (hash !== currentHash)
                throw new Error('Password is not found');

            return user;
        });
    }

    save(data: any): Promise<any> {
        if (data['password']) {
            data['salt'] = crypto.randomBytes(16).toString('base64');
            data['hash'] = crypto.createHmac('sha256', data['salt']).update(data['password']).digest('hex');
        }

        var entity = new this.schema(data);

        if (!data['_id'])
            return entity.save();

        return this.schema.update({ _id: db.objectId(entity._id) }, entity).exec();
    }

    createParameter(query: any): any {
        var parameter = {};

        if (query['name'])
            parameter['name'] = new RegExp(query['name'], 'i');

        return parameter;
    }
}

export default new UserController();