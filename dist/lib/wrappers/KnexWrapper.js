"use strict";
/// <reference types="najs-binding" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const najs_facade_1 = require("najs-facade");
const constants_1 = require("../constants");
const KnexProviderFacade_1 = require("../facades/global/KnexProviderFacade");
exports.KnexWrapperProxyHandler = {
    get(target, property) {
        if (typeof target['knex'] === 'undefined') {
            target['knex'] = KnexProviderFacade_1.KnexProvider.create(target['connectionName']);
        }
        if (typeof target['knex'][property] !== 'undefined') {
            return target['knex'][property];
        }
        return target[property];
    }
};
class KnexWrapper extends najs_facade_1.Facade {
    constructor(name = 'default') {
        super();
        this.connectionName = name;
        return new Proxy(this, exports.KnexWrapperProxyHandler);
    }
    getClassName() {
        return constants_1.ClassNames.Knex.Wrapper.KnexWrapper;
    }
    getConnection(name) {
        if (name === this.connectionName) {
            return this;
        }
        return new KnexWrapper(name);
    }
}
exports.KnexWrapper = KnexWrapper;
najs_binding_1.register(KnexWrapper, constants_1.ClassNames.Knex.Wrapper.KnexWrapper);
