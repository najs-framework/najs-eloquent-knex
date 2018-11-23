/// <reference types="najs-eloquent" />

import Model = NajsEloquent.Model.IModel
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent'
import { KnexQueryLog } from './KnexQueryLog'
import { DB } from '../facades/global/DBFacade'
import { KnexWrapper } from '../wrappers/KnexWrapper'
import { get_table_name, get_connection_name } from '../utils/helpers'

export class KnexRecordExecutor extends NajsEloquentLib.Driver.RecordExecutorBase {
  protected logger: KnexQueryLog
  protected knex: KnexWrapper
  protected tableName: string
  protected connectionName: string

  constructor(model: Model, record: NajsEloquentLib.Driver.Record, logger: KnexQueryLog) {
    super(model, record, new NajsEloquentLib.QueryBuilder.Shared.DefaultConvention())
    this.logger = logger
    this.tableName = get_table_name(model)
    this.connectionName = get_connection_name(model)
    this.knex = DB.getConnection(this.connectionName)
  }

  async createRecord<R = any>(action: string): Promise<R> {
    const data = this.record.toObject()
    this.startLog()
      .raw('.insert(', data, ')')
      .action(`${this.model.getModelName()}.${action}()`)

    return this.shouldExecute()
      ? new Promise((resolve, reject) => {
          const query = this.knex.table(this.tableName)
          query
            .insert(data)
            .then(response => {
              resolve(this.logger.sql(query.toQuery()).end(response))
            })
            .catch(reject)
        })
      : this.logger.end({})
  }

  async updateRecord<R = any>(action: string): Promise<R> {
    const name = this.convention.formatFieldName(this.model.getPrimaryKeyName())
    const value: any = this.model.getPrimaryKey()
    const data = this.getModifiedData()

    this.startLog()
      .raw(`.where(${name}, ${value})`)
      .raw('.update(', data, ')')
      .action(`${this.model.getModelName()}.${action}()`)

    return this.shouldExecute()
      ? new Promise((resolve, reject) => {
          const query = this.knex.table(this.tableName).where(name, value)
          query
            .update(data)
            .then(response => {
              resolve(this.logger.sql(query.toQuery()).end(response))
            })
            .catch(reject)
        })
      : this.logger.end({})
  }

  async hardDeleteRecord<R = any>(): Promise<R> {
    const name = this.convention.formatFieldName(this.model.getPrimaryKeyName())
    const value: any = this.model.getPrimaryKey()

    this.startLog()
      .raw(`.where(${name}, ${value})`)
      .raw('.delete()')
      .action(`${this.model.getModelName()}.hardDelete()`)

    return this.shouldExecute()
      ? new Promise((resolve, reject) => {
          const query = this.knex.table(this.tableName).where(name, value)
          query
            .delete()
            .then(response => {
              resolve(this.logger.sql(query.toQuery()).end(response))
            })
            .catch(reject)
        })
      : this.logger.end({})
  }

  getModifiedData() {
    return this.record.getModified().reduce((data, name) => {
      data[this.convention.formatFieldName(name)] = this.record.getAttribute(name)
      return data
    }, {})
  }

  startLog(): KnexQueryLog {
    return this.logger.raw(`DB.getConnection(${this.connectionName}).table(${this.tableName})`)
  }
}
