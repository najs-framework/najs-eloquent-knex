"use strict";
/// <reference types="najs-eloquent" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../constants");
const KnexQueryBuilder_1 = require("./KnexQueryBuilder");
const KnexQueryBuilderHandler_1 = require("./KnexQueryBuilderHandler");
class KnexQueryBuilderFactory {
    getClassName() {
        return constants_1.ClassNames.Driver.KnexQueryBuilderFactory;
    }
    make(model) {
        return new KnexQueryBuilder_1.KnexQueryBuilder(new KnexQueryBuilderHandler_1.KnexQueryBuilderHandler(model));
    }
}
KnexQueryBuilderFactory.className = constants_1.ClassNames.Driver.KnexQueryBuilderFactory;
exports.KnexQueryBuilderFactory = KnexQueryBuilderFactory;
najs_binding_1.register(KnexQueryBuilderFactory, constants_1.ClassNames.Driver.KnexQueryBuilderFactory, true, true);
