import * as Knex from 'knex';
export declare class KnexQueryBuilderWrapperBase {
    protected knexQuery: Knex.QueryBuilder;
    constructor(knexQuery: Knex.QueryBuilder);
    getKnexQueryBuilder(): Knex.QueryBuilder;
}
