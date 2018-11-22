import * as Knex from 'knex'

export class KnexQueryBuilderWrapperBase {
  protected knexQuery: Knex.QueryBuilder

  constructor(knexQuery: Knex.QueryBuilder) {
    this.knexQuery = knexQuery
  }

  getKnexQueryBuilder(): Knex.QueryBuilder {
    return this.knexQuery
  }
}
