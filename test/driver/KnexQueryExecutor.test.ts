import 'jest'
import { QueryLog, NajsEloquent as NajsEloquentLib } from 'najs-eloquent'
import { init_knex, knex_run_sql } from '../util'
import { KnexQueryBuilderHandler } from '../../lib/driver/KnexQueryBuilderHandler'
import { KnexQueryBuilder } from '../../lib/driver/KnexQueryBuilder'

describe('MongodbRecordExecutor', function() {
  const dataset = [
    { first_name: 'john', last_name: 'doe', age: 30 },
    { first_name: 'jane', last_name: 'doe', age: 25 },
    { first_name: 'tony', last_name: 'stark', age: 40 },
    { first_name: 'thor', last_name: 'god', age: 1000 },
    { first_name: 'captain', last_name: 'american', age: 100 },
    { first_name: 'tony', last_name: 'stewart', age: 40 },
    { first_name: 'peter', last_name: 'parker', age: 15 }
  ]

  beforeAll(async function() {
    await init_knex('knex_query_executor')
    await knex_run_sql(
      `CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        age INT,
        updated_at DATETIME,
        created_at DATETIME,
        PRIMARY KEY (id)
      )`
    )
    await knex_run_sql(
      `CREATE TABLE roles (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        deleted_at DATETIME,
        PRIMARY KEY (id)
      )`
    )
    for (const data of dataset) {
      await knex_run_sql(
        `INSERT INTO users (first_name, last_name, age) VALUES ('${data.first_name}', '${data.last_name}', ${data.age})`
      )
    }
    for (let i = 0; i < 10; i++) {
      await knex_run_sql(`INSERT INTO roles (name, deleted_at) VALUES ('role-${i}', NOW())`)
    }
  })

  afterAll(async function() {
    await knex_run_sql(`DROP TABLE users;`)
    await knex_run_sql(`DROP TABLE roles;`)
  })

  beforeEach(function() {
    QueryLog.clear().enable()
  })

  function expect_match_user(result: any, expected: any) {
    for (const name in expected) {
      expect(result[name]).toEqual(expected[name])
    }
  }

  function expect_query_log(data: object, result: any = undefined, index: number = 0) {
    const logData = QueryLog.pull()[index]['data']
    if (typeof result !== undefined) {
      expect(logData['result'] === result).toBe(true)
    }
    expect(logData).toMatchObject(data)
  }

  function makeQueryBuilderHandler(model: any): KnexQueryBuilderHandler {
    let fakeModel: any
    if (typeof model === 'string') {
      fakeModel = {
        getDriver() {
          return {
            getSettingFeature() {
              return {
                getSettingProperty(any: any, property: any) {
                  return property === 'table' ? model : 'default'
                }
              }
            },
            getSoftDeletesFeature() {
              return {
                hasSoftDeletes() {
                  return false
                }
              }
            },
            getTimestampsFeature() {
              return {
                hasTimestamps() {
                  return false
                }
              }
            }
          }
        },

        getRecordName() {
          return model
        }
      }
    } else {
      fakeModel = model
    }

    return new KnexQueryBuilderHandler(fakeModel)
  }

  function makeQueryBuilder(handler: KnexQueryBuilderHandler): KnexQueryBuilder<any> {
    return new KnexQueryBuilder(handler)
  }

  it('extends NajsEloquent.Driver.ExecutorBase', function() {
    const executor = makeQueryBuilderHandler('users').getQueryExecutor()
    expect(executor).toBeInstanceOf(NajsEloquentLib.Driver.ExecutorBase)
  })

  describe('.get()', function() {
    it('gets all data of collection and return an instance of Collection<Eloquent<T>>', async function() {
      const handler = makeQueryBuilderHandler('users')
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          sql: 'select * from `users`',
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().then(...)',
          action: 'get'
        },
        result
      )
      expect(result.length).toEqual(7)
      for (let i = 0; i < 7; i++) {
        expect_match_user(result[i], dataset[i])
      }
    })

    it('returns an empty collection if no result', async function() {
      const handler = makeQueryBuilderHandler('users')
      makeQueryBuilder(handler).where('first_name', 'no-one')
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          sql: "select * from `users` where `first_name` = 'no-one'",
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().then(...)'
        },
        result
      )
      expect(result.length === 0).toBe(true)
    })

    it('can get data by query builder, case 1', async function() {
      const handler = makeQueryBuilderHandler('users')
      makeQueryBuilder(handler).where('age', 1000)
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          sql: 'select * from `users` where `age` = 1000',
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().then(...)',
          action: 'get'
        },
        result
      )
      expect(result.length).toEqual(1)
      expect_match_user(result[0], dataset[3])
    })

    it('can get data by query builder, case 2', async function() {
      const handler = makeQueryBuilderHandler('users')
      makeQueryBuilder(handler).where('age', 40)
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          sql: 'select * from `users` where `age` = 40',
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().then(...)',
          action: 'get'
        },
        result
      )
      expect(result.length).toEqual(2)
      expect_match_user(result[0], dataset[2])
      expect_match_user(result[1], dataset[5])
    })

    it('can get data by query builder, case 3', async function() {
      const handler = makeQueryBuilderHandler('users')
      makeQueryBuilder(handler)
        .where('age', 40)
        .where('last_name', 'stark')
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          sql: "select * from `users` where `age` = 40 and `last_name` = 'stark'",
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().then(...)',
          action: 'get'
        },
        result
      )
      expect(result.length).toEqual(1)
      expect_match_user(result[0], dataset[2])
    })

    it('can get data by query builder, case 4', async function() {
      const handler = makeQueryBuilderHandler('users')
      makeQueryBuilder(handler)
        .where('age', 40)
        .orWhere('first_name', 'peter')
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          sql: "select * from `users` where `age` = 40 or `first_name` = 'peter'",
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().then(...)',
          action: 'get'
        },
        result
      )
      expect(result.length).toEqual(3)
      expect_match_user(result[0], dataset[2])
      expect_match_user(result[1], dataset[5])
      expect_match_user(result[2], dataset[6])
    })

    it('can get data by query builder, case 5', async function() {
      const handler = makeQueryBuilderHandler('users')
      makeQueryBuilder(handler)
        .where('age', 40)
        .orWhere('first_name', 'peter')
        .orderBy('id', 'desc')
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          sql: "select * from `users` where `age` = 40 or `first_name` = 'peter' order by `id` desc",
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().then(...)',
          action: 'get'
        },
        result
      )
      expect(result.length).toEqual(3)
      expect_match_user(result[0], dataset[6])
      expect_match_user(result[1], dataset[5])
      expect_match_user(result[2], dataset[2])
    })

    it('returns an empty array if executeMode is disabled', async function() {
      const handler = makeQueryBuilderHandler('users')
      makeQueryBuilder(handler)
        .where('age', 40)
        .orWhere('first_name', 'peter')
        .orderBy('id', 'desc')

      const result = await handler
        .getQueryExecutor()
        .setExecuteMode('disabled')
        .get()

      expect_query_log(
        {
          sql: undefined,
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().then(...)',
          action: 'get'
        },
        result
      )
      expect(result).toEqual([])
    })
  })

  describe('.first()', function() {
    it('finds first document of collection and return an instance of Eloquent<T>', async function() {
      const handler = makeQueryBuilderHandler('users')
      const result = await handler.getQueryExecutor().first()

      expect_query_log(
        {
          sql: 'select * from `users` limit 1',
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().limit(1).then(...)',
          action: 'first'
        },
        result
      )
      expect_match_user(result, dataset[0])
    })

    it('finds first document of collection and return an instance of Eloquent<T>', async function() {
      const handler = makeQueryBuilderHandler('users')
      makeQueryBuilder(handler).orderBy('id', 'desc')
      const result = await handler.getQueryExecutor().first()

      expect_query_log(
        {
          sql: 'select * from `users` order by `id` desc limit 1',
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().limit(1).then(...)',
          action: 'first'
        },
        result
      )
      expect_match_user(result, dataset[6])
    })

    it('returns null if no result', async function() {
      const handler = makeQueryBuilderHandler('users')
      makeQueryBuilder(handler).where('first_name', 'no-one')
      const result = await handler.getQueryExecutor().first()

      expect_query_log(
        {
          sql: "select * from `users` where `first_name` = 'no-one' limit 1",
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().limit(1).then(...)',
          action: 'first'
        },
        result
      )
      expect(result).toBeNull()
    })

    it('can find data by query builder, case 1', async function() {
      const handler = makeQueryBuilderHandler('users')
      makeQueryBuilder(handler).where('age', 1000)
      const result = await handler.getQueryExecutor().first()

      expect_query_log(
        {
          sql: 'select * from `users` where `age` = 1000 limit 1',
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().limit(1).then(...)',
          action: 'first'
        },
        result
      )
      expect_match_user(result, dataset[3])
    })

    it('can find data by query builder, case 2', async function() {
      const handler = makeQueryBuilderHandler('users')
      makeQueryBuilder(handler)
        .where('age', 40)
        .orWhere('first_name', 'jane')
      const result = await handler.getQueryExecutor().first()

      expect_query_log(
        {
          sql: "select * from `users` where `age` = 40 or `first_name` = 'jane' limit 1",
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().limit(1).then(...)',
          action: 'first'
        },
        result
      )
      expect_match_user(result, dataset[1])
    })

    it('can find data by query builder, case 3', async function() {
      const handler = makeQueryBuilderHandler('users')
      makeQueryBuilder(handler)
        .where('first_name', 'tony')
        .where('last_name', 'stewart')
      const result = await handler.getQueryExecutor().first()

      expect_query_log(
        {
          sql: "select * from `users` where `first_name` = 'tony' and `last_name` = 'stewart' limit 1",
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().limit(1).then(...)',
          action: 'first'
        },
        result
      )
      expect_match_user(result, dataset[5])
    })

    // it('can find data by .native() before using query functions of query builder', async function() {
    //   const handler = makeQueryBuilderHandler('users')
    //   const result = await makeQueryBuilder(handler)
    //     .native(function(collection) {
    //       return collection.findOne({
    //         first_name: 'tony'
    //       })
    //     })
    //     .execute()

    //   expect_match_user(result, dataset[2])
    // })

    // it('can find data by native() after using query functions of query builder', async function() {
    //   const handler = makeQueryBuilderHandler('users')
    //   const result = await makeQueryBuilder(handler)
    //     .where('age', 40)
    //     .orWhere('age', 1000)
    //     .native(function(collection, conditions) {
    //       return collection.findOne(conditions, { sort: [['last_name', -1]] })
    //     })
    //     .execute()
    //   expect_match_user(result, dataset[5])
    // })

    // it('can find data by native() and modified after using query functions of query builder', async function() {
    //   const handler = makeQueryBuilderHandler('users')
    //   const result = await await makeQueryBuilder(handler)
    //     .where('age', 40)
    //     .orWhere('age', 1000)
    //     .native(function(collection) {
    //       return collection.findOne({
    //         first_name: 'thor'
    //       })
    //     })
    //     .execute()
    //   expect_match_user(result, dataset[3])
    // })

    it('returns an undefined if executeMode is disabled', async function() {
      const handler = makeQueryBuilderHandler('users')
      makeQueryBuilder(handler)
        .where('age', 40)
        .orWhere('first_name', 'jane')
      const result = await handler
        .getQueryExecutor()
        .setExecuteMode('disabled')
        .first()

      expect_query_log(
        {
          sql: undefined,
          raw: 'KnexQueryBuilderHandler.getKnexQueryBuilder().limit(1).then(...)',
          action: 'first'
        },
        result
      )
      expect(result).toBeUndefined()
    })
  })

  describe('.count()', function() {
    it('should work', async function() {
      const handler = makeQueryBuilderHandler('users')
      await handler.getQueryExecutor().count()
    })
  })

  describe('.update()', function() {
    it('should work', async function() {
      const handler = makeQueryBuilderHandler('users')
      await handler.getQueryExecutor().update({})
    })
  })

  describe('.delete()', function() {
    it('should work', async function() {
      const handler = makeQueryBuilderHandler('users')
      await handler.getQueryExecutor().delete()
    })
  })

  describe('.restore()', function() {
    it('should work', async function() {
      const handler = makeQueryBuilderHandler('users')
      await handler.getQueryExecutor().restore()
    })
  })

  describe('.execute()', function() {
    it('should work', async function() {
      const handler = makeQueryBuilderHandler('users')
      await handler.getQueryExecutor().execute()
    })
  })
})
