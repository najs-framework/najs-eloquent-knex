/// <reference types="najs-eloquent" />

import { register, make } from 'najs-binding'
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent'
import { ClassNames } from '../constants'
import { KnexQueryBuilderFactory } from './KnexQueryBuilderFactory'
import { KnexExecutorFactory } from './KnexExecutorFactory'

export class KnexDriver<T extends NajsEloquentLib.Driver.Record = NajsEloquentLib.Driver.Record> extends NajsEloquentLib
  .Driver.DriverBase<T> {
  protected recordManager: NajsEloquent.Feature.IRecordManager<T>
  static Name = 'mongodb'

  constructor() {
    super()

    this.recordManager = make(NajsEloquentLib.Driver.RecordManager, [make(KnexExecutorFactory.className)])
  }

  getClassName() {
    return ClassNames.Driver.KnexDriver
  }

  getRecordManager() {
    return this.recordManager
  }

  makeQueryBuilderFactory() {
    return make<KnexQueryBuilderFactory>(KnexQueryBuilderFactory.className)
  }
}
register(KnexDriver, ClassNames.Driver.KnexDriver)
