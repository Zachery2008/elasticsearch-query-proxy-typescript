import { Client } from '@elastic/elasticsearch'
import { Logger } from '../../utils/logger'
import { Result } from '../../core/Result'
import { UseCaseErrors } from "./UseCaseErrors"
import { UseCaseError } from '../../core/UseCaseError'

export type ElasticsearchResult = 
  Result<UseCaseError>|
  Result<any>

export class Elasticsearch {
  private _client: Client

  constructor() {
    this._client = new Client({
      node: 'http://localhost:9200',
    })
  }

  /**
   * Get all Elasticsearch indices
   * @return a successful Result with the all indices metadata
   */
  async getIndices(): Promise<ElasticsearchResult> {

    try {
      const results = await this._client.cat.indices({
        format: 'json',
      })
      return new Result<any>(true, undefined, results)
    }
    catch (err) {
      Logger.error(`GET [Elasticsearch indices error] ${(err as Error).message}`)
      return new UseCaseErrors.FailedGetRequest((err as Error).message)
    }
  }

  /**
   * Get elasticsearch index metadata
   * @param index the name of the index to get
   * @return a successful Result with the index metadata
   */
  async getIndex(index: string) {
      
    try {
      const results = await this._client.cat.indices({
        format: 'json',
        index,
      })
      return new Result<any>(true, undefined, results)
    }
    catch (err) {
      Logger.error(`GET [Elasticsearch index error] ${(err as Error).message}`)
      return new UseCaseErrors.FailedGetRequest((err as Error).message)
    }
  }

  /**
   * Get the results of a query
   * @param index the name of the index to query
   * @param query the query to execute
   * @return a successful Result with the query results
   */
  async getQuery(index: string, query: string) {
    try {
      const results = await this._client.search({
        index,
        body: {
          query: {
            match: {
              _all: query,
            },
          },
        },
        size: 10,
      })
      return new Result<any>(true, undefined, results)
    }
    catch (err) {
      Logger.error(`GET [Elasticsearch query error] ${(err as Error).message}`)
      return new UseCaseErrors.FailedGetRequest((err as Error).message)
    }
  }
}



