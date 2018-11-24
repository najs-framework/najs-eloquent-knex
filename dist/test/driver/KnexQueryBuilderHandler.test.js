"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const KnexProviderFacade_1 = require("../../lib/facades/global/KnexProviderFacade");
const KnexQueryBuilderHandler_1 = require("../../lib/driver/KnexQueryBuilderHandler");
const najs_eloquent_1 = require("najs-eloquent");
const KnexBasicQueryWrapper_1 = require("../../lib/wrappers/KnexBasicQueryWrapper");
const KnexConditionQueryWrapper_1 = require("../../lib/wrappers/KnexConditionQueryWrapper");
const Helpers = require("../../lib/utils/helpers");
describe('KnexQueryBuilderHandler', function () {
    describe('constructor()', function () {
        it('creates an instance of DefaultConvention then assigns to property "convention"', function () {
            const model = {};
            const handler = new KnexQueryBuilderHandler_1.KnexQueryBuilderHandler(model);
            expect(handler.getQueryConvention()).toBeInstanceOf(najs_eloquent_1.NajsEloquent.QueryBuilder.Shared.DefaultConvention);
        });
    });
    describe('.getTableName()', function () {
        it('calls and returns Helpers.get_table_name()', function () {
            const model = {};
            const stub = Sinon.stub(Helpers, 'get_table_name');
            stub.returns('anything');
            const handler = new KnexQueryBuilderHandler_1.KnexQueryBuilderHandler(model);
            expect(handler.getTableName()).toEqual('anything');
            stub.restore();
        });
    });
    describe('.getConnectionName()', function () {
        it('returns an setting property "connection" with default value is "default"', function () {
            const settingFeature = {
                getSettingProperty() { }
            };
            const driver = {
                getSettingFeature() {
                    return settingFeature;
                }
            };
            const model = {
                getDriver() {
                    return driver;
                }
            };
            const stub = Sinon.stub(settingFeature, 'getSettingProperty');
            stub.returns('anything');
            const handler = new KnexQueryBuilderHandler_1.KnexQueryBuilderHandler(model);
            expect(handler.getConnectionName()).toEqual('anything');
            expect(stub.calledWith(model, 'connection', 'default')).toBe(true);
        });
    });
    describe('.getKnexQueryBuilder()', function () {
        it('does nothing, just return property "knexQuery" if it exists', function () {
            const model = {};
            const handler = new KnexQueryBuilderHandler_1.KnexQueryBuilderHandler(model);
            const knexQuery = {};
            handler['knexQuery'] = knexQuery;
            expect(handler.getKnexQueryBuilder() === knexQuery).toBe(true);
        });
        it('calls KnexProvider.createQueryBuilder() with arguments from .getTableName() and .getConnectionName()', function () {
            const model = {};
            const handler = new KnexQueryBuilderHandler_1.KnexQueryBuilderHandler(model);
            const getTableNameStub = Sinon.stub(handler, 'getTableName');
            getTableNameStub.returns('table');
            const getConnectionNameStub = Sinon.stub(handler, 'getConnectionName');
            getConnectionNameStub.returns('connection');
            const mock = KnexProviderFacade_1.KnexProviderFacade.createMock().expects('createQueryBuilder');
            mock.calledWith('table', 'connection');
            handler.getKnexQueryBuilder();
            mock.verify();
        });
    });
    describe('.getBasicQuery()', function () {
        it('does nothing, just return property "basicQuery" if it exists', function () {
            const model = {};
            const handler = new KnexQueryBuilderHandler_1.KnexQueryBuilderHandler(model);
            const basicQuery = {};
            handler['basicQuery'] = basicQuery;
            expect(handler.getBasicQuery() === basicQuery).toBe(true);
        });
        it('creates an KnexBasicQueryWrapper which wrap .getKnexQueryBuilder()', function () {
            const model = {};
            const handler = new KnexQueryBuilderHandler_1.KnexQueryBuilderHandler(model);
            const knexQuery = {};
            const stub = Sinon.stub(handler, 'getKnexQueryBuilder');
            stub.returns(knexQuery);
            const basicQuery = handler.getBasicQuery();
            expect(basicQuery).toBeInstanceOf(KnexBasicQueryWrapper_1.KnexBasicQueryWrapper);
            expect(handler['basicQuery'] === basicQuery).toBe(true);
        });
    });
    describe('.getConditionQuery()', function () {
        it('does nothing, just return property "conditionQuery" if it exists', function () {
            const model = {};
            const handler = new KnexQueryBuilderHandler_1.KnexQueryBuilderHandler(model);
            const conditionQuery = {};
            handler['conditionQuery'] = conditionQuery;
            expect(handler.getConditionQuery() === conditionQuery).toBe(true);
        });
        it('creates an KnexConditionQueryWrapper which wrap .getKnexQueryBuilder()', function () {
            const model = {};
            const handler = new KnexQueryBuilderHandler_1.KnexQueryBuilderHandler(model);
            const knexQuery = {};
            const stub = Sinon.stub(handler, 'getKnexQueryBuilder');
            stub.returns(knexQuery);
            const conditionQuery = handler.getConditionQuery();
            expect(conditionQuery).toBeInstanceOf(KnexConditionQueryWrapper_1.KnexConditionQueryWrapper);
            expect(handler['conditionQuery'] === conditionQuery).toBe(true);
        });
    });
    describe('.getQueryConvention()', function () {
        it('simply returns property "convention"', function () {
            const model = {};
            const handler = new KnexQueryBuilderHandler_1.KnexQueryBuilderHandler(model);
            expect(handler.getQueryConvention() === handler['convention']).toBe(true);
        });
    });
});
