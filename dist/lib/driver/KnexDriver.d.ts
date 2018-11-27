import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent';
import { KnexQueryBuilderFactory } from './KnexQueryBuilderFactory';
export declare class KnexDriver<T extends NajsEloquentLib.Driver.Record = NajsEloquentLib.Driver.Record> extends NajsEloquentLib
    .Driver.DriverBase<T> {
    protected recordManager: NajsEloquent.Feature.IRecordManager<T>;
    static Name: string;
    constructor();
    getClassName(): string;
    getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
    makeQueryBuilderFactory(): KnexQueryBuilderFactory;
}
