import { IKnexConditionQuery } from '../definitions/IKnexConditionQuery';
import { KnexQueryBuilderWrapperBase } from './KnexQueryBuilderWrapperBase';
export declare class KnexConditionQueryWrapper extends KnexQueryBuilderWrapperBase implements IKnexConditionQuery {
    where(): this;
    orWhere(): this;
    andWhere(): this;
    whereNot(): this;
    andWhereNot(): this;
    orWhereNot(): this;
    whereIn(): this;
    andWhereIn(): this;
    orWhereIn(): this;
    whereNotIn(): this;
    andWhereNotIn(): this;
    orWhereNotIn(): this;
    whereNull(): this;
    andWhereNull(): this;
    orWhereNull(): this;
    whereNotNull(): this;
    andWhereNotNull(): this;
    orWhereNotNull(): this;
    whereBetween(): this;
    andWhereBetween(): this;
    orWhereBetween(): this;
    whereNotBetween(): this;
    andWhereNotBetween(): this;
    orWhereNotBetween(): this;
}
