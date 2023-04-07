const fs = require("fs")
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

    loadFile(relativePath){
        if(typeof relativePath !== "string" || !relativePath.startsWith(".") || !relativePath.includes("/")) return false
        try{
            let data = fs.readFileSync(relativePath)
            this.#buffer = data
            let splittedPath = relativePath.split(".")
            let splittedPathOsSep = relativePath.split(".")
            this.#extension = splittedPath[splittedPath.length - 1]
            if(!this.#name) this.#name = splittedPathOsSep[splittedPathOsSep.length - 1]
            return true
        }catch(err){ 
            return false
        }
    }

    name(title){
        if(typeof title === "string" && title.length < 25) this.#name = title
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

    getEmojiFile(){
        let baseData = Buffer.from(this.#buffer, "base64")
        return `data:image/${this.#extension};base64,${baseData}`
    }
}

module.exports = FileManager