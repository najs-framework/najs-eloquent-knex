import '../../wrappers/KnexWrapper'
import { KnexWrapper } from '../../wrappers/KnexWrapper'
import { make } from 'najs-binding'
import { Facade, IFacade, IFacadeBase } from 'najs-facade'
import { NajsEloquentFacadeContainer } from 'najs-eloquent'
import { ClassNames } from '../../constants'

const facade = Facade.create<KnexWrapper>(NajsEloquentFacadeContainer, 'DB', function() {
  return make<KnexWrapper>(ClassNames.Knex.Wrapper.KnexWrapper)
})

export const DBFacade: KnexWrapper & IFacade = facade
export const DB: KnexWrapper & IFacadeBase = facade
