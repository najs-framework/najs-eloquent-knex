/// <reference types="najs-eloquent" />

import IModel = NajsEloquent.Model.IModel
import IQueryBuilderHandler = NajsEloquent.QueryBuilder.IQueryBuilderHandler

import { register } from 'najs-binding'
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent'
import { ClassNames } from '../constants'
import { KnexRecordExecutor } from './KnexRecordExecutor'
import { KnexQueryExecutor } from './KnexQueryExecutor'
import { KnexQueryBuilderHandler } from './KnexQueryBuilderHandler'
import { KnexQueryLog } from './KnexQueryLog'
import { get_table_name, get_connection_name } from '../utils/helpers'

export class KnexExecutorFactory implements NajsEloquent.Driver.IExecutorFactory {
  static className: string = ClassNames.Driver.KnexExecutorFactory

  makeRecordExecutor<T extends NajsEloquentLib.Driver.Record>(model: IModel, record: T): KnexRecordExecutor {
    return new KnexRecordExecutor(model, record, get_table_name(model), get_connection_name(model), this.makeLogger())
  }

  makeQueryExecutor(handler: IQueryBuilderHandler): KnexQueryExecutor {
    return new KnexQueryExecutor(handler as KnexQueryBuilderHandler, this.makeLogger())
  }

  getClassName() {
    return ClassNames.Driver.KnexExecutorFactory
  }

  makeLogger(): KnexQueryLog {
    return new KnexQueryLog()
  }
}
register(KnexExecutorFactory, ClassNames.Driver.KnexExecutorFactory, true, true)
