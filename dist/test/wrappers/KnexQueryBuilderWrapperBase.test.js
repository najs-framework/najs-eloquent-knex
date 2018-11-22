"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const KnexQueryBuilderWrapperBase_1 = require("../../lib/wrappers/KnexQueryBuilderWrapperBase");
describe('KnexQueryBuilderWrapperBase', function () {
    describe('constructor()', function () {
        it('needs knexQuery which is wrapped', function () {
            const query = {};
            const instance = Reflect.construct(KnexQueryBuilderWrapperBase_1.KnexQueryBuilderWrapperBase, [query]);
            expect(instance.knexQuery === query).toBe(true);
        });
    });
    describe('.getKnexQueryBuilder()', function () {
        it('simply returns property "knexQuery"', function () {
            const query = {};
            const instance = Reflect.construct(KnexQueryBuilderWrapperBase_1.KnexQueryBuilderWrapperBase, [query]);
            expect(instance.getKnexQueryBuilder() === query).toBe(true);
        });
    });
});
