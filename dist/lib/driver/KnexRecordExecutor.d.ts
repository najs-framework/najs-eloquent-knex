import Model = NajsEloquent.Model.IModel;
import * as Knex from 'knex';
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent';
import { KnexQueryLog } from './KnexQueryLog';
export declare class KnexRecordExecutor extends NajsEloquentLib.Driver.RecordExecutorBase {
    protected logger: KnexQueryLog;
    protected knex?: Knex.QueryBuilder;
    protected tableName: string;
    protected connectionName: string;
    constructor(model: Model, record: NajsEloquentLib.Driver.Record, tableName: string, connectionName: string, logger: KnexQueryLog);
    getKnexQueryBuilder(): Knex.QueryBuilder;
    createRecord<R = any>(action: string): Promise<R>;
    updateRecord<R = any>(action: string): Promise<R>;
    hardDeleteRecord<R = any>(): Promise<R>;
    getModifiedData(): {};
    startLog(): KnexQueryLog;
}
