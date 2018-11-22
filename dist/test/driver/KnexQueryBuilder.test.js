"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const KnexQueryBuilder_1 = require("../../lib/driver/KnexQueryBuilder");
describe('KnexQueryBuilder', function () {
    describe('.native()', function () {
        it('is chainable, gets native Knex.QueryBuilder from this.handler.getKnexQueryBuilder() then apply to callback', function () {
            const knexQuery = {};
            const handler = {
                getKnexQueryBuilder() {
                    return knexQuery;
                }
            };
            const knexQueryBuilder = new KnexQueryBuilder_1.KnexQueryBuilder(handler);
            const callback = function () { };
            const spy = Sinon.spy(callback);
            expect(knexQueryBuilder.native(spy) === knexQueryBuilder).toBe(true);
            expect(spy.calledWith(knexQuery)).toBe(true);
            expect(spy.lastCall.thisValue === knexQuery).toBe(true);
        });
    });
    describe('.toSqlQuery()', function () {
        it('calls and returns this.handler.getKnexQueryBuilder().toQuery()', function () {
            const knexQuery = {
                toQuery() {
                    return 'anything';
                }
            };
            const handler = {
                getKnexQueryBuilder() {
                    return knexQuery;
                }
            };
            const knexQueryBuilder = new KnexQueryBuilder_1.KnexQueryBuilder(handler);
            expect(knexQueryBuilder.toSqlQuery()).toEqual('anything');
        });
    });
});
