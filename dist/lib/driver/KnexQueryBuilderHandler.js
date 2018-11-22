"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KnexBasicQueryWrapper_1 = require("../wrappers/KnexBasicQueryWrapper");
const najs_eloquent_1 = require("najs-eloquent");
const KnexProviderFacade_1 = require("../facades/global/KnexProviderFacade");
const KnexConditionQueryWrapper_1 = require("../wrappers/KnexConditionQueryWrapper");
class KnexQueryBuilderHandler extends najs_eloquent_1.NajsEloquent.QueryBuilder.QueryBuilderHandlerBase {
    constructor(model) {
        super(model, {});
        this.convention = new najs_eloquent_1.NajsEloquent.QueryBuilder.Shared.DefaultConvention();
    }
    getTableName() {
        return this.model.getRecordName();
    }
    getConnectionName() {
        return this.model
            .getDriver()
            .getSettingFeature()
            .getSettingProperty(this.model, 'connection', 'default');
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
