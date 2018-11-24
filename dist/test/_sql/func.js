"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const KnexQueryBuilder_1 = require("../../lib/driver/KnexQueryBuilder");
const KnexQueryBuilderHandler_1 = require("../../lib/driver/KnexQueryBuilderHandler");
function makeQueryBuilder(table) {
    const model = {
        getRecordName() {
            return table;
        },
        getDriver() {
            return {
                getSettingFeature() {
                    return {
                        getSettingProperty(model, property) {
                            return property === 'table' ? 'table' : 'default';
                        }
                    };
                }
            };
        }
    };
    const handler = new KnexQueryBuilderHandler_1.KnexQueryBuilderHandler(model);
    return new KnexQueryBuilder_1.KnexQueryBuilder(handler);
}
exports.makeQueryBuilder = makeQueryBuilder;
function generatedSqlQuery(cb, table = 'table') {
    const queryBuilder = makeQueryBuilder(table);
    cb.call(queryBuilder, queryBuilder);
    return queryBuilder.toSqlQuery();
}
exports.generatedSqlQuery = generatedSqlQuery;
function generateTestSuite(dataset) {
    for (const name in dataset) {
        describe(name, function () {
            let i = 0;
            for (const testCase of dataset[name]) {
                let description = 'case #' + i;
                if (typeof testCase.desc !== 'undefined') {
                    description += ': ' + testCase.desc;
                }
                it(description, function () {
                    expect(generatedSqlQuery(testCase.code)).toEqual(testCase.sql);
                });
                i++;
            }
        });
    }
}
exports.generateTestSuite = generateTestSuite;
