import { ColumnName } from '../definitions/types';
import { IKnexBasicQuery } from '../definitions/IKnexBasicQuery';
import { KnexQueryBuilderWrapperBase } from './KnexQueryBuilderWrapperBase';
export declare class KnexBasicQueryWrapper extends KnexQueryBuilderWrapperBase implements IKnexBasicQuery {
    select(aliases: {
        [alias: string]: string;
    }): this;
    select(columnNames: ColumnName[]): this;
    select(...columnNames: Array<ColumnName | ColumnName[]>): this;
    limit(record: number): this;
    orderBy(field: string, direction?: 'asc' | 'desc'): this;
}
