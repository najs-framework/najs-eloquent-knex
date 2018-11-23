import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent';
export interface IKnexQueryLogData extends NajsEloquentLib.Driver.IQueryLogData {
    sql?: string;
}
export declare class KnexQueryLog extends NajsEloquentLib.Driver.QueryLogBase<IKnexQueryLogData> {
    getDefaultData(): IKnexQueryLogData;
    sql(sql: string): this;
}
