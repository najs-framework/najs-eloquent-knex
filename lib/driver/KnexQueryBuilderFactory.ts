/// <reference types="najs-eloquent" />

import { register } from 'najs-binding'
import { ClassNames } from '../constants'
import { KnexQueryBuilder } from './KnexQueryBuilder'
import { KnexQueryBuilderHandler } from './KnexQueryBuilderHandler'

export class KnexQueryBuilderFactory implements NajsEloquent.QueryBuilder.IQueryBuilderFactory {
  static className: string = ClassNames.Driver.KnexQueryBuilderFactory

  getClassName() {
    return ClassNames.Driver.KnexQueryBuilderFactory
  }

  make(model: NajsEloquent.Model.IModel): KnexQueryBuilder<any> {
    return new KnexQueryBuilder(new KnexQueryBuilderHandler(model))
  }
}
register(KnexQueryBuilderFactory, ClassNames.Driver.KnexQueryBuilderFactory, true, true)
