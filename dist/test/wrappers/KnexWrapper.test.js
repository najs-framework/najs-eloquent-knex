"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const najs_facade_1 = require("najs-facade");
const KnexProviderFacade_1 = require("../../lib/facades/global/KnexProviderFacade");
const KnexWrapper_1 = require("../../lib/wrappers/KnexWrapper");
describe('KnexWrapper', function () {
    it('extends Facade and implements Autoload under name "NajsEloquent.Knex.Wrapper.KnexWrapper"', function () {
        KnexProviderFacade_1.KnexProviderFacade.createStub('create').returns({});
        const wrapper = new KnexWrapper_1.KnexWrapper();
        expect(wrapper).toBeInstanceOf(najs_facade_1.Facade);
        expect(wrapper.getClassName()).toEqual('NajsEloquent.Knex.Wrapper.KnexWrapper');
        KnexProviderFacade_1.KnexProviderFacade.restoreFacade();
    });
    describe('.getConnection()', function () {
        it('does nothing, returns itself if the name is equals to current connectionName', function () {
            KnexProviderFacade_1.KnexProviderFacade.createStub('create').returns({});
            const wrapper = new KnexWrapper_1.KnexWrapper();
            expect(wrapper.getConnection('default') === wrapper).toBe(true);
            KnexProviderFacade_1.KnexProviderFacade.restoreFacade();
        });
        it('creates and returns new instance if the name is not equal to connectionName', function () {
            KnexProviderFacade_1.KnexProviderFacade.createStub('create').returns({});
            const wrapper = new KnexWrapper_1.KnexWrapper();
            const newWrapper = wrapper.getConnection('test');
            expect(newWrapper === wrapper).toBe(false);
            expect(newWrapper).toBeInstanceOf(KnexWrapper_1.KnexWrapper);
            KnexProviderFacade_1.KnexProviderFacade.restoreFacade();
        });
    });
    describe('Facade methods', function () {
        it('is not forwarded to knex, instead it returns a member from the instance', function () {
            const knex = {};
            KnexProviderFacade_1.KnexProviderFacade.createStub('create').returns(knex);
            const wrapper = new KnexWrapper_1.KnexWrapper();
            const members = Object.getOwnPropertyDescriptors(wrapper);
            for (const name in members) {
                wrapper[name] = 'test';
                expect(wrapper[name]).toEqual('test');
            }
            KnexProviderFacade_1.KnexProviderFacade.restoreFacade();
        });
    });
    describe('Knex methods', function () {
        it('forwards to knex if the attribute is exists', function () {
            const knex = {
                test: function () { }
            };
            KnexProviderFacade_1.KnexProviderFacade.createStub('create').returns(knex);
            const wrapper = new KnexWrapper_1.KnexWrapper();
            expect(wrapper['test'] === knex['test']).toBe(true);
            KnexProviderFacade_1.KnexProviderFacade.restoreFacade();
        });
    });
});
