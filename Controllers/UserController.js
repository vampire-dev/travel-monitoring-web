"use strict";
const BaseController_1 = require('./BaseController');
const Db_1 = require('../Models/Db');
const Schema_1 = require('../Models/Schema');
const crypto = require('crypto');
const co = require('co');
class UserController extends BaseController_1.default {
    constructor() {
        super(Schema_1.default.users, []);
    }
    authenticate(userName, password) {
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
    save(data) {
        if (data['password']) {
            data['salt'] = crypto.randomBytes(16).toString('base64');
            data['hash'] = crypto.createHmac('sha256', data['salt']).update(data['password']).digest('hex');
        }
        var entity = new this.schema(data);
        if (!data['_id'])
            return entity.save();
        return this.schema.update({ _id: Db_1.default.objectId(entity._id) }, entity).exec();
    }
    createParameter(query) {
        var parameter = {};
        if (query['name'])
            parameter['name'] = new RegExp(query['name'], 'i');
        return parameter;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map