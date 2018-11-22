import { ColumnName } from './types';
export interface IKnexCustomBasicQuery {
    /**
     * Select columns with aliases, the keys in given object are alias, the values are column's name.
     *
     * @param {Object} aliases
     */
    select(aliases: {
        [alias: string]: string;
    }): this;
    select(columnNames: ColumnName[]): this;
    select(...columnNames: Array<ColumnName | ColumnName[]>): this;
}
export declare type IKnexBasicQuery = IKnexCustomBasicQuery & NajsEloquent.QueryGrammar.IBasicQuery;
