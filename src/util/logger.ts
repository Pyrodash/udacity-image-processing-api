import { join } from 'path'
import winston from 'winston'

const rootPath = process.env.LOGS_PATH || join(__dirname, '..', '..', 'logs')
const isProd = process.env.NODE_ENV === 'production'

export const logger = winston.createLogger({
    level: isProd ? 'info' : 'debug',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: join(rootPath, 'all.log') }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: join(rootPath, 'exceptions.log'),
        }),
    ],
})

if (!isProd) {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    )
}
