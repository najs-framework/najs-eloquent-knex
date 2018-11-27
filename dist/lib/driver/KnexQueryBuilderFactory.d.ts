import { KnexQueryBuilder } from './KnexQueryBuilder';
export declare class KnexQueryBuilderFactory implements NajsEloquent.QueryBuilder.IQueryBuilderFactory {
    static className: string;
    getClassName(): string;
    make(model: NajsEloquent.Model.IModel): KnexQueryBuilder<any>;
}
