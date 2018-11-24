"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const najs_binding_1 = require("najs-binding");
const KnexExecutorFactory_1 = require("../../lib/driver/KnexExecutorFactory");
const KnexRecordExecutor_1 = require("../../lib/driver/KnexRecordExecutor");
const KnexQueryExecutor_1 = require("../../lib/driver/KnexQueryExecutor");
describe('KnexExecutorFactory', function () {
    it('implement NajsEloquent.Driver.IExecutorFactory under name "NajsEloquent.Driver.Knex.KnexExecutorFactory" with singleton option', function () {
        const factory = najs_binding_1.make(KnexExecutorFactory_1.KnexExecutorFactory.className);
        const another = najs_binding_1.make(KnexExecutorFactory_1.KnexExecutorFactory.className);
        expect(factory === another).toBe(true);
        expect(factory.getClassName()).toEqual('NajsEloquent.Driver.Knex.KnexExecutorFactory');
    });
    describe('.makeRecordExecutor()', function () {
        it('creates new KnexRecordExecutor instance', function () {
            const settingFeature = {
                getSettingProperty() {
                    return 'any';
                }
            };
            const driver = {
                getSettingFeature() {
                    return settingFeature;
                }
            };
            const model = {
                getRecordName() {
                    return 'recordName';
                },
                getDriver() {
                    return driver;
                }
            };
            const record = {};
            const factory = najs_binding_1.make(KnexExecutorFactory_1.KnexExecutorFactory.className);
            const recordExecutor = factory.makeRecordExecutor(model, record);
            expect(recordExecutor).toBeInstanceOf(KnexRecordExecutor_1.KnexRecordExecutor);
        });
    });
    describe('.makeQueryExecutor()', function () {
        it('creates new KnexQueryExecutor instance', function () {
            const handler = {};
            const factory = najs_binding_1.make(KnexExecutorFactory_1.KnexExecutorFactory.className);
            const recordExecutor = factory.makeQueryExecutor(handler);
            expect(recordExecutor).toBeInstanceOf(KnexQueryExecutor_1.KnexQueryExecutor);
        });
    });
});
