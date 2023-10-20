const fetch = require('node-fetch')
const fs = require('node:fs')

class Attachment {
    constructor(data){
        this.url = data.url
        this.size = data.size
        this.id = data.id
        this.name = data.filename
        this.content_type = data.content_type
    }

    async download(path=null){
        return new Promise(async (resolve, reject) => {
            let rawRequest = await fetch(this.url, {
                method: 'GET',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            })

            if (rawRequest.status !== 200) {
                return reject('Could not download the attachment')
            }

            let requestBuffer = await rawRequest.arrayBuffer()
            let streamBuffer = Buffer.from(requestBuffer)

            const info = {
                buffer: streamBuffer,
                extension: this.content_type.split('/')[1].split(' ')[0],
                name: this.name.includes('.') ? this.name.split('.')[0] : this.name
            }

            if (path) {
                if (path.endsWith('/')) {
                    path = path.slice(0, -1)
                }

                try {
                    fs.writeFileSync(`${path}/${info.name}.${info.extension}`, streamBuffer)
                }catch (error) {
                    console.log(error)
                }
            }

            return resolve(info)
        })
    }
}

module.exports = Attachment