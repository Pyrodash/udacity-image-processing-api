import { join, extname, basename } from 'path'

const fullImagePath = join(__dirname, '..', '..', 'assets', 'full')
const thumbImagePath = join(__dirname, '..', '..', 'assets', 'thumb')

export function getImagePath(filename: string): string {
    return join(fullImagePath, filename)
}

export function getThumbPath(
    filename: string,
    width: number,
    height: number
): string {
    const ext = extname(filename)
    const baseName = basename(filename, ext)

    const thumbPath = join(
        thumbImagePath,
        `${baseName}_${width}x${height}${ext}`
    )

    return thumbPath
}
