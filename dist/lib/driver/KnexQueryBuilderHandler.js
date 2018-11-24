"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const KnexBasicQueryWrapper_1 = require("../wrappers/KnexBasicQueryWrapper");
const najs_eloquent_1 = require("najs-eloquent");
const KnexProviderFacade_1 = require("../facades/global/KnexProviderFacade");
const KnexConditionQueryWrapper_1 = require("../wrappers/KnexConditionQueryWrapper");
const KnexExecutorFactory_1 = require("./KnexExecutorFactory");
const helpers_1 = require("../utils/helpers");
class KnexQueryBuilderHandler extends najs_eloquent_1.NajsEloquent.QueryBuilder.QueryBuilderHandlerBase {
    constructor(model) {
        super(model, najs_binding_1.make(KnexExecutorFactory_1.KnexExecutorFactory.className));
        this.convention = new najs_eloquent_1.NajsEloquent.QueryBuilder.Shared.DefaultConvention();
    }
    getTableName() {
        return helpers_1.get_table_name(this.model);
    }
    getConnectionName() {
        return helpers_1.get_connection_name(this.model);
    }
    getKnexQueryBuilder() {
        if (!this.knexQuery) {
            this.knexQuery = KnexProviderFacade_1.KnexProvider.createQueryBuilder(this.getTableName(), this.getConnectionName());
        }
        return this.knexQuery;
    }
    getBasicQuery() {
        if (!this.basicQuery) {
            this.basicQuery = new KnexBasicQueryWrapper_1.KnexBasicQueryWrapper(this.getKnexQueryBuilder());
        }
        return this.basicQuery;
    }
    getConditionQuery() {
        if (!this.conditionQuery) {
            this.conditionQuery = new KnexConditionQueryWrapper_1.KnexConditionQueryWrapper(this.getKnexQueryBuilder());
        }
        return this.conditionQuery;
    }
    getQueryConvention() {
        return this.convention;
    }
}
exports.KnexQueryBuilderHandler = KnexQueryBuilderHandler;
