import 'jest'
import { QueryLog } from 'najs-eloquent'
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent'
import { KnexQueryLog } from '../../lib/driver/KnexQueryLog'

describe('KnexQueryLog', function() {
  beforeEach(function() {
    QueryLog.clear().enable()
  })

  it('extends QueryLogBase', function() {
    const logger = new KnexQueryLog()
    expect(logger).toBeInstanceOf(NajsEloquentLib.Driver.QueryLogBase)
  })

  describe('.getDefaultData()', function() {
    it('return empty "raw" and "queryBuilderData"', function() {
      const logger = new KnexQueryLog()
      expect(logger.getDefaultData()).toEqual({ raw: '', queryBuilderData: {} })
    })
  })

  describe('.name()', function() {
    it('is chainable, sets the name to data', function() {
      const logger = new KnexQueryLog()
      expect(logger.name('test') === logger).toBe(true)
      expect(logger['data']).toEqual({ raw: '', queryBuilderData: {}, name: 'test' })
    })
  })

  describe('.queryBuilderData()', function() {
    it('is chainable, sets the value to "queryBuilderData" with given key', function() {
      const logger = new KnexQueryLog()
      expect(logger.queryBuilderData('test', 'value') === logger).toBe(true)
      expect(logger['data']).toEqual({ raw: '', queryBuilderData: { test: 'value' } })

      expect(logger.queryBuilderData('test', 'changed') === logger).toBe(true)
      expect(logger['data']).toEqual({ raw: '', queryBuilderData: { test: 'changed' } })
    })
  })

  describe('.sql()', function() {
    it('is chainable, set given data to "sql" and returns given data', function() {
      const logger = new KnexQueryLog()
      expect(logger.sql('test') === logger).toBe(true)
      expect(logger['data']).toEqual({ sql: 'test', raw: '', queryBuilderData: {} })
    })
  })

  describe('.action()', function() {
    it('is chainable, sets the action to data', function() {
      const logger = new KnexQueryLog()
      expect(logger.action('test') === logger).toBe(true)
      expect(logger['data']).toEqual({ raw: '', queryBuilderData: {}, action: 'test' })
    })
  })

  describe('.raw()', function() {
    it('is chainable, appends all params to raw, if param is object it stringify param first', function() {
      const logger = new KnexQueryLog()
      expect(logger.raw('1') === logger).toBe(true)
      expect(logger['data']).toEqual({ raw: '1', queryBuilderData: {} })
      logger.raw('2', { a: 1 }, '3')
      expect(logger['data']).toEqual({ raw: '12{"a":1}3', queryBuilderData: {} })
    })
  })

  describe('.end()', function() {
    it('assigns param to data under key "result", and push to QueryLog, then returns the result', function() {
      const result = {}
      const logger = new KnexQueryLog()
      expect(logger.end(result) === result).toBe(true)

      expect(QueryLog.pull()[0].data).toEqual({ raw: '', queryBuilderData: {}, result: result })
    })
  })
})
