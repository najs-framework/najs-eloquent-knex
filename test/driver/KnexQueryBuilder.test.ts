import 'jest'
import * as Sinon from 'sinon'
import { KnexQueryBuilder } from '../../lib/driver/KnexQueryBuilder'

describe('KnexQueryBuilder', function() {
  describe('.native()', function() {
    it('is chainable, gets native Knex.QueryBuilder from this.handler.getKnexQueryBuilder() then apply to callback', function() {
      const knexQuery: any = {}
      const handler: any = {
        getKnexQueryBuilder() {
          return knexQuery
        }
      }
      const knexQueryBuilder = new KnexQueryBuilder(handler)
      const callback = function() {}
      const spy = Sinon.spy(callback)

      expect(knexQueryBuilder.native(spy) === knexQueryBuilder).toBe(true)
      expect(spy.calledWith(knexQuery)).toBe(true)
      expect(spy.lastCall.thisValue === knexQuery).toBe(true)
    })
  })

  describe('.toSqlQuery()', function() {
    it('calls and returns this.handler.getKnexQueryBuilder().toQuery()', function() {
      const knexQuery: any = {
        toQuery() {
          return 'anything'
        }
      }
      const handler: any = {
        getKnexQueryBuilder() {
          return knexQuery
        }
      }
      const knexQueryBuilder = new KnexQueryBuilder(handler)
      expect(knexQueryBuilder.toSqlQuery()).toEqual('anything')
    })
  })
})
