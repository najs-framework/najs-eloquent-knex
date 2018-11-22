import { Model, NajsEloquent as NajsEloquentLib } from 'najs-eloquent'
import { KnexQueryBuilderType } from './KnexQueryBuilder'
import * as Knex from 'knex'

export class KnexModel extends Model {
  public id?: string

  newQuery(): KnexQueryBuilderType<this>
  newQuery(cb: (queryBuilder: Knex.QueryBuilder) => any): KnexQueryBuilderType<this>
  newQuery(name: string): KnexQueryBuilderType<this>
  newQuery(name?: string | ((queryBuilder: Knex.QueryBuilder) => any)): KnexQueryBuilderType<this> {
    if (typeof name === 'string') {
      return super.newQuery(name) as any
    }

    const query: KnexQueryBuilderType<this> = super.newQuery() as any
    return query.native(name as (queryBuilder: Knex.QueryBuilder) => any)
  }
}

NajsEloquentLib.Util.PrototypeManager.stopFindingRelationsIn(KnexModel.prototype)
