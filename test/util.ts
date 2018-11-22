import { KnexProviderFacade } from '../lib/facades/global/KnexProviderFacade'

export function init_knex(database: string): Promise<any> {
  return new Promise(resolve => {
    const connection = {
      host: '127.0.0.1',
      user: 'root',
      password: ''
    }

    KnexProviderFacade.setDefaultConfig({
      client: 'mysql',
      connection: connection
    })

    const dropDatabaseSql = `DROP DATABASE IF EXISTS ${database}`
    const createDatabaseSql = `CREATE DATABASE ${database} DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_bin`
    const knex = KnexProviderFacade.create()
    knex.raw(dropDatabaseSql).then(function(result) {
      knex.raw(createDatabaseSql).then(function(result) {
        connection['database'] = database
        KnexProviderFacade.setDefaultConfig({
          client: 'mysql',
          connection: connection
        })
        resolve()
      })
    })
  })
}

export function knex_run_sql(sql: string): Promise<any> {
  return new Promise(resolve => {
    KnexProviderFacade.create()
      .raw(sql)
      .then(resolve)
  })
}
