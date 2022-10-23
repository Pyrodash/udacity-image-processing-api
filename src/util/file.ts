import { access } from 'fs/promises'

export function fileExists(filePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        access(filePath)
            .then(() => resolve(true))
            .catch((err) => {
                // if file doesn't exist
                if (err.code === 'ENOENT') {
                    resolve(false)
                } else {
                    reject(err)
                }
            })
    })
}
