import 'jest'
import { QueryLog, MomentProvider, NajsEloquent as NajsEloquentLib } from 'najs-eloquent'
import { init_knex, knex_run_sql } from '../util'
import { KnexRecordExecutor } from '../../lib/driver/KnexRecordExecutor'
import { KnexQueryLog } from '../../lib/driver/KnexQueryLog'
import { FacadeContainer } from 'najs-facade'
import { KnexProviderFacade } from '../../lib/facades/global/KnexProviderFacade'

describe('MongodbRecordExecutor', function() {
  beforeAll(async function() {
    await init_knex('knex_record_executor')
    await knex_run_sql(
      `CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        age INT,
        updated_at DATETIME,
        created_at DATETIME,
        deleted_at DATETIME,
        PRIMARY KEY (id)
      )`
    )
  })

  afterAll(async function() {
    await knex_run_sql(`DROP TABLE users;`)
  })

  beforeEach(function() {
    QueryLog.clear().enable()
  })

  function makeExecutor(
    model: any,
    record: NajsEloquentLib.Driver.Record,
    table: string = 'users',
    connection: string = 'default'
  ) {
    return new KnexRecordExecutor(model, record, table, connection, new KnexQueryLog())
  }

  function makeModel(name: string, timestamps: boolean | object, softDeletes: boolean | object) {
    let timestampsFeature = {}
    if (timestamps === false) {
      timestampsFeature = {
        hasTimestamps() {
          return false
        }
      }
    } else {
      timestampsFeature = {
        hasTimestamps() {
          return true
        },
        getTimestampsSetting() {
          return timestamps
        }
      }
    }

    let softDeleteFeature = {}
    if (softDeletes === false) {
      softDeleteFeature = {
        hasSoftDeletes() {
          return false
        }
      }
    } else {
      softDeleteFeature = {
        hasSoftDeletes() {
          return true
        },
        getSoftDeletesSetting() {
          return softDeletes
        }
      }
    }

    const model = {
      getDriver() {
        return {
          getSoftDeletesFeature() {
            return softDeleteFeature
          },
          getTimestampsFeature() {
            return timestampsFeature
          }
        }
      },

      getModelName() {
        return name
      }
    }
    return model
  }

  function expect_query_log(data: object, result: any = undefined, index: number = 0) {
    const logData = QueryLog.pull()[index]['data']
    if (typeof result !== undefined) {
      expect(logData['result'] === result).toBe(true)
    }
    expect(logData).toMatchObject(data)
  }

  it('extends NajsEloquentLib.Driver.RecordExecutorBase / NajsEloquentLib.Driver.ExecutorBase', function() {
    const model = makeModel('Test', false, false)
    const record = new NajsEloquentLib.Driver.Record()
    const executor = makeExecutor(model, record)
    expect(executor).toBeInstanceOf(NajsEloquentLib.Driver.ExecutorBase)
    expect(executor).toBeInstanceOf(NajsEloquentLib.Driver.RecordExecutorBase)
  })

  describe('.getKnexQueryBuilder()', function() {
    it('create a knex query builder by KnexProvider with table name and connection, then cached it in .knex', function() {
      KnexProviderFacade.createMock()
        .expects('createQueryBuilder')
        .returns({})
        .calledWith('table', 'default')
      const model = makeModel('Test', false, false)
      const executor = makeExecutor(model, new NajsEloquentLib.Driver.Record({}))
      const knexQueryBuilder = executor.getKnexQueryBuilder()
      expect(executor.getKnexQueryBuilder() === knexQueryBuilder).toBe(true)
      FacadeContainer.verifyAndRestoreAllFacades()
    })
  })

  describe('.createRecord()', function() {
    it('can create without timestamps or softDeletes settings', async function() {
      const model = makeModel('Test', false, false)
      const data = {
        first_name: 'test',
        last_name: 'create',
        age: 1
      }
      const record = new NajsEloquentLib.Driver.Record(data)
      const result = await makeExecutor(model, record).create()
      expect_query_log(
        {
          sql: "insert into `users` (`age`, `first_name`, `last_name`) values (1, 'test', 'create')",
          raw: `KnexProvider.createQueryBuilder("users", "default").insert(${JSON.stringify(data)})`,
          action: 'Test.create()'
        },
        result
      )
    })

    it('can create with timestamps', async function() {
      const model = makeModel('Test', { createdAt: 'created_at', updatedAt: 'updated_at' }, false)
      const now = MomentProvider.make('2018-01-01 00:00:00.000')
      MomentProvider.setNow(() => now)

      const data = {
        first_name: 'test',
        last_name: 'create',
        age: 2
      }
      const record = new NajsEloquentLib.Driver.Record(data)
      const result = await makeExecutor(model, record).create()
      expect_query_log(
        {
          sql:
            "insert into `users` (`age`, `created_at`, `first_name`, `last_name`, `updated_at`) values (2, '2018-01-01 00:00:00.000', 'test', 'create', '2018-01-01 00:00:00.000')",
          raw: `KnexProvider.createQueryBuilder("users", "default").insert(${JSON.stringify(
            Object.assign({}, data, {
              updated_at: now.toDate(),
              created_at: now.toDate()
            })
          )})`,
          action: 'Test.create()'
        },
        result
      )
    })

    it('can create with softDeletes', async function() {
      const model = makeModel('Test', false, { deletedAt: 'deleted_at' })
      const now = MomentProvider.make('2018-01-01 00:00:00.000')
      MomentProvider.setNow(() => now)

      const data = {
        first_name: 'test',
        last_name: 'create',
        age: 3
      }
      const record = new NajsEloquentLib.Driver.Record(data)
      const result = await makeExecutor(model, record).create()
      expect_query_log(
        {
          sql:
            "insert into `users` (`age`, `deleted_at`, `first_name`, `last_name`) values (3, NULL, 'test', 'create')",
          raw: `KnexProvider.createQueryBuilder("users", "default").insert(${JSON.stringify(
            Object.assign({}, data, {
              // tslint:disable-next-line
              deleted_at: null
            })
          )})`,
          action: 'Test.create()'
        },
        result
      )
    })

    it('returns an empty object if executeMode is disabled', async function() {
      const model = makeModel('Test', false, { deletedAt: 'deleted_at' })
      const now = MomentProvider.make('2018-01-01 00:00:00.000')
      MomentProvider.setNow(() => now)

      const data = {
        first_name: 'test',
        last_name: 'create',
        age: 3
      }
      const record = new NajsEloquentLib.Driver.Record(data)
      const result = await makeExecutor(model, record)
        .setExecuteMode('disabled')
        .create()

      expect_query_log(
        {
          sql: undefined,
          raw: `KnexProvider.createQueryBuilder("users", "default").insert(${JSON.stringify(
            Object.assign({}, data, {
              // tslint:disable-next-line
              deleted_at: null
            })
          )})`,
          action: 'Test.create()'
        },
        result
      )
      expect(result).toEqual({})
    })
  })

  describe('.updateRecord()', function() {
    it('can update without timestamps or softDeletes settings', async function() {
      const model = makeModel('Test', false, false)
      const id = 1000
      model['getPrimaryKey'] = function() {
        return id
      }
      model['getPrimaryKeyName'] = function() {
        return 'id'
      }

      await makeExecutor(model, new NajsEloquentLib.Driver.Record({ id: id, first_name: 'any' })).create()

      const record = new NajsEloquentLib.Driver.Record({ id: id })
      record.setAttribute('first_name', 'test')
      record.setAttribute('last_name', 'update')
      const result = await makeExecutor(model, record).update()
      expect_query_log(
        {
          sql: "update `users` set `first_name` = 'test', `last_name` = 'update' where `id` = 1000",
          raw: `KnexProvider.createQueryBuilder("users", "default").where(id, 1000).update(${JSON.stringify({
            first_name: 'test',
            last_name: 'update'
          })})`,
          action: 'Test.update()'
        },
        result,
        1
      )
    })

    it('can update with timestamps', async function() {
      const model = makeModel('Test', { createdAt: 'created_at', updatedAt: 'updated_at' }, false)
      const id = 1001
      model['getPrimaryKey'] = function() {
        return id
      }
      model['getPrimaryKeyName'] = function() {
        return 'id'
      }

      await makeExecutor(model, new NajsEloquentLib.Driver.Record({ id: id, first_name: 'any' })).create()
      const now = MomentProvider.make('2018-01-01 00:00:00.000')
      MomentProvider.setNow(() => now)

      const record = new NajsEloquentLib.Driver.Record({ id: id })
      record.setAttribute('first_name', 'test')
      const result = await makeExecutor(model, record).update()
      expect_query_log(
        {
          sql: "update `users` set `first_name` = 'test', `updated_at` = '2018-01-01 00:00:00.000' where `id` = 1001",
          raw: `KnexProvider.createQueryBuilder("users", "default").where(id, 1001).update(${JSON.stringify({
            first_name: 'test',
            updated_at: now.toDate()
          })})`,
          action: 'Test.update()'
        },
        result,
        1
      )
    })

    it('can update with softDeletes', async function() {
      const model = makeModel('Test', false, { deletedAt: 'deleted_at' })
      const id = 1002
      model['getPrimaryKey'] = function() {
        return id
      }
      model['getPrimaryKeyName'] = function() {
        return 'id'
      }

      await makeExecutor(model, new NajsEloquentLib.Driver.Record({ id: id, first_name: 'any' })).create()

      const record = new NajsEloquentLib.Driver.Record({ id: id })
      record.setAttribute('first_name', 'test')
      const result = await makeExecutor(model, record).update()
      expect_query_log(
        {
          sql: "update `users` set `first_name` = 'test', `deleted_at` = NULL where `id` = 1002",
          raw: `KnexProvider.createQueryBuilder("users", "default").where(id, 1002).update(${JSON.stringify({
            first_name: 'test',
            // tslint:disable-next-line
            deleted_at: null
          })})`,
          action: 'Test.update()'
        },
        result,
        1
      )
    })

    it('returns an empty object if executeMode is disabled', async function() {
      const model = makeModel('Test', false, { deletedAt: 'deleted_at' })
      const id = 1003
      model['getPrimaryKey'] = function() {
        return id
      }
      model['getPrimaryKeyName'] = function() {
        return 'id'
      }

      await makeExecutor(model, new NajsEloquentLib.Driver.Record({ id: id, first_name: 'any' })).create()

      const record = new NajsEloquentLib.Driver.Record({ _id: id })
      record.setAttribute('first_name', 'test')
      const result = await makeExecutor(model, record)
        .setExecuteMode('disabled')
        .update()
      expect_query_log(
        {
          sql: undefined,
          raw: `KnexProvider.createQueryBuilder("users", "default").where(id, 1003).update(${JSON.stringify({
            first_name: 'test',
            // tslint:disable-next-line
            deleted_at: null
          })})`,
          action: 'Test.update()'
        },
        result,
        1
      )
      expect(result).toEqual({})
    })
  })

  describe('.hardDeleteRecord()', function() {
    it('calls this.collection.deleteOne() with filter then returns data', async function() {
      const id = 2000
      const model: any = makeModel('Test', false, false)
      model['getPrimaryKey'] = function() {
        return id
      }
      model['getPrimaryKeyName'] = function() {
        return 'id'
      }

      await makeExecutor(model, new NajsEloquentLib.Driver.Record({ id: id, first_name: 'test' })).create()

      const result = await makeExecutor(model, new NajsEloquentLib.Driver.Record({ id: id })).hardDelete()
      expect_query_log(
        {
          sql: 'delete from `users` where `id` = 2000',
          raw: `KnexProvider.createQueryBuilder("users", "default").where(id, 2000).delete()`,
          action: 'Test.hardDelete()'
        },
        result,
        1
      )
    })

    it('returns an empty object if executeMode is disabled', async function() {
      const id = 2001
      const model: any = makeModel('Test', false, false)
      model['getPrimaryKey'] = function() {
        return id
      }
      model['getPrimaryKeyName'] = function() {
        return 'id'
      }

      await makeExecutor(model, new NajsEloquentLib.Driver.Record({ id: id, first_name: 'test' })).create()

      const result = await makeExecutor(model, new NajsEloquentLib.Driver.Record({ id: id }))
        .setExecuteMode('disabled')
        .hardDelete()
      expect_query_log(
        {
          sql: undefined,
          raw: `KnexProvider.createQueryBuilder("users", "default").where(id, 2001).delete()`,
          action: 'Test.hardDelete()'
        },
        result,
        1
      )
    })
  })
})
