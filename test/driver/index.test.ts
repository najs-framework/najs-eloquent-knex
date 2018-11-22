import 'jest'
import { init_knex, knex_run_sql } from '../util'
import { KnexProvider } from '../../lib/facades/global/KnexProviderFacade'

describe('Knex.QueryBuilder', function() {
  beforeAll(async function() {
    await init_knex('knex_index')
    await knex_run_sql(
      `CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        age INT,
        PRIMARY KEY (id)
      )`
    )
    await knex_run_sql(
      `CREATE TABLE operator_and_or (
        id INT NOT NULL AUTO_INCREMENT,
        a INT,
        b INT,
        c INT,
        d INT,
        PRIMARY KEY (id)
      )`
    )
  })

  afterAll(async function() {
    await knex_run_sql(`DROP TABLE users;`)
    await knex_run_sql(`DROP TABLE operator_and_or;`)
  })

  describe('... AND ... OR ...', function() {
    function insert_data(data: object) {
      return new Promise(function(resolve) {
        const query = KnexProvider.createQueryBuilder('operator_and_or')
        query.insert(data).then(resolve)
      })
    }

    beforeAll(async function() {
      await insert_data({ a: 0, b: 0, c: 0, d: 0 })
      await insert_data({ a: 0, b: 0, c: 0, d: 1 })
      await insert_data({ a: 0, b: 0, c: 1, d: 0 })
      await insert_data({ a: 0, b: 0, c: 1, d: 1 })
      await insert_data({ a: 0, b: 1, c: 0, d: 0 })
      await insert_data({ a: 0, b: 1, c: 0, d: 1 })
      await insert_data({ a: 0, b: 1, c: 1, d: 0 })
      await insert_data({ a: 0, b: 1, c: 1, d: 1 })
      await insert_data({ a: 1, b: 0, c: 0, d: 0 })
      await insert_data({ a: 1, b: 0, c: 0, d: 1 })
      await insert_data({ a: 1, b: 0, c: 1, d: 0 })
      await insert_data({ a: 1, b: 0, c: 1, d: 1 })
      await insert_data({ a: 1, b: 1, c: 0, d: 0 })
      await insert_data({ a: 1, b: 1, c: 0, d: 1 })
      await insert_data({ a: 1, b: 1, c: 1, d: 0 })
      await insert_data({ a: 1, b: 1, c: 1, d: 1 })
    })

    it('a = 1 AND b = 1 OR c = 1', function() {
      const query = KnexProvider.createQueryBuilder('operator_and_or')
      query
        .where('a', 1)
        .orWhere('b', 1)
        .where('c', '1')
        .orWhere('d', '1')
        .then(function(result) {
          // console.log(result)
        })
    })
  })

  describe('.select()', function() {
    it('should work', function() {
      // const query = KnexProvider.createQueryBuilder('users')
      // console.log(
      //   query
      //     .select({ alias: 'column_name' })
      //     .orderBy('test', 'desc')
      //     .limit(10)
      //     .where('a', '>')
      //     .toQuery()
      // )
      // console.log(query.where('a', '0').toQuery())
    })
  })
})
