/// <reference path="../../contracts/KnexProvider.ts" />

import '../../providers/KnexProvider'
import { make } from 'najs-binding'
import { Facade, IFacade, IFacadeBase } from 'najs-facade'
import { NajsEloquentFacadeContainer } from 'najs-eloquent'
import * as Knex from 'knex'
import { ClassNames } from '../../constants'

export interface IKnexProviderFacade
  extends Najs.Contracts.Eloquent.KnexProvider<Knex, Knex.QueryBuilder, Knex.Config> {}

const facade = Facade.create<IKnexProviderFacade>(NajsEloquentFacadeContainer, 'KnexProvider', function() {
  return make<IKnexProviderFacade>(ClassNames.Provider.KnexProvider)
})

export const KnexProviderFacade: IKnexProviderFacade & IFacade = facade
export const KnexProvider: IKnexProviderFacade & IFacadeBase = facade
