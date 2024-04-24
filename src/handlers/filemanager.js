const fs = require("fs")
const os = require('os')

let osSymbol = '/'
if (os.platform() === 'win32') {
    osSymbol = '\\'
}

class FileManager{
    #extension
    #buffer
    #name
    /**
     * 
     * @param {object} [data]
     * @param {buffer} [data.buffer]
     * @param {string} [data.name]
     * @param {string} [data.extension]
     */
    constructor(data={}){
        this.path = null
        this.#name = data.name || null
        this.#extension = data.extension || null
        this.#buffer = data.buffer || null
    }

    loadFile(path){
        if(typeof path !== "string" || !path.includes(".") || !path.includes(osSymbol)) return this
        try{
            let data = fs.readFileSync(path)
            this.#buffer = data
            let splittedPathOsSep = path.split(osSymbol)
            let fileInfo = splittedPathOsSep[splittedPathOsSep.length - 1]
            this.#extension = fileInfo?.split('.')?.[1]
            if (!this.#extension) {
                this.#buffer = null
                return this
            }
            if(!this.#name) {
                this.#name = fileInfo?.split('.')?.[0]
            }
            this.path = path
            return this
        }catch(err){
            return this
        }
    }

    setBuffer(buf){
        if (Buffer.isBuffer(buf)) this.#buffer = buf

        return this
    }

    setName(title){
        if(typeof title === "string" && title.length < 25) this.#name = title

        return this
    }

    setExtension(extension){
        if(typeof extension === "string" && extension.length < 7) this.#extension = extension

        return this
    }

    getBuffer(){
        return this.#buffer
    }

    getExtension(){
        return this.#extension
    }

    getGlobalFile(){
        return {name: this.#name, buffer: this.#buffer, extension: this.#extension}
    }

    getFullName(){
        return `${this.#name}.${this.#extension}`
    }

    getImageFile(){
        let baseData = Buffer.from(this.#buffer).toString('base64')
        return `data:image/${this.#extension};base64,${baseData}`
    }
}

module.exports = FileManager