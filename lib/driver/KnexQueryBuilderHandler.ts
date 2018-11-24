import * as Knex from 'knex'
import { make } from 'najs-binding'
import { KnexBasicQueryWrapper } from '../wrappers/KnexBasicQueryWrapper'
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent'
import { KnexProvider } from '../facades/global/KnexProviderFacade'
import { KnexConditionQueryWrapper } from '../wrappers/KnexConditionQueryWrapper'
import { KnexExecutorFactory } from './KnexExecutorFactory'
import { get_connection_name, get_table_name } from '../utils/helpers'

export class KnexQueryBuilderHandler extends NajsEloquentLib.QueryBuilder.QueryBuilderHandlerBase {
  protected knexQuery?: Knex.QueryBuilder
  protected basicQuery?: KnexBasicQueryWrapper
  protected conditionQuery?: KnexConditionQueryWrapper
  protected convention: NajsEloquentLib.QueryBuilder.Shared.DefaultConvention

  constructor(model: NajsEloquent.Model.IModel) {
    super(model, make<KnexExecutorFactory>(KnexExecutorFactory.className))
    this.convention = new NajsEloquentLib.QueryBuilder.Shared.DefaultConvention()
  }

  getTableName() {
    return get_table_name(this.model)
  }

  getConnectionName() {
    return get_connection_name(this.model)
  }

  getKnexQueryBuilder() {
    if (!this.knexQuery) {
      this.knexQuery = KnexProvider.createQueryBuilder(this.getTableName(), this.getConnectionName())
    }
    return this.knexQuery
  }

  getBasicQuery(): KnexBasicQueryWrapper {
    if (!this.basicQuery) {
      this.basicQuery = new KnexBasicQueryWrapper(this.getKnexQueryBuilder())
    }
    return this.basicQuery
  }

  getConditionQuery(): KnexConditionQueryWrapper {
    if (!this.conditionQuery) {
      this.conditionQuery = new KnexConditionQueryWrapper(this.getKnexQueryBuilder())
    }
    return this.conditionQuery
  }

  getQueryConvention(): NajsEloquent.QueryBuilder.IConvention {
    return this.convention
  }
}
