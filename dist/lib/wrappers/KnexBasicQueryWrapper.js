"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const KnexQueryBuilderWrapperBase_1 = require("./KnexQueryBuilderWrapperBase");
class KnexBasicQueryWrapper extends KnexQueryBuilderWrapperBase_1.KnexQueryBuilderWrapperBase {
    select() {
        const args = lodash_1.flatten(arguments);
        this.knexQuery.select(...args);
        return this;
    }
    limit(record) {
        this.knexQuery.limit(record);
        return this;
    }
    orderBy(field, direction) {
        this.knexQuery.orderBy(field, direction);
        return this;
    }
}
exports.KnexBasicQueryWrapper = KnexBasicQueryWrapper;
