"use strict";
/// <reference types="najs-eloquent" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const najs_eloquent_1 = require("najs-eloquent");
const constants_1 = require("../constants");
const KnexQueryBuilderFactory_1 = require("./KnexQueryBuilderFactory");
const KnexExecutorFactory_1 = require("./KnexExecutorFactory");
class KnexDriver extends najs_eloquent_1.NajsEloquent
    .Driver.DriverBase {
    constructor() {
        super();
        this.recordManager = najs_binding_1.make(najs_eloquent_1.NajsEloquent.Driver.RecordManager, [najs_binding_1.make(KnexExecutorFactory_1.KnexExecutorFactory.className)]);
    }
    getClassName() {
        return constants_1.ClassNames.Driver.KnexDriver;
    }
    getRecordManager() {
        return this.recordManager;
    }
    makeQueryBuilderFactory() {
        return najs_binding_1.make(KnexQueryBuilderFactory_1.KnexQueryBuilderFactory.className);
    }
}
KnexDriver.Name = 'mongodb';
exports.KnexDriver = KnexDriver;
najs_binding_1.register(KnexDriver, constants_1.ClassNames.Driver.KnexDriver);
