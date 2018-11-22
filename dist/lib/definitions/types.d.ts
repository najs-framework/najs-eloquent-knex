/// <reference types="node" />
import * as Knex from 'knex';
export declare type Callback = Function;
export declare type Client = Function;
export declare type Value = string | number | boolean | Date | Array<string> | Array<number> | Array<Date> | Array<boolean> | Buffer | Knex.Raw;
export declare type ColumnName = string | Knex.Raw | {
    [key: string]: string;
};
export declare type TableName = string | Knex.Raw;
