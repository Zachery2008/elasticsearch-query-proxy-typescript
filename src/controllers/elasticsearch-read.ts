import express = require('express')
import { UseCases } from '../domain/use-cases'

const router = express.Router()

export const ElasticsearchReadRouter = Promise.all([UseCases]).then(([usecases]) => {
  router.route('/indices')
    .get(async (_req, res) => {
      // Get all indices
      const results = await usecases.Elasticsearch.getIndices()

      if (results.isFailure) {
        res.status(400).send(results.errorValue())
        return
      }
      res.status(200).json(results.getValue())
    })

  router.route('/indices/:index')
  .get(async (_req, res) => {
    // Get index metadata by name
    const results = await usecases.Elasticsearch.getIndex(_req.params.index)

    if (results.isFailure) {
      res.status(400).send(results.errorValue())
      return
    }
    res.status(200).json(results.getValue())
  })

  router.route('/indices/:index/queries')
  .get(async (_req, res) => {
    // Get the results of the query
    const results = await usecases.Elasticsearch.getQuery(_req.params.index, _req.body.query)

    if (results.isFailure) {
      res.status(400).send(results.errorValue())
      return
    }
    res.status(200).json(results.getValue())
  })

  return router
})