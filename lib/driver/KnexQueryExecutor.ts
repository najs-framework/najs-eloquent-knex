/// <reference types="najs-eloquent" />

import * as Knex from 'knex'
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent'
import { KnexQueryLog } from './KnexQueryLog'
import { KnexQueryBuilderHandler } from './KnexQueryBuilderHandler'

export class KnexQueryExecutor extends NajsEloquentLib.Driver.ExecutorBase
  implements NajsEloquent.QueryBuilder.IQueryExecutor {
  protected queryHandler: KnexQueryBuilderHandler
  protected logger: KnexQueryLog
  protected knex?: Knex.QueryBuilder
  protected tableName: string
  protected connectionName: string

  constructor(queryHandler: KnexQueryBuilderHandler, logger: KnexQueryLog) {
    super()
    this.queryHandler = queryHandler
    this.logger = logger
  }

  async get(): Promise<object[]> {
    this.logger.raw('KnexQueryBuilderHandler.getKnexQueryBuilder().then(...)').action('get')
    if (!this.shouldExecute()) {
      return this.logger.sql(undefined).end([])
    }

    return new Promise(resolve => {
      const query = this.queryHandler.getKnexQueryBuilder()
      query.then(result => {
        this.logger.sql(query.toQuery()).end(result)
        resolve(result)
      })
    }) as any
  }

  async first(): Promise<object | null | undefined> {
    this.logger.raw('KnexQueryBuilderHandler.getKnexQueryBuilder().limit(1).then(...)').action('first')
    if (!this.shouldExecute()) {
      return this.logger.sql(undefined).end(undefined)
    }

    return new Promise(resolve => {
      const query = this.queryHandler.getKnexQueryBuilder().limit(1)
      query.then(result => {
        // tslint:disable-next-line
        const row = result && result.length !== 0 ? result[0] : null
        this.logger.sql(query.toQuery()).end(row)
        resolve(row)
      })
    }) as any
  }

  async count(): Promise<number> {
    this.logger
      .raw('KnexQueryBuilderHandler.getKnexQueryBuilder().clearSelect()._clearGrouping("order").count().then(...)')
      .action('count')
    if (!this.shouldExecute()) {
      return this.logger.sql(undefined).end(0)
    }

    return new Promise(resolve => {
      const query = this.queryHandler.getKnexQueryBuilder()
      query.clearSelect()['_clearGrouping']('order')
      query.count().then(output => {
        resolve(this.logger.sql(query.toQuery()).end(this.readCountOutput(output)))
      })
    }) as any
  }

  readCountOutput(output: any) {
    const row = output && output.length !== 0 ? output[0] : {}
    const result = typeof row['count(*)'] !== 'undefined' ? row['count(*)'] : 0
    return result
  }

  async update(data: Object): Promise<any> {}

  async delete(): Promise<any> {}

  async restore(): Promise<any> {}

  async execute(): Promise<any> {}
}
