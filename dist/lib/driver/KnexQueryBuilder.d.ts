import * as Knex from 'knex';
import { IKnexBasicQuery } from '../definitions/IKnexBasicQuery';
import { IKnexConditionQuery } from '../definitions/IKnexConditionQuery';
import { KnexQueryBuilderHandler } from './KnexQueryBuilderHandler';
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent';
export declare type KnexQueryBuilderType<T> = KnexQueryBuilder<T> & IKnexBasicQuery & IKnexConditionQuery;
export declare class KnexQueryBuilder<T, H extends KnexQueryBuilderHandler = KnexQueryBuilderHandler> extends NajsEloquentLib
    .QueryBuilder.QueryBuilder<T, H> {
    native(handler: (queryBuilder: Knex.QueryBuilder) => any): this;
    toSqlQuery(): string;
}
