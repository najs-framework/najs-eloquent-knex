import 'jest';
import { KnexQueryBuilderType } from '../../lib/driver/KnexQueryBuilder';
export declare function makeQueryBuilder(table: string): KnexQueryBuilderType<any>;
export declare function generatedSqlQuery(cb: (this: KnexQueryBuilderType<any>, queryBuilder: KnexQueryBuilderType<any>) => void, table?: string): string;
export declare type TestSqlData = {
    desc?: string;
    code: (queryBuilder: KnexQueryBuilderType<any>) => any;
    sql: string;
};
export declare type TestSqlDataset = {
    [func in string]: TestSqlData[];
};
export declare function generateTestSuite(dataset: TestSqlDataset): void;
