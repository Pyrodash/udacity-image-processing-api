import sharp from 'sharp'

export interface ResizeOptions {
    width: number
    height: number
    srcPath: string
    destPath: string
}

export async function resizeImage(opts: ResizeOptions): Promise<void> {
    await sharp(opts.srcPath)
        .resize(opts.width, opts.height)
        .toFile(opts.destPath)
}
