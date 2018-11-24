import * as Knex from 'knex';
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent';
import { KnexQueryLog } from './KnexQueryLog';
import { KnexQueryBuilderHandler } from './KnexQueryBuilderHandler';
export declare class KnexQueryExecutor extends NajsEloquentLib.Driver.ExecutorBase implements NajsEloquent.QueryBuilder.IQueryExecutor {
    protected queryHandler: KnexQueryBuilderHandler;
    protected logger: KnexQueryLog;
    protected knex?: Knex.QueryBuilder;
    protected tableName: string;
    protected connectionName: string;
    constructor(queryHandler: KnexQueryBuilderHandler, logger: KnexQueryLog);
    get(): Promise<object[]>;
    first(): Promise<object | null | undefined>;
    count(): Promise<number>;
    update(data: Object): Promise<any>;
    delete(): Promise<any>;
    restore(): Promise<any>;
    execute(): Promise<any>;
}
