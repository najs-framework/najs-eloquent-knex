"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const helpers_1 = require("../../lib/utils/helpers");
describe('get_table_name()', function () {
    it('returns setting property "table" with default value is Model.getRecordName()', function () {
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
        const spy = Sinon.spy(settingFeature, 'getSettingProperty');
        helpers_1.get_table_name(model);
        expect(spy.calledWith(model, 'table', 'recordName')).toBe(true);
    });
});
describe('get_connection_name()', function () {
    it('returns setting property "connection" with default value is "default"', function () {
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
            getDriver() {
                return driver;
            }
        };
        const spy = Sinon.spy(settingFeature, 'getSettingProperty');
        helpers_1.get_connection_name(model);
        expect(spy.calledWith(model, 'connection', 'default')).toBe(true);
    });
});
