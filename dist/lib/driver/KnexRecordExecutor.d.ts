import Model = NajsEloquent.Model.IModel;
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent';
import { KnexQueryLog } from './KnexQueryLog';
import { KnexWrapper } from '../wrappers/KnexWrapper';
export declare class KnexRecordExecutor extends NajsEloquentLib.Driver.RecordExecutorBase {
    protected logger: KnexQueryLog;
    protected knex: KnexWrapper;
    protected tableName: string;
    protected connectionName: string;
    constructor(model: Model, record: NajsEloquentLib.Driver.Record, logger: KnexQueryLog);
    createRecord<R = any>(action: string): Promise<R>;
    updateRecord<R = any>(action: string): Promise<R>;
    hardDeleteRecord<R = any>(): Promise<R>;
    getModifiedData(): {};
    startLog(): KnexQueryLog;
}
