import 'dotenv/config'
import express = require('express')
import bodyParser = require('body-parser')
import { Logger } from './core/Logger'
import { Controllers } from './controllers'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 10, // Limit each IP to 10 requests per `window` (here, per minute)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const port = process.env.PORT || 3000
const app = express()
app.use(limiter)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }))

// Health check
app.get('/health', (req, res) => {
  res.send('OK')
})

Controllers.then((controllers) => {
  app.use('/elasticsearch', controllers.ElasticsearchReadRouter)
})

app.listen(port, () => {
  Logger.info(`App listening at port:${port}`)
})