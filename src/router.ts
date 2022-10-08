import { Router } from 'express'
import { join, basename, extname } from 'path'
import sharp from 'sharp'
import { fileExists } from './util'

const fullImagePath = join(__dirname, 'assets', 'full')
const thumbImagePath = join(__dirname, 'assets', 'thumb')

export const router = Router()

router.get('/images', async (req, res) => {
    const filename = req.query.filename as string

    if (!filename) {
        return res.status(400).send('Missing filename')
    }

    if (basename(filename) != filename) {
        return res.status(400).send('Invalid filename')
    }

    const width = Number(req.query.width as string)
    const height = Number(req.query.height as string)

    if (isNaN(width) || isNaN(height)) {
        return res.status(400).send('Invalid size parameter(s)')
    }

    const ext = extname(filename)
    const baseName = basename(filename, ext)

    const thumbPath = join(
        thumbImagePath,
        `${baseName}_${width}x${height}${ext}`
    )

    if (!(await fileExists(thumbPath))) {
        const filePath = join(fullImagePath, filename)

        if (!(await fileExists(filePath))) {
            return res.status(404).send('File not found')
        }

        await sharp(filePath).resize(width, height).toFile(thumbPath)
    }

    res.sendFile(thumbPath)
})
