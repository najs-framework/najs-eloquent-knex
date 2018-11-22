"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const util_1 = require("../../util");
const func_1 = require("../func");
const DBFacade_1 = require("../../../lib/facades/global/DBFacade");
describe('KnexQueryBuilder', function () {
    beforeAll(async function () {
        await util_1.init_knex('sql_knex_query_builder');
    });
    const dataset = {
        '.where()': [
            {
                desc: 'should work with 1 param, case callback',
                code: qb => qb.where(groupQuery => groupQuery.where('a', '0').where('b', '1')).orWhere('c', '2'),
                sql: "select * from `table` where (`a` = '0' and `b` = '1') or `c` = '2'"
            },
            {
                desc: 'should work with 1 param, case raw',
                code: qb => qb.where(DBFacade_1.DB.raw('`a` in (select id from `another_table`)')),
                sql: 'select * from `table` where `a` in (select id from `another_table`)'
            },
            {
                desc: 'should work with 2 params',
                code: qb => qb.where('a', 0),
                sql: 'select * from `table` where `a` = 0'
            },
            {
                desc: 'should work with 3 params',
                code: qb => qb.where('a', '=', 'test'),
                sql: "select * from `table` where `a` = 'test'"
            },
            {
                desc: 'should work with 3 params, case raw',
                code: qb => qb.where('a', 'in', DBFacade_1.DB.raw('select `id` from `another_table`')),
                sql: 'select * from `table` where `a` in (select `id` from `another_table`)'
            },
            {
                desc: 'should work with 3 params, case query builder as a value',
                code: qb => qb.where('a', 'in', DBFacade_1.DB.select('id').from('another_table')),
                sql: 'select * from `table` where `a` in (select `id` from `another_table`)'
            },
            {
                desc: 'should prevent SQL Injection',
                code: qb => qb.where('a', "'test' or (select * from user)"),
                sql: "select * from `table` where `a` = '\\'test\\' or (select * from user)'"
            }
        ],
        '.orWhere()': [
            {
                desc: 'should work with 1 param, case callback',
                code: qb => qb.where(groupQuery => groupQuery.where('a', '0').orWhere('b', '1')).where('c', '2'),
                sql: "select * from `table` where (`a` = '0' or `b` = '1') and `c` = '2'"
            },
            {
                desc: 'should work with 1 param, case raw',
                code: qb => qb.where('first', 1).orWhere(DBFacade_1.DB.raw('`a` in (select id from `another_table`)')),
                sql: 'select * from `table` where `first` = 1 or `a` in (select id from `another_table`)'
            },
            {
                desc: 'should work with 2 params',
                code: qb => qb.where('a', 0).orWhere('b', 1),
                sql: 'select * from `table` where `a` = 0 or `b` = 1'
            },
            {
                desc: 'should work with 3 params',
                code: qb => qb.where('a', '=', 'test').orWhere('b', '=', 'test'),
                sql: "select * from `table` where `a` = 'test' or `b` = 'test'"
            },
            {
                desc: 'should work with 3 params, case raw',
                code: qb => qb
                    .where('a', 'in', DBFacade_1.DB.raw('select `id` from `another_table`'))
                    .orWhere('b', 'in', DBFacade_1.DB.raw('select `id` from `another_table`')),
                sql: 'select * from `table` where `a` in (select `id` from `another_table`) or `b` in (select `id` from `another_table`)'
            },
            {
                desc: 'should work with 3 params, case query builder as a value',
                code: qb => qb.where('a', 'test').orWhere('b', 'in', DBFacade_1.DB.select('id').from('another_table')),
                sql: "select * from `table` where `a` = 'test' or `b` in (select `id` from `another_table`)"
            },
            {
                desc: 'should prevent SQL Injection',
                code: qb => qb.where('a', 'test').orWhere('b', "'test' or (select * from user)"),
                sql: "select * from `table` where `a` = 'test' or `b` = '\\'test\\' or (select * from user)'"
            }
        ],
        '.andWhere()': [
            {
                desc: 'should work with 1 param, case callback',
                code: qb => qb.where(groupQuery => groupQuery.where('a', '0').andWhere('b', '1')).orWhere('c', '2'),
                sql: "select * from `table` where (`a` = '0' and `b` = '1') or `c` = '2'"
            },
            {
                desc: 'should work with 1 param, case raw',
                code: qb => qb.andWhere(DBFacade_1.DB.raw('`a` in (select id from `another_table`)')),
                sql: 'select * from `table` where `a` in (select id from `another_table`)'
            },
            {
                desc: 'should work with 2 params',
                code: qb => qb.andWhere('a', 0),
                sql: 'select * from `table` where `a` = 0'
            },
            {
                desc: 'should work with 3 params',
                code: qb => qb.andWhere('a', '=', 'test'),
                sql: "select * from `table` where `a` = 'test'"
            },
            {
                desc: 'should work with 3 params, case raw',
                code: qb => qb.andWhere('a', 'in', DBFacade_1.DB.raw('select `id` from `another_table`')),
                sql: 'select * from `table` where `a` in (select `id` from `another_table`)'
            },
            {
                desc: 'should work with 3 params, case query builder as a value',
                code: qb => qb.andWhere('a', 'in', DBFacade_1.DB.select('id').from('another_table')),
                sql: 'select * from `table` where `a` in (select `id` from `another_table`)'
            },
            {
                desc: 'should prevent SQL Injection',
                code: qb => qb.andWhere('a', "'test' or (select * from user)"),
                sql: "select * from `table` where `a` = '\\'test\\' or (select * from user)'"
            }
        ]
    };
    func_1.generateTestSuite(dataset);
});
