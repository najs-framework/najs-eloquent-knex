import 'jest'
import { KnexQueryBuilder, KnexQueryBuilderType } from '../../lib/driver/KnexQueryBuilder'
import { KnexQueryBuilderHandler } from '../../lib/driver/KnexQueryBuilderHandler'

export function makeQueryBuilder(table: string): KnexQueryBuilderType<any> {
  const model: any = {
    getRecordName() {
      return table
    },

    getDriver() {
      return {
        getSettingFeature() {
          return {
            getSettingProperty() {
              return 'default'
            }
          }
        }
      }
    }
  }

  const handler = new KnexQueryBuilderHandler(model)
  return new KnexQueryBuilder(handler) as KnexQueryBuilderType<any>
}

export function generatedSqlQuery(
  cb: (this: KnexQueryBuilderType<any>, queryBuilder: KnexQueryBuilderType<any>) => void,
  table: string = 'table'
): string {
  const queryBuilder = makeQueryBuilder(table)
  cb.call(queryBuilder, queryBuilder)
  return queryBuilder.toSqlQuery()
}

export type TestSqlData = {
  desc?: string
  code: (queryBuilder: KnexQueryBuilderType<any>) => any
  sql: string
}

export type TestSqlDataset = { [func in string]: TestSqlData[] }

export function generateTestSuite(dataset: TestSqlDataset) {
  for (const name in dataset) {
    describe(name, function() {
      let i = 0
      for (const testCase of dataset[name]) {
        let description = 'case #' + i
        if (typeof testCase.desc !== 'undefined') {
          description += ': ' + testCase.desc
        }

        it(description, function() {
          expect(generatedSqlQuery(testCase.code)).toEqual(testCase.sql)
        })

        i++
      }
    })
  }
}
