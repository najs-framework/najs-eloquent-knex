import 'jest'
import { KnexQueryBuilderWrapperBase } from '../../lib/wrappers/KnexQueryBuilderWrapperBase'

describe('KnexQueryBuilderWrapperBase', function() {
  describe('constructor()', function() {
    it('needs knexQuery which is wrapped', function() {
      const query: any = {}
      const instance = Reflect.construct(KnexQueryBuilderWrapperBase, [query])
      expect(instance.knexQuery === query).toBe(true)
    })
  })

  describe('.getKnexQueryBuilder()', function() {
    it('simply returns property "knexQuery"', function() {
      const query: any = {}
      const instance = Reflect.construct(KnexQueryBuilderWrapperBase, [query])
      expect(instance.getKnexQueryBuilder() === query).toBe(true)
    })
  })
})
