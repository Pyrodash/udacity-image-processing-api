import { Request, Response, Router } from 'express'
import { basename } from 'path'
import { fileExists } from './util/file'
import { getImagePath, getThumbPath } from './util/path'
import { logger } from './util/logger'
import { resizeImage } from './util/media'

export const router = Router()

router.get(
    '/images',
    async (req: Request, res: Response): Promise<Response> => {
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

        if (isNaN(width) || width <= 0 || isNaN(height) || height <= 0) {
            return res.status(400).send('Invalid size parameter(s)')
        }

        const thumbPath = getThumbPath(filename, width, height)

        if (!(await fileExists(thumbPath))) {
            const filePath = getImagePath(filename)

            if (!(await fileExists(filePath))) {
                return res.status(404).send('File not found')
            }

            logger.debug('Resizing image')

            try {
                await resizeImage({
                    srcPath: filePath,
                    destPath: thumbPath,
                    width,
                    height,
                })
            } catch (err) {
                logger.error(err)

                return res.status(500).send('Failed to resize image')
            }
        } else {
            logger.debug('File already exists, sending')
        }

        res.sendFile(thumbPath)
    }
)
