import 'jasmine'
import { unlink } from 'fs/promises'
import sharp from 'sharp'
import supertest from 'supertest'
import { app } from './index'
import { getThumbPath } from './util'

const request = supertest(app)

const width = 200
const height = 200

const filename = 'nodejs.png'
const thumbPath = getThumbPath(filename, width, height)

describe('Test API', () => {
    afterAll(async () => {
        await unlink(thumbPath)
    })

    it('must take a filename', async () => {
        const response = await request.get(`/api/images?width=${width}&height=${height}`)

        expect(response.status).toBe(400)
    })

    it(`won't take a path`, async () => {
        const response = await request.get(`/api/images?width=${width}&height=${height}&filename=../${filename}`)

        expect(response.status).toBe(400)
    })

    it('must take a width', async () => {
        const response = await request.get(`/api/images?height=${height}&filename=${filename}`)

        expect(response.status).toBe(400)
    })

    it('must take a height', async () => {
        const response = await request.get(`/api/images?width=${width}&filename=${filename}`)

        expect(response.status).toBe(400)
    })

    it('can resize images', async () => {
        const response = await request.get(`/api/images?width=${width}&height=${height}&filename=${filename}`)

        expect(response.status).toBe(200)

        const metadata = await sharp(thumbPath).metadata()

        expect(metadata.width).toBe(width)
        expect(metadata.height).toBe(height)
    })
})
