/// <reference types="najs-eloquent" />

import Model = NajsEloquent.Model.IModel
import * as Knex from 'knex'
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent'
import { KnexQueryLog } from './KnexQueryLog'
import { KnexProvider } from '../facades/global/KnexProviderFacade'

export class KnexRecordExecutor extends NajsEloquentLib.Driver.RecordExecutorBase {
  protected logger: KnexQueryLog
  protected knex?: Knex.QueryBuilder
  protected tableName: string
  protected connectionName: string

  constructor(
    model: Model,
    record: NajsEloquentLib.Driver.Record,
    tableName: string,
    connectionName: string,
    logger: KnexQueryLog
  ) {
    super(model, record, new NajsEloquentLib.QueryBuilder.Shared.DefaultConvention())
    this.logger = logger
    this.tableName = tableName
    this.connectionName = connectionName
  }

  getKnexQueryBuilder() {
    if (typeof this.knex === 'undefined') {
      this.knex = KnexProvider.createQueryBuilder(this.tableName, this.connectionName)
    }
    return this.knex
  }

  async createRecord<R = any>(action: string): Promise<R> {
    const data = this.record.toObject()
    this.startLog()
      .raw('.insert(', data, ')')
      .action(`${this.model.getModelName()}.${action}()`)

    return this.shouldExecute()
      ? new Promise((resolve, reject) => {
          const query = this.getKnexQueryBuilder()
          query
            .table(this.tableName)
            .insert(data)
            .then(response => {
              resolve(this.logger.sql(query.toQuery()).end(response))
            })
            .catch(reject)
        })
      : this.logger.sql(undefined).end({})
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
          const query = this.getKnexQueryBuilder()
          query
            .table(this.tableName)
            .where(name, value)
            .update(data)
            .then(response => {
              resolve(this.logger.sql(query.toQuery()).end(response))
            })
            .catch(reject)
        })
      : this.logger.sql(undefined).end({})
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
          const query = this.getKnexQueryBuilder()
          query
            .table(this.tableName)
            .where(name, value)
            .delete()
            .then(response => {
              resolve(this.logger.sql(query.toQuery()).end(response))
            })
            .catch(reject)
        })
      : this.logger.sql(undefined).end({})
  }

  getModifiedData() {
    return this.record.getModified().reduce((data, name) => {
      data[this.convention.formatFieldName(name)] = this.record.getAttribute(name)
      return data
    }, {})
  }

  startLog(): KnexQueryLog {
    return this.logger.raw(`KnexProvider.createQueryBuilder("${this.tableName}", "${this.connectionName}")`)
  }
}
