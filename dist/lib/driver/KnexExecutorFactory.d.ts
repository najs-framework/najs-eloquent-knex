import IModel = NajsEloquent.Model.IModel;
import IQueryBuilderHandler = NajsEloquent.QueryBuilder.IQueryBuilderHandler;
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent';
import { KnexRecordExecutor } from './KnexRecordExecutor';
import { KnexQueryExecutor } from './KnexQueryExecutor';
import { KnexQueryLog } from './KnexQueryLog';
export declare class KnexExecutorFactory implements NajsEloquent.Driver.IExecutorFactory {
    static className: string;
    makeRecordExecutor<T extends NajsEloquentLib.Driver.Record>(model: IModel, record: T): KnexRecordExecutor;
    makeQueryExecutor(handler: IQueryBuilderHandler): KnexQueryExecutor;
    getClassName(): string;
    makeLogger(): KnexQueryLog;
}
