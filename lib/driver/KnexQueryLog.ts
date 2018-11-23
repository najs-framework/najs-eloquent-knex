import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent'

export interface IKnexQueryLogData extends NajsEloquentLib.Driver.IQueryLogData {
  sql?: string
}

export class KnexQueryLog extends NajsEloquentLib.Driver.QueryLogBase<IKnexQueryLogData> {
  getDefaultData(): IKnexQueryLogData {
    return this.getEmptyData()
  }

  sql(sql?: string): this {
    this.data.sql = sql

    return this
  }
}
