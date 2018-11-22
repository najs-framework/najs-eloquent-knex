import * as Knex from 'knex';
import { KnexBasicQueryWrapper } from '../wrappers/KnexBasicQueryWrapper';
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent';
import { KnexConditionQueryWrapper } from '../wrappers/KnexConditionQueryWrapper';
export declare class KnexQueryBuilderHandler extends NajsEloquentLib.QueryBuilder.QueryBuilderHandlerBase {
    protected knexQuery?: Knex.QueryBuilder;
    protected basicQuery?: KnexBasicQueryWrapper;
    protected conditionQuery?: KnexConditionQueryWrapper;
    protected convention: NajsEloquentLib.QueryBuilder.Shared.DefaultConvention;
    constructor(model: NajsEloquent.Model.IModel);
    getTableName(): string;
    getConnectionName(): string;
    getKnexQueryBuilder(): Knex.QueryBuilder;
    getBasicQuery(): KnexBasicQueryWrapper;
    getConditionQuery(): KnexConditionQueryWrapper;
    getQueryConvention(): NajsEloquent.QueryBuilder.IConvention;
}
