"use strict";
/// <reference types="najs-eloquent" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_eloquent_1 = require("najs-eloquent");
class KnexQueryBuilder extends najs_eloquent_1.NajsEloquent
    .QueryBuilder.QueryBuilder {
    native(handler) {
        const queryBuilder = this.handler.getKnexQueryBuilder();
        handler.call(queryBuilder, queryBuilder);
        return this;
    }
    toSqlQuery() {
        return this.handler.getKnexQueryBuilder().toQuery();
    }
}
exports.KnexQueryBuilder = KnexQueryBuilder;
