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
            const query = this.queryHandler.getKnexQueryBuilder();
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
            const query = this.queryHandler.getKnexQueryBuilder().limit(1);
            query.then(result => {
                // tslint:disable-next-line
                const row = result && result.length !== 0 ? result[0] : null;
                this.logger.sql(query.toQuery()).end(row);
                resolve(row);
            });
        });
    }
    async count() {
        return 0;
    }
    async update(data) { }
    async delete() { }
    async restore() { }
    async execute() { }
}
exports.KnexQueryExecutor = KnexQueryExecutor;
