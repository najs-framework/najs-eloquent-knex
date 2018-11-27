import 'jest'
import * as Sinon from 'sinon'
import * as NajsBinding from 'najs-binding'
import { NajsEloquent as NajsEloquentLib } from 'najs-eloquent'
import { KnexDriver } from '../../lib/driver/KnexDriver'
import { KnexQueryBuilderFactory } from '../../lib/driver/KnexQueryBuilderFactory'

describe('KnexDriver', function() {
  it('extends DriverBase, implements Autoload under name "NajsEloquent.Driver.KnexDriver"', function() {
    const driver = new KnexDriver()
    expect(driver).toBeInstanceOf(NajsEloquentLib.Driver.DriverBase)
    expect(driver.getClassName()).toEqual('NajsEloquent.Driver.KnexDriver')
  })

  describe('constructor()', function() {
    it('makes RecordManager from "NajsEloquent.Feature.RecordManager" class', function() {
      const makeSpy = Sinon.spy(NajsBinding, 'make')
      const driver = new KnexDriver()
      expect(makeSpy.lastCall.calledWith(NajsEloquentLib.Driver.RecordManager)).toBe(true)
      expect(driver['recordManager']).toBeInstanceOf(NajsEloquentLib.Driver.RecordManager)
      makeSpy.restore()
    })
  })

  describe('.getClassName()', function() {
    it('implements Autoload under name "NajsEloquent.Driver.KnexDriver"', function() {
      const driver = new KnexDriver()
      expect(driver.getClassName()).toEqual('NajsEloquent.Driver.KnexDriver')
    })
  })

  describe('.getRecordManager()', function() {
    it('simply returns property "recordManager"', function() {
      const driver = new KnexDriver()
      expect(driver.getRecordManager() === driver['recordManager']).toBe(true)
    })
  })

  describe('.makeQueryBuilderFactory()', function() {
    it('creates and returns an instance of KnexQueryBuilderFactory', function() {
      const driver = new KnexDriver()
      const factory1 = driver.makeQueryBuilderFactory()
      const factory2 = driver.makeQueryBuilderFactory()
      expect(factory1 === factory2).toBe(true)
      expect(factory1).toBeInstanceOf(KnexQueryBuilderFactory)
    })
  })
})
