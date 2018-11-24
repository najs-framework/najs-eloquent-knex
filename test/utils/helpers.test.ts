import 'jest'
import * as Sinon from 'sinon'
import { get_table_name, get_connection_name } from '../../lib/utils/helpers'

describe('get_table_name()', function() {
  it('returns setting property "table" with default value is Model.getRecordName()', function() {
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
    const spy = Sinon.spy(settingFeature, 'getSettingProperty')
    get_table_name(model)
    expect(spy.calledWith(model, 'table', 'recordName')).toBe(true)
  })
})

describe('get_connection_name()', function() {
  it('returns setting property "connection" with default value is "default"', function() {
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
      getDriver() {
        return driver
      }
    }
    const spy = Sinon.spy(settingFeature, 'getSettingProperty')
    get_connection_name(model)
    expect(spy.calledWith(model, 'connection', 'default')).toBe(true)
  })
})
