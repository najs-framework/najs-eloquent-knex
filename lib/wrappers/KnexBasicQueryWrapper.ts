import { flatten } from 'lodash'
import { ColumnName } from '../definitions/types'
import { IKnexBasicQuery } from '../definitions/IKnexBasicQuery'
import { KnexQueryBuilderWrapperBase } from './KnexQueryBuilderWrapperBase'

export class KnexBasicQueryWrapper extends KnexQueryBuilderWrapperBase implements IKnexBasicQuery {
  select(aliases: { [alias: string]: string }): this
  select(columnNames: ColumnName[]): this
  select(...columnNames: Array<ColumnName | ColumnName[]>): this
  select(): this {
    const args = flatten(arguments)
    this.knexQuery.select(...args)

    return this
  }

  limit(record: number): this {
    this.knexQuery.limit(record)

    return this
  }

  orderBy(field: string, direction?: 'asc' | 'desc'): this {
    this.knexQuery.orderBy(field, direction)

    return this
  }
}
