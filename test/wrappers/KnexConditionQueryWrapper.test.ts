import 'jest'
import * as Sinon from 'sinon'
import { KnexConditionQueryWrapper } from '../../lib/wrappers/KnexConditionQueryWrapper'

describe('KnexBasicQueryWrapper', function() {
  const forwardingRules = {
    where: 'where',
    orWhere: 'orWhere',
    andWhere: 'andWhere',
    whereNot: 'whereNot',
    andWhereNot: 'whereNot',
    orWhereNot: 'orWhereNot',
    whereIn: 'whereIn',
    andWhereIn: 'whereIn',
    orWhereIn: 'orWhereIn',
    whereNotIn: 'whereNotIn',
    andWhereNotIn: 'whereNotIn',
    orWhereNotIn: 'orWhereNotIn',
    whereNull: 'whereNull',
    andWhereNull: 'whereNull',
    orWhereNull: 'orWhereNull',
    whereNotNull: 'whereNotNull',
    andWhereNotNull: 'whereNotNull',
    orWhereNotNull: 'orWhereNotNull',
    whereBetween: 'whereBetween',
    andWhereBetween: 'whereBetween',
    orWhereBetween: 'orWhereBetween',
    whereNotBetween: 'whereNotBetween',
    andWhereNotBetween: 'andWhereNotBetween',
    orWhereNotBetween: 'orWhereNotBetween'
  }

  for (const func in forwardingRules) {
    const receiveFunction = forwardingRules[func]
    describe(`.${func}()`, function() {
      it(`passes all arguments to knexQuery.${receiveFunction}()`, function() {
        const query: any = { [receiveFunction]() {} }
        const wrapper = new KnexConditionQueryWrapper(query)

        const spy = Sinon.spy(query, receiveFunction)

        expect(wrapper[func]('a', 'b') === wrapper).toBe(true)
        expect(spy.calledWith('a', 'b')).toBe(true)
        spy.resetHistory()
      })
    })
  }
})
