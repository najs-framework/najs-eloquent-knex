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
        '.select()': [
            {
                code: qb => qb.select('a', 'b'),
                sql: 'select `a`, `b` from `table`'
            },
            {
                desc: 'should work with najs-eloquent syntax, case 1',
                code: qb => qb.select('a', 'b'),
                sql: 'select `a`, `b` from `table`'
            },
            {
                desc: 'should work with najs-eloquent syntax, case 2',
                code: qb => qb.select(['a', 'b'], 'c', ['d', 'e']),
                sql: 'select `a`, `b`, `c`, `d`, `e` from `table`'
            },
            {
                desc: 'should work with knex alias syntax and najs-eloquent syntax',
                code: qb => qb.select({ a: 'b' }, 'c', ['d'], { e: 'f' }),
                sql: 'select `b` as `a`, `c`, `d`, `f` as `e` from `table`'
            },
            {
                desc: 'should work with knex raw, case 1',
                code: qb => qb.select(DBFacade_1.DB.raw('`column` as `name`')),
                sql: 'select `column` as `name` from `table`'
            },
            {
                desc: 'should work with knex raw, case 2',
                code: qb => qb.select(DBFacade_1.DB.raw('`column` as ?', ['name'])),
                sql: "select `column` as 'name' from `table`"
            }
        ],
        '.where()': [
            {
                desc: 'should work with .andWhereIn()',
                code: qb => qb.where('a', 0).andWhereIn('b', [1, 2]),
                sql: 'select * from `table` where `a` = 0 and `b` in (1, 2)'
            }
        ]
    };
    func_1.generateTestSuite(dataset);
});
