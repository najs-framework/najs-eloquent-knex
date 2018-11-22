"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../wrappers/KnexWrapper");
const najs_binding_1 = require("najs-binding");
const najs_facade_1 = require("najs-facade");
const najs_eloquent_1 = require("najs-eloquent");
const constants_1 = require("../../constants");
const facade = najs_facade_1.Facade.create(najs_eloquent_1.NajsEloquentFacadeContainer, 'DB', function () {
    return najs_binding_1.make(constants_1.ClassNames.Knex.Wrapper.KnexWrapper);
});
exports.DBFacade = facade;
exports.DB = facade;
