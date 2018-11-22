/// <reference types="najs-binding" />

import * as Knex from 'knex'
import { register } from 'najs-binding'
import { Facade } from 'najs-facade'
import { ClassNames } from '../constants'
import { KnexProvider } from '../facades/global/KnexProviderFacade'

export const KnexWrapperProxyHandler = {
  get(target: any, property: string) {
    if (typeof target['knex'] === 'undefined') {
      target['knex'] = <any>KnexProvider.create(target['connectionName'])
    }

    if (typeof target['knex'][property] !== 'undefined') {
      return target['knex'][property]
    }

    return target[property]
  }
}

export interface KnexWrapper extends Knex, Knex.QueryBuilder {}
export class KnexWrapper extends Facade implements Najs.Contracts.Autoload {
  protected knex: Knex
  protected connectionName: string

  constructor(name: string = 'default') {
    super()
    this.connectionName = name

    return new Proxy(this, KnexWrapperProxyHandler)
  }

  getClassName() {
    return ClassNames.Knex.Wrapper.KnexWrapper
  }

  getConnection(name: string): KnexWrapper {
    if (name === this.connectionName) {
      return this
    }

    return new KnexWrapper(name)
  }
}
register(KnexWrapper, ClassNames.Knex.Wrapper.KnexWrapper)
