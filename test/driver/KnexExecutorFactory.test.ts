import 'jest'
import { make } from 'najs-binding'
import { KnexExecutorFactory } from '../../lib/driver/KnexExecutorFactory'
import { KnexRecordExecutor } from '../../lib/driver/KnexRecordExecutor'
import { KnexQueryExecutor } from '../../lib/driver/KnexQueryExecutor'

describe('KnexExecutorFactory', function() {
  it('implement NajsEloquent.Driver.IExecutorFactory under name "NajsEloquent.Driver.Knex.KnexExecutorFactory" with singleton option', function() {
    const factory = make<KnexExecutorFactory>(KnexExecutorFactory.className)
    const another = make<KnexExecutorFactory>(KnexExecutorFactory.className)
    expect(factory === another).toBe(true)
    expect(factory.getClassName()).toEqual('NajsEloquent.Driver.Knex.KnexExecutorFactory')
  })

  describe('.makeRecordExecutor()', function() {
    it('creates new KnexRecordExecutor instance', function() {
      const settingFeature: any = {
        getSettingProperty() {
          return 'any'
        }
      }
      const driver: any = {
        getSettingFeature() {
          return settingFeature
        }
      }
      const model: any = {
        getRecordName() {
          return 'recordName'
        },
        getDriver() {
          return driver
        }
      }
      const record: any = {}
      const factory = make<KnexExecutorFactory>(KnexExecutorFactory.className)
      const recordExecutor = factory.makeRecordExecutor(model, record)
      expect(recordExecutor).toBeInstanceOf(KnexRecordExecutor)
    })
  })

  describe('.makeQueryExecutor()', function() {
    it('creates new KnexQueryExecutor instance', function() {
      const handler: any = {}
      const factory = make<KnexExecutorFactory>(KnexExecutorFactory.className)
      const recordExecutor = factory.makeQueryExecutor(handler)
      expect(recordExecutor).toBeInstanceOf(KnexQueryExecutor)
    })
  })
})
