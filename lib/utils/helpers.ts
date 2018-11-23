/// <reference types="najs-eloquent" />

export function get_table_name(model: NajsEloquent.Model.IModel): string {
  return model
    .getDriver()
    .getSettingFeature()
    .getSettingProperty(model, 'table', model.getRecordName())
}

export function get_connection_name(model: NajsEloquent.Model.IModel): string {
  return model
    .getDriver()
    .getSettingFeature()
    .getSettingProperty(model, 'connection', 'default')
}
