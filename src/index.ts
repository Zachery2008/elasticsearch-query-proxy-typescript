import 'dotenv/config'
import express = require('express')
import bodyParser = require('body-parser')
import { Logger } from './core/Logger'
import { Controllers } from './controllers'

const app = express()
const port = process.env.PORT || 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }))

// Health check
app.get('/health', (req, res) => {
  res.send('OK')
})

Controllers.then((controllers) => {
  app.use('/api', controllers.ElasticsearchReadRouter)
})

app.listen(port, () => {
  Logger.info(`App listening at port:${port}`)
})