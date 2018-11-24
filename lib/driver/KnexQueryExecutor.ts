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
    return undefined
  }

  async count(): Promise<number> {
    return 0
  }

  async update(data: Object): Promise<any> {}

  async delete(): Promise<any> {}

  async restore(): Promise<any> {}

  async execute(): Promise<any> {}
}
