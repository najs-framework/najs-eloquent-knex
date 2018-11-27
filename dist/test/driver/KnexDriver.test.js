"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const NajsBinding = require("najs-binding");
const najs_eloquent_1 = require("najs-eloquent");
const KnexDriver_1 = require("../../lib/driver/KnexDriver");
const KnexQueryBuilderFactory_1 = require("../../lib/driver/KnexQueryBuilderFactory");
describe('KnexDriver', function () {
    it('extends DriverBase, implements Autoload under name "NajsEloquent.Driver.KnexDriver"', function () {
        const driver = new KnexDriver_1.KnexDriver();
        expect(driver).toBeInstanceOf(najs_eloquent_1.NajsEloquent.Driver.DriverBase);
        expect(driver.getClassName()).toEqual('NajsEloquent.Driver.KnexDriver');
    });
    describe('constructor()', function () {
        it('makes RecordManager from "NajsEloquent.Feature.RecordManager" class', function () {
            const makeSpy = Sinon.spy(NajsBinding, 'make');
            const driver = new KnexDriver_1.KnexDriver();
            expect(makeSpy.lastCall.calledWith(najs_eloquent_1.NajsEloquent.Driver.RecordManager)).toBe(true);
            expect(driver['recordManager']).toBeInstanceOf(najs_eloquent_1.NajsEloquent.Driver.RecordManager);
            makeSpy.restore();
        });
    });
    describe('.getClassName()', function () {
        it('implements Autoload under name "NajsEloquent.Driver.KnexDriver"', function () {
            const driver = new KnexDriver_1.KnexDriver();
            expect(driver.getClassName()).toEqual('NajsEloquent.Driver.KnexDriver');
        });
    });
    describe('.getRecordManager()', function () {
        it('simply returns property "recordManager"', function () {
            const driver = new KnexDriver_1.KnexDriver();
            expect(driver.getRecordManager() === driver['recordManager']).toBe(true);
        });
    });
    describe('.makeQueryBuilderFactory()', function () {
        it('creates and returns an instance of KnexQueryBuilderFactory', function () {
            const driver = new KnexDriver_1.KnexDriver();
            const factory1 = driver.makeQueryBuilderFactory();
            const factory2 = driver.makeQueryBuilderFactory();
            expect(factory1 === factory2).toBe(true);
            expect(factory1).toBeInstanceOf(KnexQueryBuilderFactory_1.KnexQueryBuilderFactory);
        });
    });
});
