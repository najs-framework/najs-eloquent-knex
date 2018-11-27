"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const najs_binding_1 = require("najs-binding");
const KnexQueryBuilder_1 = require("../../lib/driver/KnexQueryBuilder");
const KnexQueryBuilderFactory_1 = require("../../lib/driver/KnexQueryBuilderFactory");
describe('KnexQueryBuilderFactory', function () {
    it('implements IAutoload and register with singleton option = true', function () {
        const a = najs_binding_1.make(KnexQueryBuilderFactory_1.KnexQueryBuilderFactory.className);
        const b = najs_binding_1.make(KnexQueryBuilderFactory_1.KnexQueryBuilderFactory.className);
        expect(a.getClassName()).toEqual('NajsEloquent.Driver.Knex.KnexQueryBuilderFactory');
        expect(a === b).toBe(true);
    });
    describe('.make()', function () {
        it('creates new instance of KnexQueryBuilder', function () {
            const model = {
                getRecordName() {
                    return 'model';
                }
            };
            const factory = najs_binding_1.make(KnexQueryBuilderFactory_1.KnexQueryBuilderFactory.className);
            const qb1 = factory.make(model);
            const qb2 = factory.make(model);
            expect(qb1).toBeInstanceOf(KnexQueryBuilder_1.KnexQueryBuilder);
            expect(qb1 === qb2).toBe(false);
        });
    });
});
