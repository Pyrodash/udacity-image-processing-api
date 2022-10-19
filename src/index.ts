import express from 'express'
import { router } from './router'
import { logger } from './util/logger'

const port = Number(process.env.PORT) || 3000

export const app = express()

app.use('/api', router)

app.listen(port, () => {
    logger.info(`Listening on port ${port}`)
})
