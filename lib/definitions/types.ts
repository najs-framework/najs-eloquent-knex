import * as Knex from 'knex'

export type Callback = Function
export type Client = Function
export type Value =
  | string
  | number
  | boolean
  | Date
  | Array<string>
  | Array<number>
  | Array<Date>
  | Array<boolean>
  | Buffer
  | Knex.Raw
export type ColumnName = string | Knex.Raw | { [key: string]: string }
export type TableName = string | Knex.Raw
