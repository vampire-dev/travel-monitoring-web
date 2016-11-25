"use strict";
const Db_1 = require('../Models/Db');
const co = require('co');
class BaseController {
    constructor(schema, populates) {
        this.schema = schema;
        this.populates = populates;
    }
    get(id) {
        var entity = this.schema.findOne({ "_id": Db_1.default.objectId(id) });
        this.populate(entity);
        return entity.lean().exec();
    }
    getAll(query) {
        var parameter = this.createParameter(query);
        var entities = this.schema.find(parameter);
        this.populate(entities);
        var limit = query['limit'];
        var skip = query['skip'];
        if (limit & skip)
            entities.skip(skip).limit(limit);
        return entities.lean().exec();
    }
    save(data) {
        var entity = new this.schema(data);
        if (!data['_id'])
            return entity.save();
        return this.schema.update({ "_id": entity._id }, data).exec();
    }
    delete(id) {
        var schema = this.schema;
        return co(function* () {
            var entity = yield schema.findOne({ "_id": Db_1.default.objectId(id) }).exec();
            if (!entity)
                throw new Error('Data is not found');
            return entity.remove({ "_id": entity._id }).exec();
        });
    }
    createParameter(query) {
        return {};
    }
    populate(entity) {
        this.populates.forEach(populate => {
            entity.populate(populate);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseController;
//# sourceMappingURL=BaseController.js.map