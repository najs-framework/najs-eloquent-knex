"use strict";
/// <reference types="najs-eloquent" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_eloquent_1 = require("najs-eloquent");
const DBFacade_1 = require("../facades/global/DBFacade");
const helpers_1 = require("../utils/helpers");
class KnexRecordExecutor extends najs_eloquent_1.NajsEloquent.Driver.RecordExecutorBase {
    constructor(model, record, logger) {
        super(model, record, new najs_eloquent_1.NajsEloquent.QueryBuilder.Shared.DefaultConvention());
        this.logger = logger;
        this.tableName = helpers_1.get_table_name(model);
        this.connectionName = helpers_1.get_connection_name(model);
        this.knex = DBFacade_1.DB.getConnection(this.connectionName);
    }
    async createRecord(action) {
        const data = this.record.toObject();
        this.startLog()
            .raw('.insert(', data, ')')
            .action(`${this.model.getModelName()}.${action}()`);
        return this.shouldExecute()
            ? new Promise((resolve, reject) => {
                const query = this.knex.table(this.tableName);
                query
                    .insert(data)
                    .then(response => {
                    resolve(this.logger.sql(query.toQuery()).end(response));
                })
                    .catch(reject);
            })
            : this.logger.end({});
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
                const query = this.knex.table(this.tableName).where(name, value);
                query
                    .update(data)
                    .then(response => {
                    resolve(this.logger.sql(query.toQuery()).end(response));
                })
                    .catch(reject);
            })
            : this.logger.end({});
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
                const query = this.knex.table(this.tableName).where(name, value);
                query
                    .delete()
                    .then(response => {
                    resolve(this.logger.sql(query.toQuery()).end(response));
                })
                    .catch(reject);
            })
            : this.logger.end({});
    }
    getModifiedData() {
        return this.record.getModified().reduce((data, name) => {
            data[this.convention.formatFieldName(name)] = this.record.getAttribute(name);
            return data;
        }, {});
    }
    startLog() {
        return this.logger.raw(`DB.getConnection(${this.connectionName}).table(${this.tableName})`);
    }
}
exports.KnexRecordExecutor = KnexRecordExecutor;
