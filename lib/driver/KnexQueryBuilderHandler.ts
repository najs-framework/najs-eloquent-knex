import * as Knex from 'knex'
import { KnexBasicQueryWrapper } from '../wrappers/KnexBasicQueryWrapper'
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent'
import { KnexProvider } from '../facades/global/KnexProviderFacade'
import { KnexConditionQueryWrapper } from '../wrappers/KnexConditionQueryWrapper'

export class KnexQueryBuilderHandler extends NajsEloquentLib.QueryBuilder.QueryBuilderHandlerBase {
  protected knexQuery?: Knex.QueryBuilder
  protected basicQuery?: KnexBasicQueryWrapper
  protected conditionQuery?: KnexConditionQueryWrapper
  protected convention: NajsEloquentLib.QueryBuilder.Shared.DefaultConvention

  constructor(model: NajsEloquent.Model.IModel) {
    super(model, {} as any)
    this.convention = new NajsEloquentLib.QueryBuilder.Shared.DefaultConvention()
  }

  getTableName() {
    return this.model.getRecordName()
  }

  getConnectionName() {
    return this.model
      .getDriver()
      .getSettingFeature()
      .getSettingProperty(this.model, 'connection', 'default')
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
