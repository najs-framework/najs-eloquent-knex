"use strict";
/// <reference types="najs-eloquent" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_eloquent_1 = require("najs-eloquent");
class KnexQueryExecutor extends najs_eloquent_1.NajsEloquent.Driver.ExecutorBase {
    constructor(queryHandler, logger) {
        super();
        this.queryHandler = queryHandler;
        this.logger = logger;
    }
    async get() {
        this.logger.raw('KnexQueryBuilderHandler.getKnexQueryBuilder().then(...)').action('get');
        if (!this.shouldExecute()) {
            return this.logger.sql(undefined).end([]);
        }
        return new Promise(resolve => {
            const query = this.getKnexQueryBuilder();
            query.then(result => {
                this.logger.sql(query.toQuery()).end(result);
                resolve(result);
            });
        });
    }
    async first() {
        this.logger.raw('KnexQueryBuilderHandler.getKnexQueryBuilder().limit(1).then(...)').action('first');
        if (!this.shouldExecute()) {
            return this.logger.sql(undefined).end(undefined);
        }
        return new Promise(resolve => {
            const query = this.getKnexQueryBuilder().limit(1);
            query.then(result => {
                // tslint:disable-next-line
                const row = result && result.length !== 0 ? result[0] : null;
                this.logger.sql(query.toQuery()).end(row);
                resolve(row);
            });
        });
    }
    async count() {
        this.logger
            .raw('KnexQueryBuilderHandler.getKnexQueryBuilder().clearSelect()._clearGrouping("order").count().then(...)')
            .action('count');
        if (!this.shouldExecute()) {
            return this.logger.sql(undefined).end(0);
        }
        return new Promise(resolve => {
            const query = this.getKnexQueryBuilder();
            query.clearSelect()['_clearGrouping']('order');
            query.count().then(output => {
                resolve(this.logger.sql(query.toQuery()).end(this.readCountOutput(output)));
            });
        });
    }
    readCountOutput(output) {
        const row = output && output.length !== 0 ? output[0] : {};
        const result = typeof row['count(*)'] !== 'undefined' ? row['count(*)'] : 0;
        return result;
    }
    async update(data, action = 'update') {
        if (this.queryHandler.hasTimestamps()) {
            data[this.queryHandler.getTimestampsSetting().updatedAt] = najs_eloquent_1.MomentProvider.make().toDate();
        }
        this.logger.raw('KnexQueryBuilderHandler.getKnexQueryBuilder().update(', data, ').then(...)').action(action);
        if (!this.shouldExecute()) {
            return this.logger.sql(undefined).end(0);
        }
        return new Promise(resolve => {
            const query = this.getKnexQueryBuilder();
            query.update(data).then(output => {
                resolve(this.logger.sql(query.toQuery()).end(output));
            });
        });
    }
    async delete() {
        if (!this.queryHandler.isUsed()) {
            return 0;
        }
        this.logger.raw('KnexQueryBuilderHandler.getKnexQueryBuilder().delete().then(...)').action('delete');
        const query = this.getKnexQueryBuilder();
        if (!this.hasAnyWhereStatement(query)) {
            return 0;
        }
        if (!this.shouldExecute()) {
            return this.logger.sql(undefined).end(0);
        }
        return new Promise(resolve => {
            query.delete().then(output => {
                resolve(this.logger.sql(query.toQuery()).end(output));
            });
        });
    }
    hasAnyWhereStatement(query) {
        for (const statement of query['_statements']) {
            if (statement['grouping'] === 'where') {
                return true;
            }
        }
        return false;
    }
    async restore() {
        if (!this.queryHandler.hasSoftDeletes()) {
            return 0;
        }
        const query = this.getKnexQueryBuilder();
        if (!this.hasAnyWhereStatement(query)) {
            return 0;
        }
        const fieldName = this.queryHandler.getSoftDeletesSetting().deletedAt;
        const data = {
            [fieldName]: this.queryHandler.getQueryConvention().getNullValueFor(fieldName)
        };
        return this.update(data, 'restore');
    }
    native(handler) {
        const query = this.getKnexQueryBuilder();
        handler.call(query, query);
        return this;
    }
    async execute() {
        return this.get();
    }
    getKnexQueryBuilder() {
        najs_eloquent_1.NajsEloquent.QueryBuilder.Shared.ExecutorUtils.addSoftDeleteConditionIfNeeded(this.queryHandler);
        return this.queryHandler.getKnexQueryBuilder();
    }
}
exports.KnexQueryExecutor = KnexQueryExecutor;
