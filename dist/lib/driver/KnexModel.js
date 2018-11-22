"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const najs_eloquent_1 = require("najs-eloquent");
class KnexModel extends najs_eloquent_1.Model {
    newQuery(name) {
        if (typeof name === 'string') {
            return super.newQuery(name);
        }
        const query = super.newQuery();
        return query.native(name);
    }
}
exports.KnexModel = KnexModel;
najs_eloquent_1.NajsEloquent.Util.PrototypeManager.stopFindingRelationsIn(KnexModel.prototype);
