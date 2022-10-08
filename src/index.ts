import express from 'express'
import { router } from './router'

const port = Number(process.env.PORT) || 3000
const app = express()

app.use('/api', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
