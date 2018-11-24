"use strict";
/// <reference types="najs-eloquent" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../constants");
const KnexRecordExecutor_1 = require("./KnexRecordExecutor");
const KnexQueryExecutor_1 = require("./KnexQueryExecutor");
const KnexQueryLog_1 = require("./KnexQueryLog");
const helpers_1 = require("../utils/helpers");
class KnexExecutorFactory {
    makeRecordExecutor(model, record) {
        return new KnexRecordExecutor_1.KnexRecordExecutor(model, record, helpers_1.get_table_name(model), helpers_1.get_connection_name(model), this.makeLogger());
    }
    makeQueryExecutor(handler) {
        return new KnexQueryExecutor_1.KnexQueryExecutor(handler, this.makeLogger());
    }
    getClassName() {
        return constants_1.ClassNames.Driver.KnexExecutorFactory;
    }
    makeLogger() {
        return new KnexQueryLog_1.KnexQueryLog();
    }
}
KnexExecutorFactory.className = constants_1.ClassNames.Driver.KnexExecutorFactory;
exports.KnexExecutorFactory = KnexExecutorFactory;
najs_binding_1.register(KnexExecutorFactory, constants_1.ClassNames.Driver.KnexExecutorFactory, true, true);
