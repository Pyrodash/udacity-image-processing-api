import 'jasmine'
import sharp from 'sharp'
import { unlink } from 'fs/promises'
import { getThumbPath, getImagePath } from '../util/path'
import { resizeImage } from '../util/media'

describe('Media Utilities', () => {
    it('can resize images', async () => {
        const width = 200
        const height = 200

        const filename = 'nodejs.png'

        const srcPath = getImagePath(filename)
        const destPath = getThumbPath(filename, width, height)

        await resizeImage({
            width,
            height,
            srcPath,
            destPath,
        })

        const metadata = await sharp(destPath).metadata()

        expect(metadata.width).toBe(width)
        expect(metadata.height).toBe(height)

        await unlink(destPath)
    })

    it('must take a valid image', async () => {
        const width = 200
        const height = 200

        const filename = 'test.png'

        const srcPath = getImagePath(filename)
        const destPath = getThumbPath(filename, width, height)

        const errMessage = `Input file is missing: ${srcPath}`
        const resize = async () => {
            await resizeImage({
                width,
                height,
                srcPath,
                destPath,
            })
        }

        await expectAsync(resize()).toBeRejectedWithError(errMessage)
    })
})
