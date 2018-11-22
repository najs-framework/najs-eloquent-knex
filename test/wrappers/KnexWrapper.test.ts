import 'jest'
import { Facade } from 'najs-facade'
import { KnexProviderFacade } from '../../lib/facades/global/KnexProviderFacade'
import { KnexWrapper } from '../../lib/wrappers/KnexWrapper'

describe('KnexWrapper', function() {
  it('extends Facade and implements Autoload under name "NajsEloquent.Knex.Wrapper.KnexWrapper"', function() {
    KnexProviderFacade.createStub('create').returns({})

    const wrapper = new KnexWrapper()
    expect(wrapper).toBeInstanceOf(Facade)
    expect(wrapper.getClassName()).toEqual('NajsEloquent.Knex.Wrapper.KnexWrapper')

    KnexProviderFacade.restoreFacade()
  })

  describe('.getConnection()', function() {
    it('does nothing, returns itself if the name is equals to current connectionName', function() {
      KnexProviderFacade.createStub('create').returns({})

      const wrapper = new KnexWrapper()
      expect(wrapper.getConnection('default') === wrapper).toBe(true)

      KnexProviderFacade.restoreFacade()
    })

    it('creates and returns new instance if the name is not equal to connectionName', function() {
      KnexProviderFacade.createStub('create').returns({})

      const wrapper = new KnexWrapper()
      const newWrapper = wrapper.getConnection('test')
      expect(newWrapper === wrapper).toBe(false)
      expect(newWrapper).toBeInstanceOf(KnexWrapper)

      KnexProviderFacade.restoreFacade()
    })
  })

  describe('Facade methods', function() {
    it('is not forwarded to knex, instead it returns a member from the instance', function() {
      const knex: object = {}
      KnexProviderFacade.createStub('create').returns(knex)
      const wrapper = new KnexWrapper()
      const members = Object.getOwnPropertyDescriptors(wrapper)
      for (const name in members) {
        wrapper[name] = 'test'
        expect(wrapper[name]).toEqual('test')
      }
      KnexProviderFacade.restoreFacade()
    })
  })

  describe('Knex methods', function() {
    it('forwards to knex if the attribute is exists', function() {
      const knex: object = {
        test: function() {}
      }
      KnexProviderFacade.createStub('create').returns(knex)
      const wrapper = new KnexWrapper()
      expect(wrapper['test'] === knex['test']).toBe(true)
      KnexProviderFacade.restoreFacade()
    })
  })
})
