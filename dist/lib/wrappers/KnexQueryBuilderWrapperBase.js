"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KnexQueryBuilderWrapperBase {
    constructor(knexQuery) {
        this.knexQuery = knexQuery;
    }
    getKnexQueryBuilder() {
        return this.knexQuery;
    }
}
exports.KnexQueryBuilderWrapperBase = KnexQueryBuilderWrapperBase;
