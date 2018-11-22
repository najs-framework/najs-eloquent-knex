import { Model } from 'najs-eloquent';
import { KnexQueryBuilderType } from './KnexQueryBuilder';
import * as Knex from 'knex';
export declare class KnexModel extends Model {
    id?: string;
    newQuery(): KnexQueryBuilderType<this>;
    newQuery(cb: (queryBuilder: Knex.QueryBuilder) => any): KnexQueryBuilderType<this>;
    newQuery(name: string): KnexQueryBuilderType<this>;
}
