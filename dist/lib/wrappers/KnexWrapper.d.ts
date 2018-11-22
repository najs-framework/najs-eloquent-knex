import * as Knex from 'knex';
import { Facade } from 'najs-facade';
export declare const KnexWrapperProxyHandler: {
    get(target: any, property: string): any;
};
export interface KnexWrapper extends Knex, Knex.QueryBuilder {
}
export declare class KnexWrapper extends Facade implements Najs.Contracts.Autoload {
    protected knex: Knex;
    protected connectionName: string;
    constructor(name?: string);
    getClassName(): string;
    getConnection(name: string): KnexWrapper;
}
