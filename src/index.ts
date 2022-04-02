import express = require('express')
import bodyParser = require('body-parser')
import { logger } from './utils/logger'

const app = express()
const port = process.env.PORT || 3000


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }))

// Health check
app.get('/health', (_req, res) => {
  res.send('OK')
})


app.listen(port, () => {
  logger.info(`App listening at http://localhost:${port}`)
})