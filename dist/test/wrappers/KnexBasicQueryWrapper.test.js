"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const KnexBasicQueryWrapper_1 = require("../../lib/wrappers/KnexBasicQueryWrapper");
describe('KnexBasicQueryWrapper', function () {
    describe('.select()', function () {
        it('flattens then passes all arguments to knexQuery.select()', function () {
            const query = { select() { } };
            const wrapper = new KnexBasicQueryWrapper_1.KnexBasicQueryWrapper(query);
            const spy = Sinon.spy(query, 'select');
            expect(wrapper.select('a', ['b', 'c'], 'd', 'e') === wrapper).toBe(true);
            expect(spy.calledWith('a', 'b', 'c', 'd', 'e')).toBe(true);
        });
    });
    describe('.limit()', function () {
        it('simply passes to knexQuery.limit()', function () {
            const query = { limit() { } };
            const wrapper = new KnexBasicQueryWrapper_1.KnexBasicQueryWrapper(query);
            const spy = Sinon.spy(query, 'limit');
            expect(wrapper.limit(1000) === wrapper).toBe(true);
            expect(spy.calledWith(1000)).toBe(true);
        });
    });
    describe('.orderBy()', function () {
        it('simply passes to knexQuery.orderBy()', function () {
            const query = { orderBy() { } };
            const wrapper = new KnexBasicQueryWrapper_1.KnexBasicQueryWrapper(query);
            const spy = Sinon.spy(query, 'orderBy');
            expect(wrapper.orderBy('test') === wrapper).toBe(true);
            expect(spy.calledWith('test')).toBe(true);
            expect(wrapper.orderBy('test', 'asc') === wrapper).toBe(true);
            expect(spy.calledWith('test', 'asc')).toBe(true);
            expect(wrapper.orderBy('test', 'desc') === wrapper).toBe(true);
            expect(spy.calledWith('test', 'desc')).toBe(true);
        });
    });
});
