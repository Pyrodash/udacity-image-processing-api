import { Router } from 'express'
import { join, basename, extname } from 'path'
import sharp from 'sharp'
import { fileExists, getImagePath, getThumbPath } from './util'
import { logger } from './util/logger'

export const router = Router()

router.get('/images', async (req, res) => {
    const filename = req.query.filename as string

    if (!filename) {
        return res.status(400).send('Missing filename')
    }

    // handle cases where filename is a path
    if (basename(filename) != filename) {
        return res.status(400).send('Invalid filename')
    }

    const width = Number(req.query.width as string)
    const height = Number(req.query.height as string)

    if ((isNaN(width) || width <= 0) || (isNaN(height) || height <= 0)) {
        return res.status(400).send('Invalid size parameter(s)')
    }

    const thumbPath = getThumbPath(filename, width, height)

    if (!(await fileExists(thumbPath))) {
        const filePath = getImagePath(filename)

        if (!(await fileExists(filePath))) {
            return res.status(404).send('File not found')
        }

        try {
            await sharp(filePath).resize(width, height).toFile(thumbPath)
        } catch (err) {
            logger.error(err)

            return res.status(500).send('Failed to resize image')
        }
    }

    res.sendFile(thumbPath)
})
