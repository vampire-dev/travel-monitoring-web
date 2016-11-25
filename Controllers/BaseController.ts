import db from '../Models/Db';
const co = require('co');

export default class BaseController{
    schema: any;
    populates: any[];

    constructor(schema: any, populates: any[]) {
        this.schema = schema;
        this.populates = populates;
    }

    get(id: any): Promise<any> {
        var entity = this.schema.findOne({ "_id": db.objectId(id) });
        this.populate(entity);
        return entity.lean().exec();
    }

    getAll(query: any): Promise<any[]> {
        var parameter = this.createParameter(query);
        var entities = this.schema.find(parameter);
        this.populate(entities);

        var limit = query['limit'];
        var skip = query['skip'];

        if (limit & skip)
            entities.skip(skip).limit(limit);

        return entities.lean().exec();
    }

    save(data: any): Promise<any> {
        var entity = new this.schema(data);

        if (!data['_id'])
            return entity.save();

        return this.schema.update({ "_id": entity._id }, data).exec();
    }

    delete(id: any): Promise<any> {
        var schema = this.schema;

        return co(function* () {
            var entity = yield schema.findOne({ "_id": db.objectId(id) }).exec();

            if (!entity)
                throw new Error('Data is not found');

            return entity.remove({ "_id": entity._id }).exec();
        });
    }

    createParameter(query: any): any {
        return {};
    }

    populate(entity: any): void {
        this.populates.forEach(populate => {
            entity.populate(populate);
        });
    }
}