import 'jest'
import * as Sinon from 'sinon'
import { KnexBasicQueryWrapper } from '../../lib/wrappers/KnexBasicQueryWrapper'

describe('KnexBasicQueryWrapper', function() {
  describe('.select()', function() {
    it('flattens then passes all arguments to knexQuery.select()', function() {
      const query: any = { select() {} }
      const wrapper = new KnexBasicQueryWrapper(query)

      const spy = Sinon.spy(query, 'select')
      expect(wrapper.select('a', ['b', 'c'], 'd', 'e') === wrapper).toBe(true)
      expect(spy.calledWith('a', 'b', 'c', 'd', 'e')).toBe(true)
    })
  })

  describe('.limit()', function() {
    it('simply passes to knexQuery.limit()', function() {
      const query: any = { limit() {} }
      const wrapper = new KnexBasicQueryWrapper(query)

      const spy = Sinon.spy(query, 'limit')
      expect(wrapper.limit(1000) === wrapper).toBe(true)
      expect(spy.calledWith(1000)).toBe(true)
    })
  })

  describe('.orderBy()', function() {
    it('simply passes to knexQuery.orderBy()', function() {
      const query: any = { orderBy() {} }
      const wrapper = new KnexBasicQueryWrapper(query)

      const spy = Sinon.spy(query, 'orderBy')
      expect(wrapper.orderBy('test') === wrapper).toBe(true)
      expect(spy.calledWith('test')).toBe(true)

      expect(wrapper.orderBy('test', 'asc') === wrapper).toBe(true)
      expect(spy.calledWith('test', 'asc')).toBe(true)

      expect(wrapper.orderBy('test', 'desc') === wrapper).toBe(true)
      expect(spy.calledWith('test', 'desc')).toBe(true)
    })
  })
})
