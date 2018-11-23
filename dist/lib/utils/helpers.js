"use strict";
/// <reference types="najs-eloquent" />
Object.defineProperty(exports, "__esModule", { value: true });
function get_table_name(model) {
    return model
        .getDriver()
        .getSettingFeature()
        .getSettingProperty(model, 'table', model.getRecordName());
}
exports.get_table_name = get_table_name;
function get_connection_name(model) {
    return model
        .getDriver()
        .getSettingFeature()
        .getSettingProperty(model, 'connection', 'default');
}
exports.get_connection_name = get_connection_name;
