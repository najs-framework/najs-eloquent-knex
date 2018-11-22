"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KnexQueryBuilderWrapperBase_1 = require("./KnexQueryBuilderWrapperBase");
class KnexConditionQueryWrapper extends KnexQueryBuilderWrapperBase_1.KnexQueryBuilderWrapperBase {
    where() {
        this.knexQuery.where.apply(this.knexQuery, arguments);
        return this;
    }
    orWhere() {
        this.knexQuery.orWhere.apply(this.knexQuery, arguments);
        return this;
    }
    andWhere() {
        this.knexQuery.andWhere.apply(this.knexQuery, arguments);
        return this;
    }
    whereNot() {
        this.knexQuery.whereNot.apply(this.knexQuery, arguments);
        return this;
    }
    andWhereNot() {
        this.knexQuery.whereNot.apply(this.knexQuery, arguments);
        return this;
    }
    orWhereNot() {
        this.knexQuery.orWhereNot.apply(this.knexQuery, arguments);
        return this;
    }
    whereIn() {
        this.knexQuery.whereIn.apply(this.knexQuery, arguments);
        return this;
    }
    andWhereIn() {
        this.knexQuery.whereIn.apply(this.knexQuery, arguments);
        return this;
    }
    orWhereIn() {
        this.knexQuery.orWhereIn.apply(this.knexQuery, arguments);
        return this;
    }
    whereNotIn() {
        this.knexQuery.whereNotIn.apply(this.knexQuery, arguments);
        return this;
    }
    andWhereNotIn() {
        this.knexQuery.whereNotIn.apply(this.knexQuery, arguments);
        return this;
    }
    orWhereNotIn() {
        this.knexQuery.orWhereNotIn.apply(this.knexQuery, arguments);
        return this;
    }
    whereNull() {
        this.knexQuery.whereNull.apply(this.knexQuery, arguments);
        return this;
    }
    andWhereNull() {
        this.knexQuery.whereNull.apply(this.knexQuery, arguments);
        return this;
    }
    orWhereNull() {
        this.knexQuery.orWhereNull.apply(this.knexQuery, arguments);
        return this;
    }
    whereNotNull() {
        this.knexQuery.whereNotNull.apply(this.knexQuery, arguments);
        return this;
    }
    andWhereNotNull() {
        this.knexQuery.whereNotNull.apply(this.knexQuery, arguments);
        return this;
    }
    orWhereNotNull() {
        this.knexQuery.orWhereNotNull.apply(this.knexQuery, arguments);
        return this;
    }
    whereBetween() {
        this.knexQuery.whereBetween.apply(this.knexQuery, arguments);
        return this;
    }
    andWhereBetween() {
        this.knexQuery.whereBetween.apply(this.knexQuery, arguments);
        return this;
    }
    orWhereBetween() {
        this.knexQuery.orWhereBetween.apply(this.knexQuery, arguments);
        return this;
    }
    whereNotBetween() {
        this.knexQuery.whereNotBetween.apply(this.knexQuery, arguments);
        return this;
    }
    andWhereNotBetween() {
        this.knexQuery.andWhereNotBetween.apply(this.knexQuery, arguments);
        return this;
    }
    orWhereNotBetween() {
        this.knexQuery.orWhereNotBetween.apply(this.knexQuery, arguments);
        return this;
    }
}
exports.KnexConditionQueryWrapper = KnexConditionQueryWrapper;
