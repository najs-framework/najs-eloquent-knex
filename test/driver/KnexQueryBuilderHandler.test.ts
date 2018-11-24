import 'jest'
import * as Sinon from 'sinon'
import { KnexProviderFacade } from '../../lib/facades/global/KnexProviderFacade'
import { KnexQueryBuilderHandler } from '../../lib/driver/KnexQueryBuilderHandler'
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent'
import { KnexBasicQueryWrapper } from '../../lib/wrappers/KnexBasicQueryWrapper'
import { KnexConditionQueryWrapper } from '../../lib/wrappers/KnexConditionQueryWrapper'
import * as Helpers from '../../lib/utils/helpers'

describe('KnexQueryBuilderHandler', function() {
  describe('constructor()', function() {
    it('creates an instance of DefaultConvention then assigns to property "convention"', function() {
      const model: any = {}
      const handler = new KnexQueryBuilderHandler(model)
      expect(handler.getQueryConvention()).toBeInstanceOf(NajsEloquentLib.QueryBuilder.Shared.DefaultConvention)
    })
  })

  describe('.getTableName()', function() {
    it('calls and returns Helpers.get_table_name()', function() {
      const model: any = {}
      const stub = Sinon.stub(Helpers, 'get_table_name')
      stub.returns('anything')
      const handler = new KnexQueryBuilderHandler(model)
      expect(handler.getTableName()).toEqual('anything')
      stub.restore()
    })
  })

  describe('.getConnectionName()', function() {
    it('returns an setting property "connection" with default value is "default"', function() {
      const settingFeature = {
        getSettingProperty() {}
      }
      const driver: any = {
        getSettingFeature() {
          return settingFeature
        }
      }
      const model: any = {
        getDriver() {
          return driver
        }
      }

      const stub = Sinon.stub(settingFeature, 'getSettingProperty')
      stub.returns('anything')

      const handler = new KnexQueryBuilderHandler(model)
      expect(handler.getConnectionName()).toEqual('anything')
      expect(stub.calledWith(model, 'connection', 'default')).toBe(true)
    })
  })

  describe('.getKnexQueryBuilder()', function() {
    it('does nothing, just return property "knexQuery" if it exists', function() {
      const model: any = {}
      const handler = new KnexQueryBuilderHandler(model)
      const knexQuery: any = {}
      handler['knexQuery'] = knexQuery

      expect(handler.getKnexQueryBuilder() === knexQuery).toBe(true)
    })

    it('calls KnexProvider.createQueryBuilder() with arguments from .getTableName() and .getConnectionName()', function() {
      const model: any = {}
      const handler = new KnexQueryBuilderHandler(model)

      const getTableNameStub = Sinon.stub(handler, 'getTableName')
      getTableNameStub.returns('table')

      const getConnectionNameStub = Sinon.stub(handler, 'getConnectionName')
      getConnectionNameStub.returns('connection')

      const mock = KnexProviderFacade.createMock().expects('createQueryBuilder')
      mock.calledWith('table', 'connection')

      handler.getKnexQueryBuilder()

      mock.verify()
    })
  })

  describe('.getBasicQuery()', function() {
    it('does nothing, just return property "basicQuery" if it exists', function() {
      const model: any = {}
      const handler = new KnexQueryBuilderHandler(model)
      const basicQuery: any = {}
      handler['basicQuery'] = basicQuery

      expect(handler.getBasicQuery() === basicQuery).toBe(true)
    })

    it('creates an KnexBasicQueryWrapper which wrap .getKnexQueryBuilder()', function() {
      const model: any = {}
      const handler = new KnexQueryBuilderHandler(model)
      const knexQuery: any = {}

      const stub = Sinon.stub(handler, 'getKnexQueryBuilder')
      stub.returns(knexQuery)

      const basicQuery = handler.getBasicQuery()
      expect(basicQuery).toBeInstanceOf(KnexBasicQueryWrapper)
      expect(handler['basicQuery'] === basicQuery).toBe(true)
    })
  })

  describe('.getConditionQuery()', function() {
    it('does nothing, just return property "conditionQuery" if it exists', function() {
      const model: any = {}
      const handler = new KnexQueryBuilderHandler(model)
      const conditionQuery: any = {}
      handler['conditionQuery'] = conditionQuery

      expect(handler.getConditionQuery() === conditionQuery).toBe(true)
    })

    it('creates an KnexConditionQueryWrapper which wrap .getKnexQueryBuilder()', function() {
      const model: any = {}
      const handler = new KnexQueryBuilderHandler(model)
      const knexQuery: any = {}

      const stub = Sinon.stub(handler, 'getKnexQueryBuilder')
      stub.returns(knexQuery)

      const conditionQuery = handler.getConditionQuery()
      expect(conditionQuery).toBeInstanceOf(KnexConditionQueryWrapper)
      expect(handler['conditionQuery'] === conditionQuery).toBe(true)
    })
  })

  describe('.getQueryConvention()', function() {
    it('simply returns property "convention"', function() {
      const model: any = {}
      const handler = new KnexQueryBuilderHandler(model)
      expect(handler.getQueryConvention() === handler['convention']).toBe(true)
    })
  })
})
