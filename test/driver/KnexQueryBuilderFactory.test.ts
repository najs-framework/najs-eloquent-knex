import 'jest'
import { make } from 'najs-binding'
import { KnexQueryBuilder } from '../../lib/driver/KnexQueryBuilder'
import { KnexQueryBuilderFactory } from '../../lib/driver/KnexQueryBuilderFactory'

describe('KnexQueryBuilderFactory', function() {
  it('implements IAutoload and register with singleton option = true', function() {
    const a = make<KnexQueryBuilderFactory>(KnexQueryBuilderFactory.className)
    const b = make<KnexQueryBuilderFactory>(KnexQueryBuilderFactory.className)
    expect(a.getClassName()).toEqual('NajsEloquent.Driver.Knex.KnexQueryBuilderFactory')
    expect(a === b).toBe(true)
  })

  describe('.make()', function() {
    it('creates new instance of KnexQueryBuilder', function() {
      const model: any = {
        getRecordName() {
          return 'model'
        }
      }
      const factory = make<KnexQueryBuilderFactory>(KnexQueryBuilderFactory.className)
      const qb1 = factory.make(model)
      const qb2 = factory.make(model)
      expect(qb1).toBeInstanceOf(KnexQueryBuilder)
      expect(qb1 === qb2).toBe(false)
    })
  })
})
