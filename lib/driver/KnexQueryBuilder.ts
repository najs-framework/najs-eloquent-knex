/// <reference types="najs-eloquent" />

import * as Knex from 'knex'
import { IKnexBasicQuery } from '../definitions/IKnexBasicQuery'
import { IKnexConditionQuery } from '../definitions/IKnexConditionQuery'
import { KnexQueryBuilderHandler } from './KnexQueryBuilderHandler'
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent'

export type KnexQueryBuilderType<T> = KnexQueryBuilder<T> & IKnexBasicQuery & IKnexConditionQuery

export class KnexQueryBuilder<T, H extends KnexQueryBuilderHandler = KnexQueryBuilderHandler> extends NajsEloquentLib
  .QueryBuilder.QueryBuilder<T, H> {
  native(nativeCb: (queryBuilder: Knex.QueryBuilder) => any) {
    const queryBuilder = this.handler.getKnexQueryBuilder()
    nativeCb.call(queryBuilder, queryBuilder)

    return this
  }

  toSqlQuery(): string {
    return this.handler.getKnexQueryBuilder().toQuery()
  }
}
