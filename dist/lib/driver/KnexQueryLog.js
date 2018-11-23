"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const najs_eloquent_1 = require("najs-eloquent");
class KnexQueryLog extends najs_eloquent_1.NajsEloquent.Driver.QueryLogBase {
    getDefaultData() {
        return this.getEmptyData();
    }
    sql(sql) {
        this.data.sql = sql;
        return this;
    }
}
exports.KnexQueryLog = KnexQueryLog;
