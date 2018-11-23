"use strict";
/// <reference types="najs-eloquent" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_eloquent_1 = require("najs-eloquent");
const KnexProviderFacade_1 = require("../facades/global/KnexProviderFacade");
class KnexRecordExecutor extends najs_eloquent_1.NajsEloquent.Driver.RecordExecutorBase {
    constructor(model, record, tableName, connectionName, logger) {
        super(model, record, new najs_eloquent_1.NajsEloquent.QueryBuilder.Shared.DefaultConvention());
        this.logger = logger;
        this.tableName = tableName;
        this.connectionName = connectionName;
    }
    getKnexQueryBuilder() {
        if (typeof this.knex === 'undefined') {
            this.knex = KnexProviderFacade_1.KnexProvider.createQueryBuilder(this.tableName, this.connectionName);
        }
        return this.knex;
    }
    async createRecord(action) {
        const data = this.record.toObject();
        this.startLog()
            .raw('.insert(', data, ')')
            .action(`${this.model.getModelName()}.${action}()`);
        return this.shouldExecute()
            ? new Promise((resolve, reject) => {
                const query = this.getKnexQueryBuilder();
                query
                    .table(this.tableName)
                    .insert(data)
                    .then(response => {
                    resolve(this.logger.sql(query.toQuery()).end(response));
                })
                    .catch(reject);
            })
            : this.logger.sql(undefined).end({});
    }
    async updateRecord(action) {
        const name = this.convention.formatFieldName(this.model.getPrimaryKeyName());
        const value = this.model.getPrimaryKey();
        const data = this.getModifiedData();
        this.startLog()
            .raw(`.where(${name}, ${value})`)
            .raw('.update(', data, ')')
            .action(`${this.model.getModelName()}.${action}()`);
        return this.shouldExecute()
            ? new Promise((resolve, reject) => {
                const query = this.getKnexQueryBuilder();
                query
                    .table(this.tableName)
                    .where(name, value)
                    .update(data)
                    .then(response => {
                    resolve(this.logger.sql(query.toQuery()).end(response));
                })
                    .catch(reject);
            })
            : this.logger.sql(undefined).end({});
    }
    async hardDeleteRecord() {
        const name = this.convention.formatFieldName(this.model.getPrimaryKeyName());
        const value = this.model.getPrimaryKey();
        this.startLog()
            .raw(`.where(${name}, ${value})`)
            .raw('.delete()')
            .action(`${this.model.getModelName()}.hardDelete()`);
        return this.shouldExecute()
            ? new Promise((resolve, reject) => {
                const query = this.getKnexQueryBuilder();
                query
                    .table(this.tableName)
                    .where(name, value)
                    .delete()
                    .then(response => {
                    resolve(this.logger.sql(query.toQuery()).end(response));
                })
                    .catch(reject);
            })
            : this.logger.sql(undefined).end({});
    }
    getModifiedData() {
        return this.record.getModified().reduce((data, name) => {
            data[this.convention.formatFieldName(name)] = this.record.getAttribute(name);
            return data;
        }, {});
    }
    startLog() {
        return this.logger.raw(`KnexProvider.createQueryBuilder("${this.tableName}", "${this.connectionName}")`);
    }
}
exports.KnexRecordExecutor = KnexRecordExecutor;
